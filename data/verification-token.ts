import { db } from "@/lib/db";


export const getVertificationTokenByEmail = async (
    email : string
) =>{
    try{
        const vertificationToken = await db.verificationToken.findFirst({
            where:{ email }
        });

        return vertificationToken;
    }catch{
        return null;
    }
}
export const getVertificationTokenByToken = async (
    token : string
) =>{
    try{
        const vertificationToken = await db.verificationToken.findUnique({
            where: { token }
        });

        return vertificationToken;
    }catch{
        return null;
    }
}