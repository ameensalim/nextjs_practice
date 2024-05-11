import mongoose from "mongoose";
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("mongodb Connected")
        })

        connection.on("error", ()=>{
            console.log("mongodb connection error")
            process.exit()
        })
    } catch (error) {
        console.log("error in db conn")
    }
}