"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';


function Signup() {

    const Router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })

    function handleUser(e: any) {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }


    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        try {
            setLoading(true);
            const result = await axios.post("/api/users/signup", user)
            console.log(result.data)
            toast.success('Login Success');
            Router.push("/login")
        } catch (error: any) {
            console.log("signup failed", error.message)
            toast.error(error.response.data.error)

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <>                    
        <Toaster />

            <div className='w-100 vw-100 vh-100 d-flex justify-content-center align-items-center'>
                <div >
                    <h1 className="h1 text-center">{loading ? "Processing" : "Signup"}</h1>
                    <div className="form-group py-2">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input value={user.username} onChange={handleUser} type="email" name='username' className="form-control" placeholder='Enter Username' />
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input value={user.email} onChange={handleUser} name='email' type="email" className="form-control" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input value={user.password} onChange={handleUser} name='password' type="password" className="form-control" placeholder="Password" />
                    </div>

                    <button onClick={handleSubmit} type="button" className=" btn btn-primary" disabled={buttonDisabled ? true : false}>Register</button>


                    <div className='text-secondary float-end' style={{ fontSize: "14px" }}>
                        <Link href="/login">Already a user?</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup