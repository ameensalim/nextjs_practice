import { connect } from "@/db/dbConfig"
import User from "@/models/usermodel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        
        // check if user already exists
        const user = await User.findOne({ email })
        console.log(user)
        if (!user) {
            return NextResponse.json({ error: "user does not exists" }, { status: 400 })
        }
        //hash password
        const isValidPassword = await bcryptjs.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ error: "invalid password" }, { status: 400 })
        }
        console.log("validation done")
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.JSON_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json(
            {
                message: "Login succesfull",
                success: true

            })
        response.cookies.set("token", token, {
            httpOnly:true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.messeage })
    }
}

export async function GET(request: NextRequest) {
    try {
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ status: 400 })
    }
}
