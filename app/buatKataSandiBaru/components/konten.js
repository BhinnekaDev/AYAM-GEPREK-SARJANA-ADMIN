import React, { useState } from "react";
import { Card, Button, Input, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleResetPassword = () => {
    if (password.length < 8) {
      toast.error("Kata sandi harus memiliki setidaknya 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Kedua kata sandi harus cocok.");
      return;
    }
    toast.success("Kata sandi berhasil diperbarui!");
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <ToastContainer />
      <Card className="w-full max-w-6xl p-28 bg-[#ffe893] rounded-xl shadow-2xl flex justify-center items-center">
        <Card className="w-full max-w-lg bg-white py-10 px-8 rounded-2xl shadow-xl text-center">
          <Typography variant="h5" className="font-bold text-gray-900 mb-2">
            Buat Kata Sandi Baru
          </Typography>
          <Typography className="text-gray-600 text-sm mb-6">
            Kata sandi harus berbeda dari yang sebelumnya sudah digunakan
          </Typography>
          <div className="mb-6 relative text-left">
            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                label="Masukkan Kata Sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-lg border focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <IoEyeOutline size={20} />
                ) : (
                  <IoEyeOffOutline size={20} />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Harus terdiri dari setidaknya 8 karakter
            </p>
          </div>
          <div className="mb-6 relative text-left">
            <div className="relative w-full">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                label="Konfirmasi Kata Sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-lg border focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                onClick={handleToggleConfirmPassword}
              >
                {showConfirmPassword ? (
                  <IoEyeOutline size={20} />
                ) : (
                  <IoEyeOffOutline size={20} />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Kedua kata sandi harus cocok
            </p>
          </div>
          <Button
            onClick={handleResetPassword}
            color="yellow"
            variant="filled"
            className="w-full py-3 text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg text-base"
          >
            Pulihkan Kata Sandi
          </Button>
        </Card>
      </Card>
    </div>
  );
};

export default ResetPassword;
