import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_PATHS = ['/products.json', '/meta.json', '/'];

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }

    const parsed = new URL(url);

    // Only allow safe paths — no auth endpoints, admin, etc.
    const pathWithSearch = parsed.pathname + parsed.search;
    const isAllowed = ALLOWED_PATHS.some(p =>
      pathWithSearch === p || pathWithSearch.startsWith(p + '?')
    );
    if (!isAllowed) {
      return NextResponse.json({ error: 'Path not allowed' }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Giftwell-Demo/1.0',
        'Accept': parsed.pathname.endsWith('.json') ? 'application/json' : 'text/html',
      },
      redirect: 'follow',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Store returned ${res.status}` },
        { status: res.status }
      );
    }

    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('json')) {
      const data = await res.json();
      return NextResponse.json(data);
    }

    // HTML response (homepage fetch for logo/meta extraction)
    const html = await res.text();
    return NextResponse.json({ html });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Proxy error' },
      { status: 500 }
    );
  }
}
