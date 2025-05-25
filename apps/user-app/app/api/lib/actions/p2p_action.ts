"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { revalidatePath } from "next/cache";
import { prisma, User } from "@repo/db";

export async function P2Ptransfer(number:string,amount:number) {
    const session :any= await getServerSession(authOptions);
        if(!session){
            revalidatePath("/");
        }
    const fromUserId=session?.user?.id;
    
    const toUser:any= await prisma.user.findUnique({
        where:{
            number
        }
    });
    if(!toUser){
        return "Invalid Phone Number";
    }

    await prisma.$transaction(async (tx) => {
        await tx.$executeRawUnsafe(`
          SELECT * FROM "Balance" WHERE "userId" = ${fromUserId} FOR UPDATE
        `);
      
        await tx.p2pTransfer.create({
          data: {
            fromUserId:Number(fromUserId),
            toUserId: Number(toUser.id),
            amount:Number(amount),
            timestamp: new Date(),
          },
        });
      
        await tx.balance.update({
          where: { userId: toUser.id },
          data: { amount: { increment: Number(amount) } },
        });
      
        await tx.balance.update({
          where: { userId: fromUserId },
          data: { amount: { decrement: Number(amount) } },
        });
      });
}



export async function getP2P() {
    const session :any= await getServerSession(authOptions);
    if(!session){
        revalidatePath("/");
    }
    const fromUserId=session?.user?.id;

   try {
     const send= await prisma.p2pTransfer.findMany({
         orderBy: [
             {
               timestamp: 'desc',
             },
            
           ],
         where:{
             fromUserId
         },
         skip:0,
         take:2
     });
 
     const received= await prisma.p2pTransfer.findMany({
         orderBy: [
             {
               timestamp: 'desc',
             },
            
           ],
         where:{
             toUserId:fromUserId
         },
         skip:0,
         take:2
     });
 
 
     return send.concat(received);
 
   } catch (error) {

    console.log(`Getting the P2P error: `,error);
    throw error;
    
   }

   return [];


}