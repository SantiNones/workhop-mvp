import { PrismaClient } from '@prisma/client';

import { cafes } from '../src/data/cafes';

const prisma = new PrismaClient();

async function main() {
  for (const cafe of cafes) {
    await prisma.cafe.upsert({
      where: { id: cafe.id },
      update: {
        name: cafe.name,
        description: cafe.description,
        minConsumptionPerHour: cafe.minConsumption,
        stationCapacity: cafe.availableSlots,
        imageUrl: cafe.image,
        address: cafe.address,
        amenities: cafe.amenities,
      },
      create: {
        id: cafe.id,
        name: cafe.name,
        description: cafe.description,
        minConsumptionPerHour: cafe.minConsumption,
        stationCapacity: cafe.availableSlots,
        imageUrl: cafe.image,
        address: cafe.address,
        amenities: cafe.amenities,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
