import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object)
        break
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object)
        break
      
      case 'invoice.payment_succeeded':
        await handleSubscriptionPayment(event.data.object)
        break
      
      case 'invoice.payment_failed':
        await handleSubscriptionFailure(event.data.object)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentSuccess(paymentIntent: any) {
  const { id: paymentIntentId, amount, metadata } = paymentIntent
  
  try {
    // Update donation status in Supabase
    const { error } = await supabase
      .from('donations')
      .update({
        status: 'completed',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_payment_intent_id', paymentIntentId)

    if (error) {
      console.error('Error updating donation status:', error)
      throw error
    }

    console.log(`Payment succeeded for donation: ${paymentIntentId}`)
  } catch (error) {
    console.error('Error handling payment success:', error)
    throw error
  }
}

async function handlePaymentFailure(paymentIntent: any) {
  const { id: paymentIntentId } = paymentIntent
  
  try {
    // Update donation status to failed
    const { error } = await supabase
      .from('donations')
      .update({
        status: 'failed',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_payment_intent_id', paymentIntentId)

    if (error) {
      console.error('Error updating donation status:', error)
      throw error
    }

    console.log(`Payment failed for donation: ${paymentIntentId}`)
  } catch (error) {
    console.error('Error handling payment failure:', error)
    throw error
  }
}

async function handleSubscriptionPayment(invoice: any) {
  const { subscription, customer_email } = invoice
  
  try {
    // Handle recurring donation payment
    const { error } = await supabase
      .from('donations')
      .insert({
        amount: invoice.amount_paid / 100, // Convert from cents
        frequency: 'monthly',
        first_name: 'Recurring',
        last_name: 'Donor',
        email: customer_email,
        stripe_payment_intent_id: `sub_${subscription}`,
        status: 'completed',
      })

    if (error) {
      console.error('Error creating recurring donation:', error)
      throw error
    }

    console.log(`Subscription payment succeeded: ${subscription}`)
  } catch (error) {
    console.error('Error handling subscription payment:', error)
    throw error
  }
}

async function handleSubscriptionFailure(invoice: any) {
  const { subscription } = invoice
  
  try {
    // Handle failed subscription payment
    console.log(`Subscription payment failed: ${subscription}`)
    
    // You might want to update a subscription status table here
    // or send notification emails to donors
    
  } catch (error) {
    console.error('Error handling subscription failure:', error)
    throw error
  }
}
