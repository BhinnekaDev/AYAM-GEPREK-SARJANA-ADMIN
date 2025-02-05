import React, { useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEmail } from "react-icons/md";

const Konten = () => {
  const [loading, setLoading] = useState(false);

  const handleOpenEmailApp = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Membuka aplikasi email...");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <ToastContainer />
      <Card className="w-full max-w-6xl p-28 bg-[#ffe893] rounded-xl shadow-2xl flex justify-center items-center">
        <Card className="w-full max-w-2xl bg-white py-12 px-10 rounded-2xl shadow-xl text-center">
          <MdEmail size={50} className="mx-auto text-gray-700" />
          <Typography
            variant="h4"
            className="font-bold text-gray-800 mt-6 mb-4"
          >
            Cek Email Anda
          </Typography>
          <Typography className="text-lg text-gray-600 mb-6">
            Kami telah mengirimkan instruksi pemulihan kata sandi ke email Anda
          </Typography>
          <Button
            onClick={handleOpenEmailApp}
            color="yellow"
            variant="filled"
            className="w-full py-3 text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg text-base"
            disabled={loading}
          >
            {loading ? "Membuka..." : "Buka Aplikasi Email"}
          </Button>
        </Card>
      </Card>
    </div>
  );
};

export default Konten;
