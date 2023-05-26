"use client"

import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
// import { getProviderIcon } from 'next-auth/providers'
import Image from "next/image"


const Login = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const router = useRouter()

    const providerImages = ["https://github.com/sumitsharma372/search_app/assets/96824839/800b929d-33b1-4c09-8808-51c23c0e4c04", "https://github.com/sumitsharma372/search_app/assets/96824839/49719de3-1443-4d71-83ec-a34bfefecbee"]

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
            {providers && Object.values(providers).map((provider,index) => {
                console.log(provider, index);
                return (
                <button
                    type="button"
                    key = {provider.name}
                    onClick={() => signIn(provider.id)}
                    className=" text-gray-100 font-bold text-xl bg-zinc-900 py-4 px-2 rounded-md flex justify-center gap-3"
                >
                    <p>{provider.name}</p>
                    <Image
                        src={providerImages[index]}
                        width={35}
                        height={35}
                        alt="logo"
                        className=" object-contain"
                    />
                </button>
                )
            })}
        </div>
    )
}

export default Login