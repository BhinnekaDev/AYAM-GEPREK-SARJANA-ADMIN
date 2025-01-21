import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const chartConfig = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Pemasukan",
      data: [50, 100, 300, 320, 500, 450, 400, 300, 600],
    },
    {
      name: "Pengeluaran",
      data: [40, 80, 200, 250, 400, 350, 300, 200, 500],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#4CAF50", "#F44336"], // Green for Pemasukan, Red for Pengeluaran
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    tooltip: {
      theme: "dark",
    },
  },
};

function Dashboard() {
  return (
    <div className="p-4 h-screen bg-gray-100">
      {/* Pemasukan dan Pengeluaran Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <Card className="p-4 shadow-md">
          <Typography className="text-blue-gray-900">Pemasukan</Typography>
          <Typography variant="h5" className="text-blue-500">
            Rp 8,672,200
          </Typography>
          <Typography className="text-sm text-green-500">+16.0%</Typography>
        </Card>
        <Card className="p-4 shadow-md">
          <Typography className="text-blue-gray-900">Pengeluaran</Typography>
          <Typography variant="h5" className="text-red-500">
            Rp 14,376,160
          </Typography>
          <Typography className="text-sm text-red-500">+35.2%</Typography>
        </Card>
      </div>

      {/* Grafik Section */}
      <Card>
        <div className="flex items-center gap-4 p-4">
          <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
            <Square3Stack3DIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Cash Flow Chart
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Visualisasi data pemasukan dan pengeluaran.
            </Typography>
          </div>
        </div>
        <div className="px-4 pb-4">
          <Chart {...chartConfig} />
        </div>
      </Card>

      {/* Aktivitas Terbaru */}
      <div className="mt-5">
        <Card className="p-4 shadow-md">
          <Typography variant="h4" className="mb-3 text-blue-gray-900">
            Aktivitas Terbaru
          </Typography>
          <div className="grid grid-cols-4 gap-5">
            <div>
              <Typography className="text-blue-gray-900">
                Theo Lawrence
              </Typography>
              <Typography className="text-sm">Oct 18, 2024</Typography>
            </div>
            <div>
              <Typography className="text-green-500">€5000.00</Typography>
            </div>
            <div>
              <Typography className="text-sm text-green-500">
                Success
              </Typography>
            </div>
            <div>
              <Typography className="text-blue-gray-900">
                Credit Card
              </Typography>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
