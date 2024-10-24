import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../account-authentication/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { useLoading } from './LoadingContext';

const DocsContext = createContext();

// Default dummy docs for new users
const DEFAULT_DOCS = [
  {
    id: '1',
    name: 'Project Planning Guide',
    description: "Detail your project's objectives, timeline, and deliverables for success.",
    fileName: 'project-planning.pdf',
    buttonName: 'Download Now',
    bgColor: '#16A34A',
    txtColor: '#FFFFFF',
    isOpen: false,
  },
  {
    id: '2',
    name: 'Meeting Minutes Template',
    description: 'Document key discussions, decisions made, and follow-up actions required.',
    fileName: 'meeting-minutes.pdf',
    buttonName: 'Download Now',
    bgColor: '#2563EB',
    txtColor: '#FFFFFF',
    isOpen: false,
  },
  {
    id: '3',
    name: 'Task Tracker',
    description: 'Organize tasks efficiently to prioritize and track completion effectively.',
    fileName: 'task-tracker.pdf',
    buttonName: 'Download Now',
    bgColor: '#16A34A',
    txtColor: '#FFFFFF',
    isOpen: false,
  },
  {
    id: '4',
    name: 'Research Summary',
    description: 'Summarize critical insights, methodologies, and data from your research.',
    fileName: 'research-summary.pdf',
    buttonName: 'Download Now',
    bgColor: '#16A34A',
    txtColor: '#FFFFFF',
    isOpen: false,
  },
  {
    id: '5',
    name: 'Financial Planning',
    description: 'Outline financial plans, expenses, and projections for better management.',
    fileName: 'financial-plan.pdf',
    buttonName: 'Download Now',
    bgColor: '#2563EB',
    txtColor: '#FFFFFF',
    isOpen: false,
  },
];

export function DocsProvider({ children }) {
  const [docs, setDocs] = useState(DEFAULT_DOCS);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [user, setUser] = useState(null);
  const { setIsLoading } = useLoading();

  // Load user docs when auth state changes
  const loadUserDocs = React.useCallback(async () => {
    setIsLoading(true);
    try {
      if (!user) {
        setDocs(DEFAULT_DOCS);
        return;
      }

      const userDocsRef = collection(db, `users/${user.uid}/docs`);
      const userDocsQuery = query(userDocsRef);
      const querySnapshot = await getDocs(userDocsQuery);

      const loadedDocs = [];
      querySnapshot.forEach((doc) => {
        loadedDocs.push({ id: doc.id, ...doc.data() });
      });

      setDocs(loadedDocs.length > 0 ? loadedDocs : DEFAULT_DOCS);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error loading documents:', error);
      toast.error("Error loading documents", {
        position: "bottom-center",
      });
      setDocs(DEFAULT_DOCS);
    } finally {
      setIsLoading(false);
    }
  }, [user, setIsLoading]);

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setDocs(DEFAULT_DOCS);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setIsLoading]);

  // Load user docs when auth state changes
  useEffect(() => {
    if (user) {
      loadUserDocs();
    }
  }, [user, loadUserDocs]);

  const updateDocs = React.useCallback((newDocs) => {
    setDocs(newDocs);
    setHasUnsavedChanges(true);
  }, []);

  const contextValue = React.useMemo(() => ({
    docs,
    setDocs,
    updateDocs,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    loadUserDocs
  }), [docs, hasUnsavedChanges, updateDocs, loadUserDocs]);

  return (
    <DocsContext.Provider value={contextValue}>
      {children}
    </DocsContext.Provider>
  );
}

export function useDocs() {
  const context = useContext(DocsContext);
  if (!context) {
    throw new Error('useDocs must be used within a DocsProvider');
  }
  return context;
}