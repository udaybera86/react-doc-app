import React, { useState } from "react";
import { FiUpload, FiPlus } from "react-icons/fi";
import { TbDotsVertical } from "react-icons/tb";
function Dashboard() {
  const [docs, setDocs] = useState([
    {
      id: 1,
      name: "React Doc App 1",
      lastNameLabel: "Last Name*",
      uploadLabel: "Upload Doc*",
      buttonNames: "Buttons Names*",
    },
    // {
    //   id: 2,
    //   name: "React Doc App 2",
    //   lastNameLabel: "",
    //   uploadLabel: "",
    //   buttonNames: "",
    // },
  ]);

  const addNewDoc = () => {
    const newDoc = {
      id: docs.length + 1,
      name: `React Doc App ${docs.length + 1}`,
      lastNameLabel: "",
      uploadLabel: "",
      buttonNames: "",
    };
    setDocs([...docs, newDoc]);
  };

  return (
    <div className="bg-[#18181B] text-white min-h-screen">
      <h1 className="text-[28px] mb-8 font-bold text-center">Dashboard</h1>
      {docs.map((doc) => (
        <div key={doc.id} className="mb-6">
          <div className="flex justify-between items-center mb-3 bg-[#16A34A] py-4 px-3">
            <h2 className="text-base leading-tight font-semibold">{doc.name}</h2>
            <button className="text-gray-400">
                <TbDotsVertical size={18} color="white" />
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="short-description" className="w-fit block mb-2 text-sm">
              Short Description*
            </label>
            <textarea
              id="short-description"
              rows="2"
              maxlength="80"
              className="w-full bg-[#27272A] p-2 text-[12px] leading-5 text-white border-b-2 border-[#16A34A] placeholder:text-white focus-visible:outline-none"
              placeholder="Write a brief summary to highlight main purpose or content of the document (max 80 characters)"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">
              {doc.uploadLabel || "Upload Doc*"}
            </label>
            <div className="flex items-center justify-between bg-[#3F3F46] p-2 rounded">
              <span>Demo File.PDF</span>
              <button className="bg-[#16A34A] text-white px-4 py-2 rounded flex items-center">
                <FiUpload className="mr-2" /> Upload
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="w-fit block mb-2 text-sm">
              Buttons Names*
            </label>
            <div className="flex space-x-4">
              <button className="w-8 h-8 rounded-full bg-[#16A34A]"></button>
              <button className="w-8 h-8 rounded-full bg-white"></button>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addNewDoc}
        className="w-full bg-[#27272A] text-[#16A34A] p-3 rounded flex items-center justify-center"
      >
        <FiPlus className="mr-2" /> ADD NEW DOC
      </button>
      <button className="w-full bg-[#16A34A] text-white p-3 rounded mt-6">
        Save
      </button>
      <button className="w-full bg-transparent text-white p-3 rounded mt-4 border border-white">
        Log out
      </button>
    </div>
  );
}

export default Dashboard;
