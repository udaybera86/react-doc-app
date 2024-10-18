import React from "react";
import Card from "./Card";
import { useRef } from "react";
import { RiMenu3Line } from "react-icons/ri";

function Foreground({ toggleSidebar }) {
  const ref = useRef(null);

  const data = [
    {
      desc: "Detail your project's objectives, timeline, and deliverables for success.",
      tag: {
        tagTitle: "Download Now",
        tagColor: "green",
        fileName: "paper_2.jpg",
      },
    },
    {
      desc: "Document key discussions, decisions made, and follow-up actions required.",
      tag: {
        tagTitle: "Download Now",
        tagColor: "blue",
        fileName: "30-days-of-react-ebook-doc.pdf",
      },
    },
    {
      desc: "Organize tasks efficiently to prioritize and track completion effectively.",
      tag: {
        tagTitle: "Download Now",
        tagColor: "green",
        fileName: "ReactJSNotesForProfessionals.pdf",
      },
    },
    {
      desc: "Summarize critical insights, methodologies, and data from your research.",
      tag: {
        tagTitle: "Download Now",
        tagColor: "green",
        fileName: "paper_2.jpg",
      },
    },
    {
      desc: "Outline financial plans, expenses, and projections for better management.",
      tag: {
        tagTitle: "Download Now",
        tagColor: "blue",
        fileName: "docs-app-ss.png",
      },
    },
  ];

  return (
    <div ref={ref} className="foreground relative z-[3] top-0 left-0 w-full h-screen p-5">
      <button
        onClick={toggleSidebar}
        className="fixed top-5 right-5 z-50 p-2 bg-zinc-700 rounded-full"
      >
        <RiMenu3Line size={24} color="white" />
      </button>
      <div className="flex items-start flex-wrap gap-[20px]">
        {data.map((item, index) => (
          <Card key={index} reference={ref} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Foreground;
