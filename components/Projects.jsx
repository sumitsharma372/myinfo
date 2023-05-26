"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';

const width = 300;

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const {data:session} = useSession();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const response = await fetch('api/projects')
      const data = await response.json();

      setProjects(data)
      setLoading(false)
    }

    fetchProjects();
  }, [])

  const handleDelete = async (id) => {
    const hasConfirmed = confirm("Are you sure to delete ?")

    try {
        await fetch (`api/projects/${id}`, {
        method: 'DELETE'
      })
        const filteredProjects = projects.filter(project => project.id !== id)

        setProjects(filteredProjects)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='mx-auto w-full text-gray-100 my-2 font-poppins'>
      <div className='lg:mt-[5rem]'>
        <h2 className='h_text'>PROJECTS</h2>
      </div>
      <div className="projects w-[90%] flex gap-5 mx-auto justify-center flex-wrap flex-1">
        {loading ? <Image src='/assets/loader.svg' width={40} height={40} alt='loading...' /> : projects?.map(project => (
          <div className="project p-2 rounded-sm flex flex-col gap-1 bg-gradient-to-tr " key={project._id}>
            <div className="project__image">
              <Image
                src={project?.image}
                width = {width}
                height = {4/3 * width}
                className=' object-cover aspect-[4/3] rounded-md'
              />
            </div>
            <div className=' bg-gradient-to-br from-black3 to-primary p-1 rounded pl-2 max-w-[300px]'>
              <h2 className=' font-kanit capitalize text-2xl mb-2 text-violet mt-1'>{project.title}</h2>
              <p className=' font-poppins mb-3 font-light line-clamp-4 text-gray-400 text-[15px]'>{project.description}</p>
              <div>
                <h5 className='mb-2 font-bold'>Tech Stack</h5>
                <ul className='flex gap-1'>
                  {project.languages.map(language => (
                    <li className='p-[10px] bg-zinc-700 rounded-3xl flex justify-center items-center'>
                      <Image
                        src={language.logo}
                        width={30}
                        height={30}
                        alt='stack_img'
                        className='object-contain w-[30px] h-[30px]'
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className='button flex justify-end mt-3'>
                    {session?.user?.email === 'sks372000@gmail.com' && (
                      <div className='mx-2'>
                        <button onClick={() => handleDelete(project._id)}>
                          Delete
                        </button>
                      </div>
                    )}
                    <button className='font-poppins p-1 px-5 bg-gradient-to-r from-cyan-600 to-gray-500 rounded-full tracking-wider'>
                      <a target='_blank' href= {project.url ? project.url : ''}>
                        Visit
                      </a>
                    </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects