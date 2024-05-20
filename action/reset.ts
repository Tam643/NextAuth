"use server";

import * as z from 'zod';

import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { generatePasswordResetToken, generateVerificationToken } from '@/lib/token';
import { sendPasswordResetEmail } from '@/lib/mail';

export const reset = async (values: z.infer<typeof ResetSchema>) => {

    const validateFields = ResetSchema.safeParse(values);

    if(!validateFields.success){
        return {error: "Invalid email!"};
    }
    
    const { email} = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email) return null;

    // TODO: generate token & send email
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    )

    return { success: "Reset email sent!"}
}