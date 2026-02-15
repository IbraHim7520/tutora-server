import { Router } from "express";
import { categoryController } from "./catgory.controller";

const catRouter = Router();


catRouter.post(
  "/category/create",
  categoryController.createCategory
);


catRouter.patch(
  "/category-update/:categoryId",
  categoryController.updateCategory
);


catRouter.delete(
  "/category-delete/:categoryId",
  categoryController.deleteCategory
);


catRouter.get(
  "/categories",
  categoryController.getAllCategories
);


catRouter.get(
  "/category/:categoryId",
  categoryController.getSingleCategory
);

export default catRouter;
