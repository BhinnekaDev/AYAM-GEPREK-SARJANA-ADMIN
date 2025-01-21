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

// Gambar Profil
const fotoProfil = require("@/assets/images/profil.jpg");

// Dummy Data Testimonial
const dataTestimonial = [
  {
    id: 1,
    Nama_Lengkap: "Sandrong",
    Foto: fotoProfil,
    Nama_Menu: "Ayam Goreng",
    Rating: 4,
    Komentar:
      "Ayam gorengnya sangat lezat, bumbunya meresap! Ayam gorengnya sangat lezat, bumbunya meresap! Ayam gorengnya sangat lezat, bumbunya meresap! Ayam gorengnya sangat lezat, bumbunya meresap!Ayam gorengnya sangat lezat, bumbunya meresap!",
  },
  {
    id: 2,
    Nama_Lengkap: "Hengki",
    Foto: fotoProfil,
    Nama_Menu: "Nasi Goreng",
    Rating: 5,
    Komentar: "Nasi goreng terbaik yang pernah saya coba!",
  },
];

function Konten() {
  const [halaman, setHalaman] = useState(1);
  const totalTestimonial = dataTestimonial.length;

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) setHalaman(halaman - 1);
  };

  const ambilHalamanSelanjutnya = () => {
    if (halaman < Math.ceil(totalTestimonial / 5)) setHalaman(halaman + 1);
  };

  return (
    <div>
      <Card className=" bg-white shadow-md mb-5">
        <div className="w-full flex justify-between text-blue-gray-900 p-4">
          <div className="space-y-2">
            <Typography variant="h5">Total Testimonial</Typography>
            <Typography className="text-xl">{totalTestimonial}</Typography>
          </div>
        </div>
      </Card>

      <Card className="w-full h-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center text-center justify-between mx-2">
            <Typography variant="h5" color="blue-gray">
              Tabel Data Testimonial
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
                <th className="border-y py-3 px-4">Nama Menu</th>
                <th className="border-y py-3 px-4 text-center">Rating</th>
                <th className="border-y py-3 px-4 text-center">Komentar</th>
              </tr>
            </thead>
            <tbody>
              {dataTestimonial.map((testimonial) => (
                <tr key={testimonial.id} className="border-b">
                  <td className="p-5 flex items-center gap-3">
                    <Image
                      src={testimonial.Foto}
                      alt={testimonial.Nama_Lengkap}
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
                        {testimonial.Nama_Lengkap}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4">{testimonial.Nama_Menu}</td>
                  <td className="p-4 text-center">{testimonial.Rating}</td>{" "}
                  <td className="p-4 text-left max-w-sm">
                    {testimonial.Komentar}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Halaman {halaman} dari {Math.ceil(totalTestimonial / 5)}
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
              disabled={halaman === Math.ceil(totalTestimonial / 5)}
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
