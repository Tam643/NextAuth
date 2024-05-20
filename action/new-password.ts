"use server";

import * as z from 'zod';
import bcrypt from 'bcryptjs';


import { NewPasswordSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { generatePasswordResetToken, generateVerificationToken } from '@/lib/token';
import { sendPasswordResetEmail } from '@/lib/mail';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { db } from '@/lib/db';

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token? : string | null
) => {

    if(!token) return { error: "Missing token"};


    const validateFields = NewPasswordSchema.safeParse(values);

    if (!validateFields.success) return { error: "Invalid Flied!" };

    const { password } = validateFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) return { error: "Invalid Token!" };

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired) return {error: "Token has expied!"};

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser) return { error: "Email does not exist!"};

    const passwordHashed = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data:{
            password: passwordHashed
        }
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    });

    return { success: "Password updated!" }
}