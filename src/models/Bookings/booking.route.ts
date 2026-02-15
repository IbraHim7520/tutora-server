import { Router } from "express";
import { bookingController } from "./booking.controller";

const bookingRouter = Router();

bookingRouter.post("/booking/create", bookingController.createBooking);
bookingRouter.get("/all-bookings", bookingController.getAllBookings);
bookingRouter.get("/booking/my/:userId", bookingController.getMyBookings);
bookingRouter.get("/booking/:bookingId", bookingController.getBookingById);
bookingRouter.patch("/booking-update/:bookingId", bookingController.updateBooking);
bookingRouter.delete("/booking-delete/:bookingId", bookingController.deleteBooking);

export default bookingRouter;
