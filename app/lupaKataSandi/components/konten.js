import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Konten = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const kirimEmailReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Email reset kata sandi telah dikirim!");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4 sm:p-8 sm:bg-white bg-[#ffe893]">
      <ToastContainer />
      <Card className="w-full max-w-6xl bg-[#ffe893] sm:p-16 rounded-xl shadow-2xl flex justify-center items-center">
        <Card className="w-full max-w-xl p-6 bg-white sm:p-10 rounded-2xl shadow-xl text-center">
          <Typography
            variant="h3"
            className="font-bold text-gray-800 mb-6 sm:mb-8"
          >
            Lupa Kata Sandi
          </Typography>
          <Typography className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-12">
            Masukkan email untuk mengatur ulang konfirmasi kata sandi baru
          </Typography>
          <form onSubmit={kirimEmailReset} className="space-y-6 sm:space-y-8">
            <Input
              label="Masukkan Email"
              type="email"
              required
              variant="outlined"
              className="w-full bg-gray-100 rounded-lg py-4 sm:py-5 text-gray-800 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              color="yellow"
              variant="filled"
              className="w-full py-2 sm:py-3 text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg text-base"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "KIRIM"}
            </Button>
          </form>
        </Card>
      </Card>
    </div>
  );
};

export default Konten;
