import React, { useEffect } from "react";
import {
  Dialog,
  Typography,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { XMarkIcon, DocumentIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const ModalLihatTransaksi = ({ terbuka, tertutup, transaksiYangTerpilih }) => {
  const image = require("@/assets/images/404.png");
  useEffect(() => {
    if (!transaksiYangTerpilih) {
      tertutup(false);
    }
  }, [transaksiYangTerpilih, tertutup]);

  const {
    idPesan = 1,
    pembeli = "Adrian",
    produk = "Ayam Goyeng",
    tanggal = "01/18/2023",
    harga = 25000,
    metodeBayar = "DANA",
  } = transaksiYangTerpilih || {};

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
        <IconButton
          variant="text"
          color="red"
          onClick={() => tertutup(false)}
          className="text-red-500 hover:bg-red-100 transition duration-200 rounded-full"
        >
          <XMarkIcon className="h-6 w-6" />
        </IconButton>
      </div>

      <DialogHeader className="text-black font-bold text-xl border-b border-gray-200">
        Detail Transaksi
      </DialogHeader>
      <DialogBody divider className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <Card className="w-full col-span-2 mb-10 ">
            <div className="grid grid-cols-3 gap-4 ">
              <div className="w-full p-4">
                <Typography className=" text-gray-700">ID Pesan</Typography>
                <Typography className="p-2 rounded-md text-black">
                  {idPesan}
                </Typography>
              </div>

              <div className="w-full p-4">
                <Typography className=" text-gray-700">Tanggal</Typography>
                <Typography className="p-2  rounded-md text-black">
                  {tanggal}
                </Typography>
              </div>
              <div className="w-full p-4">
                <Typography className=" text-gray-700">Pembeli</Typography>
                <Typography className="p-2  rounded-md text-black">
                  {pembeli}
                </Typography>
              </div>
            </div>
          </Card>
          <Card className="w-full col-span-1  ">
            <CardHeader className="rounded-md relative h-10 flex items-left font-bold">
              <Typography variant="h6" className="p-2 text-left text-black">
                Detail Biaya
              </Typography>
            </CardHeader>

            <div className="grid grid-cols-2 ">
              <div className="w-full p-2">
                <Typography className=" text-gray-700">Transaksi</Typography>
              </div>
              <div className="w-full p-2">
                <Typography className=" text-black ">{metodeBayar}</Typography>
              </div>
              <div className="w-full p-2">
                <Typography className=" text-gray-700">Produk</Typography>
              </div>
              <div className="w-full p-2">
                <Typography className=" text-black">{produk}</Typography>
              </div>
              <div className="w-full p-2">
                <Typography className=" text-gray-700">Total</Typography>
              </div>
              <div className="w-full p-2">
                <Typography className=" text-black">{harga}</Typography>
              </div>
            </div>
          </Card>
          <Card className="w-full col-span-1">
            <CardHeader className="rounded-md relative h-10 flex items-left font-bold">
              <Typography variant="h6" className="p-2 text-left text-black">
                Dokumen
              </Typography>
            </CardHeader>
            <div className="flex h-full items-center gap-2 p-4">
              <Card className="w-24 h-24 ">
                <Image
                  className="rounded-md w-full h-full object-cover"
                  src={image}
                  alt="card-image"
                />
              </Card>
              <div className="flex flex-col justify-center space-y-3 text-left ">
                <Typography className="text-sm ">Menerima</Typography>
                <div className="flex items-left  ">
                  <div className="text-xs">
                    <DocumentIcon />
                  </div>
                  <div className="text-sm text-left">Bon Pembayaran.pdf</div>
                </div>
                <Button variant="text" size="sm">
                  Unduh Dokumen
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={() => tertutup(false)}
          variant="outlined"
          color="gray"
          className="hover:bg-gray-200 transition duration-200"
        >
          Tutup
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalLihatTransaksi;
