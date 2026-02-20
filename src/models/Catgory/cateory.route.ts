import { Router } from "express";
import { categoryController } from "./catgory.controller";
import { verifyRequest } from "../../middlewere/verifyRequest";
import { UserRole } from "../../generated/prisma/enums";

const catRouter = Router();


catRouter.post(
  "/category/create",
  verifyRequest(UserRole.ADMIN),
  categoryController.createCategory
);


catRouter.patch(
  "/category-update/:categoryId",
    verifyRequest(UserRole.ADMIN),
  categoryController.updateCategory
);


catRouter.delete(
  "/category-delete/:categoryId",
    verifyRequest(UserRole.ADMIN),
  categoryController.deleteCategory
);


catRouter.get(
  "/all-categories",
  categoryController.getAllCategories
);


catRouter.get(
  "/category/:categoryId",
  categoryController.getSingleCategory
);

export default catRouter;
