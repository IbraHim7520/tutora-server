import { prisma } from "../../lib/prisma";
import { auth } from "../../lib/auth";
import { UserRole } from "../../generated/prisma/enums";

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
        createdAt: new Date(),
        updatedAt: new Date(),
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

export const tutorService = {
  createTutor,
};
