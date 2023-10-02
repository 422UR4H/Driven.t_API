import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import {
    createEnrollmentWithAddress,
    createTicket,
    createTicketType,
    createUser
} from '../factories';
import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';


const server = supertest(app);

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await cleanDb();
});

describe('GET /hotels', () => {
    it('should respond with status 401 if no token is given', async () => {
        const { status } = await server.get('/hotels');
        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();
        const { status } = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const user = await createUser();
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        const { status } = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('should respond with status 404 when there is no enrollment for given user', async () => {
            const token = await generateValidToken();
            const { status } = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
            expect(status).toBe(httpStatus.NOT_FOUND);
        });

        it('should respond with status 404 when there is no ticket for given user', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            await createEnrollmentWithAddress(user);

            const { status } = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
            expect(status).toBe(httpStatus.NOT_FOUND);
        });

        it.skip('should respond with status 404 when there is no hotel includes for given ticket', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await prisma.ticketType.create({
                data: {
                    name: faker.name.findName(),
                    price: faker.datatype.number(),
                    isRemote: faker.datatype.boolean(),
                    includesHotel: false,
                },
            });
            await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

            const { status } = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
            expect(status).toBe(httpStatus.NOT_FOUND);
        });

        describe('when enrollment, ticket and hotel exists', () => {
            it('should respond with status 402 when there is no PAID ticket for given user', async () => {
                const user = await createUser();
                const token = await generateValidToken(user);
                const enrollment = await createEnrollmentWithAddress(user);
                const ticketType = await prisma.ticketType.create({
                    data: {
                        name: faker.name.findName(),
                        price: faker.datatype.number(),
                        isRemote: false,
                        includesHotel: true,
                    },
                });
                await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

                const { status } = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
                expect(status).toBe(httpStatus.PAYMENT_REQUIRED);
            });

            it('should respond with status 402 when event given is remote', async () => {
                const user = await createUser();
                const token = await generateValidToken(user);
                const enrollment = await createEnrollmentWithAddress(user);
                const ticketType = await prisma.ticketType.create({
                    data: {
                        name: faker.name.findName(),
                        price: faker.datatype.number(),
                        isRemote: true,
                        includesHotel: true,
                    },
                });
                await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

                const { status } = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
                expect(status).toBe(httpStatus.PAYMENT_REQUIRED);
            });

            it('should respond with status 402 when there is no PAID ticket for given user', async () => {
                const user = await createUser();
                const token = await generateValidToken(user);
                const enrollment = await createEnrollmentWithAddress(user);
                const ticketType = await prisma.ticketType.create({
                    data: {
                        name: faker.name.findName(),
                        price: faker.datatype.number(),
                        isRemote: false,
                        includesHotel: false,
                    },
                });
                await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

                const { status } = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
                expect(status).toBe(httpStatus.PAYMENT_REQUIRED);
            });

            it('should respond with status 200 and hotels list', async () => {
                const user = await createUser();
                const token = await generateValidToken(user);
                const enrollment = await createEnrollmentWithAddress(user);
                const ticketType = await prisma.ticketType.create({
                    data: {
                        name: faker.name.findName(),
                        price: faker.datatype.number(),
                        isRemote: false,
                        includesHotel: true,
                    },
                });
                await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

                const { status, body } = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
                expect(status).toBe(httpStatus.OK);
                expect(body).toEqual(
                    expect.arrayContaining(
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            image: expect.any(String),
                            createdAt: expect.any(Date),
                            updatedAt: expect.any(Date),
                        })
                    )
                );
            });
        });
    });
});
