"use client"

import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"

const Login = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const router = useRouter()

    if (session?.user){
        router.push('/')
    }

    useEffect(() => {
    const getProvidersData = async () => {
        const response = await getProviders();
            setProviders(response)
        }
    getProvidersData();
    }, [])

    return (
        <div className=" flex flex-col gap-2  bg-zinc-700 p-2 rounded-sm max-w-md mx-auto my-10">
            <h2 className="text-center font-code font-bold">Login With</h2>
            {providers && Object.values(providers).map(provider => {
                console.log(provider);
                return (
                <button
                    type="button"
                    key = {provider.name}
                    onClick={() => signIn(provider.id)}
                    className=" text-gray-100 font-bold text-xl bg-zinc-900 py-4 px-2 rounded-md"
                >
                    {provider.name}
                </button>
                )
            })}
        </div>
    )
}

export default Login