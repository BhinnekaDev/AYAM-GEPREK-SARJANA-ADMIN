import React from "react";
import Image from "next/image";
import { Card, Typography, Button } from "@material-tailwind/react";
import LogoAyam from "@/assets/images/LogoAyam.png";

const ResetPasswordEmail = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-xl p-6 bg-white rounded-xl shadow-xl flex flex-col items-center">
        <div className="mb-4">
          <Image
            src={LogoAyam}
            alt="Logo Ayam Geprek Sarjana"
            width={60}
            height={60}
          />
        </div>

        <Typography
          variant="h5"
          className="font-bold text-gray-900 text-center mb-14"
        >
          Ayam Geprek Sarjana
        </Typography>

        <Card className="w-full max-w-md bg-white py-8 px-6 sm:px-10 rounded-xl shadow-lg border border-black text-center">
          <Typography variant="h5" className="font-bold text-gray-900 mb-16">
            Info Reset Kata Sandi
          </Typography>

          <Typography className="text-gray-700 text-sm mb-20">
            [[Nama depan]], kami menerima permintaan untuk mengatur ulang kata
            sandi Anda.
          </Typography>

          <Button
            color="yellow"
            variant="filled"
            className="w-full py-3 text-black bg-yellow-500 hover:bg-yellow-600 rounded-lg font-semibold"
          >
            Setel ulang kata sandi Anda
          </Button>

          <Typography className="text-gray-600 text-xs mt-16">
            Tautan ini akan kadaluarsa dalam waktu <b>2 jam</b>. Jika Anda tidak
            meminta kata sandi baru, abaikan pesan ini.
          </Typography>

          <Typography className="text-gray-600 text-xs mt-5">
            Ada pertanyaan? Hubungi{" "}
            <a
              href="mailto:https://wa.me/+6281217044800"
              className="text-blue-500 font-medium"
            >
              https://wa.me/+6281217044800
            </a>
          </Typography>
        </Card>
        <Typography className="text-gray-600 text-xs mt-6">
          Anda menerima email ini karena pengaturan ulang kata sandi diminta
          untuk akun Anda.
        </Typography>

        <Typography className="text-gray-600 text-xs mt-2">
          Ayam Geprek Sarjana, Jl. Terusan Jend. Sudirman, Cibeber, Kec. Cimahi
          Sel.
        </Typography>
      </Card>
    </div>
  );
};

export default ResetPasswordEmail;
