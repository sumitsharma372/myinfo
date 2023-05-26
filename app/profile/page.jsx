"use client"

import { useSession } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FileBase64 from 'react-file-base64';

const Profile = () => {
    const { data: session } = useSession();
    const router = useRouter();
    // console.log(session)

    if(!session){
        router.push('/login')
    }

    const [userData, setUserData] = useState({
        name: session?.user.name,
        email: session?.user.email,
        image: session?.user.image,
    })
    const [isEdit, setIsEdit] = useState(false)


    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/users/${session?.user.id}`)
                const data = await res.json()
                setUserData(data)
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [])


    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/users/${session?.user.id}`,{
            method: 'PATCH',
            body: JSON.stringify(userData)
        })
            if (res.ok){
                setIsEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <section>
        <h1 className="text-center my-3 font-kanit uppercase text-2xl mb-10">Profile</h1>

        <div className="flex flex-col items-center bg-secondary max-w-md mx-auto rounded-md">
            <div className="flex flex-col justify-center items-center mb-5 p-3">
                <Image
                    src={userData.image}
                    width = {100}
                    height = {100}
                    alt="user photo"
                    className="rounded-full object-cover w-[150px] h-[150px]"
                />

                {isEdit &&
                    <label className="flex flex-col justify-center items-center mt-4 gap-2">
                        <p>upload image</p>
                        <FileBase64 type = 'file' multiple = {false} onDone = {({base64}) => setUserData({...userData, image: base64})}/>
                    </label>
                }
            </div>
            {isEdit ? <input autoFocus
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
                className="text-zinc-900 p-2 rounded-sm px-3"
            /> : <div>
                <h2 className="text-center font-bold text-2xl">{userData.name}</h2>
                <p className="my-3">{userData.email}</p>
            </div>}

            {isEdit ? <div className="flex justify-between gap-2">
                <button 
                    className="gray_btn"
                    onClick={handleUpdate}
                    >Update</button>
                <button
                    onClick={() => setIsEdit(false)}
                >Cancel</button>
            </div> : <button className="p-2 px-4 bg-gray-700 text-gray-100 my-2 rounded-md"
                onClick={() => setIsEdit(true)}
            >
                Edit Profile
            </button>}
        </div>
    </section>
  )
}

export default Profile