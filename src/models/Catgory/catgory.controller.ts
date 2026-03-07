import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./category.service";

// ✅ Create
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await CategoryService.createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;

    const result = await CategoryService.updateCategory(
      categoryId as string,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;

    const result = await CategoryService.deleteCategory(categoryId as string);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await CategoryService.getAllCategories();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const getSingleCategory = async (
  req: Request,
  res: Response,
) => {
  try {
    const { categoryId } = req.params;

    const result = await CategoryService.getSingleCategory(categoryId as string) ;

    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    
  }
};

const getCategoriesForGeneral = async(req:Request , res:Response)=>{
  try {
    const categories = await CategoryService.getCategoriesForGeneral()
    res.status(200).send({
      success: true,
      data: categories
    })
  } catch (error) {
    res.status(404).send({
      success: false,
      data: null,
      error
    })
  }
}


const UpdateCategoryStatus = async(req:Request , res:Response)=>{
  try {
    const {id} = req.params;
    const result = await CategoryService.UpdateCategoryStatus(id as string)
    res.status(200).send({
      success: true,
      data: result
    })
  }
    catch (error) {
    res.status(404).send({
      success: false,
      data: null,
      error
    })
  }
}


export const categoryController = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  getCategoriesForGeneral,
  UpdateCategoryStatus
}
