import Navbar from '@components/Navbar'
import React from 'react'
import '@styles/global.css'
import Provider from '@components/Provider'
import Head from 'next/head'

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <Head >
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
        <body className='bg-primary no-scrollbar text-gray-100'>
          <Provider>
            <main className='w-full h-screen bg-primary'>
                <Navbar/>
                {children}
            </main>
          </Provider>
        </body>
    </html>
  )
}

export default RootLayout