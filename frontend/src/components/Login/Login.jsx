import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../../hooks/useLogin'


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useLogin()
    const handleInput = async (e) => {
        e.preventDefault()
        await login(email, password)

    }

    return (
        <>
            <div className='flex h-[100vh] w-full justify-center items-center '>
                <form onSubmit={handleInput} className='rounded-md p-5 flex flex-col items-center gap-1 w-[20vw] h-fit bg-gray-50'>
                    <h2 className='text-3xl p-4'>Login</h2>
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

                    <button className='bg-sky-400 hover:bg-sky-500 text-white p-2 w-full rounded-md mt-10'>Login</button>
                    <p >
                        Not registered yet? |
                        <Link to='/signup' className='mt-7 hover:underline cursor-pointer'> Signup</Link>

                    </p>

                </form>
            </div>

        </>
    )
}

export default Login
