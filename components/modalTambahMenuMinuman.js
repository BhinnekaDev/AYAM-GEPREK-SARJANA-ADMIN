"use client";
import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import { FaFileUpload } from "react-icons/fa";
import useTambahMinuman from "@/hooks/Backend/useTambahMinuman"; // Pastikan ini adalah hook yang benar
import Memuat from "@/components/memuat"; // Komponen loading jika diperlukan

const ModalTambahMenuMinuman = ({ terbuka, ubahStatusModal }) => {
  const {
    namaMinuman,
    setNamaMinuman,
    kategoriMinuman,
    setKategoriMinuman,
    hargaMinuman,
    setHargaMinuman,
    deskripsiMinuman,
    setDeskripsiMinuman,
    gambarMinuman,
    setGambarMinuman,
    sedangMemuatTambahMinuman,
    tambahMinuman, // Pastikan ini adalah fungsi untuk menambah minumank
  } = useTambahMinuman(); // Menggunakan hook untuk pengelolaan minumank

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambarMinuman(file);
    }
  };

  return (
    <Dialog open={terbuka} handler={ubahStatusModal}>
      <DialogHeader>Tambah Menu Minuman Baru</DialogHeader>
      <DialogBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nama Minuman"
            name="name"
            value={namaMinuman}
            onChange={(e) => setNamaMinuman(e.target.value)}
          />
          <select
            label="Kategori"
            name="category"
            value={kategoriMinuman}
            onChange={(e) => setKategoriMinuman(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2"
          >
            <option value="">Pilih Kategori</option>
            <option value="Minuman Coffee">Minuman Coffee</option>
            <option value="Minuman Non Coffee">Minuman Non Coffee</option>
          </select>
          <Input
            label="Harga"
            type="number"
            name="price"
            value={hargaMinuman}
            onChange={(e) => setHargaMinuman(e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <label
              className="w-full flex items-center justify-between gap-4 p-3 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500"
              htmlFor="upload-image"
            >
              <FaFileUpload className="text-blue-500" size={20} />
              <span className="text-gray-700 text-sm w-full text-left">
                Masukkan foto minuman
              </span>
              <input
                id="upload-image"
                type="file"
                name="image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            {gambarMinuman && (
              <span className="text-sm text-gray-500">
                {typeof gambarMinuman === "string"
                  ? gambarMinuman
                  : gambarMinuman.name}
              </span>
            )}
          </div>
          <Textarea
            label="Deskripsi Minuman"
            name="description"
            value={deskripsiMinuman}
            onChange={(e) => setDeskripsiMinuman(e.target.value)}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={ubahStatusModal}
          className="mr-2"
        >
          Batal
        </Button>
        <Button
          disabled={sedangMemuatTambahMinuman}
          variant="gradient"
          color="blue"
          onClick={async () => {
            await tambahMinuman();
            ubahStatusModal();
          }}
          className={`${sedangMemuatTambahMinuman ? "cursor-not-allowed" : ""}`}
        >
          {sedangMemuatTambahMinuman ? <Memuat /> : "Tambah"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahMenuMinuman;
