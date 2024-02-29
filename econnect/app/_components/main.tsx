"use client";
import { promises as fs } from "fs";
import path from "path";

import EmailButton from "@/components/email-button";
import Sidebar from "@/components/sidebar2";
import { columns_econnect } from "@/components/table/columns-econnect";
import { columns_foutive_tarieven } from "@/components/table/columns_foutive_tarief";
import { DataTable } from "@/components/table/data-table";
import { Econnect } from "@/components/table/data/schema";
import { getEconnectWrongPrices } from "@/utils";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Groep } from "@/types";
import Navbar from "@/components/navbar";

type Props = {
  econnectTasks: Econnect[];
  fetchedGroepen: Groep[];
};

export default function Main({ econnectTasks, fetchedGroepen }: Props) {
  const wrongPricesEconnect = getEconnectWrongPrices(
    fetchedGroepen,
    econnectTasks
  );
  return (
    <main className=" flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar groepen={fetchedGroepen} />
      {/* <Sidebar groepen={fetchedGroepen} /> */}
      <div className="flex w-full relative flex-col border rounded-md shadow-lg p-6 m-6">
        <h1 className="text-2xl font-bold text-blue-400 mb-8">
          Actieve diensten
        </h1>
        <DataTable data={econnectTasks} columns={columns_econnect} />
      </div>
      <div className="flex w-full relative flex-col border rounded-md shadow-lg p-6 m-6">
        <h1 className="text-2xl font-bold text-red-400 mb-8">
          Foutive tarieven
        </h1>
        <DataTable data={wrongPricesEconnect} columns={columns_econnect} />

        {/* <DataTable data={foutive_tarieven} columns={columns_foutive_tarieven} /> */}
      </div>
      <EmailButton />
    </main>
  );
}
