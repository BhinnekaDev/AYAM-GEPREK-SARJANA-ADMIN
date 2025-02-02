"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "@/components/sidebar";
import Konten from "@/app/dataTestimoni/components/konten";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const Page = () => {
  const pengarah = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        pengarah.push("/?redirect=true");
      }
    });

    return () => unsubscribe();
  }, [pengarah]);

  return (
    <div className="flex px-4 py-4 bg-gray-100">
      <ToastContainer />
      <div className="w-[300px] bg-gray-100 border-r border-gray-200">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex-1 bg-gray-100 px-2 py-2">
          <Konten />
        </div>
      </div>
    </div>
  );
};

export default Page;
