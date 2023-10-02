import { invalidDataError } from '@/errors';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services/hotels-service';
import { Request, Response } from 'express';

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const hotels = await hotelsService.getAllHotels(userId);
    return res.send(hotels);
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const hotelId = Number(req.params.hotelId);
    if (!hotelId || isNaN(hotelId)) throw invalidDataError("hotelId");

    const hotels = await hotelsService.getHotelById(hotelId, userId);
    return res.send(hotels);
}
