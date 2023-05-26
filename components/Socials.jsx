import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Socials = () => {
  return (
    <section className='my-10 lg:mt-[20]'>
        <h2 className='h_text uppercase'>Socialize</h2>
        <div className='flex justify-center my-8'>
            <ul className='flex gap-2 md:gap-5'>
                <li>
                    <Link href='https://www.facebook.com/profile.php?id=100035109126896' target='_blank'>
                        <Image
                            src='/assets/icons/facebook.svg'
                            width = {60}
                            height = {60}
                            className='social_logo'
                        />
                    </Link>
                </li>
                <li>
                    <Link href='https://github.com/sumitsharma372' target='_blank'>
                        <Image
                            src='/assets/icons/github.svg'
                            width = {60}
                            height = {60}
                            className='social_logo'
                        />
                    </Link>
                </li>
                <li>
                    <Link href='https://www.linkedin.com/in/sumit-sharma-b8a396227/' target='_blank'>
                        <Image
                            src='/assets/icons/linkedin.svg'
                            width = {60}
                            height = {60}
                            className='social_logo'
                        />
                    </Link>
                </li>
                <li>
                    <Link href='https://www.instagram.com/sumit__sharma72/' target='_blank'>
                        <Image
                            src='/assets/icons/instagram.svg'
                            width = {60}
                            height = {60}
                            className='social_logo'
                        />
                    </Link>
                </li>
            </ul>
        </div>
    </section>
  )
}

export default Socials