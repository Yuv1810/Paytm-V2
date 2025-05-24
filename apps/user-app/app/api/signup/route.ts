import { NextRequest, NextResponse } from "next/server";
import { prisma, Prisma } from "@repo/db";
import bcrypt from "bcryptjs";


export async function POST(req:NextRequest){

    const { email, name, age, number, password } = await req.json();
    // console.log(email);
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!email || !number || !password) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }


  try{
    const user=await prisma.user.create({
        data: {
            email,
            name,
            age,
            number,
            password: hashedPassword,// IMPORTANT: hash password in real app!
          },
    });

    console.log(user);

    

    return NextResponse.json({ message: 'User created', user }, { status: 201 });


  }catch(e:any){
    return new Response(JSON.stringify({  error: `User already exists ${e.message}` }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
  }
    

}