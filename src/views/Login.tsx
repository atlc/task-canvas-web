import { useMutation } from '@tanstack/react-query';
import { useState } from 'react'
import { POST } from '../services/api/fetcher';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const mutation = useMutation({
        mutationKey: ['login', 'register'],
        mutationFn: (data: { name: string, email: string, isLogin: boolean }) => POST(`/auth/${data.isLogin ? "login" : "register"}`, { ...data })
    })

    return <div className="bg-slate-100 rounded-lg md:mt-20 p-5 shadow-lg">
        <h1 className="p-4 text-3xl text-slate-600 text-center">{isLogin ? "Logging in" : "Registering"}. Need to <span onClick={() => setIsLogin(!isLogin)} className='text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-slate-700 dark:border-slate-700'>{isLogin ? "register?" : "log in?"}</span></h1>
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-slate-700">Your Email</label>
        <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-slate-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
            </div>
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" id="input-group-1" className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5     focus:ring-blue-500 focus:border-blue-500" placeholder="you@taskcanvas.com" />
        </div>
        {!isLogin && <>
            <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-slate-700">Your Name</label>
            <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-slate-200 bg-slate-200 border rounded-e-0 border-slate-300 border-e-0 rounded-s-md">
                    <svg className="w-4 h-4 text-slate-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                </span>
                <input value={name} onChange={e => setName(e.target.value)} type="text" id="website-admin" className="rounded-none rounded-e-lg bg-slate-50 border text-slate-700 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-slate-300 p-2.5 focus:ring-blue-500 focus:border-blue-500" placeholder="Ada Lovelace" />
            </div>
        </>}

        <div className="mt-3">
            {mutation.isSuccess && <p className='text-center text-green-900 text-bold bg-green-300 p-2 rounded-lg'>{mutation.data.message}</p>}
            {mutation.isError && <p className='text-center text-red-900 text-bold bg-red-300 p-2 rounded-lg'>{mutation.error.message}</p>}
        </div>

        {mutation.isPending ? <div className='mt-2 text-center' role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div> : <>
            <h1 className="p-4 text-xl text-slate-600 text-center">
                <button onClick={() => mutation.mutate({ name, email, isLogin })} className='text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-slate-700 dark:border-slate-700'>{isLogin ? "Log in" : "Finish registration"}</button>
            </h1>
        </>}
    </div>
}

export default Login;