import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createPaymentIntent } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      amount,
      frequency,
      project,
      firstName,
      lastName,
      email,
      message
    } = body

    // Validate required fields
    if (!amount || !frequency || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create payment intent with Stripe
    const paymentResult = await createPaymentIntent({
      amount: parseFloat(amount),
      metadata: {
        project: project || 'General Fund',
        frequency,
        donor_name: `${firstName} ${lastName}`,
        donor_email: email,
      },
      customer_email: email,
    })

    if (!paymentResult.success || !paymentResult.paymentIntent) {
      return NextResponse.json(
        { error: 'Failed to create payment intent' },
        { status: 500 }
      )
    }

    // Store donation record in Supabase
    const { data: donation, error: supabaseError } = await supabase
      .from('donations')
      .insert({
        amount: parseFloat(amount),
        frequency,
        project_id: project || null,
        first_name: firstName,
        last_name: lastName,
        email,
        message: message || null,
        stripe_payment_intent_id: paymentResult.paymentIntent.id,
        status: 'pending',
      })
      .select()
      .single()

    if (supabaseError) {
      console.error('Supabase error:', supabaseError)
      return NextResponse.json(
        { error: 'Failed to store donation record' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      donation,
      client_secret: paymentResult.paymentIntent.client_secret,
    })

  } catch (error) {
    console.error('Donation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data: donations, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      throw error
    }

    return NextResponse.json({ donations })
  } catch (error) {
    console.error('Error fetching donations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    )
  }
}
