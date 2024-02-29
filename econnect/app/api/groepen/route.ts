import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const newData = await req.json(); // JSON data received from the client
    await updateJsonFile(newData); // Update the JSON file
    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error("Error updating JSON file:", error);
    return new Response("Unauthorized", { status: 500 });
  }
}

async function updateJsonFile(newData) {
  console.log(newData);

  const jsonFilePath = "./data.json";
  console.log(path.join(process.cwd()));
  const data = await fs.readFile(path.join(process.cwd(), "../data.json"));
  const a = JSON.parse(data.toString());
  console.log(a);
  a.groepen = newData;
  await fs.writeFile(
    path.join(process.cwd(), "../data.json"),
    JSON.stringify(a, null, 2)
  );
}
