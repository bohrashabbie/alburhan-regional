import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-demand revalidation endpoint.
 *
 * Call from the admin panel after any CMS change:
 *   POST /api/revalidate
 *   Body: { "secret": "your-secret", "path": "/" }
 *
 * Or revalidate everything:
 *   POST /api/revalidate
 *   Body: { "secret": "your-secret" }
 *
 * The secret must match REVALIDATION_SECRET env var.
 * If no secret is set, the endpoint is open (dev-friendly).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const secret = body.secret as string | undefined;
    const envSecret = process.env.REVALIDATION_SECRET;

    // If a secret is configured, enforce it
    if (envSecret && secret !== envSecret) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    const path = (body.path as string) || '/';

    // Revalidate the specified path and all locale variants
    revalidatePath(path, 'layout');

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Revalidation failed' },
      { status: 500 },
    );
  }
}

// Also support GET for easy testing in browser
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path') || '/';
  const envSecret = process.env.REVALIDATION_SECRET;

  if (envSecret && secret !== envSecret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath(path, 'layout');

  return NextResponse.json({
    revalidated: true,
    path,
    timestamp: Date.now(),
  });
}
