"use client";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Cross1Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { editGroep } from "@/actions";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "@/schemas";
import { Form, FormControl, FormField, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { fetchData } from "@/actions/fetch-data";
import { revalidatePath } from "next/cache";

type Groep = {
  groep: string;
  tarief: number;
};

type Props = {
  groepen: Groep[];
};

function areObjectsEqual(
  obj1: Record<string, number>,
  obj2: Record<string, number>
) {
  // Get the keys of the first object
  const keys = Object.keys(obj1);

  // Check if both objects have the same number of keys
  if (keys.length !== Object.keys(obj2).length) {
    return false;
  }

  // Iterate over the keys and compare values
  for (let key of keys) {
    // If the value of the current key in obj1 is not equal to the value of the same key in obj2, return false
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  // If all key-value pairs are equal, return true
  return true;
}

export default function Navbar({ groepen }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const aantalGroepen = groepen.length;
  const aantalGroepenMetTarief = groepen.filter((groep) => groep.tarief).length;

  const formGroepen = useMemo(() => {
    let formGroepen = {} as { [key: string]: number };
    groepen.forEach((groep) => {
      formGroepen[groep.groep] = groep.tarief;
    });
    return formGroepen;
  }, [groepen]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formGroepen,
  });

  const isFormChanged = () => {
    return !areObjectsEqual(form.watch(), formGroepen);
  };
  const { mutate: refreshData, isPending: isRefreshing } = useMutation({
    mutationFn: async () => {
      const result = await fetchData();
      console.log(result);

      return;
    },
    onSuccess: () => {
      toast.success("De data is vers 🥰");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Er is iets fout gegaan");
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: z.infer<typeof formSchema>) => {
      return editGroep(formData);
    },
    onSuccess: () => {
      toast.success("Groepen zijn aangepast");
    },
    onError: (error) => {
      toast.error("Er is iets fout gegaan");
    },
  });
  return (
    <nav
      className={cn(
        "z-10 w-[200px] p-4 transition-all duration-300 fixed top-0 right-0 h-[150px] flex flex-row justify-around items-center",
        isOpen && "w-[500px] h-screen "
      )}
    >
      <div className="bg-white h-full w-full shadow-lg border m-4 rounded-md p-4 flex">
        {!isOpen && (
          <div
            className={cn(
              "opacity-100 transition-opacity duration-[900ms]",
              isOpen && "opacity-0"
            )}
          >
            <Button
              className="w-full"
              variant={"ghost"}
              disabled={isRefreshing}
              onClick={() => refreshData()}
            >
              {" "}
              Refresh data
            </Button>
            <Separator />
            <Button
              variant={"ghost"}
              className="w-full flex"
              onClick={() => setIsOpen(true)}
            >
              Groepen
              <Badge
                className={cn(
                  "ml-2 bg-green-300",
                  aantalGroepen - aantalGroepenMetTarief > 0 && "bg-red-300"
                )}
              >
                {aantalGroepen - aantalGroepenMetTarief}
              </Badge>
            </Button>
          </div>
        )}
        {isOpen && (
          <div
            className={cn(
              "opacity-0 duration-600 transition-opacity delay-150 relative w-full h-full flex flex-col",
              isOpen && "opacity-100"
            )}
          >
            <div
              onClick={() => setIsOpen(false)}
              className={cn(
                "items-center justify-center w-8 h-8 rounded full hover:bg-accent transition-all delay-150 duration-1000 cursor-pointer"
              )}
            >
              <Cross1Icon />
            </div>
            <div className="flex flex-row relative h-[50px] mb-4">
              <div className="truncate w-3/4 text-2xl font-semibold">
                Groepen
              </div>
              <div className="text-2xl font-semibold">Tarief</div>
            </div>
            <Form {...form}>
              <form
                id="myForm"
                onSubmit={form.handleSubmit((data) => {
                  mutate(data);
                })}
                className="overflow-y-auto flex-1 mb-4 "
              >
                {groepen &&
                  groepen.map((groep) => (
                    <div className="flex flex-row relative gap-3 mb-2">
                      <div key={groep.groep} className="truncate w-3/4">
                        {groep.groep}
                      </div>
                      <div className="flex w-1/4">
                        <FormField
                          control={form.control}
                          name={groep.groep}
                          render={({ field }) => (
                            <>
                              <FormControl>
                                <Input
                                  type="number"
                                  value={field.value}
                                  onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </>
                          )}
                        />
                      </div>
                    </div>
                  ))}

                {/* <Button name="submit" type="submit">
              Save
            </Button> */}
                {/* <Button name="cancel">Cancel</Button> */}
              </form>
            </Form>
            <div className="flex flex-row relative h-[50px] items-center justify-between gap-x-4">
              <Button
                disabled={!isFormChanged()}
                form="myForm"
                type="submit"
                className="flex-1"
              >
                {" "}
                Bewaar veranderingen
              </Button>
              <Button
                onClick={() => form.reset()}
                className="flex-1"
                disabled={!isFormChanged()}
              >
                Annuleer veranderingen
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
