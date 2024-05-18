"use server";

import * as z from 'zod';
import bcrypt from 'bcryptjs';


import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors}
    
    const {email, password, name} = validatedFields.data;
    const passwordHashed = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    
    if(existingUser) return  { error: "Email already exist!"};
    
    await db.user.create({
        data: {
            name,
            email,
            password: passwordHashed
        }
    })

    //  TODO: send verification token email
    
    return {
        success: "User created successfuly!"
    }
}