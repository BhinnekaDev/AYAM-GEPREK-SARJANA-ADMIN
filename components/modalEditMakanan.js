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

const ModalEditMakanan = ({
  terbuka,
  ubahStatusModal,
  menuDiEdit = {},
  ubahInputMenu,
  simpanPerubahan,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      ubahInputMenu({ target: { name: "image", value: file } });
    }
  };

  return (
    <Dialog open={terbuka} handler={ubahStatusModal}>
      <DialogHeader>Sunting Menu Makanan</DialogHeader>
      <DialogBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nama Menu"
            name="name"
            value={menuDiEdit.name || ""}
            onChange={ubahInputMenu}
          />
          <select
            name="category"
            value={menuDiEdit.category || ""}
            onChange={ubahInputMenu}
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
            value={menuDiEdit.price || ""}
            onChange={ubahInputMenu}
          />
          <div className="flex flex-col gap-2">
            <label
              className="w-full flex items-center justify-between gap-4 p-3 border border-gray-300 rounded-md cursor-pointer hover:border-blue-500"
              htmlFor="upload-image-edit"
            >
              <FaFileUpload className="text-blue-500" size={20} />
              <span className="text-gray-700 text-sm w-full text-left">
                Masukkan foto makanan
              </span>
              <input
                id="upload-image-edit"
                type="file"
                name="image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            {menuDiEdit.image && (
              <span className="text-sm text-gray-500">
                {typeof menuDiEdit.image === "string"
                  ? menuDiEdit.image
                  : menuDiEdit.image.name}
              </span>
            )}
          </div>
          <Textarea
            label="Deskripsi"
            name="description"
            value={menuDiEdit.description || ""}
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
            simpanPerubahan();
            ubahStatusModal();
          }}
        >
          Simpan Perubahan
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalEditMakanan;
