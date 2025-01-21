"use client";
import React, { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import ModalTambahMenuMakanan from "@/components/modalTambahMenuMakanan";
import Image from "next/image";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const fotoMakanan = require("@/assets/images/LogoAyam.png");
const menuAwal = [
  {
    name: "Ayam Goreng",
    category: "Makanan Berat",
    price: "Rp 25.000",
    description: "Ayam goreng lezat dan renyah",
    image: fotoMakanan,
  },
  {
    name: "Nasi Goreng",
    category: "Makanan Berat",
    price: "Rp 20.000",
    description: "Nasi goreng dengan bumbu spesial",
    image: fotoMakanan,
  },
  {
    name: "Burger Ayam",
    category: "Makanan Berat",
    price: "Rp 30.000",
    description: "Burger dengan patty ayam empuk",
    image: fotoMakanan,
  },
  {
    name: "Kentang Goreng",
    category: "Cemilan",
    price: "Rp 12.000",
    description: "Kentang goreng crispy dengan saus mayo",
    image: fotoMakanan,
  },
  {
    name: "Es Teh Manis",
    category: "Minuman",
    price: "Rp 8.000",
    description: "Es teh manis segar",
    image: fotoMakanan,
  },
];

const TABLE_HEAD = ["Gambar", "Nama", "Kategori", "Harga", "Deskripsi", "Aksi"];

const Konten = () => {
  const [menuMakanan, setMenuMakanan] = useState(menuAwal);
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
  const totalAdmin = menuMakanan.length;

  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalAdmin / itemsPerPage);

  const bukaModal = () => setModalTerbuka(true);
  const tutupModal = () => setModalTerbuka(false);

  const ubahInputMenu = (e) => {
    const { name, value } = e.target;
    setMenuBaru((prev) => ({ ...prev, [name]: value }));
  };

  const tambahMenu = () => {
    setMenuMakanan((prev) => [...prev, { ...menuBaru }]);
    setMenuBaru({
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
    });
  };

  const hapusMenu = (index) => {
    setMenuMakanan((prev) => prev.filter((_, i) => i !== index));
  };

  const suntingMenu = (index) => {
    const item = menuMakanan[index];
    setMenuBaru(item);
    bukaModal();
  };

  const menuDifilter =
    kategoriDipilih === "Semua Kategori"
      ? menuMakanan
      : menuMakanan.filter((item) => item.category === kategoriDipilih);

  // Mengambil item untuk halaman yang dipilih
  const menuPerHalaman = menuDifilter.slice(
    (halaman - 1) * itemsPerPage,
    halaman * itemsPerPage
  );

  // Fungsi untuk berpindah halaman
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
            Menu Makanan
          </Typography>
          <Button
            onClick={bukaModal}
            className="bg-blue-500 hover:bg-blue-700 shadow-lg text-white"
          >
            Tambah Menu
          </Button>
        </div>

        <p className="text-sm text-black mb-4">
          Pilih makanan favorit Anda dari daftar di bawah ini.
        </p>
        <select
          value={kategoriDipilih}
          onChange={(e) => setKategoriDipilih(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-blue-gray-900 text-sm "
        >
          <option value="Semua Kategori">Semua Kategori</option>
          <option value="Makanan Berat">Makanan Berat</option>
          <option value="Makanan Ringan">Makanan Ringan</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </Card>

      <ModalTambahMenuMakanan
        terbuka={modalTerbuka}
        ubahStatusModal={tutupModal}
        menuBaru={menuBaru}
        ubahInputMenu={ubahInputMenu}
        tambahMenu={tambahMenu}
      />

      <Card className="p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h4" className="text-black font-bold mb-6">
          Data Makanan
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
