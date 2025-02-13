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
const ModalDetailMakanan = ({ terbuka, tertutup, makanan }) => {
  return (
    <Dialog
      open={terbuka}
      handler={() => tertutup(false)}
      size="md"
      className="bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <DialogHeader className="text-black">Detail Makanan</DialogHeader>
      <DialogBody className="text-black">
        {makanan ? (
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={makanan.Gambar_Makanan || "/default-food.jpg"}
              alt={makanan.Nama_Makanan || "Gambar Makanan"}
              width={120}
              height={120}
              className="rounded-md shadow-md"
            />
            <Typography variant="h6" className="font-bold">
              {makanan.Nama_Makanan}
            </Typography>
            <Typography variant="small" className="text-gray-700">
              Kategori: {makanan.Kategori_Makanan}
            </Typography>
            <Typography variant="small" className="text-gray-700">
              Harga: {formatRupiah(makanan.Harga_Makanan)}
            </Typography>
            <Typography variant="small" className="text-gray-700">
              Deskripsi: {makanan.Deskripsi_Makanan || "-"}
            </Typography>
          </div>
        ) : (
          <Typography className="text-center">
            Data makanan tidak ditemukan.
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

export default ModalDetailMakanan;
