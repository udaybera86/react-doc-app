import React, { useState } from "react";
import { FiUpload, FiPlus } from "react-icons/fi";
import { TbDotsVertical } from "react-icons/tb";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
  const [fileName, setFileName] = useState("");
  const [bgColor, setBgColor] = useState("#16A34A");
  const [txtColor, setTxtColor] = useState("#FFFFFF");
  const navigate = useNavigate();

  const [docs, setDocs] = useState([
    {
      id: 1,
      name: "React Doc App 1"
    },
    // {
    //   id: 2,
    //   name: "React Doc App 2"
    // },
  ]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const addNewDoc = () => {
    const newDoc = {
      id: docs.length + 1,
      name: `React Doc App ${docs.length + 1}`
    };
    setDocs([...docs, newDoc]);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "");
  };

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    if (name === "bgColor") {
      setBgColor(value);
    } else if (name === "txtColor") {
      setTxtColor(value);
    }
  };

  return (
    <div className="bg-[#18181B] text-white">
      <h1 className="text-[28px] mb-8 font-bold text-center">Dashboard</h1>
      <div className="h-[58vh] pr-2 overflow-y-auto">
        {docs.map((doc) => (
          <div key={doc.id} className="mb-6">
            <div className="flex justify-between items-center mb-3 bg-[#16A34A] py-4 px-3">
              <h2 className="text-base leading-tight font-semibold">
                {doc.name}
              </h2>
              <button className="text-gray-400">
                <TbDotsVertical size={18} color="white" />
              </button>
            </div>
            <div className="mb-3">
              <label
                htmlFor="short-description"
                className="w-fit block mb-2 text-sm"
              >
                Short Description*
              </label>
              <textarea
                id="short-description"
                rows="2"
                maxLength="80"
                className="w-full bg-[#27272A] p-2 text-[12px] leading-5 text-white border-b-2 border-[#16A34A] placeholder:text-white focus-visible:outline-none"
                placeholder="Write a brief summary to highlight main purpose or content of the document (max 80 characters)"
              />
            </div>
            <div className="relative w-fit mb-4">
              <label htmlFor="file-input" className="block mb-2 text-sm">
                Upload Doc*
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-input"
                required
              />
              <div className="flex items-center">
                <label
                  htmlFor="file-input"
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors cursor-pointer"
                >
                  <FiUpload className="mr-2" size={20} />
                  <span className="font-semibold">Upload</span>
                </label>
                {fileName && (
                  <span className="ml-2 text-white font-normal text-sm leading-4">
                    {fileName}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="w-fit block mb-2 text-sm">Buttons Names*</label>
              <input
                type="text"
                className="w-full mb-4 pt-4 pb-3 px-3 border-b-2 border-[#16A34A] text-white text-sm leading-none bg-[#27272A] placeholder:text-white focus-visible:outline-none"
                defaultValue="Download Now"
              />
              <div className="w-full">
                <div className="flex items-center mb-4 space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#fff]" style={{ backgroundColor: bgColor }}>
                    <input type="color" name="bgColor" onChange={handleColorChange} value={bgColor} className="w-full h-full cursor-pointer opacity-0" />
                  </div>
                  <p className="m-0">
                    <span className="block text-sm text-white mb-1">Button Background Color</span>
                    <span className="color-code block text-xs text-white">{bgColor}</span>
                  </p>
                </div>
                <div className="flex items-center mb-4 space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#fff]" style={{ backgroundColor: txtColor }}>
                    <input type="color" name="txtColor" onChange={handleColorChange} value={txtColor} className="w-full h-full cursor-pointer opacity-0" />
                  </div>
                  <p className="m-0">
                    <span className="block text-sm text-white mb-1">Button Text Color</span>
                    <span className="color-code block text-xs text-white">{txtColor}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-[#18181B] px-[34px] pb-[34px]">
        <button
          onClick={addNewDoc}
          className="w-full text-[#16A34A] border border-[#16A34A] p-3 flex items-center justify-center"
        >
          <FiPlus size={18} className="mr-2" /> ADD NEW DOC
        </button>
        <button className="w-full bg-[#16A34A] text-white p-3 mt-6">
          Save
        </button>
        <div className="w-full flex justify-center">
          <button onClick={handleLogout} className="text-white underline text-center mt-4">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
