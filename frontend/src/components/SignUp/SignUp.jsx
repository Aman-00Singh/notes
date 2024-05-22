import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../../../hooks/useSignup'

const SignUp = () => {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup } = useSignup()

    const handleInput = async (e) => {
        e.preventDefault()
        await signup({ fullname, email, password })
    }
    return (
        <div className='flex h-[100vh] w-full justify-center items-center '>
            {/* Signup form  */}
            <form onSubmit={handleInput} className='rounded-md p-5 flex flex-col items-center gap-1 w-[20vw] h-fit bg-gray-50'>
                <h2 className='text-3xl p-4'>Sign Up</h2>
                <input type="text" placeholder='Fullname'
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className='p-2 border-2 w-full rounded-md mt-3 outline-sky-200'
                />
                <input type="email" placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='p-2 border-2 w-full rounded-md mt-3 outline-sky-200'
                />
                <input type="password" placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='p-2 border-2 w-full rounded-md mt-3 outline-sky-200'
                />
                <button className='bg-green-400 hover:bg-green-500 text-white p-2 w-full rounded-md mt-10'>Sign Up</button>
                <p >
                    Already registered? |
                    <Link to='/login' className='mt-7 hover:underline cursor-pointer'> Login</Link>
                </p>
            </form>

        </div>
    )
}

export default SignUp
