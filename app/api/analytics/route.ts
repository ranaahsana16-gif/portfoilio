import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const headerList = request.headers
    const ip = headerList.get('x-forwarded-for')?.split(',')[0] || headerList.get('x-real-ip') || 'unknown'
    const userAgent = headerList.get('user-agent') || 'unknown'
    const language = headerList.get('accept-language') || 'unknown'
    
    // Geolocation headers (provided by hosts like Vercel automatically)
    const country = headerList.get('x-vercel-ip-country') || 'unknown'
    const region = headerList.get('x-vercel-ip-country-region') || 'unknown'
    const city = headerList.get('x-vercel-ip-city') || 'unknown'
    
    const body = await request.json().catch(() => ({}))
    const screenWidth = body.screenWidth || null
    const screenHeight = body.screenHeight || null
    const timezone = body.timezone || 'unknown'

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eidiskrbfgjsgljbvzqw.supabase.co'
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZGlza3JiZmdqc2dsamJ2enF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3NDU4NzAsImV4cCI6MjA5ODMyMTg3MH0.uUhmcQ9TnOCn9l1UoASDPUxWn9wLbkpZ47goTr7shnM'

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase configuration is missing.' }, { status: 500 })
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/visitors`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        ip,
        user_agent: userAgent,
        language,
        country,
        region,
        city,
        screen_width: screenWidth,
        screen_height: screenHeight,
        timezone,
        visited_at: new Date().toISOString()
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Supabase Error:', errText)
      return NextResponse.json({ error: 'Failed to save log to Supabase.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics Route Error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
