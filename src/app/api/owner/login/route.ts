import { NextResponse } from 'next/server';

const OWNER_COOKIE_NAME = 'owner_auth';

export async function POST(req: Request) {
  const expectedPasscode = process.env.OWNER_PASSCODE;

  if (!expectedPasscode || expectedPasscode.trim().length === 0) {
    return NextResponse.json(
      { error: 'Server is not configured (missing OWNER_PASSCODE)' },
      { status: 500 }
    );
  }

  let body: { passcode?: string };

  try {
    body = (await req.json()) as { passcode?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (typeof body.passcode !== 'string' || body.passcode !== expectedPasscode) {
    return NextResponse.json({ error: 'Invalid passcode' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: OWNER_COOKIE_NAME,
    value: '1',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  });

  return res;
}
