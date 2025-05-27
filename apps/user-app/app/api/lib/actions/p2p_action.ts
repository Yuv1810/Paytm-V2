"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { revalidatePath } from "next/cache";
import { prisma} from "@repo/db";

export async function P2Ptransfer(number:string,amount:number) {
    const session :any= await getServerSession(authOptions);
        if(!session){
            revalidatePath("/");
            return [];
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

    await prisma.$transaction(async (tx:any) => {
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
      
        const sender = await tx.balance.findUnique({
          where: { userId: fromUserId },
          select: { amount: true },
        });
      
        if (!sender || sender.amount < Number(amount)) {
          throw new Error("Insufficient balance");
        }
      
        // Deduct from sender
        await tx.balance.update({
          where: { userId: fromUserId },
          data: { amount: { decrement: Number(amount) } },
        });
      
        // Add to receiver
        await tx.balance.update({
          where: { userId: toUser.id },
          data: { amount: { increment: Number(amount) } },
        });
      });
}



export async function getP2P_Sent() {
    const session :any= await getServerSession(authOptions);
    if(!session){
        revalidatePath("/");
        return [];
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
         include: {
          toUser: true, 
        },
         skip:0,
         take:2
     });
 
     console.log ("Sent Money",send);

    
 
     return send;
 
   } catch (error) {

    console.log(`Getting the P2P error: `,error);
    throw error;
    
   }

   return [];


}





export async function getP2P_Received() {
  const session :any= await getServerSession(authOptions);
  if(!session){
      revalidatePath("/");
      return [];
  }
  const fromUserId=session?.user?.id;

 try {
   
   

   const received= await prisma.p2pTransfer.findMany({
       orderBy: [
           {
             timestamp: 'desc',
           },
          
         ],
       where:{
           toUserId:fromUserId
       },
       include: {
        fromUser: true, 
      },
       
       skip:0,
       take:2
   });


   return received;

 } catch (error) {

  console.log(`Getting the P2P error: `,error);
  throw error;
  
 }

 return [];


}

























export async function getP2P_SentAll() {
  const session :any= await getServerSession(authOptions);
  if(!session){
      revalidatePath("/");
      return [];
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
       include: {
        toUser: true, 
      }
   });

   console.log ("Sent Money",send);

  

   return send;

 } catch (error) {

  console.log(`Getting the P2P error: `,error);
  throw error;
  
 }

 return [];


}





export async function getP2P_ReceivedAll() {
const session :any= await getServerSession(authOptions);
if(!session){
    revalidatePath("/");
    return [];
}
const fromUserId=session?.user?.id;

try {
 
 

 const received= await prisma.p2pTransfer.findMany({
     orderBy: [
         {
           timestamp: 'desc',
         },
        
       ],
     where:{
         toUserId:fromUserId
     },
     include: {
      fromUser: true, 
    }
 });


 return received;

} catch (error) {

console.log(`Getting the P2P error: `,error);
throw error;

}

return [];


}