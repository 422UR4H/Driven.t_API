import { notFoundError, unauthorizedError } from '@/errors';
import { paymentRequiredError } from '@/errors/payment-required-error';
import { enrollmentRepository, ticketsRepository } from '@/repositories';
import { hotelsRepository } from '@/repositories/hotels-repository';
import { TicketStatus } from '@prisma/client';

async function getAllHotels(userId: number) {
    const enrollment = await enrollmentRepository.findEnrollmentId(userId);
    if (enrollment == null) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(userId);
    if (ticket?.Ticket == null) throw notFoundError();

    const { status, TicketType } = ticket.Ticket;
    if (status !== TicketStatus.PAID) throw paymentRequiredError();
    if (!TicketType.includesHotel) throw paymentRequiredError();
    if (TicketType.isRemote) throw paymentRequiredError();

    const hotels = await hotelsRepository.findAll();
    if (hotels.length < 1) throw notFoundError();
    return hotels;
}

async function getHotelById(hotelId: number, userId: number) {
    const enrollment = await enrollmentRepository.findEnrollmentId(userId);
    if (enrollment == null) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(userId);
    if (ticket?.Ticket == null) throw notFoundError();

    const { status, TicketType } = ticket.Ticket;
    if (status !== TicketStatus.PAID) throw paymentRequiredError();
    if (!TicketType.includesHotel) throw paymentRequiredError();
    if (TicketType.isRemote) throw paymentRequiredError();

    const hotel = await hotelsRepository.findHotelById(hotelId);
    if (hotel == null) throw notFoundError();
    return hotel;
}

export const hotelsService = {
    getAllHotels,
    getHotelById,
};
