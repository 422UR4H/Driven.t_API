import { prisma } from '@/config';

async function findAll() {
  return prisma.hotel.findMany();
}

async function findHotelById(id: number) {
  return prisma.hotel.findUnique({
    where: { id },
    include: { Rooms: true }
  });
}

export const hotelsRepository = {
  findAll, findHotelById
};
