import { NextRequest, NextResponse } from 'next/server';
import { CMS_API } from '@/lib/api';

export const runtime = 'nodejs';
// This must never be cached — always forward to the CMS.
export const dynamic = 'force-dynamic';

/**
 * Server-side proxy for the public contact form.
 *
 * The browser posts here (same-origin, HTTPS) and Node forwards the payload
 * to the FastAPI CMS. This avoids mixed-content blocking and CORS issues
 * when the CMS is served over plain HTTP on a different host.
 */
export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${CMS_API}/public/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const text = await upstream.text();
    const contentType = upstream.headers.get('content-type') || 'application/json';

    return new NextResponse(text, {
      status: upstream.status,
      headers: { 'Content-Type': contentType },
    });
  } catch (err) {
    console.error('[contact proxy] upstream fetch failed:', err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Failed to reach contact service',
      },
      { status: 502 },
    );
  }
}
