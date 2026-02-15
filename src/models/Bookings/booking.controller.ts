import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { date } from "better-auth";


// ✅ Create Booking
const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
        success : false,
        message: "Internal Server error!!",
        data:null,
        error
    })
  }
};


const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getAllBookings();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
        success : false,
        message: "Internal Server error!!",
        data:null,
        error
    })
  }
};

// ✅ Get All My Bookings (user-specific)
const getMyBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; // or from auth middleware: req.user.id
    const result = await bookingService.getMyBookings(userId as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
        success : false,
        message: "Internal Server error!!",
        data:null,
        error
    })
  }
};

// ✅ Get One Booking
const getBookingById = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    const result = await bookingService.getBookingById(bookingId as string);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
        success : false,
        message: "Internal Server error!!",
        data:null,
        error
    })
  }
};

// ✅ Update Booking
const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    const result = await bookingService.updateBooking(bookingId as string, req.body);

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
        success : false,
        message: "Internal Server error!!",
        data:null,
        error
    })
  }
};


const deleteBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    const result = await bookingService.deleteBooking(bookingId as string);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
        success : false,
        message: "Internal Server error!!",
        data:null,
        error
    })
  }
};

// ✅ Export all functions as object
export const bookingController = {
  createBooking,
  getAllBookings,
  getMyBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
