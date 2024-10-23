import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../account-authentication/firebase";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const DocsContext = createContext();

export function DocsProvider({ children }) {
  const [docs, setDocs] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Default dummy docs for new users
  const defaultDocs = [
    {
      id: "1",
      name: "Project Planning Guide",
      description:
        "Detail your project's objectives, timeline, and deliverables for success.",
      fileName: "project-planning.pdf",
      buttonName: "Download Now",
      bgColor: "#16A34A",
      txtColor: "#FFFFFF",
      isOpen: false,
    },
    {
      id: "2",
      name: "Meeting Minutes Template",
      description:
        "Document key discussions, decisions made, and follow-up actions required.",
      fileName: "meeting-minutes.pdf",
      buttonName: "Download Now",
      bgColor: "#2563EB",
      txtColor: "#FFFFFF",
      isOpen: false,
    },
    {
      id: "3",
      name: "Task Tracker",
      description:
        "Organize tasks efficiently to prioritize and track completion effectively.",
      fileName: "task-tracker.pdf",
      buttonName: "Download Now",
      bgColor: "#16A34A",
      txtColor: "#FFFFFF",
      isOpen: false,
    },
    {
      id: "4",
      name: "Research Summary",
      description:
        "Summarize critical insights, methodologies, and data from your research.",
      fileName: "research-summary.pdf",
      buttonName: "Download Now",
      bgColor: "#16A34A",
      txtColor: "#FFFFFF",
      isOpen: false,
    },
    {
      id: "5",
      name: "Financial Planning",
      description:
        "Outline financial plans, expenses, and projections for better management.",
      fileName: "financial-plan.pdf",
      buttonName: "Download Now",
      bgColor: "#2563EB",
      txtColor: "#FFFFFF",
      isOpen: false,
    },
  ];

  useEffect(() => {
    loadUserDocs();
  }, []);

  const loadUserDocs = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return setDocs(defaultDocs);

      const userDocsRef = collection(db, `users/${userId}/docs`);
      const querySnapshot = await getDocs(userDocsRef);

      const loadedDocs = [];
      querySnapshot.forEach((doc) => {
        loadedDocs.push({ id: doc.id, ...doc.data() });
      });

      setDocs(loadedDocs.length > 0 ? loadedDocs : defaultDocs);
      setHasUnsavedChanges(false);
    } catch (error) {
      toast.error("Error loading documents", {
        position: "bottom-center",
      });
    }
  };

  const updateDocs = (newDocs) => {
    setDocs(newDocs);
    setHasUnsavedChanges(true);
  };

  return (
    <DocsContext.Provider
      value={{
        docs,
        setDocs,
        updateDocs,
        hasUnsavedChanges,
        setHasUnsavedChanges,
        loadUserDocs,
      }}
    >
      {children}
    </DocsContext.Provider>
  );
}

export function useDocs() {
  const context = useContext(DocsContext);
  if (!context) {
    throw new Error("useDocs must be used within a DocsProvider");
  }
  return context;
}
