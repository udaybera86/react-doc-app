import React, { useRef } from "react";
import Card from "./Card";
import { RiMenu3Line } from "react-icons/ri";
import { useDocs } from "./Context/DocsContext";

function Foreground({ toggleSidebar }) {
  const ref = useRef(null);
  const { docs, isLoading } = useDocs();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#18181B] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="foreground relative z-[3] top-0 left-0 w-full h-screen p-5">
      <button
        onClick={toggleSidebar}
        className="fixed top-5 right-5 z-50 p-2 bg-zinc-700 rounded-full"
      >
        <RiMenu3Line size={24} color="white" />
      </button>
      <div className="flex items-start flex-wrap gap-[20px]">
        {docs.map((doc, index) => (
          <Card
            key={doc.id}
            reference={ref}
            data={{
              desc: doc.description,
              tag: {
                tagTitle: doc.buttonName,
                tagColor: doc.bgColor === '#2563EB' ? 'blue' : 'green',
                fileName: doc.fileName,
              },
              style: {
                backgroundColor: doc.bgColor,
                color: doc.txtColor,
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Foreground;