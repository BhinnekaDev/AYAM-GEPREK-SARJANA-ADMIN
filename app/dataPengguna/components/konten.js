"use client";
import { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@material-tailwind/react";
import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";

// Dummy Data Pengguna
const daftarPengguna = [
  {
    id: 1,
    Nama_Lengkap: "Sandrong",
    Email: "john.doe@example.com",
    No_HP: "1234567890",
    Alamat: "Cibabat selatan",
    Tanggal_Pembuatan_Akun: new Date(),
  },
  {
    id: 2,
    Nama_Lengkap: "Hengki",
    Email: "jane.smith@example.com",
    No_HP: "0987654321",
    Alamat: "Parongpong Lembang",
    Tanggal_Pembuatan_Akun: new Date(),
  },
];

function Konten() {
  const [halaman, setHalaman] = useState(1);
  const totalPengguna = daftarPengguna.length;

  const fotoProfil = require("@/assets/images/profil.jpg");

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) setHalaman(halaman - 1);
  };

  const ambilHalamanSelanjutnya = () => {
    if (halaman < Math.ceil(totalPengguna / 5)) setHalaman(halaman + 1);
  };

  return (
    <div>
      <Card className="max-screen bg-white shadow-md mb-5">
        <div className="w-full flex justify-between text-blue-gray-900 p-4">
          <div className="space-y-2">
            <Typography variant="h5">Total Pengguna</Typography>
            <Typography className="text-xl">{totalPengguna}</Typography>
          </div>
        </div>
      </Card>

      <Card className="w-full h-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center text-center justify-between mx-2">
            <Typography variant="h5" color="blue-gray">
              Tabel Data Pengguna
            </Typography>
          </div>
        </CardHeader>

        <CardBody
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-y py-3 px-4">Nama Lengkap</th>
                <th className="border-y py-2 px-4 text-center">Email</th>
                <th className="border-y py-2 px-4 text-center">No HP</th>
                <th className="border-y py-2 px-4 text-center">Alamat</th>
                <th className="border-y text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {daftarPengguna.map((pengguna) => (
                <tr key={pengguna.id} className="border-b">
                  <td className="p-5 flex items-center gap-3">
                    <Image
                      src={fotoProfil}
                      alt={pengguna.Nama_Lengkap}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {pengguna.Nama_Lengkap}
                      </Typography>
                    </div>
                  </td>
                  <td className="text-center">{pengguna.Email}</td>
                  <td className="text-center">{pengguna.No_HP}</td>
                  <td className="text-center">{pengguna.Alamat}</td>
                  <td className="flex justify-center">
                    <Button color="red" size="sm" className="ml-2">
                      <IoTrashOutline className="w-5 h-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Halaman {halaman} dari {Math.ceil(totalPengguna / 5)}
          </Typography>
          <div className="flex items-center gap-2">
            <Button
              onClick={ambilHalamanSebelumnya}
              variant="outlined"
              size="sm"
              disabled={halaman === 1}
            >
              Sebelumnya
            </Button>
            <Button
              onClick={ambilHalamanSelanjutnya}
              variant="outlined"
              size="sm"
              disabled={halaman === Math.ceil(totalPengguna / 5)}
            >
              Selanjutnya
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Konten;
