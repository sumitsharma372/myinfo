"use client"

import Link from "next/link"
import Image from "next/image"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useState,useEffect } from "react"

const Navbar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const getProvidersData = async () => {
      const response = await getProviders();
      setProviders(response)
    }
    getProvidersData();
  }, [])
  return (
    
<nav className="bg-transparent w-full">
  <div className="w-[90%] flex flex-wrap items-center justify-between mx-auto p-4 md:px-8 border-b-2 border-gray-500">
  <Link href='/' className="flex items-center gap-2">
    <Image
      src='/assets/logo.svg'
      width={42}
      height={42}
      alt='Logo'
      className=" object-contain rounded-full"
    />
    <h3 className=" font-bold text-transparent text-[26px] md:text-3xl bg-clip-text bg-gradient-to-r from-red-400 to-blue-600 px-2 py-1 md:py-2 font-pacifico">
      Myinfo
    </h3>
  </Link>
  <div className="flex items-center md:order-2">
    {session?.user ? (
      <div className="flex gap-1 md:gap-3">
        <Link 
          href='/profile'
          type="button" 
          className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" 
          aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom"
        >
          <Image 
            width = {40} 
            height={40} 
            className="rounded-full w-[44px] h-[44px] object-cover" 
            src={session?.user.image}
            alt="user photo" 
          />
        </Link>
        <button 
          type="button" 
          className="flex gap-2 bg-secondary p-2 pt-[5px] rounded-md text-black font-semibold"
          onClick={signOut}
        >
          <p className="hidden text-purple lg:block pt-[3px]">Logout</p>
          <Image
            src = '/assets/logout2.svg'
            width = {30}
            height={30}
            alt="logout"
          />
        </button>
      </div>
    ): (   
        <Link href='/login' className="p-[8px] px-3 md:px-4 text-purple bg-secondary font-semibold rounded-md">
          Login
        </Link>
    )}
  </div>
  </div>
</nav>

  )
}

export default Navbar