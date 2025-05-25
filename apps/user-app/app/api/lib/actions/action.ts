"use server"

import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache";
import { authOptions } from "../auth";
import { prisma } from "@repo/db";

function generateToken(length = 20) {
    return [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
  }

export async function AddMoney(provider:string,amount:Number) {

    const session:any= await getServerSession(authOptions);
    if(!session){
        revalidatePath("/");
    }
    const userId=session?.user.id;
    const token = generateToken();

        try {
            
                const res= await prisma.onRampTransaction.create({
                    data:{
                        status:"PENDING",
                        token: token,
                        provider,
                        amount:parseInt(amount as any),
                        startTime: new Date(),
                        userId
                    }
                });
                return res;
        } catch (error) {
            console.log(`Some error occured in adding on Ramp ${error}`)
            throw error;   
        }
}




export async function getTrx() {

    const session:any= await getServerSession(authOptions);

    if(!session){
        revalidatePath("/");
    }
    const userId=session?.user.id;

    try{
        const res=await prisma.onRampTransaction.findMany({
            orderBy: [
                {
                  startTime: 'desc',
                },
               
              ],
            where:{
                userId
            },
            skip: 0,
            take: 3,
        });

        console.log("Data",res);
        return res;

    }catch(error){
        console.log(`Some error occured in getting onRampTxn ${error}`)
            throw error;   

    }
}




export async function getBalances() {
    const session:any= await getServerSession(authOptions);

    if(!session){
        revalidatePath("/");
    }
    const userId:any=session?.user.id;

    try{
        const res= await prisma.balance.findUnique({
            where:{
                userId
            }
        });
        console.log(res);
        return res;

    }catch(error){
        console.log(`Some error occured in getting onRampTxn ${error}`)
        throw error;   
    }


}