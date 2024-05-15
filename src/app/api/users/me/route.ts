import {getDataFromToken }from "@/helpers/getDataFromToken";
import user from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/db/dbConfig"
connect();
export async function GET(request: NextRequest) {
    try {
        const tokenId = getDataFromToken(request);
        const foundUser = await user.findOne({ _id: tokenId }).select("-password");
        return NextResponse.json({
            message: "user found",
            foundUser: foundUser
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,

        }, { status: 500 })
    }

}