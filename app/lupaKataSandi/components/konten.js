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
    <div className="flex justify-center items-center w-full h-screen">
      <ToastContainer />
      <Card className="w-full max-w-6xl p-28 bg-[#ffe893] rounded-xl shadow-2xl flex justify-center items-center">
        <Card className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl text-center">
          <Typography variant="h3" className="font-bold text-gray-800 mb-8">
            Lupa Kata Sandi
          </Typography>
          <Typography className="text-xl text-gray-600 mb-12">
            Masukkan email untuk mengatur ulang konfirmasi kata sandi baru
          </Typography>
          <form onSubmit={kirimEmailReset} className="space-y-8">
            <Input
              label="Masukkan Email"
              type="email"
              required
              variant="outlined"
              className="w-full bg-gray-100 rounded-lg py-5 text-gray-800 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              color="yellow"
              variant="filled"
              className="w-full py-3 text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg text-base"
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
