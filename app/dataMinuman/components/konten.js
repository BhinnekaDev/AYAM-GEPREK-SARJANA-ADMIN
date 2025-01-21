"use client";
import React, { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import ModalTambahMenuMinuman from "@/components/modalTambahMenuMinuman";
import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const fotoMinuman = require("@/assets/images/LogoAyam.png");
const menuAwal = [
  {
    name: "Es Teh Manis",
    category: "Minuman",
    price: "Rp 8.000",
    description: "Es teh manis segar",
    image: fotoMinuman,
  },
  {
    name: "Jus Mangga",
    category: "Minuman",
    price: "Rp 15.000",
    description: "Jus mangga segar dan manis",
    image: fotoMinuman,
  },
  {
    name: "Es Kopi Susu",
    category: "Minuman",
    price: "Rp 18.000",
    description: "Kopi susu dengan es yang menyegarkan",
    image: fotoMinuman,
  },
  {
    name: "Teh Tarik",
    category: "Minuman",
    price: "Rp 12.000",
    description: "Teh tarik khas dengan rasa lembut",
    image: fotoMinuman,
  },
  {
    name: "Air Mineral",
    category: "Minuman",
    price: "Rp 5.000",
    description: "Air mineral dingin dan menyegarkan",
    image: fotoMinuman,
  },
];

const TABLE_HEAD = ["Gambar", "Nama", "Kategori", "Harga", "Deskripsi", "Aksi"];

const Konten = () => {
  const [menuMinuman, setMenuMinuman] = useState(menuAwal);
  const [kategoriDipilih, setKategoriDipilih] = useState("Semua Kategori");
  const [menuBaru, setMenuBaru] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [modalTerbuka, setModalTerbuka] = useState(false);

  // Pagination state
  const [halaman, setHalaman] = useState(1);
  const totalAdmin = menuMinuman.length;

  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalAdmin / itemsPerPage);

  const bukaModal = () => setModalTerbuka(true);
  const tutupModal = () => setModalTerbuka(false);

  const ubahInputMenu = (e) => {
    const { name, value } = e.target;
    setMenuBaru((prev) => ({ ...prev, [name]: value }));
  };

  const tambahMenu = () => {
    setMenuMinuman((prev) => [...prev, { ...menuBaru }]);
    setMenuBaru({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
    });
  };

  const hapusMenu = (index) => {
    setMenuMinuman((prev) => prev.filter((_, i) => i !== index));
  };

  const suntingMenu = (index) => {
    const item = menuMinuman[index];
    setMenuBaru(item);
    bukaModal();
  };

  const menuDifilter =
    kategoriDipilih === "Semua Kategori"
      ? menuMinuman
      : menuMinuman.filter((item) => item.category === kategoriDipilih);

  const menuPerHalaman = menuDifilter.slice(
    (halaman - 1) * itemsPerPage,
    halaman * itemsPerPage
  );

  const ambilHalamanSebelumnya = () => {
    if (halaman > 1) {
      setHalaman(halaman - 1);
    }
  };

  const ambilHalamanBerikutnya = () => {
    if (halaman < totalPages) {
      setHalaman(halaman + 1);
    }
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
          <option value="Minuman">Minuman Coffe</option>
          <option value="Lainnya">Minuman Non Coffe</option>
        </select>
      </Card>

      <ModalTambahMenuMinuman
        terbuka={modalTerbuka}
        ubahStatusModal={tutupModal}
        menuBaru={menuBaru}
        ubahInputMenu={ubahInputMenu}
        tambahMenu={tambahMenu}
      />

      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h4" className="text-black font-bold mb-6">
          Data Minuman
        </Typography>
        <div>
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
              {menuPerHalaman.map((item, index) => (
                <tr key={index}>
                  <td
                    className={
                      index === menuPerHalaman.length - 1
                        ? "p-4 flex items-center justify-center"
                        : "p-4 border-b border-blue-gray-50 flex items-center justify-center"
                    }
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md shadow-md flex items-center justify-center"
                    />
                  </td>
                  <td
                    className={
                      index === menuPerHalaman.length - 1
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50"
                    }
                  >
                    <Typography variant="small" color="blue-gray ">
                      {item.name}
                    </Typography>
                  </td>
                  <td
                    className={
                      index === menuPerHalaman.length - 1
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50"
                    }
                  >
                    <Typography variant="small" color="blue-gray ">
                      {item.category}
                    </Typography>
                  </td>
                  <td
                    className={
                      index === menuPerHalaman.length - 1
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50"
                    }
                  >
                    <Typography variant="small" color="blue-gray ">
                      {item.price}
                    </Typography>
                  </td>
                  <td
                    className={
                      index === menuPerHalaman.length - 1
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50"
                    }
                  >
                    <Typography variant="small" color="blue-gray ">
                      {item.description}
                    </Typography>
                  </td>
                  <td
                    className={
                      index === menuPerHalaman.length - 1
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50"
                    }
                  >
                    <div className="flex justify-center items-center gap-4">
                      <Button
                        onClick={() => suntingMenu(index)}
                        size="sm"
                        className="text-blue-500 hover:text-blue-700 bg-transparent"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        onClick={() => hapusMenu(index)}
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
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Halaman {halaman} dari {totalPages}
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
              onClick={ambilHalamanBerikutnya}
              variant="outlined"
              size="sm"
              disabled={halaman === totalPages}
            >
              Berikutnya
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Konten;
