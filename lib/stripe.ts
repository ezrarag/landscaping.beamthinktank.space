import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY!

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
})

export interface CreatePaymentIntentParams {
  amount: number
  currency?: string
  metadata?: Record<string, string>
  customer_email?: string
}

export const createPaymentIntent = async ({
  amount,
  currency = 'usd',
  metadata = {},
  customer_email,
}: CreatePaymentIntentParams) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      receipt_email: customer_email,
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return { success: true, paymentIntent }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return { success: false, error }
  }
}

export const retrievePaymentIntent = async (paymentIntentId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    return { success: true, paymentIntent }
  } catch (error) {
    console.error('Error retrieving payment intent:', error)
    return { success: false, error }
  }
}

export const createCustomer = async (email: string, name: string) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    })
    return { success: true, customer }
  } catch (error) {
    console.error('Error creating customer:', error)
    return { success: false, error }
  }
}

export const createSubscription = async (
  customerId: string,
  priceId: string,
  metadata?: Record<string, string>
) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    })
    return { success: true, subscription }
  } catch (error) {
    console.error('Error creating subscription:', error)
    return { success: false, error }
  }
}
