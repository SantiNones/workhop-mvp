import { NextResponse } from 'next/server';

import { prisma } from '../../../../lib/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cafeId = Number(url.searchParams.get('cafeId'));
  const dateParam = url.searchParams.get('date');

  if (Number.isNaN(cafeId) || cafeId <= 0) {
    return NextResponse.json({ error: 'cafeId is required' }, { status: 400 });
  }

  const dateFilter =
    typeof dateParam === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)
      ? new Date(`${dateParam}T00:00:00.000Z`)
      : undefined;

  const reservations = await prisma.reservation.findMany({
    where: {
      cafeId,
      ...(dateFilter ? { date: dateFilter } : {}),
    },
    orderBy: [{ date: 'asc' }, { time: 'asc' }, { createdAt: 'asc' }],
  });

  return NextResponse.json(reservations);
}
