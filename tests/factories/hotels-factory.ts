import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createHotelsWithRooms(userId: number) {
    return prisma.hotel.create({
        data: {
            name: faker.name.findName(),
            image: faker.image.avatar(),
            Rooms: {
                create: {
                    name: faker.address.cityName(),
                    capacity: faker.datatype.number({ min: 1, max: 8 }),
                    Booking: {
                        create: { userId }
                        // connect: { id: userId }
                    }
                }
            }
        }
    });
}
