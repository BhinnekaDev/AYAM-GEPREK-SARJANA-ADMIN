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
    <div className="flex justify-center items-center w-full min-h-screen p-4 sm:p-8 sm:bg-white bg-[#ffe893]">
      <ToastContainer />
      <Card className="w-full max-w-6xl sm:p-20 bg-[#ffe893] rounded-xl shadow-2xl flex justify-center items-center">
        <Card className="w-full max-w-xl p-6 bg-white sm:p-10 rounded-2xl shadow-xl text-center">
          <MdEmail size={50} className="mx-auto text-gray-700" />
          <Typography
            variant="h3"
            className="font-bold text-gray-800 mb-6 sm:mb-8"
          >
            Cek Email Anda
          </Typography>
          <Typography className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-12">
            Kami telah mengirimkan instruksi pemulihan kata sandi ke email Anda
          </Typography>
          <Button
            onClick={handleOpenEmailApp}
            color="yellow"
            variant="filled"
            className="w-full py-2 sm:py-3 text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg text-base"
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
