"use client"

import Form from "@components/Form"
import { useSession } from "next-auth/react"

const CreateProject = () => {
  const { data: session} = useSession();

  return (
    <div>
        {session?.user.email === 'sks372000@gmail.com' ? <Form /> : <h1 className="text-center my-3">You are not allowed to access this page</h1>}
    </div>
  )
}

export default CreateProject