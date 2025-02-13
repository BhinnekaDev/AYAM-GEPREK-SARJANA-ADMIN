"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Konten from "@/app/dataAdmin/components/konten";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    <div className="sm:p-4 flex flex-col sm:flex-row bg-gray-100 h-screen overflow-y-hidden">
      <ToastContainer />
      <div className=" bg-gray-100 border-r border-gray-200">
        <Sidebar />
      </div>
      <div className="py-3 sm:py-0 flex-1 px-3 sm:px-3">
        <Konten />
      </div>
    </div>
  );
};

export default Page;
