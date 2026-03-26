import { NextResponse } from 'next/server';

import { prisma } from '../../../lib/prisma';

export async function GET() {
  const cafes = await prisma.cafe.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json(cafes);
}
