import { NextResponse } from 'next/server';

import { prisma } from '../../../../lib/prisma';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cafeId = Number(id);
  if (Number.isNaN(cafeId)) {
    return NextResponse.json({ error: 'Invalid cafe id' }, { status: 400 });
  }

  const cafe = await prisma.cafe.findUnique({ where: { id: cafeId } });
  if (!cafe) {
    return NextResponse.json({ error: 'Cafe not found' }, { status: 404 });
  }

  return NextResponse.json(cafe);
}
