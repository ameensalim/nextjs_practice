"use client";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
// import {mailer} from "@/helpers/mailer"

function ProfilePage() {
  const router = useRouter()


  const getUser = async ()=>{
    try {
      const gotUser = await axios.get("/api/users/me");
      toast.success("success!")
      router.push("/profile/"+gotUser.data.foundUser.username)
    } catch (error:any) {
      toast.error(error.response.data.error)
    }
  }

  const logout = async ()=>{
    try {
      await axios.post("/api/users/logout");
      router.push("/login"); 
    } catch (error:any) {
      toast.error(error.response.data.message);
    }
    
  }

  const sendEmail = async()=>{
    // const emailSent = await mailer()
    // console.log(emailSent)
    toast.success("succesfully sent")
  }
  return (
    <div>Profile Page
      <Toaster/>
      <button onClick={logout} className="btn btn-primary">Logout</button>
      <button onClick={getUser} className="btn btn-warning">Get User</button>
      <button onClick={sendEmail} className="btn btn-success"> Mailer </button>
    </div>

  )
}

export default ProfilePage