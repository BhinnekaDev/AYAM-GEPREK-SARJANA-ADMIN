"use client";
import React, { useEffect } from "react";
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
import useTambahMakanan from "@/hooks/Backend/useTambahMakanan";
import Memuat from "@/components/memuat";

const ModalTambahMenuMakanan = ({ terbuka, ubahStatusModal, menuBaru }) => {
  const {
    namaMakanan,
    setNamaMakanan,
    kategoriMakanan,
    setKategoriMakanan,
    hargaMakanan,
    setHargaMakanan,
    deskripsiMakanan,
    setDeskripsiMakanan,
    gambarMakanan,
    setGambarMakanan,
    sedangMemuatTambahMakanan,
    tambahMakanan,
  } = useTambahMakanan();

  useEffect(() => {
    if (menuBaru.image) {
      setGambarMakanan(menuBaru.image);
    }
  }, [menuBaru.image, setGambarMakanan]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambarMakanan(file);
    }
  };

  return (
    <Dialog open={terbuka} handler={ubahStatusModal}>
      <DialogHeader>Tambah Menu Baru</DialogHeader>
      <DialogBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nama Menu"
            name="name"
            value={namaMakanan}
            onChange={(e) => setNamaMakanan(e.target.value)}
          />
          <select
            label="Kategori"
            name="category"
            value={kategoriMakanan}
            onChange={(e) => setKategoriMakanan(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2"
          >
            <option value="">Pilih Kategori</option>
            <option value="Makanan Berat">Makanan Berat</option>
            <option value="Makanan Ringan">Makanan Ringan</option>
            <option value="Paket">Paket</option>
          </select>

          <Input
            label="Harga"
            type="number"
            name="price"
            value={hargaMakanan}
            onChange={(e) => setHargaMakanan(e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <label
              className="w-full flex items-center justify-between gap-4 p-3 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500"
              htmlFor="upload-image"
            >
              <FaFileUpload className="text-blue-500" size={20} />
              <span className="text-gray-700 text-sm w-full text-left">
                Masukkan foto makanan
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
            {gambarMakanan && (
              <span className="text-sm text-gray-500">
                {typeof gambarMakanan === "string"
                  ? gambarMakanan
                  : gambarMakanan.name}
              </span>
            )}
          </div>
          <Textarea
            label="Deskripsi"
            name="description"
            value={deskripsiMakanan}
            onChange={(e) => setDeskripsiMakanan(e.target.value)}
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
          disabled={sedangMemuatTambahMakanan}
          variant="gradient"
          color="blue"
          onClick={async () => {
            await tambahMakanan();
            ubahStatusModal();
          }}
          className={`${
            sedangMemuatTambahMakanan
              ? "cursor-not-allowed"
              : "hover:from-blue-500"
          }`}
        >
          {sedangMemuatTambahMakanan ? <Memuat /> : "Tambah"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahMenuMakanan;
