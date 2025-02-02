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
import useSuntingMakanan from "@/hooks/Backend/useSuntingMakanan";
import Memuat from "@/components/memuat";
import Image from "next/image";

const fotoMakanan = require("@/assets/images/LogoAyam.png");

const ModalEditMakanan = ({ terbuka, tertutup, makananYangTerpilih }) => {
  const {
    namaMakanan,
    kategoriMakanan,
    hargaMakanan,
    deskripsiMakanan,
    gambarMakanan,
    suntingMakanan,
    setNamaMakanan,
    setKategoriMakanan,
    setHargaMakanan,
    setDeskripsiMakanan,
    setGambarMakanan,
    sedangMemuatSuntingMakanan,
  } = useSuntingMakanan(makananYangTerpilih);

  const handlePerubahanFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambarMakanan(file);
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
        Sunting Menu Makanan
      </DialogHeader>
      <DialogBody className="grid grid-cols-1 gap-4">
        <Input
          label="Nama Menu"
          value={namaMakanan}
          onChange={(e) => setNamaMakanan(e.target.value)}
          className="w-full border-gray-300 rounded-lg"
        />
        <select
          value={kategoriMakanan}
          onChange={(e) => setKategoriMakanan(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Pilih Kategori</option>
          <option value="Makanan Berat">Makanan Berat</option>
          <option value="Makanan Ringan">Makanan Ringan</option>
          <option value="Paket A">Paket A</option>
          <option value="Paket B">Paket B</option>
          <option value="Paket C">Paket C</option>
        </select>
        <Input
          label="Harga"
          type="number"
          value={hargaMakanan}
          onChange={(e) => setHargaMakanan(e.target.value)}
          className="w-full border-gray-300 rounded-lg"
        />
        <div className="flex flex-col items-center gap-3 border p-3 rounded-lg border-gray-300">
          <label
            htmlFor="upload-image"
            className="flex items-center justify-between w-full px-4 py-2 border rounded-md cursor-pointer hover:border-blue-500"
          >
            <FaFileUpload className="text-blue-500" size={20} />
            <span className="text-gray-700 text-sm">Unggah Foto Makanan</span>
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePerubahanFile}
            />
          </label>
          {gambarMakanan ? (
            <Image
              src={
                typeof gambarMakanan === "string"
                  ? gambarMakanan
                  : URL.createObjectURL(gambarMakanan)
              }
              alt="Gambar Makanan"
              width={120}
              height={120}
              className="rounded-md object-cover"
            />
          ) : (
            <Image
              src={fotoMakanan}
              alt="Gambar Default"
              width={120}
              height={120}
              className="rounded-md object-cover"
            />
          )}
        </div>
        <Textarea
          label="Deskripsi"
          value={deskripsiMakanan}
          onChange={(e) => setDeskripsiMakanan(e.target.value)}
          className="w-full border-gray-300 rounded-lg"
        />
      </DialogBody>
      <DialogFooter className="flex justify-center gap-4">
        <Button
          disabled={sedangMemuatSuntingMakanan}
          color="blue"
          onClick={async () => {
            await suntingMakanan();
            tertutup(false);
          }}
          className={`px-6 py-2 rounded-lg ${
            sedangMemuatSuntingMakanan
              ? "cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          {sedangMemuatSuntingMakanan ? <Memuat /> : "Simpan Perubahan"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalEditMakanan;
