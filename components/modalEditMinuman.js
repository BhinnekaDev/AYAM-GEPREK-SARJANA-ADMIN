import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { FaFileUpload } from "react-icons/fa";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useSuntingMinuman from "@/hooks/Backend/useSuntingMinuman";
import Memuat from "@/components/memuat";
import Image from "next/image";

const fotoMinuman = require("@/assets/images/LogoAyam.png");

const ModalEditMinuman = ({ terbuka, tertutup, minumanYangTerpilih }) => {
  const {
    namaMinuman,
    kategoriMinuman,
    suntingMinuman,
    hargaMinuman,
    deskripsiMinuman,
    setNamaMinuman,
    setKategoriMinuman,
    setHargaMinuman,
    setDeskripsiMinuman,
    setGambarMinuman,
    sedangMemuatSuntingMinuman,
  } = useSuntingMinuman(minumanYangTerpilih);

  const handlePerubahanFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambarMinuman(file);
    }
  };

  return (
    <Dialog
      open={terbuka}
      handler={tertutup}
      className="relative p-4 rounded-lg"
    >
      <div className="absolute top-4 right-4">
        <IconButton
          variant="text"
          color="gray"
          onClick={() => tertutup(false)}
          className="text-gray-800 hover:bg-gray-200 rounded-full"
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>
      <DialogHeader className="text-xl font-semibold text-center">
        Sunting Menu Minuman
      </DialogHeader>
      <DialogBody className="grid grid-cols-1 gap-4">
        <Input
          label="Nama Menu"
          value={namaMinuman}
          onChange={(e) => setNamaMinuman(e.target.value)}
          className="w-full border-gray-300 rounded-lg"
        />
        <select
          value={kategoriMinuman}
          onChange={(e) => setKategoriMinuman(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Pilih Kategori</option>
          <option value="Minuman Coffee">Minuman Coffee</option>
          <option value="Minuman Non Coffee">Minuman Non Coffee</option>
        </select>
        <Input
          label="Harga"
          type="number"
          value={hargaMinuman}
          onChange={(e) => setHargaMinuman(e.target.value)}
          className="w-full border-gray-300 rounded-lg"
        />
        <div className="flex flex-col items-center gap-3 border p-3 rounded-lg border-gray-300">
          <label
            htmlFor="upload-image"
            className="flex items-center justify-between w-full px-4 py-2 border rounded-md cursor-pointer hover:border-blue-500"
          >
            <FaFileUpload className="text-blue-500" size={20} />
            <span className="text-gray-700 text-sm">Unggah Foto Minuman</span>
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePerubahanFile}
            />
          </label>
          <Image
            src={fotoMinuman}
            alt="Gambar Minuman"
            width={120}
            height={120}
            className="rounded-md object-cover"
          />
        </div>
        <Textarea
          label="Deskripsi"
          value={deskripsiMinuman}
          onChange={(e) => setDeskripsiMinuman(e.target.value)}
          className="w-full border-gray-300 rounded-lg"
        />
      </DialogBody>
      <DialogFooter className="flex justify-center gap-4">
        <Button
          disabled={sedangMemuatSuntingMinuman}
          color="blue"
          onClick={async () => {
            await suntingMinuman();
            tertutup(false);
          }}
          className={`px-6 py-2 rounded-lg ${
            sedangMemuatSuntingMinuman
              ? "cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          {sedangMemuatSuntingMinuman ? <Memuat /> : "Simpan Perubahan"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalEditMinuman;
