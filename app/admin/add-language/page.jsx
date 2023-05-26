"use client"

import React, { useState } from 'react'
import FileBase64 from 'react-file-base64'
import { useRouter } from 'next/navigation'

const AddLanguage = () => {
    const [name, setName] = useState('')
    const [selectedFile, setSelectedFile] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = { name, selectedFile}
      try {
        const response = await fetch('/api/languages/new', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      if (response.ok){
        router.push('/')
      }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className=' font-poppins max-w-xl mx-auto p-2 bg-secondary my-3 rounded-md'>
        <h2 className='text-center text-3xl my-3'>Add language</h2>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <label htmlFor="">
                <p>Name</p>
                <input type="text" name="name" id="name" className='form_input' onChange={e => setName(e.target.value)}/>
            </label>
            <label>
              <p>Choose Image</p>
              <FileBase64 type = 'file' multiple = {false} onDone = {({base64}) => setSelectedFile(base64)}/>
            </label>
            <button type='submit' className='p-2 px-4 mx-auto rounded-full bg-black3 w-1/4'>
              Submit
            </button>
        </form>
    </div>
  )
}

export default AddLanguage