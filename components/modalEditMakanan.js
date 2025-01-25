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
import useSuntingMakanan from "@/hooks/Backend/useSuntingMakanan";
import Memuat from "@/components/memuat";

const ModalEditMakanan = ({ terbuka, tertutup, makananYangTerpilih }) => {
  const {
    namaMakanan,
    kategoriMakanan,
    suntingMakanan,
    hargaMakanan,
    deskripsiMakanan,
    gambarMakanan,
    setNamaMakanan,
    setKategoriMakanan,
    setHargaMakanan,
    setDeskripsiMakanan,
    setGambarMakanan,
    sedangMemuatSuntingMakanan,
  } = useSuntingMakanan(makananYangTerpilih);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambarMakanan(file);
    }
  };

  return (
    <Dialog open={terbuka} handler={tertutup}>
      <DialogHeader>Sunting Menu Makanan</DialogHeader>
      <DialogBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nama Menu"
            value={namaMakanan}
            onChange={(e) => setNamaMakanan(e.target.value)}
          />
          <select
            value={kategoriMakanan}
            onChange={(e) => setKategoriMakanan(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2"
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
            value={deskripsiMakanan}
            onChange={(e) => setDeskripsiMakanan(e.target.value)}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          disabled={sedangMemuatSuntingMakanan}
          variant="gradient"
          color="blue"
          onClick={async () => {
            await suntingMakanan();
            tertutup(false);
          }}
          className={`${
            sedangMemuatSuntingMakanan
              ? "cursor-not-allowed"
              : "hover:from-blue-500"
          }`}
        >
          {sedangMemuatSuntingMakanan ? <Memuat /> : "Simpan Perubahan"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalEditMakanan;
