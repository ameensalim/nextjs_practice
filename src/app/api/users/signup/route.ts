import {connect} from "@/db/dbConfig"
import User from "@/models/usermodel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        // check if user already exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "user exists"}, {status:400})
        }
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash
        (password, salt)

        const newUser = await new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()

        return NextResponse.json({message:"Created a user", savedUser, success:true}, {status:200})
        
    } catch (error:any) {
        return NextResponse.json({error: error.messeage})
    } 
}

export async function GET(request:NextRequest){
    try {
        return NextResponse.json({success:true})
    } catch (error) {
        return NextResponse.json({status:400})
    }
}
