import { Router } from "express";
import { bookingController } from "./booking.controller";
import { verifyRequest } from "../../middlewere/verifyRequest";
import { UserRole } from "../../generated/prisma/enums";

const bookingRouter = Router();

bookingRouter.post("/booking/create", verifyRequest(UserRole.STUDENT , UserRole.ADMIN , UserRole.TEACHER) ,bookingController.createBooking);
bookingRouter.get("/all-bookings", verifyRequest(UserRole.ADMIN) ,bookingController.getAllBookings);
bookingRouter.get("/booking/my/:userId",verifyRequest(UserRole.STUDENT , UserRole.ADMIN , UserRole.TEACHER) , bookingController.getMyBookings);
bookingRouter.get("/booking/:bookingId", verifyRequest(UserRole.STUDENT , UserRole.ADMIN , UserRole.TEACHER) ,bookingController.getBookingById);
bookingRouter.patch("/booking-update/:bookingId",verifyRequest(UserRole.STUDENT , UserRole.ADMIN , UserRole.TEACHER) ,bookingController.updateBooking);
bookingRouter.delete("/booking-delete/:bookingId",verifyRequest(UserRole.STUDENT , UserRole.ADMIN , UserRole.TEACHER) ,bookingController.deleteBooking);

export default bookingRouter;
