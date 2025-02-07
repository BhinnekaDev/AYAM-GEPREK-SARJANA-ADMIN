import React, { useEffect } from "react";
import { Dialog, Typography, DialogHeader, DialogBody, DialogFooter, IconButton, Button } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ModalLihatTransaksi = ({ terbuka, tertutup, transaksiYangTerpilih }) => {
  useEffect(() => {
    if (!transaksiYangTerpilih) {
      tertutup(false);
    }
  }, [transaksiYangTerpilih, tertutup]);

  const { idPesan = 1, pembeli = "Adrian", produk = "Ayam Goyeng", tanggal = "01/18/2023", harga = 25000, metodeBayar = "DANA" } = transaksiYangTerpilih || {};

  return (
    <Dialog
      open={terbuka}
      handler={tertutup}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="sm"
      className="bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-4 rounded-lg shadow-2xl"
    >
      <div className="absolute top-3 right-3">
        <IconButton variant="text" color="red" onClick={() => tertutup(false)} className="text-red-500 hover:bg-red-100 transition duration-200 rounded-full">
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-black font-bold text-xl border-b border-gray-200">Detail Transaksi</DialogHeader>
      <DialogBody divider className="p-6 space-y-4">
        <form className="grid grid-cols-2 gap-4 text-center">
          <div>
            <Typography className="font-semibold text-gray-700">ID Pesan</Typography>
            <Typography className="p-2  rounded-md">{idPesan}</Typography>
          </div>

          <div>
            <Typography className="font-semibold text-gray-700">Tanggal</Typography>
            <Typography className="p-2  rounded-md">{tanggal}</Typography>
          </div>

          <div>
            <Typography className="font-semibold text-gray-700">Pembeli</Typography>
            <Typography className="p-2  rounded-md">{pembeli}</Typography>
          </div>

          <div>
            <Typography className="font-semibold text-gray-700">Produk</Typography>
            <Typography className="p-2  rounded-md">{produk}</Typography>
          </div>

          <div>
            <Typography className="font-semibold text-gray-700">Harga</Typography>
            <Typography className="p-2  rounded-md">{harga}</Typography>
          </div>

          <div>
            <Typography className="font-semibold text-gray-700">Metode Bayar</Typography>
            <Typography className="p-2  rounded-md">{metodeBayar}</Typography>
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => tertutup(false)} variant="outlined" color="gray" className="hover:bg-gray-200 transition duration-200">
          Tutup
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalLihatTransaksi;
