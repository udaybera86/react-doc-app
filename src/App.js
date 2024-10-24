import React, { useState, useEffect } from "react";
import { DocsProvider } from "./components/Context/DocsContext";
import { LoadingProvider } from "./components/Context/LoadingContext";
import { BrowserRouter as Router } from "react-router-dom";
import Background from "./components/Background";
import Foreground from "./components/Foreground";
import Notice from "./components/Notice";
import Copyright from "./components/Copyright";
import Sidebar from "./components/Sidebar";
import { auth } from "./components/account-authentication/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
const App = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <LoadingProvider>
        <div className="relative w-full h-screen bg-zinc-800">
          <Notice />
          <Background />
          <DocsProvider>
            <div className="flex relative z-[3]">
              <div
                className={`${
                  sidebarOpen ? "lg:w-3/4 md:w-1/2 w-full" : "w-full"
                }`}
              >
                <Foreground toggleSidebar={toggleSidebar} />
              </div>
              <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                user={user}
              />
            </div>
          </DocsProvider>
          <Copyright />
          <ToastContainer />
        </div>
      </LoadingProvider>
    </Router>
  );
};

export default App;
