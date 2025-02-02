"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Typography, Card } from "@material-tailwind/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// COMPONENTS
import Memuat from "@/components/memuat";
// HOOKS
import useMasukDenganEmailKataSandi from "@/hooks/Backend/useMasukDenganEmailKataSandi";
import { useSearchParams } from "next/navigation"; // Untuk membaca query parameter

const adminPromoTexts = [
  {
    title: "Kelola Semua dengan Mudah",
    description:
      "Sebagai admin, Anda memiliki kontrol penuh untuk mengelola semua aspek platform kami secara efisien.",
  },
  {
    title: "Pengelolaan Pengguna yang Sederhana",
    description:
      "Admin dapat dengan mudah mengelola pengguna, mengatur hak akses, dan memantau aktivitas mereka.",
  },
  {
    title: "Keamanan Terjamin",
    description:
      "Admin bertanggung jawab menjaga keamanan sistem dengan memantau dan mengelola kontrol akses serta kebijakan privasi.",
  },
  {
    title: "Pemantauan Real-Time",
    description:
      "Sebagai admin, Anda dapat memantau aktivitas platform secara real-time untuk memastikan kelancaran operasional.",
  },
  {
    title: "Pengaturan Konten",
    description:
      "Admin memiliki kontrol penuh atas pengaturan dan moderasi konten, memastikan kualitas dan kepatuhan pada kebijakan.",
  },
  {
    title: "Fleksibilitas dalam Pengelolaan Sistem",
    description:
      "Admin dapat menyesuaikan pengaturan sistem sesuai dengan kebutuhan dan kebijakan yang berlaku.",
  },
  {
    title: "Komunikasi Efektif",
    description:
      "Admin dapat mengelola komunikasi internal dengan pengguna, memberikan pemberitahuan, dan mengatur pengumuman.",
  },
  {
    title: "Pemeliharaan Sistem",
    description:
      "Sebagai admin, Anda bertanggung jawab untuk menjaga sistem tetap berjalan dengan baik melalui pemeliharaan rutin dan pembaruan.",
  },
  {
    title: "Tugas Administratif",
    description:
      "Admin mengelola tugas administratif seperti pembuatan akun, pengaturan hak akses, dan pemrosesan permintaan dari pengguna.",
  },
];

const LoginAdmin = () => {
  const fotoAdmin = require("@/assets/images/LogoAyam.png");

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { masukDenganEmail, sedangMemuat } = useMasukDenganEmailKataSandi();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (redirect === "true") {
      toast.error(
        "Upsss, Maaf Anda belum bisa akses, silahkan login terlebih dahulu!"
      );
    }

    const interval = setInterval(() => {
      setCurrentTextIndex(
        (prevIndex) => (prevIndex + 1) % adminPromoTexts.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [redirect]);

  const prosesLogin = async (e) => {
    e.preventDefault();
    await masukDenganEmail(email, password);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white h-screen flex justify-center items-center ">
      <ToastContainer />
      <Card className="w-full max-w-6xl bg-[#ffe893] p-20 rounded-3xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center h-full">
          <div className="flex flex-col justify-center items-center h-full">
            <motion.div
              key={currentTextIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-center"
            >
              <motion.h2
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-extrabold text-gray-800 drop-shadow-lg"
              >
                {adminPromoTexts[currentTextIndex].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-lg mt-4 text-gray-700"
              >
                {adminPromoTexts[currentTextIndex].description}
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 5,
                repeatType: "reverse",
                repeat: Infinity,
              }}
              className="w-3/4 mt-10"
            >
              <Image
                src={fotoAdmin}
                alt="Admin Promo"
                layout="responsive"
                className="rounded-xl"
              />
            </motion.div>
          </div>

          <div className="p-10 bg-white rounded-2xl shadow-lg">
            <Typography
              variant="h4"
              className="text-center text-gray-800 font-semibold mb-4"
            >
              Login Admin
            </Typography>
            <Typography className="text-center text-gray-600 mb-6">
              Masukkan email dan kata sandi untuk melanjutkan akses.
            </Typography>
            <form className="space-y-6" onSubmit={prosesLogin}>
              <Input
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                className="w-full bg-gray-100 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <Input
                  label="Kata Sandi"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  className="w-full bg-gray-100 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute top-2/4 right-3 transform -translate-y-2/4 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </div>
              </div>

              <Button
                type="submit"
                color="yellow"
                variant="gradient"
                className="w-full text-gray-800 hover:shadow-lg py-2"
                disabled={sedangMemuat}
              >
                {sedangMemuat ? <Memuat /> : "Masuk"}
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginAdmin;
