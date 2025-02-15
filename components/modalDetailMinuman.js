import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { formatRupiah } from "@/constants/formatRupiah";

const ModalDetailMinuman = ({ terbuka, tertutup, minuman }) => {
  return (
    <Dialog
      open={terbuka}
      handler={() => tertutup(false)}
      size="md"
      className="bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <DialogHeader className="text-black">Detail Minuman</DialogHeader>
      <DialogBody className="text-black">
        {minuman ? (
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={minuman.Gambar_Minuman || "/default-drink.jpg"}
              alt={minuman.Nama_Minuman || "Gambar Minuman"}
              width={120}
              height={120}
              className="rounded-md shadow-md"
            />
            <Typography variant="h6" className="font-bold">
              {minuman.Nama_Minuman}
            </Typography>
            <Typography variant="small" className="text-gray-700">
              Kategori: {minuman.Kategori_Minuman}
            </Typography>
            <Typography variant="small" className="text-gray-700">
              Harga: {formatRupiah(minuman.Harga_Minuman)}
            </Typography>
            <Typography variant="small" className="text-gray-700">
              Deskripsi: {minuman.Deskripsi_Minuman || "-"}
            </Typography>
          </div>
        ) : (
          <Typography className="text-center">
            Data minuman tidak ditemukan.
          </Typography>
        )}
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={() => tertutup(false)}
          variant="gradient"
          color="blue-gray"
        >
          Tutup
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalDetailMinuman;
