import React from 'react'

function Background() {
  return (
    <>
        <div className='background fixed z-[2] w-full h-screen'>
            <p className='absolute top-[8%] w-full flex justify-center text-zinc-600 text-md leading-none tracking-tight font-semibold'>Documents</p>
            <h1 className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-zinc-900 text-[12vw] leading-none tracking-tighter font-semibold'>Docs.</h1>
        </div>
    </>
  )
}

export default Background