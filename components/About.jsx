"use client"

import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import Image from 'next/image'
import Link from 'next/link'

const About = () => {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['FULL STACK DEVELOPER'],
            typeSpeed: 90,
            showCursor: false,
        })
        return () => {
            typed.destroy();
        }
    }, [])

  return (
    <div className='flex flex-col md:flex-row w-5/6 mx-auto text-gray-300 my-4 gap-2'>
        <div className="left md:w-3/5 flex flex-col bg-gradient-to-br from-secondary to-zinc-900 p-2 rounded-lg justify-center pl-3 py-20 drop-shadow-md">
            <div className='flex flex-col'>
                <p className=' font-code text-lg'>Hi, I am <span className='font-bold mx-2 text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-cyan-500'>Sumit Kumar Sharma</span></p>
                <h3 className=' font-code font-extrabold text-4xl md:text-3xl xl:text-5xl my-2 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-600' ref={el}/>

                <p className=' font-code font-extralight mt-4'>
                    Embark on a journey through the world of a seasoned full-stack developer. Armed with an arsenal of skills spanning front-end marvels and back-end mastery, I bring digital visions to life. Through meticulous craftsmanship and relentless pursuit of excellence, I build dynamic applications that captivate and empower. Join me as we explore the limitless possibilities of development, breaking barriers and forging new frontiers. Together, let's shape the future of technology.
                </p>

                <Link href='/payments' className='absolute bottom-3 left-3 p-1 px-3 bg-gradient-to-t from-amber-600 to-slate-500 rounded-md'>
                    Buy me a coffee
                </Link>
            </div>
        </div>
        <div className="right md:w-2/5 bg-transparent p-2 rounded-lg flex justify-center md:justify-start items-center">
            <div className="image">
                <Image
                    src = '/assets/sumitsharma.jpg'
                    width = {350}
                    height = {450}
                    alt = "profile photo"
                    className=' object-cover rounded-lg'
                />
            </div>
        </div>
    </div>
  )
}

export default About