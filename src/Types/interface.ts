import { BookingStatus, UserRole } from "../generated/prisma/enums"

export interface ICreateCategory {
    title:string,
    description:string
}

export interface IUpdateTutorData {
    designation : string,
    degree:string,
    experience:string,
}

export interface IUpdateUserAdmin {
    role?: UserRole,
    email?:string,
    image?: string,
    isBanner?: boolean
}

export interface IUpdateUserUser {
    email?:string,
    image?: string,
}



export interface ITeachingSessionData {
    title: string
    description:string
    date: Date 
    fromTime: Date 
    toTime:Date 
    sessionFee: number
    categoryId: string
    tutorId: string
}

export interface ITeachingSessionDataUpdate {
    title?: string
    description?:string
    date?: Date 
    fromTime?: Date 
    toTime?:Date 
    sessionFee?: number
    categoryId?: string
    tutorId?: string
}


export interface IBooking {
  userId: string
  tutorSessionId: string
  categoryId: string,
  status?: BookingStatus
}

export enum UserRoles {
    ADMIN,
    STUDENT,
    TEACHER
}