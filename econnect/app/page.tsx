import { columns_econnect } from "@/components/table/columns-econnect";
import { DataTable } from "@/components/table/data-table";
import { taskSchema } from "@/components/table/data/schema";
import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import { z } from "zod";
import { columns_foutive_tarieven } from "@/components/table/columns_foutive_tarief";
import EmailButton from "@/components/email-button";
import Main from "./_components/main";
import Providers from "@/components/providers";
import { Groep } from "@/types";

async function getTasks(fetchedGroepen: Groep[]) {
  const data = await fs.readFile(path.join(process.cwd(), "../data.json"));

  const tasks = JSON.parse(data.toString())["econnect_data_niet_gekoppeld"];

  const tasksWithTarief = tasks.map((task) => {
    const groep = fetchedGroepen.find((g) => g.groep === task.description);
    return { ...task, tarief: groep?.tarief };
  });
  return tasksWithTarief;
  // return z.array(taskSchema).parse(tasks);
}
async function getGroepen() {
  const data = await fs.readFile(path.join(process.cwd(), "../data.json"));

  const fetchedTaskTypes = JSON.parse(data.toString())["taskTypes"];
  const fetchedGroepen = JSON.parse(data.toString())["groepen"];

  return { fetchedGroepen, fetchedTaskTypes };
  // return z.array(taskSchema).parse(tasks);
}
async function s() {
  const data = await fs.readFile(path.join(process.cwd(), "../data.json"));

  const tasks = JSON.parse(data.toString())["foutive_tarieven"];
  return tasks;
  // return z.array(taskSchema).parse(tasks);
}

export default async function Home() {
  const { fetchedGroepen, fetchedTaskTypes } = await getGroepen();
  const econnectTasks = await getTasks(fetchedGroepen);

  return (
    <Providers>
      <Main econnectTasks={econnectTasks} fetchedGroepen={fetchedGroepen} />
    </Providers>
  );
}
