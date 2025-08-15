import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const location = searchParams.get('location')
    const limit = parseInt(searchParams.get('limit') || '50')

    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (status) {
      query = query.eq('status', status)
    }

    if (location) {
      query = query.ilike('location', `%${location}%`)
    }

    // Apply limit
    query = query.limit(limit)

    const { data: projects, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      location,
      status,
      progress,
      target_date,
      volunteers_needed,
      before_image,
      after_image
    } = body

    // Validate required fields
    if (!title || !description || !location || !status || !target_date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new project
    const { data: newProject, error: insertError } = await supabase
      .from('projects')
      .insert({
        title,
        description,
        location,
        status,
        progress: progress || 0,
        target_date,
        volunteers_needed: volunteers_needed || 0,
        current_volunteers: 0,
        before_image: before_image || null,
        after_image: after_image || null,
      })
      .select()
      .single()

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({
      success: true,
      project: newProject,
    })

  } catch (error) {
    console.error('Project creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
