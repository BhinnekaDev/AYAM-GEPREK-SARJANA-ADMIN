"use client";
import React, { useState } from "react";
import { Card, CardFooter, Typography, Button } from "@material-tailwind/react";
import ModalTambahMenuMinuman from "@/components/modalTambahMenuMinuman";
import ModalDetailMinuman from "@/components/modalDetailMinuman";
import ModalKonfirmasiHapusMinuman from "@/components/modalKonfirmasiHapusMinuman";
import ModalEditMinuman from "@/components/modalEditMinuman";
import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { formatRupiah } from "@/constants/formatRupiah";
import { CiCircleInfo } from "react-icons/ci";

import useTampilkanMinuman from "@/hooks/Backend/useTampilkanMinuman";
import useHapusMinuman from "@/hooks/Backend/useHapusMinuman";

const fotoMinuman = require("@/assets/images/LogoAyam.png");

const Konten = () => {
  const [kategoriDipilih, setKategoriDipilih] = useState("Semua Kategori");
  const [menuBaru, setMenuBaru] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [modalTerbuka, setModalTerbuka] = useState(false);
  const [modalEditTerbuka, setModalEditTerbuka] = useState(false);
  const [minumanYangTerpilih, setMinumanYangTerpilih] = useState(null);
  const [minumanDipilih, setMinumanDipilih] = useState(null);
  const [bukaModalHapusMinuman, setBukaModalHapusMinuman] = useState(false);
  const [modalDetailTerbuka, setModalDetailTerbuka] = useState(false);

  const { hapusMinuman, sedangMemuatHapusMinuman } = useHapusMinuman();

  const {
    halaman,
    totalMinuman,
    daftarMinuman,
    ambilHalamanSebelumnya,
    ambilHalamanSelanjutnya,
    sedangMemuatMinuman,
  } = useTampilkanMinuman(5, kategoriDipilih);

  const itemsPerPage = 5;
  const menuPerHalaman = daftarMinuman.slice(
    (halaman - 1) * itemsPerPage,
    halaman * itemsPerPage
  );

  const bukaModal = () => setModalTerbuka(true);
  const tutupModal = () => setModalTerbuka(false);

  const konfirmasiHapus = (idMinuman) => {
    setMinumanYangTerpilih(idMinuman);
    setBukaModalHapusMinuman(true);
  };
  const tampilkanDetailMinuman = (idMinuman) => {
    setMinumanDipilih(idMinuman);
    setModalDetailTerbuka(true);
  };

  const hapus = async () => {
    if (minumanYangTerpilih) {
      await hapusMinuman(minumanYangTerpilih);
      const updatedMinuman = daftarMinuman.filter(
        (minuman) => minuman.id !== minumanYangTerpilih
      );
      setBukaModalHapusMinuman(false);
      setMinumanYangTerpilih(null);
    }
  };

  const ubahInputMenu = (e) => {
    const { name, value } = e.target;
    setMenuBaru((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h3" className="text-black font-extrabold">
            Menu Minuman
          </Typography>
          <Button
            onClick={bukaModal}
            className="bg-blue-500 hover:bg-blue-700 shadow-lg text-white"
          >
            Tambah Menu
          </Button>
        </div>

        <p className="text-sm text-black mb-4">
          Pilih minuman favorit Anda dari daftar di bawah ini.
        </p>
        <select
          value={kategoriDipilih}
          onChange={(e) => setKategoriDipilih(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-blue-gray-900 text-sm "
        >
          <option value="Semua Kategori">Semua Kategori</option>
          <option value="Minuman Coffee">Minuman Coffee</option>
          <option value="Minuman Non Coffee">Minuman Non Coffee</option>
        </select>
      </Card>
      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h4" className="text-black font-bold mb-6">
          Data Minuman
        </Typography>
        <div>
          {sedangMemuatMinuman ? (
            <p>Memuat data minuman...</p>
          ) : (
            <table className="w-full min-w-max table-auto text-center">
              <thead>
                <tr>
                  <th className="border-y border-blue-gray-100 py-3 px-4"></th>
                  <th className="hidden sm:table-cell border-y border-blue-gray-100 py-3 px-4 w-1">
                    Gambar
                  </th>
                  <th className="border-y border-blue-gray-100 text-center py-3 px-4">
                    Nama Minuman
                  </th>
                  <th className="hidden sm:table-cell border-y border-blue-gray-100 py-3 px-4">
                    Kategori
                  </th>
                  <th className="hidden sm:table-cell border-y border-blue-gray-100 py-3 px-4">
                    Harga
                  </th>
                  <th className="hidden sm:table-cell border-y border-blue-gray-100 py-3 px-4">
                    Deskripsi
                  </th>
                  <th className="border-y border-blue-gray-100 py-3 px-4">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {menuPerHalaman.map((minuman) => (
                  <tr key={minuman.id}>
                    <td>
                      <CiCircleInfo
                        className="h-7 w-7 m-auto text-blue-500 cursor-pointer hover:text-black duration-300"
                        onClick={() => tampilkanDetailMinuman(minuman)}
                      />
                    </td>
                    <td className="hidden sm:table-cell p-4">
                      <Image
                        src={minuman.Gambar_Minuman || fotoMinuman}
                        alt={minuman.Nama_Minuman}
                        width={50}
                        height={50}
                        className="rounded-md shadow-md mx-auto"
                      />
                    </td>
                    <td className="p-4 max-w-[150px] truncate">
                      {minuman.Nama_Minuman}
                    </td>
                    <td className="p-4 hidden sm:table-cell max-w-[50px] truncate">
                      {minuman.Kategori_Minuman}
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      {formatRupiah(minuman.Harga_Minuman)}
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      {minuman.Deskripsi_Minuman}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-row justify-center items-center gap-2">
                        <Button
                          onClick={() => {
                            setMinumanYangTerpilih(minuman.id);
                            setModalEditTerbuka(true);
                          }}
                          size="sm"
                          className="text-blue-500 hover:text-blue-700 bg-transparent flex items-center justify-center"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          onClick={() => konfirmasiHapus(minuman.id)}
                          size="sm"
                          className="text-blue-500 hover:text-blue-700 bg-transparent flex items-center justify-center"
                        >
                          <FaTrashAlt />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Halaman {halaman} dari {Math.ceil(totalMinuman / itemsPerPage)}
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
              disabled={halaman === Math.ceil(totalMinuman / itemsPerPage)}
            >
              Berikutnya
            </Button>
          </div>
        </CardFooter>
      </Card>
      <ModalTambahMenuMinuman
        terbuka={modalTerbuka}
        ubahStatusModal={tutupModal}
        menuBaru={menuBaru}
        ubahInputMenu={ubahInputMenu}
      />
      <ModalEditMinuman
        terbuka={modalEditTerbuka}
        tertutup={setModalEditTerbuka}
        minumanYangTerpilih={minumanYangTerpilih}
      />
      <ModalKonfirmasiHapusMinuman
        terbuka={bukaModalHapusMinuman}
        tertutup={setBukaModalHapusMinuman}
        minumanYangTerpilih={minumanYangTerpilih}
        konfirmasiHapusMinuman={hapus}
        sedangMemuatHapus={sedangMemuatHapusMinuman}
      />
      <ModalDetailMinuman
        terbuka={modalDetailTerbuka}
        tertutup={setModalDetailTerbuka}
        minuman={minumanYangTerpilih}
      />
    </div>
  );
};

export default Konten;
