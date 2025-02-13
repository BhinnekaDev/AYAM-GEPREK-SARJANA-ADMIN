"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "@/components/sidebar";
import Konten from "@/app/dataPengguna/components/konten";

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
    <div className="sm:p-4 flex flex-col sm:flex-row bg-gray-100">
      <ToastContainer />
      <div className=" bg-gray-100 border-r border-gray-200">
        <Sidebar />
      </div>

      <div className="py-3 sm:py-0 flex flex-col flex-1">
        <div className="flex-1 bg-gray-100 px-2 py-2">
          <Konten />
        </div>
      </div>
    </div>
  );
};

export default Page;
