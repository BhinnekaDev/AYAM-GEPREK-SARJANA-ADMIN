"use client";
import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  HomeIcon,
  UserGroupIcon,
  UserCircleIcon,
  PresentationChartBarIcon,
  ClockIcon,
  CreditCardIcon,
  DocumentPlusIcon,
  PowerIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { IoPersonCircle } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaBowlFood } from "react-icons/fa6";
import { MdEmojiFoodBeverage } from "react-icons/md";
import useNavbarAktif from "@/hooks/Frontend/useSidebarAktif";

// MY HOOKS
import useKeluarAkun from "@/hooks/Backend/useKeluarAkun";
import useTampilkanAdminSesuaiID from "@/hooks/Backend/useTampilkanAdminSesuaiID";

const profilAdmin = require("@/assets/images/profil.jpg");

function Sidebar() {
  const [bukaDropdown, setBukaDropdown] = useState(0);
  const [bukaDropdown2, setBukaDropdown2] = useState(0);
  const [bukaDropdown3, setBukaDropdown3] = useState(0);
  const tanganiKeluarAkun = useKeluarAkun();
  const { adminData } = useTampilkanAdminSesuaiID();

  const { navbarAktif, handlenavbarAktif } = useNavbarAktif();
  const lokasiSaatIni = window.location.pathname;

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 flex flex-col">
      <div className="mb-4 p-2">
        <Typography variant="h4" color="blue-gray">
          SARJANA GEPREK
        </Typography>
      </div>
      <hr className="border border-gray-300 w-72 self-center" />

      <List className="flex flex-col justify-between flex-grow">
        <div>
          <ListItem
            className={`${
              navbarAktif === "/beranda" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handlenavbarAktif("/beranda")}
          >
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Beranda
          </ListItem>

          {/* Dropdown Partisipan */}
          <Accordion
            open={
              bukaDropdown === 1 ||
              lokasiSaatIni === "/dataAdmin" ||
              lokasiSaatIni === "/dataPengguna"
            }
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`ml-auto h-5 w-5 transition-transform ${
                  bukaDropdown === 1 ||
                  lokasiSaatIni === "/dataAdmin" ||
                  lokasiSaatIni === "/dataPengguna"
                    ? "rotate-180"
                    : ""
                }`}
              />
            }
          >
            <ListItem
              className={`${
                navbarAktif === "/dataAdmin" || navbarAktif === "/dataPengguna"
                  ? "bg-blue-500 p-0"
                  : "p-0"
              }`}
              onClick={() => setBukaDropdown(bukaDropdown === 1 ? 0 : 1)}
            >
              <AccordionHeader className="p-3 border-none">
                <ListItemPrefix>
                  <UserGroupIcon
                    className={`${
                      navbarAktif === "/dataAdmin" ||
                      navbarAktif === "/dataPengguna"
                        ? "text-white h-5 w-5"
                        : "h-5 w-5"
                    }`}
                  />
                </ListItemPrefix>
                <Typography
                  className={`${
                    navbarAktif === "/dataAdmin" ||
                    navbarAktif === "/dataPengguna"
                      ? "text-white mr-auto font-normal"
                      : "mr-auto font-normal"
                  }`}
                >
                  Partisipan
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem
                  className={`${
                    navbarAktif === "/dataAdmin" ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => handlenavbarAktif("/dataAdmin")}
                >
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Admin
                </ListItem>
                <ListItem
                  className={`${
                    navbarAktif === "/dataPengguna"
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => handlenavbarAktif("/dataPengguna")}
                >
                  <ListItemPrefix>
                    <UserIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Pengguna
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Dropdown Produk */}
          <Accordion
            open={
              bukaDropdown2 === 2 ||
              lokasiSaatIni === "/dataMakanan" ||
              lokasiSaatIni === "/dataMinuman"
            }
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  bukaDropdown2 === 2 ||
                  lokasiSaatIni === "/dataMakanan" ||
                  lokasiSaatIni === "/dataMinuman"
                    ? "rotate-180"
                    : ""
                }`}
              />
            }
          >
            <ListItem
              className={`${
                navbarAktif === "/dataMakanan" || navbarAktif === "/dataMinuman"
                  ? "bg-blue-500 p-0"
                  : "p-0"
              }`}
              onClick={() => setBukaDropdown2(bukaDropdown2 === 2 ? 0 : 2)}
            >
              <AccordionHeader className="p-3 border-none">
                <ListItemPrefix>
                  <PresentationChartBarIcon
                    className={`${
                      navbarAktif === "/dataMakanan" ||
                      navbarAktif === "/dataMinuman"
                        ? "text-white h-5 w-5"
                        : "h-5 w-5"
                    }`}
                  />
                </ListItemPrefix>
                <Typography
                  className={`${
                    navbarAktif === "/dataMakanan" ||
                    navbarAktif === "/dataMinuman"
                      ? "text-white mr-auto font-normal"
                      : "mr-auto font-normal"
                  }`}
                >
                  Produk
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem
                  className={`${
                    navbarAktif === "/dataMakanan"
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => handlenavbarAktif("/dataMakanan")}
                >
                  <ListItemPrefix>
                    <FaBowlFood className="h-5 w-5" />
                  </ListItemPrefix>
                  Makanan
                </ListItem>
                <ListItem
                  className={`${
                    navbarAktif === "/dataMinuman"
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => handlenavbarAktif("/dataMinuman")}
                >
                  <ListItemPrefix>
                    <MdEmojiFoodBeverage className="h-5 w-5" />
                  </ListItemPrefix>
                  Minuman
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Dropdown Aktivitas */}
          <Accordion
            open={
              bukaDropdown3 === 1 ||
              lokasiSaatIni === "/dataTransaksi" ||
              lokasiSaatIni === "/dataTestimoni"
            }
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`ml-auto h-5 w-5 transition-transform ${
                  bukaDropdown3 === 1 ||
                  lokasiSaatIni === "/dataTransaksi" ||
                  lokasiSaatIni === "/dataTestimoni"
                    ? "rotate-180"
                    : ""
                }`}
              />
            }
          >
            <ListItem
              className={`${
                navbarAktif === "/dataTransaksi" ||
                navbarAktif === "/dataTestimoni"
                  ? "bg-blue-500 p-0"
                  : "p-0"
              }`}
              onClick={() => setBukaDropdown3(bukaDropdown3 === 1 ? 0 : 1)}
            >
              <AccordionHeader className="p-3 border-none">
                <ListItemPrefix>
                  <ClockIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography
                  className={`${
                    navbarAktif === "/dataTransaksi" ||
                    navbarAktif === "/dataTestimoni"
                      ? "text-white mr-auto font-normal"
                      : "mr-auto font-normal"
                  }`}
                >
                  Aktivitas
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem
                  className={`${
                    navbarAktif === "/dataTransaksi"
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => handlenavbarAktif("/dataTransaksi")}
                >
                  <ListItemPrefix>
                    <CreditCardIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Transaksi
                </ListItem>
                <ListItem
                  className={`${
                    navbarAktif === "/dataTestimoni"
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => handlenavbarAktif("/dataTestimoni")}
                >
                  <ListItemPrefix>
                    <DocumentPlusIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Testimoni
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
        </div>

        <div>
          <div className="grid grid-cols-1 space-y-1">
            <div
              className={`${
                navbarAktif === "/profile"
                  ? "bg-blue-500 text-white flex items-center gap-3 hover:bg-gray-200 px-2 py-4 rounded-lg transition ease-in-out duration-200 cursor-pointer"
                  : "flex items-center gap-3 hover:bg-gray-200 px-2 py-4 rounded-lg transition ease-in-out duration-200 cursor-pointer"
              }`}
              onClick={() => handlenavbarAktif("/profile")}
            >
              <IoPersonCircle className="h-6 w-6" />
              <Typography className="mr-auto font-normal">
                Profile Saya
              </Typography>
            </div>
            <div
              className="flex items-center gap-3 hover:bg-gray-200 px-2 py-4 rounded-lg transition ease-in-out duration-200 cursor-pointer"
              onClick={tanganiKeluarAkun}
            >
              <IoMdLogOut className="h-6 w-6" />
              <Typography color="blue-gray" className="mr-auto font-normal">
                Keluar
              </Typography>
            </div>
          </div>
          <div className="border-t border-gray-400 mt-4" />

          <div className="mt-4 flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center w-full">
              <Image
                src={profilAdmin}
                width={40}
                height={40}
                alt="Profile Picture"
                className="rounded-full"
              />
              <div className="ml-4">
                <Typography className="font-semibold text-sm">
                  {adminData?.Nama_Depan + " " + adminData?.Nama_Belakang}
                </Typography>
                <Typography className="text-xs text-gray-500">
                  {adminData?.Email}
                </Typography>
              </div>
            </div>
          </div>
          <Typography className=" text-xs text-gray-400 mt-5 flex justify-center">
            @ 2025 Bhineka Developer.
          </Typography>
        </div>
      </List>
    </Card>
  );
}

export default Sidebar;
