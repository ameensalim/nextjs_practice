import {NextResponse } from "next/server";


export async function POST() {
    try {
        const response = NextResponse.json(
            {
                success: true,
                message: "logout succesfull"
            }
        )
        response.cookies.set("token", "", {
            httpOnly:true, expires: new Date(0)
        })
        return response;
    } catch (error: any) {
        NextResponse.json({ error: error.message }, { status: 500 })
    }
}