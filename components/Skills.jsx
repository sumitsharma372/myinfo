"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {React, Django, Tailwind, Node, Mongodb, Python, Html, JavaScript, Next} from '@public/assets/icons'

const Skills = () => {
    const [ skills, setSkills ] = useState([])
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        const fetchLanguages = async () => {
            setLoading(true);
            const response = await fetch('/api/languages')
            const data = await response.json();

            setSkills(data);
            setLoading(false);
        }

        fetchLanguages();
    }, [])

  return (
    <section className='my-10 text-gray-100 mx-auto lg:mt-[5rem]'>
        <h2 className='h_text'>SKILLS</h2>
        <div className=' flex justify-center flex-wrap gap-2 mx-auto w-[80%] lg:w-full'>
            {loading ? <Image src='/assets/loader.svg' width={40} height={40} alt='loading...' /> : skills && (
                skills.map(skill => (
                    <div className='lan' key={skill}>                    
                        <Image 
                            src= {skill.logo}
                            width = {80}
                            height= {80}
                            className='lan_img xl:w-[100px]'
                        />
            </div>
                ))
            )}
        </div>
    </section>
  )
}

export default Skills