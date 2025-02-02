"use client";
import React, { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import ModalTambahMenuMinuman from "@/components/modalTambahMenuMinuman";
import ModalKonfirmasiHapusMinuman from "@/components/modalKonfirmasiHapusMinuman";
import ModalEditMinuman from "@/components/modalEditMinuman";
import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { formatRupiah } from "@/constants/formatRupiah";
import useTampilkanMinuman from "@/hooks/Backend/useTampilkanMinuman";
import useHapusMinuman from "@/hooks/Backend/useHapusMinuman";

const fotoMinuman = require("@/assets/images/LogoAyam.png");

const TABLE_HEAD = ["Gambar", "Nama", "Kategori", "Harga", "Deskripsi", "Aksi"];

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
  const [bukaModalHapusMinuman, setBukaModalHapusMinuman] = useState(false);

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
              <thead className="text-center">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {menuPerHalaman.map((minuman) => (
                  <tr key={minuman.id}>
                    <td className="p-4 flex items-center justify-center">
                      <Image
                        src={minuman.Gambar_Minuman || fotoMinuman}
                        alt={minuman.Nama_Minuman}
                        width={50}
                        height={50}
                        className="rounded-md shadow-md"
                      />
                    </td>
                    <td className="p-4">{minuman.Nama_Minuman}</td>
                    <td className="p-4">{minuman.Kategori_Minuman}</td>
                    <td className="p-4">
                      {formatRupiah(minuman.Harga_Minuman)}
                    </td>
                    <td className="p-4">{minuman.Deskripsi_Minuman}</td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-4">
                        <Button
                          onClick={() => {
                            setMinumanYangTerpilih(minuman.id);
                            setModalEditTerbuka(true);
                          }}
                          size="sm"
                          className="text-blue-500 hover:text-blue-700 bg-transparent"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          onClick={() => konfirmasiHapus(minuman.id)}
                          size="sm"
                          className="text-blue-500 hover:text-blue-700 bg-transparent"
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

        <div className="flex justify-between items-center mt-4">
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
        </div>
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
    </div>
  );
};

export default Konten;
