import { NextResponse } from 'next/server'

// Simple User-Agent Parser helper
function parseUserAgent(ua: string) {
  let os = 'Unknown OS'
  let browser = 'Unknown Browser'
  let version = 'Unknown Version'
  let device_type = 'Desktop'
  let device_model = 'Unknown Model'

  // Device detection
  if (/mobile/i.test(ua)) {
    device_type = 'Mobile'
    device_model = 'Generic Mobile'
  } else if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device_type = 'Tablet'
    device_model = 'Generic Tablet'
  }

  // OS & Model detection
  if (/windows/i.test(ua)) {
    os = 'Windows'
    device_model = 'Windows PC'
  } else if (/macintosh|mac os/i.test(ua)) {
    os = 'macOS'
    device_model = 'Mac'
  } else if (/android/i.test(ua)) {
    os = 'Android'
    device_type = 'Mobile'
    // Extract Android device model (e.g. SM-G991B, Pixel 6, etc.)
    const androidMatch = ua.match(/android\s+[\d\.]+;\s+([^;)]+)/i)
    if (androidMatch) {
      device_model = androidMatch[1].trim()
    } else {
      device_model = 'Android Device'
    }
  } else if (/iphone/i.test(ua)) {
    os = 'iOS'
    device_type = 'Mobile'
    device_model = 'iPhone'
  } else if (/ipad/i.test(ua)) {
    os = 'iOS'
    device_type = 'Tablet'
    device_model = 'iPad'
  } else if (/linux/i.test(ua)) {
    os = 'Linux'
    device_model = 'Linux PC'
  }

  // Browser detection
  const uaLower = ua.toLowerCase()
  if (uaLower.includes('firefox')) {
    browser = 'Firefox'
    const match = ua.match(/firefox\/([\d\.]+)/i)
    if (match) version = match[1]
  } else if (uaLower.includes('edg')) {
    browser = 'Edge'
    const match = ua.match(/edg\/([\d\.]+)/i)
    if (match) version = match[1]
  } else if (uaLower.includes('chrome')) {
    browser = 'Chrome'
    const match = ua.match(/chrome\/([\d\.]+)/i)
    if (match) version = match[1]
  } else if (uaLower.includes('safari')) {
    browser = 'Safari'
    const match = ua.match(/version\/([\d\.]+)/i)
    if (match) version = match[1]
  } else if (uaLower.includes('opera') || uaLower.includes('opr')) {
    browser = 'Opera'
    const match = ua.match(/(?:opera|opr)\/([\d\.]+)/i)
    if (match) version = match[1]
  }

  return { os, browser, version, device_type, device_model }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eidiskrbfgjsgljbvzqw.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpZGlza3JiZmdqc2dsamJ2enF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3NDU4NzAsImV4cCI6MjA5ODMyMTg3MH0.uUhmcQ9TnOCn9l1UoASDPUxWn9wLbkpZ47goTr7shnM'

export async function POST(request: Request) {
  try {
    const headerList = request.headers
    const ip = headerList.get('x-forwarded-for')?.split(',')[0] || headerList.get('x-real-ip') || 'unknown'
    const userAgent = headerList.get('user-agent') || 'unknown'
    const language = headerList.get('accept-language')?.split(',')[0] || 'unknown'
    
    // Parse OS, Browser, and Device details
    const uaInfo = parseUserAgent(userAgent)

    // Fallback geolocation data
    let geoData = {
      country: headerList.get('x-vercel-ip-country') || 'Localhost',
      region: headerList.get('x-vercel-ip-country-region') || 'Localhost',
      city: headerList.get('x-vercel-ip-city') || 'Localhost',
      isp: 'Local/CDN',
      is_vpn: false
    }

    // If we have a public IP, query the geolocation API to retrieve ISP, Location, and VPN detection
    if (ip !== '::1' && ip !== '127.0.0.1' && ip !== 'unknown') {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,isp,proxy`, {
          next: { revalidate: 86400 } // Cache results for 24 hours
        })
        if (geoRes.ok) {
          const data = await geoRes.json()
          if (data.status === 'success') {
            geoData = {
              country: data.country || 'unknown',
              region: data.regionName || 'unknown',
              city: data.city || 'unknown',
              isp: data.isp || 'unknown',
              is_vpn: !!data.proxy
            }
          }
        }
      } catch (err) {
        console.error('IP Geolocation Lookup failed:', err)
      }
    }

    const body = await request.json().catch(() => ({}))
    const screenWidth = body.screenWidth || null
    const screenHeight = body.screenHeight || null
    const timezone = body.timezone || 'unknown'
    const referrer = body.referrer || 'Direct'
    const currentUrl = body.currentUrl || 'unknown'

    // Write record to Supabase
    const res = await fetch(`${supabaseUrl}/rest/v1/visitors`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation' // Return the inserted row (which includes its generated ID)
      },
      body: JSON.stringify({
        ip,
        country: geoData.country,
        region: geoData.region,
        city: geoData.city,
        isp: geoData.isp,
        is_vpn: geoData.is_vpn,
        os: uaInfo.os,
        browser: uaInfo.browser,
        browser_version: uaInfo.version,
        device_type: uaInfo.device_type,
        device_model: uaInfo.device_model,
        screen_width: screenWidth,
        screen_height: screenHeight,
        language,
        timezone,
        referrer,
        current_url: currentUrl,
        session_duration: 0,
        click_count: 0,
        scroll_depth: 0,
        visited_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Supabase REST Error:', errText)
      return NextResponse.json({ error: 'Database logging failed' }, { status: 500 })
    }

    const rows = await res.json()
    return NextResponse.json({ success: true, id: rows[0]?.id || null })
  } catch (error) {
    console.error('Analytics POST error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

// PUT request to update analytics heartbeats (duration, clicks, scroll depth)
export async function PUT(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { id, sessionDuration, clickCount, scrollDepth } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing session identifier.' }, { status: 400 })
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/visitors?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        session_duration: sessionDuration,
        click_count: clickCount,
        scroll_depth: scrollDepth,
        updated_at: new Date().toISOString()
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Supabase Update Error:', errText)
      return NextResponse.json({ error: 'Failed to update session metrics.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics PUT error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
