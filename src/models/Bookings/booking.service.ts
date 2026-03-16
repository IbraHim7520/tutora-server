import { BookingStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IBooking, IBookingStatus } from "../../Types/interface";


const createBooking = async (data: IBooking) => {
    //TODO: Check create booking user is trying to bookig  his own session or not
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
        where: { userId: userId ,
            status: BookingStatus.BOOKED || BookingStatus.COMPLETED
        },
        include: {
            tutorSession: {
                select:{
                    title:true,
                    date:true,
                    fromTime:true,
                    toTime:true,
                    id:true
                }
            },
            category: {
                select:{
                    id:true,
                    title:true
                }
            },
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
   data:IBookingStatus
) => {
    return await prisma.bookings.update({
        where: {id: bookingId},
        data:{
            status: data.status
        }
    })
};

const deleteBooking = async (bookingId: string) => {
    return await prisma.bookings.delete({
        where: { id: bookingId },
    });
};



const getBookingBySessionId = async(sessionId: string) =>{
    return await prisma.bookings.findMany({
        where:{
            tutorSession:{
                id: sessionId
            },
        },
        include:{
            user:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            },
            tutorSession:{
                select:{
                    title:true,
                    category:{
                        select:{
                            id:true,
                            title:true
                        }
                    }
                }
            },
        }
    })
}


export const bookingService = {
    createBooking,
    getAllBookings,
    getMyBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    getBookingBySessionId
};
