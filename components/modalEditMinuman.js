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
import useSuntingMinuman from "@/hooks/Backend/useSuntingMinuman";
import Memuat from "@/components/memuat";

const ModalEditMinuman = ({ terbuka, tertutup, minumanYangTerpilih }) => {
  const {
    namaMinuman,
    kategoriMinuman,
    suntingMinuman,
    hargaMinuman,
    deskripsiMinuman,
    gambarMinuman,
    setNamaMinuman,
    setKategoriMinuman,
    setHargaMinuman,
    setDeskripsiMinuman,
    setGambarMinuman,
    sedangMemuatSuntingMinuman,
  } = useSuntingMinuman(minumanYangTerpilih);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambarMinuman(file);
    }
  };

  return (
    <Dialog open={terbuka} handler={tertutup}>
      <DialogHeader>Sunting Menu Minuman</DialogHeader>
      <DialogBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nama Menu"
            value={namaMinuman}
            onChange={(e) => setNamaMinuman(e.target.value)}
          />
          <select
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
              <div className="mt-3">
                <img
                  src={
                    typeof gambarMinuman === "string"
                      ? gambarMinuman
                      : URL.createObjectURL(gambarMinuman)
                  }
                  alt="Preview Minuman"
                  className="w-full h-auto rounded-md"
                />
              </div>
            )}
          </div>

          <Textarea
            label="Deskripsi"
            value={deskripsiMinuman}
            onChange={(e) => setDeskripsiMinuman(e.target.value)}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          disabled={sedangMemuatSuntingMinuman}
          variant="gradient"
          color="blue"
          onClick={async () => {
            await suntingMinuman();
            tertutup(false);
          }}
          className={`${
            sedangMemuatSuntingMinuman
              ? "cursor-not-allowed"
              : "hover:from-blue-500"
          }`}
        >
          {sedangMemuatSuntingMinuman ? <Memuat /> : "Simpan Perubahan"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalEditMinuman;
