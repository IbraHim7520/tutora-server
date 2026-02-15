
import { prisma } from "../../lib/prisma";
import { ICreateCategory } from "../../Types/interface";

// ✅ Create
const createCategory = async (data:ICreateCategory) => {
  return await prisma.category.create({
    data: {
        title: data.title,
        description: data.description
    }
  });
};


const updateCategory = async (
  categoryId: string,
  updatedData: ICreateCategory
) => {
  return await prisma.category.update({
    where: { id: categoryId },
    data: {
        title: updatedData.title,
        description: updatedData.description
    },
  });
};


const deleteCategory = async (categoryId: string) => {
  return await prisma.category.delete({
    where: { id: categoryId },
  });
};


const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
};


const getSingleCategory = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};


export const CategoryService = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
};
