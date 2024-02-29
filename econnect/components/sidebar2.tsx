"use client";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CheckIcon, Cross1Icon, Cross2Icon } from "@radix-ui/react-icons";
import React, { useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useFormState } from "react-dom";
import { editGroep } from "@/actions";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormMessage } from "./ui/form";
import { formSchema } from "@/schemas";
import { toast } from "sonner";

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

export default function Sidebar({ groepen }: Props) {
  const aantalGroepen = groepen.length;
  const aantalGroepenMetTarief = groepen.filter((groep) => groep.tarief).length;

  const [isOpen, setIsOpen] = React.useState(false);
  const formGroepen = useMemo(() => {
    let formGroepen = {} as { [key: string]: number };
    groepen.forEach((groep) => {
      formGroepen[groep.groep] = groep.tarief;
    });
    return formGroepen;
  }, [groepen]);
  console.log(formGroepen);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formGroepen,
  });

  const isFormChanged = () => {
    return !areObjectsEqual(form.watch(), formGroepen);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: z.infer<typeof formSchema>) => {
      console.log("submitting");
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
    <>
      <div className="fixed top-0 right-0 z-30">
        <div className="w-6 h-6 rounded-full top-2 right-2 bg-red-300 z-50 text-center">
          {aantalGroepen - aantalGroepenMetTarief}
        </div>
        <Button onClick={() => setIsOpen((value) => !value)}>
          <Cross1Icon />
        </Button>
      </div>
      <div
        className={cn(
          "w-[0px] h-screen fixed flex flex-col top-0 right-0 bg-white z-10 overflow-auto p-4",
          isOpen && "w-[500px] transition-all duration-300  border-l shadow-lg"
        )}
      >
        <div className="flex flex-row relative h-[50px] mb-4">
          <div className="truncate w-3/4 text-2xl font-semibold">groepen</div>
          <div className="w-1/4">tarief</div>
        </div>
        <Form {...form}>
          <form
            id="myForm"
            onSubmit={form.handleSubmit((data) => {
              console.log(data, "data");
              mutate(data);
            })}
            className="overflow-y-auto flex-1"
          >
            {groepen &&
              groepen.map((groep) => (
                <div className="flex flex-row relative gap-3 mb-2">
                  <div key={groep.groep} className="truncate w-3/4">
                    {groep.groep}
                  </div>
                  <div className="flex ">
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
    </>
  );
}
