import { CategoryStatus, UserStatus } from "../../generated/prisma/enums"

export interface IAdminCreateCategory {
    title:string,
    description:string
}

export interface IAdminUpdateCategoryStatus {
    status: CategoryStatus
}

export interface IAdminUpdateUserStatus {
    status: UserStatus
}