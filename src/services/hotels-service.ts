import { enrollmentNotFoundError, notFoundError } from '@/errors';
import { paymentRequiredError } from '@/errors/payment-required-error';
import { enrollmentRepository, ticketsRepository } from '@/repositories';
import { hotelsRepository } from '@/repositories/hotels-repository';
import { TicketStatus } from '@prisma/client';

async function getAllHotels(userId: number) {
    const enrollment = await enrollmentRepository.findEnrollmentId(userId);
    if (enrollment == null) throw enrollmentNotFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (ticket == null) throw notFoundError();

    const { status, TicketType } = ticket.Ticket;
    if (status !== TicketStatus.PAID) throw paymentRequiredError();
    if (!TicketType.includesHotel) throw paymentRequiredError();
    if (TicketType.isRemote) throw paymentRequiredError();

    return hotelsRepository.findAll();
}

async function getHotelById(hotelId: number, userId: number) {
    const enrollment = await enrollmentRepository.findEnrollmentId(userId);
    if (enrollment == null) throw enrollmentNotFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (ticket == null) throw notFoundError();

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
