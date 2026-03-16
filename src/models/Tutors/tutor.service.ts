import { prisma } from "../../lib/prisma";
import { auth } from "../../lib/auth";
import { IUpdateTutorData } from "../../Types/interface";
import { ITutorProfile, ITutorSignUp } from "../../../interfaces/Tutor.interface";
import { UserRole } from "../../generated/prisma/enums";



const createTutor = async (tutorProfileData: ITutorProfile) => {
    
  try {
    const response = await prisma.tutor.create({
      data: tutorProfileData
    })
    return response
  } catch (error) {
    throw error
  }
};


const getALlTutors = async()=>{
  return await prisma.tutor.findMany({
    where:{
      isBanned: false
    },
    include: {
      user:{
         select: {
          name:true,
          email: true,
          image: true,
        }
      },
      tutorSessions: {
        select:{
          id: true,
          title:true,
          description:true,
          date:true,
          fromTime:true,
          toTime:true,
          sessionFee:true,
        }
      }
    }
  })
}



const deleteTutorProfile = async(tutorId: string)=>{
  const isTutorExists = await prisma.tutor.findUnique({
     where:{
      id: tutorId
     }
  })
  if(!isTutorExists) throw new Error('Tutor is not exists!!');

  const userId = isTutorExists.userId;

    const deleteResult = await prisma.$transaction(async(tx)=>{
      const res = await tx.tutor.update({
        where:{
          id: tutorId
        },
        data:{
          isBanned: true
        }
      })

      await tx.session.deleteMany({
        where:{
          userId: userId
        }
      })

      return res
    })

    return deleteResult;

    
  
}


const updateTutor = async(tutorId:string , tutorData: IUpdateTutorData)=>{
  const isTutorExists = await prisma.tutor.findUnique({
     where:{
      id: tutorId
     }
  })
  if(!isTutorExists) throw new Error('Tutor is not exists!!');

  const updateResponse = await prisma.tutor.update({
    where: {
      id: tutorId
    },data:{
      designation: tutorData.designation,
      degree: tutorData.degree,
      experience: tutorData.experience
    }
  })

  return updateResponse
}
const getTutorProfile = async(userId:string)=>{
  const tutorProfile = await prisma.tutor.findFirst({
    where: {
      user:{
        id: userId
      }
    }
  })

  return tutorProfile;
}

const getTutorProfileData = async (Tutoremail: string) =>{
  
  const tutorAsUser = await prisma.user.findUnique({
    where:{
      email: Tutoremail
    }
  })
  
  const userId = tutorAsUser?.id as string;
  const tutorData = await prisma.tutor.findUnique({
    where:{
      userId: userId,
    },
    include:{
      user: {
        select:{
          email:true,
          image:true,
          role:true,
          name:true,
          isBanned:true
        }
      },
      tutorSessions:{
        select:{
          _count: true,
          bookings:{
            select:{
              id:true,
            },
          },
          category:{
            select:{ id:true}
          },
          reviews:{
            select:{
              id:true,
            }
          }
        }
      }
    }
  })
  
  return tutorData;
}
export const tutorService = {
  createTutor,
  getALlTutors,
  deleteTutorProfile,
  updateTutor,
  getTutorProfile,
  getTutorProfileData
};
