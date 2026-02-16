import { prisma } from "../../lib/prisma";
import { auth } from "../../lib/auth";
import { UserRole } from "../../generated/prisma/enums";
import { IUpdateTutorData } from "../../Types/interface";

interface ITutor {
  userId?: string;
  name: string;
  email: string;
  designation: string;
  password: string;
  degree: string;
  experience?: number;
}

const createTutor = async (payload: ITutor) => {
  const { name, email, password, degree, experience, designation } = payload;

  try {
    const userAsTutor = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        role: UserRole.TEACHER as string, 
        isBanned: false,
      },
    });

    if (!userAsTutor) throw new Error("Failed to register tutor!");

    payload.userId = userAsTutor.user.id;

    const tutorProfile = await prisma.tutor.create({
      data: {
        userId: payload.userId!,
        designation,
        degree,
        experience: experience ?? 0,  // default to 0 if undefined
        createdAt: new Date()
      },
    });

    return { user: userAsTutor.user, profile: tutorProfile };
  } catch (error) {
    console.error("Error creating tutor:", error);
    if (payload.userId) {
      try {
        await prisma.user.delete({
            where: {
                email: email
            }
        });
      } catch {}
    }

    throw error;
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
          role: true,
          image: true,
          isBanned: true
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
      experience: Number(tutorData.experience)
    }
  })

  return updateResponse
}

export const tutorService = {
  createTutor,
  getALlTutors,
  deleteTutorProfile,
  updateTutor
};
