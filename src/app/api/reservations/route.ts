import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { prisma } from '../../../lib/prisma';
import { authOptions } from '../../../lib/auth';

type CreateReservationBody = {
  cafeId: number;
  date: string;
  time: string;
  seats: number;
  customerName: string;
};

const MAX_SEATS_PER_RESERVATION = 2;

function parseDateOnly(date: string) {
  return new Date(`${date}T00:00:00.000Z`);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  let body: CreateReservationBody;

  try {
    body = (await req.json()) as CreateReservationBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const cafeId = Number(body.cafeId);
  const seats = Number(body.seats);

  if (Number.isNaN(cafeId) || cafeId <= 0) {
    return NextResponse.json({ error: 'Invalid cafeId' }, { status: 400 });
  }

  if (typeof body.customerName !== 'string' || body.customerName.trim().length === 0) {
    return NextResponse.json({ error: 'customerName is required' }, { status: 400 });
  }

  if (typeof body.time !== 'string' || body.time.trim().length === 0) {
    return NextResponse.json({ error: 'time is required' }, { status: 400 });
  }

  if (typeof body.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
    return NextResponse.json(
      { error: 'date must be YYYY-MM-DD' },
      { status: 400 }
    );
  }

  if (Number.isNaN(seats) || seats <= 0) {
    return NextResponse.json({ error: 'seats must be > 0' }, { status: 400 });
  }

  if (seats > MAX_SEATS_PER_RESERVATION) {
    return NextResponse.json(
      { error: `seats must be <= ${MAX_SEATS_PER_RESERVATION}` },
      { status: 400 }
    );
  }

  const cafe = await prisma.cafe.findUnique({ where: { id: cafeId } });
  if (!cafe) {
    return NextResponse.json({ error: 'Cafe not found' }, { status: 404 });
  }

  const date = parseDateOnly(body.date);

  const seatsBooked = await prisma.reservation.aggregate({
    where: {
      cafeId,
      date,
      time: body.time,
      status: 'CONFIRMED',
    },
    _sum: { seats: true },
  });

  const alreadyBooked = seatsBooked._sum.seats ?? 0;
  if (alreadyBooked + seats > cafe.stationCapacity) {
    return NextResponse.json(
      {
        error: 'Not enough capacity',
        capacity: cafe.stationCapacity,
        alreadyBooked,
      },
      { status: 409 }
    );
  }

  const reservation = await prisma.reservation.create({
    data: {
      cafeId,
      userId,
      date,
      time: body.time,
      seats,
      customerName: body.customerName.trim(),
    },
  });

  return NextResponse.json(reservation, { status: 201 });
}
