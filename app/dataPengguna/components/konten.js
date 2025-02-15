"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@material-tailwind/react";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { CiCircleInfo } from "react-icons/ci";

// HOOKS
import useTampilkanPengguna from "@/hooks/Backend/useTampilkanPengguna";
import useHapusPengguna from "@/hooks/Backend/useHapusPengguna";
//COMPONENTS
import ModalKonfirmasiHapusPengguna from "@/components/modalKonfirmasiHapusPengguna";
import ModalDetailPengguna from "@/components/modalDetailPengguna";

function Konten() {
  const {
    halaman,
    totalPengguna,
    daftarPengguna,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatPengguna,
  } = useTampilkanPengguna();

  const fotoProfilDefault = require("@/assets/images/profil.jpg");
  const [bukaModalHapusPengguna, setBukaModalHapusPengguna] = useState(false);
  const [penggunaYangTerpilih, setPenggunaYangTerpilih] = useState(null);
  const { hapusPengguna, sedangMemuatHapusPengguna } = useHapusPengguna();
  const [bukaModalDetailPengguna, setBukaModalDetailPengguna] = useState(false);

  const konfirmasiHapusPengguna = (idPengguna) => {
    setPenggunaYangTerpilih(idPengguna);
    setBukaModalHapusPengguna(true);
  };

  const hapus = async () => {
    if (penggunaYangTerpilih) {
      await hapusPengguna(penggunaYangTerpilih);
      setBukaModalHapusPengguna(false);
      setPenggunaYangTerpilih(null);
    }
  };
  const tampilkanDetailPengguna = (idPengguna) => {
    setPenggunaYangTerpilih(idPengguna);
    setBukaModalDetailPengguna(true);
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
          className="overflow-hidden sm:overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {sedangMemuatPengguna ? (
            <div className="flex justify-center items-center">
              <Typography>Memuat data pengguna...</Typography>
            </div>
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-y py-2 px-4"></th>
                  <th className="border-y py-2 px-4">Nama Lengkap</th>
                  <th className="hidden sm:table-cell border-y py-2 px-4 text-center">
                    Email
                  </th>
                  <th className="hidden sm:table-cell border-y py-2 px-4 text-center">
                    No HP
                  </th>
                  <th className="hidden sm:table-cell border-y py-2 px-4 text-center">
                    Alamat
                  </th>
                  <th className="border-y py-2 px-2 sm:text-center text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {daftarPengguna.map((pengguna) => (
                  <tr key={pengguna.id} className="border-b">
                    <td>
                      <CiCircleInfo
                        className="h-7 w-7 text-blue-500 m-auto cursor-pointer hover:text-black duration-300"
                        onClick={() => tampilkanDetailPengguna(pengguna)}
                      />
                    </td>
                    <td className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <Image
                        src={pengguna.profileImage || fotoProfilDefault}
                        alt={
                          pengguna.Nama_Lengkap ||
                          `${pengguna.Nama_Depan} ${pengguna.Nama_Belakang}` ||
                          "Gambar Profil Pengguna"
                        }
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {pengguna.Nama_Lengkap ||
                            `${pengguna.Nama_Depan} ${pengguna.Nama_Belakang}`}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="sm:hidden"
                        >
                          {pengguna.Email}
                        </Typography>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell text-center">
                      {pengguna.Email}
                    </td>
                    <td className="hidden sm:table-cell text-center">
                      {pengguna.No_Telepon}
                    </td>
                    <td
                      className="hidden sm:table-cell text-center max-w-[180px] truncate"
                      title={`${pengguna.Alamat.Alamat_Jalan} ${pengguna.Alamat.Alamat_Detail}, RT${pengguna.Alamat.RT}/RW${pengguna.Alamat.RW}, ${pengguna.Alamat.Kecamatan}, ${pengguna.Alamat.Kota}, ${pengguna.Alamat.Provinsi}, ${pengguna.Alamat.Kode_Pos}`}
                    >
                      {pengguna.Alamat
                        ? pengguna.Alamat.Alamat_Detail.length > 40
                          ? pengguna.Alamat.Alamat_Detail.slice(0, 40) + "..."
                          : pengguna.Alamat.Alamat_Detail
                        : "-"}
                    </td>
                    <td className="p-2 sm:flex justify-center">
                      <Button
                        color="red"
                        size="sm"
                        className="text-blue-500 hover:text-blue-700 bg-transparent"
                        onClick={() => konfirmasiHapusPengguna(pengguna.id)}
                      >
                        <FaTrashAlt className="w-5 h-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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

      <ModalKonfirmasiHapusPengguna
        terbuka={bukaModalHapusPengguna}
        tertutup={setBukaModalHapusPengguna}
        penggunaYangTerpilih={penggunaYangTerpilih}
        konfirmasiHapusPengguna={hapus}
        sedangMemuatHapus={sedangMemuatHapusPengguna}
      />
      <ModalDetailPengguna
        terbuka={bukaModalDetailPengguna}
        tertutup={setBukaModalDetailPengguna}
        pengguna={penggunaYangTerpilih}
      />
    </div>
  );
}

export default Konten;
