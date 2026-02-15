import { prisma } from "../../lib/prisma";
import { IBooking } from "../../Types/interface";


const createBooking = async (data: IBooking) => {
    return await prisma.bookings.create({
        data: {
            userId: data.userId,
            categoryId: data.categoryId,
            tutorSessionId: data.tutorSessionId,
        }
    });
};


const getAllBookings = async () => {
    return await prisma.bookings.findMany({
        include: {
            user: true,
            tutorSession: true,
            category: true,
        },
        orderBy: { bookedAt: "desc" },
    });
};


const getMyBookings = async (userId: string) => {
    return await prisma.bookings.findMany({
        where: { userId: userId },
        include: {
            tutorSession: true,
            category: true,
        },
        orderBy: { bookedAt: "desc" },
    });
};


const getBookingById = async (bookingId: string) => {
    const booking = await prisma.bookings.findUnique({
        where: { id: bookingId },
        include: {
            user: true,
            tutorSession: true,
            category: true,
        },
    });

    if (!booking) throw new Error("Booking not found");

    return booking;
};


const updateBooking = async (
    bookingId: string,
    updateData: IBooking
) => {
    return await prisma.bookings.update({
        where: { id: bookingId },
        data: {
            userId: updateData.userId,
            tutorSessionId: updateData.tutorSessionId,
            status: updateData.status,
            categoryId: updateData.categoryId
        },
    });
};

const deleteBooking = async (bookingId: string) => {
    return await prisma.bookings.delete({
        where: { id: bookingId },
    });
};


export const bookingService = {
    createBooking,
    getAllBookings,
    getMyBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
};
