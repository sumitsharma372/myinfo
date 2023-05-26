"use client"

import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import FileBase64 from 'react-file-base64';
import { useRouter } from 'next/navigation';

const Form = () => {
    const [languages, setLanguages] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState(null)
    const skills = [];
    const [submitting, setSubmitting] = useState(false)

    const router = useRouter();

    const [projectData, setProjectData] = useState({
        title: '',
        languages: [],
        description: '',
        selectedFile: '',
        url: '',
    })

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    }


    useEffect(() => {
        const fetchLanguages = async () => {
            setLoading(true);
            const response = await fetch('/api/languages')
            const data = await response.json();

            setLanguages(data);
            setLoading(false);
            // console.log(languages)
        }

        fetchLanguages();
    }, [])

    const options = []
    languages?.map(language => {
        const obj = {value: language?._id, label: language?.name}
        options.push(obj)
    })

    const handleSelect = (data)=>{
        setSelectedOptions(data);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setSubmitting(true);

        const skills = [];
        selectedOptions?.map(option => {
            projectData.languages.push(option.value)
        })

        setProjectData({...projectData, languages: skills})

        console.log(projectData)

        try {
            const response = await fetch('api/projects/new', {
                method: 'POST',
                body: JSON.stringify(projectData)
            })

            if (response.ok){
                setSubmitting(false);
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
        <section className=' text-gray-100 flex flex-col justify-center items-center my-5 bg-secondary p-3 rounded-md w-[90%] mx-auto'>
            <h2>Create Project</h2>
            <form className='w-[90%] max-w-2xl flex flex-col gap-3' onSubmit={handleSubmit}>
                <label className=' flex flex-col gap-1'>
                    <p>Title:</p>
                    <input type="text" name="title" 
                    className='form_input'
                    value={projectData.title}
                    onChange={e => setProjectData({...projectData, title: e.target.value})}
                    />
                </label>
                <label>
                    <p>Description:</p>
                    <textarea name="description"  
                    id = 'description'
                    className='form_input'
                    value={projectData.description}
                    onChange = {e => setProjectData({...projectData, description: e.target.value})}
                    />
                </label>
                <label>
                    <p>Languages used:</p>
                    <Select 
                        className='form_input  text-gray-800'
                        options={options}
                        placeholder = "Select Language"
                        value={selectedOptions}
                        onChange={handleSelect}
                        isSearchable = {true}
                        isMulti
                    />
                </label>

                <label>
                    <p>Website URL</p>
                    <input type="url" className='form_input' name='link' value = {projectData.url} onChange={e => setProjectData({...projectData, url: e.target.value})}/>
                </label>

                <label>
                    <FileBase64 type = 'file' multiple = {false} onDone = {({base64}) => setProjectData({...projectData, selectedFile: base64})}/>
                </label>
                <button type='submit' className=' bg-gradient-to-r from-red-500 to-cyan-500 w-44 rounded-full p-2 mx-auto font-bold'>
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </section>
  )
}

export default Form