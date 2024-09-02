import React from 'react';
import { FaRegFileCode } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

function Card({data, reference}) {
  return (
    <motion.div drag dragConstraints={reference} whileDrag={{ scale: 1.1 }} dragElastic={1} dragTransition={{ bounceStiffness: 600, bounceDamping: 300 }}  className='relative w-60 bg-zinc-900/90 min-h-72 rounded-[45px] px-8 py-9 text-[#F5F5F5] overflow-hidden cursor-grab'>
        <FaRegFileCode size='1.1em' />
        <p className='text-xs mt-5 mb-32 leading-[1.5]'>{data.desc}</p>
        <div className='footer absolute bottom-0 left-0 w-full'>
            <div className='flex items-center justify-between px-8 py-3 mb-2'>
                <h3 className='text-xs'>{data.fileSize}</h3>
                <span className='w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center cursor-pointer'>
                    {data.close ? <IoClose color='#F5F5F5'/> : <LuDownload color='#F5F5F5'/>}
                </span>
            </div>
            {data.tag.isOpen && (
                <a href={`assets/files/${data.tag.fileName}`} download={`${data.tag.fileName}`} className={`tag flex items-center justify-center ${data.tag.tagColor === "blue" ? "bg-blue-600" : "bg-green-600"} py-4 cursor-pointer`}>
                   <h3 className='text-sm'>{data.tag.tagTitle}</h3>
                </a>
            )}
            
        </div>
    </motion.div>
  )
}

export default Card