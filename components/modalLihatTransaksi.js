import React, { useEffect } from "react";
import { Dialog, Typography, DialogHeader, DialogBody, DialogFooter, IconButton, Input, Button } from "@material-tailwind/react";
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
      className="bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-4"
    >
      <div className="absolute top-3 right-3">
        <IconButton variant="text" color="red" onClick={() => tertutup(false)} className="text-red-500 hover:bg-transparent">
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-black">Detail Transaksi</DialogHeader>
      <DialogBody divider>
        <form className="flex flex-col gap-4">
          <Typography className="-mb-2" variant="h6">
            ID Pesan
          </Typography>
          <Input label="Masukkan ID Pesan" size="lg" value={idPesan} disabled />

          <Typography className="-mb-2" variant="h6">
            Pembeli
          </Typography>
          <Input label="Nama Pembeli" size="lg" value={pembeli} disabled />

          <Typography className="-mb-2" variant="h6">
            Produk
          </Typography>
          <Input label="Nama Produk" size="lg" value={produk} disabled />

          <Typography className="-mb-2" variant="h6">
            Tanggal
          </Typography>
          <Input type="date" label="Tanggal Transaksi" size="lg" value={tanggal} disabled />

          <Typography className="-mb-2" variant="h6">
            Harga
          </Typography>
          <Input type="number" label="Harga Transaksi" size="lg" value={harga} disabled />

          <Typography className="-mb-2" variant="h6">
            Metode Bayar
          </Typography>
          <Input label="Metode Pembayaran" size="lg" value={metodeBayar} disabled />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => tertutup(false)} variant="gradient" color="black" className="opacity-100">
          Tutup
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalLihatTransaksi;
