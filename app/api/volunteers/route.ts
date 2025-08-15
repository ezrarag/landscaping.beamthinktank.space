import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      interests,
      availability,
      experience,
      message
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !city || !interests || !availability || !experience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if volunteer already exists
    const { data: existingVolunteer } = await supabase
      .from('volunteers')
      .select('id, status')
      .eq('email', email)
      .single()

    if (existingVolunteer) {
      // Update existing volunteer record
      const { data: updatedVolunteer, error: updateError } = await supabase
        .from('volunteers')
        .update({
          first_name: firstName,
          last_name: lastName,
          phone: phone || null,
          city,
          interests,
          availability,
          experience,
          message: message || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingVolunteer.id)
        .select()
        .single()

      if (updateError) {
        throw updateError
      }

      return NextResponse.json({
        success: true,
        volunteer: updatedVolunteer,
        message: 'Volunteer profile updated successfully',
      })
    }

    // Create new volunteer record
    const { data: newVolunteer, error: insertError } = await supabase
      .from('volunteers')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        city,
        interests,
        availability,
        experience,
        message: message || null,
        status: 'pending',
      })
      .select()
      .single()

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({
      success: true,
      volunteer: newVolunteer,
      message: 'Volunteer application submitted successfully',
    })

  } catch (error) {
    console.error('Volunteer API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data: volunteers, error } = await supabase
      .from('volunteers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      throw error
    }

    return NextResponse.json({ volunteers })
  } catch (error) {
    console.error('Error fetching volunteers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch volunteers' },
      { status: 500 }
    )
  }
}
