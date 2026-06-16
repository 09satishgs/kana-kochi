"use client";

import { useState, useEffect, use } from "react";
// Adjust the import path based on your actual project structure
import useUserMetaData from "@/hooks/useUserMetaData";
import { apiFetch } from "@/helpers";

export default function WelcomeUser() {
  const { createUser, userFound } = useUserMetaData();

  const [isOpen, setIsOpen] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // Fetch available usernames when the modal opens
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const res = await apiFetch("/api/usernames");
        const data = await res.json();

        if (data.usernames && Array.isArray(data.usernames)) {
          setUsernames(data.usernames);
        }
      } catch (error) {
        console.error("Failed to fetch usernames:", error);
      } finally {
        setLoading(false);
      }
    };

    setIsOpen(!userFound);
    if (!userFound) {
      fetchUsernames();
    }
  }, [userFound]);

  const handleProceed = async () => {
    if (!selectedUsername) return;

    setIsCreating(true);
    try {
      await createUser(selectedUsername);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
      setIsCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      {/* Modal Container - Added max-h and flex-col for internal scrolling */}
      <div className="w-full max-w-md max-h-[85vh] flex flex-col bg-black rounded-3xl shadow-2xl shadow-white/10 border border-zinc-800">
        {/* Header - Reduced padding */}
        <div className="bg-zinc-900/50 p-6 text-center border-b border-zinc-800 shrink-0">
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            Welcome
          </h2>
          <p className="text-zinc-400 mt-2 text-sm font-medium tracking-wide">
            Pick a username to get started!
          </p>
          <p className="text-zinc-600 mt-1 text-xs font-medium tracking-wide">
            You can change it later.
          </p>
        </div>

        {/* Body - Added overflow-y-auto for scrolling on small screens */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest text-center sticky top-0 bg-black py-2 z-10">
                Available Usernames
              </p>

              <div className="grid grid-cols-1 gap-3">
                {usernames.map((name) => {
                  const isSelected = selectedUsername === name;
                  return (
                    <button
                      key={name}
                      onClick={() => setSelectedUsername(name)}
                      // Reduced vertical padding (py-3.5)
                      className={`relative w-full text-center cursor-pointer py-3.5 rounded-xl border-2 transition-all duration-300 group
                        ${
                          isSelected
                            ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-[1.02] z-10"
                            : "border-zinc-800 bg-zinc-900/30 text-white hover:border-zinc-600 hover:bg-zinc-900"
                        }
                      `}
                    >
                      <span className="font-bold text-lg uppercase tracking-[0.25em] pl-[0.25em]">
                        {name}
                      </span>

                      {isSelected && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer Area - Reduced margin */}
          <div className="mt-8 shrink-0">
            <button
              onClick={handleProceed}
              disabled={!selectedUsername || isCreating || loading}
              className={`w-full py-4 px-4 cursor-pointer rounded-2xl font-black text-xl uppercase tracking-widest shadow-lg transition-all duration-300
                ${
                  !selectedUsername || isCreating
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-70 border border-zinc-700"
                    : "bg-white text-black hover:bg-zinc-200 hover:shadow-white/20 active:scale-[0.97]"
                }
              `}
            >
              {isCreating ? (
                <span className="flex items-center justify-center gap-3 pl-[0.25em]">
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  PROCESSING
                </span>
              ) : (
                "PROCEED"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
