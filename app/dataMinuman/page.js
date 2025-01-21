"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "@/components/sidebar";
import Konten from "@/app/dataMinuman/components/konten";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const Page = () => {
  const pengarah = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        toast.error(
          "Upsss, Login dulu lah bray masa langsung maksa masuk aja 🤬😡😠!"
        );
        setTimeout(() => {
          pengarah.push("/");
        }, 2000);
      }
    });

    return () => unsubscribe();
  }, [pengarah]);

  return (
    <section className="p-4 flex h-screen bg-[#eff0f3]">
      <ToastContainer />
      <Sidebar />
      <div className="flex flex-col flex-1 gap-4 mx-3">
        <Konten />
      </div>
    </section>
  );
};

export default Page;
