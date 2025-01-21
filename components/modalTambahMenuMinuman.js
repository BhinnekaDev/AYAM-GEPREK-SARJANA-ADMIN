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

const ModalTambahMenuMinuman = ({
  terbuka,
  ubahStatusModal,
  menuBaru,
  ubahInputMenu,
  tambahMenu,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      ubahInputMenu({ target: { name: "image", value: file } });
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
            value={menuBaru.name}
            onChange={ubahInputMenu}
          />
          <select
            label="Kategori"
            name="category"
            value={menuBaru.category}
            onChange={ubahInputMenu}
            className="border-2 border-gray-300 rounded-md p-2"
          >
            <option value="">Pilih Kategori</option>
            <option value="Makanan Berat">Minuman Coffe</option>
            <option value="Makanan Ringan">Minumman Non Coffe</option>
          </select>
          <Input
            label="Harga"
            name="price"
            value={menuBaru.price}
            onChange={ubahInputMenu}
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
            {menuBaru.image && (
              <span className="text-sm text-gray-500">
                {typeof menuBaru.image === "string"
                  ? menuBaru.image
                  : menuBaru.image.name}
              </span>
            )}
          </div>
          <Textarea
            label="Deskripsi Minuman"
            name="description"
            value={menuBaru.description}
            onChange={ubahInputMenu}
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
          variant="gradient"
          color="blue"
          onClick={() => {
            tambahMenu();
            ubahStatusModal();
          }}
        >
          Tambahkan
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalTambahMenuMinuman;
