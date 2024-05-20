import { db } from "@/lib/db";


export const getPasswordResetTokenByEmail = async (
    email : string
) =>{
    try{
        const PasswordResetToken = await db.passwordResetToken.findFirst({
            where:{ email }
        });

        return PasswordResetToken;
    }catch{
        return null;
    }
}
export const getPasswordResetTokenByToken = async (
    token : string
) =>{
    try{
        const PasswordResetToken = await db.passwordResetToken.findUnique({
            where: { token }
        });

        return PasswordResetToken;
    }catch{
        return null;
    }
}