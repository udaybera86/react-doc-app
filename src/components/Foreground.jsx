import React from 'react'
import Card from './Card'
import { useRef } from "react";

function Foreground() {

    const ref = useRef(null)

    const data = [
        {
            desc: "Detail your project's objectives, timeline, and deliverables for success.",
            close: false,
            tag: {
                isOpen: true,
                tagTitle: "Download Now",
                tagColor: "green",
                fileName: "paper_2.jpg"
            }
        },
        {
            desc: "Document key discussions, decisions made, and follow-up actions required.",
            close: false,
            tag: {
                isOpen: true,
                tagTitle: "Download Now",
                tagColor: "blue",
                fileName: "30-days-of-react-ebook-doc.pdf"
            }
        },
        {
            desc: "Organize tasks efficiently to prioritize and track completion effectively.",
            close: false,
            tag: {
                isOpen: true,
                tagTitle: "Download Now",
                tagColor: "green",
                fileName: "ReactJSNotesForProfessionals.pdf"
            }
        },
        {
            desc: "Summarize critical insights, methodologies, and data from your research.",
            close: true,
            tag: {
                isOpen: false,
                tagTitle: "Download Now",
                tagColor: "green",
                fileName: "paper_2.jpg"
            }
        },
        {
            desc: "Outline financial plans, expenses, and projections for better management.",
            close: false,
            tag: {
                isOpen: true,
                tagTitle: "Download Now",
                tagColor: "blue",
                fileName: "docs-app-ss.png"
            }
        },
    ]

  return (
    <div ref={ref} className='fixed z-[3] top-0 left-0 w-full h-screen p-5'>
        <div className='flex items-start flex-wrap gap-[20px]'>
            {data.map((item, index)=>(
                <Card reference={ref} data={item} />
            ))}
        </div>
    </div>
  )
}

export default Foreground