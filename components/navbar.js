import React, { useState, useEffect } from "react";
import {
  Navbar,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

function Napbar() {
  return (
    <Navbar className="max-w-screen-2xl bg-white shadow-md">
      <div className="w-full flex justify-between text-blue-gray-900 p-4">
        <div className="space-y-2">
          <Typography>Total Admin</Typography>
          <Typography className="text-xl">10000</Typography>
        </div>
        <div className="flex items-center">
          <Button
            size="sm"
            className="items-center gap-2 focus:ring-0 bg-orange-400 w-48 h-8 justify-center"
          >
            <p className="text-white mx-auto">Add</p>
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default Napbar;
