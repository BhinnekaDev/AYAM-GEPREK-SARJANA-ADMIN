"use client";
import React, { useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  HomeIcon,
  UserGroupIcon,
  UserCircleIcon,
  PresentationChartBarIcon,
  CreditCardIcon,
  DocumentPlusIcon,
  UserIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { IoPersonCircle } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaBowlFood } from "react-icons/fa6";
import { VscListFlat } from "react-icons/vsc";
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
  const { adminData } = useTampilkanAdminSesuaiID();
  const { navbarAktif, handlenavbarAktif } = useNavbarAktif();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const lokasiSaatIni = window.location.pathname;
  const tanganiKeluarAkun = useKeluarAkun();
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* MOBILE */}
      <div className="p-0 sm:hidden bg-white flex items-center">
        <IconButton variant="text" size="lg" onClick={openSidebar}>
          <VscListFlat className="h-8 w-8 " />
        </IconButton>
        <Typography className="text-xl">Ayam Geprek Sarjana</Typography>
      </div>
      <Drawer
        className="sm:hidden w-20"
        open={sidebarOpen}
        onClose={closeSidebar}
      >
        <Card className="sm:hidden h-full rounded-none w-20 p-2 shadow-lg flex flex-col justify-center items-center">
          <div className="flex flex-col gap-2">
            <IconButton
              variant="text"
              size="lg"
              className={
                navbarAktif === "/beranda" ? "bg-blue-500 text-white" : ""
              }
              onClick={() => handlenavbarAktif("/beranda")}
            >
              <HomeIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              variant="text"
              size="lg"
              className={
                navbarAktif === "/dataAdmin" ? "bg-blue-500 text-white" : ""
              }
              onClick={() => handlenavbarAktif("/dataAdmin")}
            >
              <UserCircleIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              variant="text"
              size="lg"
              className={
                navbarAktif === "/dataPengguna" ? "bg-blue-500 text-white" : ""
              }
              onClick={() => handlenavbarAktif("/dataPengguna")}
            >
              <UserIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              variant="text"
              size="lg"
              className={
                navbarAktif === "/dataMakanan" ? "bg-blue-500 text-white" : ""
              }
              onClick={() => handlenavbarAktif("/dataMakanan")}
            >
              <FaBowlFood className="h-5 w-5" />
            </IconButton>
            <IconButton
              variant="text"
              size="lg"
              className={
                navbarAktif === "/dataMinuman" ? "bg-blue-500 text-white" : ""
              }
              onClick={() => handlenavbarAktif("/dataMinuman")}
            >
              <MdEmojiFoodBeverage className="h-5 w-5" />
            </IconButton>
            <IconButton
              variant="text"
              size="lg"
              className={
                navbarAktif === "/dataTransaksi" ? "bg-blue-500 text-white" : ""
              }
              onClick={() => handlenavbarAktif("/dataTransaksi")}
            >
              <CreditCardIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              variant="text"
              size="lg"
              className={
                navbarAktif === "/dataTestimoni" ? "bg-blue-500 text-white" : ""
              }
              onClick={() => handlenavbarAktif("/dataTestimoni")}
            >
              <DocumentPlusIcon className="h-5 w-5" />
            </IconButton>
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <IconButton
              variant="text"
              size="lg"
              className={
                navbarAktif === "/profile" ? "bg-blue-500 text-white" : ""
              }
              onClick={() => handlenavbarAktif("/profile")}
            >
              <IoPersonCircle className="h-5 w-5" />
            </IconButton>
            <IconButton
              variant="text"
              size="lg"
              className="hover:bg-gray-200 transition ease-in-out duration-200 rounded-lg"
              onClick={tanganiKeluarAkun}
            >
              <IoMdLogOut className="h-5 w-5" />
            </IconButton>
          </div>
        </Card>
      </Drawer>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer} className="md:hidden">
        <Card className="h-full w-64 p-4 shadow-lg">
          <Typography variant="h6" className="mb-4 text-center">
            AYAM GEPREK SARJANA
          </Typography>
          <List className="flex flex-col justify-between flex-grow">
            <div>
              <ListItem
                className={`${
                  navbarAktif === "/beranda" ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handlenavbarAktif("/beranda")}
              >
                <ListItemPrefix></ListItemPrefix>
                Beranda
              </ListItem>
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
      </Drawer>

      {/* WEBSITE */}
      <Card className="h-[calc(100vh-2rem)] hidden md:flex md:flex-col w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5  ">
        <div className="mb-4 p-2 md:p-4 flex justify-start items-center">
          <Typography variant="h6" color="blue-gray">
            AYAM GEPREK SARJANA
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

            <Accordion
              open={
                bukaDropdown === 1 ||
                lokasiSaatIni === "/dataAdmin" ||
                lokasiSaatIni === "/dataPengguna"
              }
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-5 w-5 transition-transform ${
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
                  navbarAktif === "/dataAdmin" ||
                  navbarAktif === "/dataPengguna"
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
                    className={`text-start w-full ${
                      navbarAktif === "/dataAdmin" ||
                      navbarAktif === "/dataPengguna"
                        ? "text-white"
                        : "text-blue-500"
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
                      navbarAktif === "/dataAdmin"
                        ? "bg-blue-500 text-white"
                        : ""
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
                  navbarAktif === "/dataMakanan" ||
                  navbarAktif === "/dataMinuman"
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
    </>
  );
}

export default Sidebar;
