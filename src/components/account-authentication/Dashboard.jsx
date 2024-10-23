import React, { useState, useEffect } from "react";
import { FiUpload, FiPlus } from "react-icons/fi";
import { TbDotsVertical } from "react-icons/tb";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { MdEditDocument, MdOutlineDeleteSweep } from "react-icons/md";
import {
  doc,
  setDoc,
  deleteDoc as firestoreDeleteDoc,
} from "firebase/firestore";
import { useDocs } from "../Context/DocsContext";

function Dashboard() {
  const navigate = useNavigate();
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [editingTitleId, setEditingTitleId] = useState(null);

  // Use the context instead of local state
  const {
    docs,
    updateDocs,
    hasUnsavedChanges,
    setHasUnsavedChanges,
  } = useDocs();

  const isPopoverOpen = Boolean(popoverAnchorEl);
  const popoverId = isPopoverOpen ? "simple-popover" : undefined;

  // Handle beforeunload event for page refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const deleteDoc = async (docId) => {
    try {
      const userId = auth.currentUser.uid;
      // Delete from Firestore
      await firestoreDeleteDoc(doc(db, `users/${userId}/docs/${docId}`));
      // Update context state
      updateDocs(docs.filter((doc) => doc.id !== docId));
      handlePopoverClose();
      toast.success("Document deleted successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Error deleting document", {
        position: "bottom-center",
      });
    }
  };

  const saveAllDocs = async () => {
    try {
      const userId = auth.currentUser.uid;
      const batch = [];

      for (const document of docs) {
        const docRef = doc(db, `users/${userId}/docs/${document.id}`);
        batch.push(setDoc(docRef, document));
      }

      await Promise.all(batch);
      setHasUnsavedChanges(false);

      toast.success("All changes saved successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Error saving documents", {
        position: "bottom-center",
      });
    }
  };

  const handleLogout = async () => {
    try {
      if (hasUnsavedChanges) {
        const confirmLeave = window.confirm(
          "You have unsaved changes. Would you like to save before leaving? Press OK to save."
        );
        if (confirmLeave) {
          await saveAllDocs();
        }
      }
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
      id: String(Date.now()),
      name: `React Doc App ${docs.length + 1}`,
      isOpen: false,
      description: "New document description",
      fileName: "",
      buttonName: "Download Now",
      bgColor: "#16A34A",
      txtColor: "#FFFFFF",
    };
    updateDocs([...docs, newDoc]);
  };

  const handleEdit = (docId) => {
    updateDocs(
      docs.map((doc) => ({
        ...doc,
        isOpen: doc.id === docId,
      }))
    );
  };

  const handleTitleEdit = (docId) => {
    setEditingTitleId(docId);
  };

  const handleTitleChange = (docId, newTitle) => {
    updateDocs(
      docs.map((doc) => (doc.id === docId ? { ...doc, name: newTitle } : doc))
    );
  };

  const handleTitleKeyDown = (e, docId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditingTitleId(null);
    }
  };

  const handleTitleBlur = () => {
    setEditingTitleId(null);
  };

  const handleFileChange = (docId, event) => {
    const file = event.target.files[0];
    updateDocs(
      docs.map((doc) =>
        doc.id === docId ? { ...doc, fileName: file ? file.name : "" } : doc
      )
    );
  };

  const handleColorChange = (docId, e) => {
    const { name, value } = e.target;
    updateDocs(
      docs.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              [name === "bgColor" ? "bgColor" : "txtColor"]: value,
            }
          : doc
      )
    );
  };

  const handleInputChange = (docId, field, value) => {
    updateDocs(
      docs.map((doc) => (doc.id === docId ? { ...doc, [field]: value } : doc))
    );
  };

  const handlePopoverButtonClick = (event, docId) => {
    event.stopPropagation();
    setSelectedDocId(docId);
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (event) => {
    if (event) event.stopPropagation();
    setPopoverAnchorEl(null);
  };

  return (
    <div className="bg-[#18181B] text-white">
      <h1 className="text-[28px] mb-8 font-bold text-center">Dashboard</h1>
      <div className="h-[58vh] pr-2 overflow-y-auto">
        {docs.map((doc) => (
          <div key={doc.id} className="mb-6">
            <div
              className="flex justify-between items-center mb-3 py-4 px-3 cursor-pointer"
              style={{ backgroundColor: doc.bgColor }}
              onClick={() => handleEdit(doc.id)}
            >
              {editingTitleId === doc.id ? (
                <input
                  type="text"
                  value={doc.name}
                  onChange={(e) => handleTitleChange(doc.id, e.target.value)}
                  onKeyDown={(e) => handleTitleKeyDown(e, doc.id)}
                  onBlur={handleTitleBlur}
                  onClick={(e) => e.stopPropagation()}
                  className="text-base leading-tight font-semibold bg-transparent border-none focus:outline-none text-white"
                  autoFocus
                />
              ) : (
                <h2
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTitleEdit(doc.id);
                  }}
                  className="text-base leading-tight font-semibold cursor-text"
                >
                  {doc.name}
                </h2>
              )}
              <button
                aria-describedby={popoverId}
                onClick={(e) => handlePopoverButtonClick(e, doc.id)}
                className="text-gray-400"
              >
                <TbDotsVertical size={18} color="white" />
              </button>
            </div>

            {doc.isOpen && (
              <div>
                <div className="mb-3">
                  <label className="w-fit block mb-2 text-sm">
                    Short Description*
                  </label>
                  <textarea
                    rows="2"
                    maxLength="80"
                    value={doc.description}
                    onChange={(e) =>
                      handleInputChange(doc.id, "description", e.target.value)
                    }
                    className="w-full bg-[#27272A] p-2 text-[12px] leading-5 text-white border-b-2 border-[#16A34A] placeholder:text-white focus-visible:outline-none"
                    placeholder="Write a brief summary (max 80 characters)"
                  />
                </div>

                <div className="relative w-fit mb-4">
                  <label className="block mb-2 text-sm">Upload Doc*</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(doc.id, e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  <div className="flex items-center">
                    <label className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors cursor-pointer">
                      <FiUpload className="mr-2" size={20} />
                      <span className="font-semibold">Upload</span>
                    </label>
                    {doc.fileName && (
                      <span className="ml-2 text-white font-normal text-sm leading-4">
                        {doc.fileName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="w-fit block mb-2 text-sm">
                    Button Name*
                  </label>
                  <input
                    type="text"
                    value={doc.buttonName}
                    onChange={(e) =>
                      handleInputChange(doc.id, "buttonName", e.target.value)
                    }
                    className="w-full mb-4 pt-4 pb-3 px-3 border-b-2 border-[#16A34A] text-white text-sm leading-none bg-[#27272A] placeholder:text-white focus-visible:outline-none"
                  />
                  <div className="w-full">
                    <div className="flex items-center mb-4 space-x-3">
                      <div
                        className="w-10 h-10 rounded-full overflow-hidden border border-[#fff]"
                        style={{ backgroundColor: doc.bgColor }}
                      >
                        <input
                          type="color"
                          name="bgColor"
                          value={doc.bgColor}
                          onChange={(e) => handleColorChange(doc.id, e)}
                          className="w-full h-full cursor-pointer opacity-0"
                        />
                      </div>
                      <p className="m-0">
                        <span className="block text-sm text-white mb-1">
                          Button Background Color
                        </span>
                        <span className="color-code block text-xs text-white">
                          {doc.bgColor}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center mb-4 space-x-3">
                      <div
                        className="w-10 h-10 rounded-full overflow-hidden border border-[#fff]"
                        style={{ backgroundColor: doc.txtColor }}
                      >
                        <input
                          type="color"
                          name="txtColor"
                          value={doc.txtColor}
                          onChange={(e) => handleColorChange(doc.id, e)}
                          className="w-full h-full cursor-pointer opacity-0"
                        />
                      </div>
                      <p className="m-0">
                        <span className="block text-sm text-white mb-1">
                          Button Text Color
                        </span>
                        <span className="color-code block text-xs text-white">
                          {doc.txtColor}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Menu
        id={popoverId}
        open={isPopoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableAutoFocus
        disableAutoFocusItem
        MenuListProps={{
          sx: {
            backgroundColor: "#18181B",
            "& .MuiMenuItem-root": {
              backgroundColor: "inherit",
              color: "#fff",
              fontFamily: "inherit",
              "&:hover": {
                backgroundColor: "inherit",
              },
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleEdit(selectedDocId);
            handlePopoverClose();
          }}
          className="flex items-center gap-2"
        >
          <MdEditDocument size={20} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteDoc(selectedDocId);
            handlePopoverClose();
          }}
          className="flex items-center gap-2"
        >
          <MdOutlineDeleteSweep size={20} />
          Delete
        </MenuItem>
      </Menu>

      <div className="fixed bottom-0 left-0 w-full bg-[#18181B] px-[34px] pb-[34px]">
        <button
          onClick={addNewDoc}
          className="w-full text-[#16A34A] border border-[#16A34A] p-3 flex items-center justify-center"
        >
          <FiPlus size={18} className="mr-2" /> ADD NEW DOC
        </button>
        <button
          className="w-full bg-[#16A34A] text-white p-3 mt-6"
          onClick={saveAllDocs}
        >
          Save
        </button>
        <div className="w-full flex justify-center">
          <button
            onClick={handleLogout}
            className="text-white underline text-center mt-4"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
