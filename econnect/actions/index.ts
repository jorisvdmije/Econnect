"use server";

import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import path from "path";
import { formSchema } from "@/schemas";
import { z } from "zod";
// export const createBranch = async (
//     values: z.infer<typeof CreateBranchSchema>
//   ) => {
//     const user = await currentUser();
//     if (!user) {
//       return { error: "Unauthorized" };
//     }

//     const validatedFields = CreateBranchSchema.safeParse(values);

//     if (!validatedFields.success) {
//       return { error: "Invalid fields!" };
//     }

//     const { value, color } = validatedFields.data;

//     const branch = await db.branch.create({
//       data: {
//         value,
//         employerId: user.id,
//       },
//     });

//     return { success: "Branch created!" };
//   };

export const editGroep = async (formData: z.infer<typeof formSchema>) => {
  const validatedFields = formSchema.safeParse(formData);
  console.log("hee", validatedFields);
  if (!validatedFields.success) {
    console.log("Invalid fields!");
    return { error: "Invalid fields!" };
  }
  const groepen = validatedFields.data;
  const newGroepen = Object.entries(groepen).map(([key, value]) => ({
    groep: key,
    tarief: value,
  }));
  try {
    const data = await fs.readFile(path.join(process.cwd(), "../data.json"));
    const fetchedData = JSON.parse(data.toString());
    fetchedData.groepen = newGroepen;
    console.log(path.join(process.cwd(), "../data.json"));
    await fs.writeFile(
      path.join(process.cwd(), "../data.json"),
      JSON.stringify(fetchedData, null, 2)
    );

    revalidatePath("/");
    console.log("success");
    return { success: "Success" };
  } catch (error) {
    return { error: error };
  }
};
