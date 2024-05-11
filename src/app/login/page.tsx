"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"

function Login() {
    const Router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    function handleUser(e: any) {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    async function handleSubmit() {
        try {
            setLoading(true);
            const result = await axios.post("/api/users/login", user)
            console.log(result.data)
            toast.success('Login Success');
            Router.push("/profile")
        } catch (error: any) {
            console.log("login failed", error.response.data.error)
            toast.error(error.response.data.error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
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
                    <h1 className="h1 text-center">{loading? "processing" : "login"}</h1>
                    <div className="form-group py-2">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input value={user.email} onChange={handleUser} name='email' type="email" className="form-control" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input value={user.password} onChange={handleUser} name='password' type="password" className="form-control" placeholder="Password" />
                    </div>

                    <button disabled={buttonDisabled? true : false} onClick={handleSubmit} type="button" className=" btn btn-primary">Login</button>
                    <div className='text-secondary float-end' style={{ fontSize: "14px" }}>
                        <Link href="/signup">New user?</Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login