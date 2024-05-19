"use server";

import * as z from 'zod';

import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);
    if(!validateFields.success){
        return {error: "Invalid fields!"};
    }
    
    const { email, password} = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password){
        return { error: "Email does not exist!"};
    }

    if(!existingUser.emailVerified){
        const vertificationToken = await generateVerificationToken(existingUser.email);
        return { success: "Confrimation email send!"};
    }

    try{
        await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error){
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invaild credentais!!"};
                    break;
            
                default:
                    return { error: "Something is wrong!!"};
                    break;
            }
        }
        throw error;
    }
}