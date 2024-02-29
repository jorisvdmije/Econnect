// "use client";
// import { cn } from "@/lib/utils";
// import { CheckIcon, Cross1Icon, Cross2Icon } from "@radix-ui/react-icons";
// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";

// type Props = {
//   groepen: {
//     [key: string]: number;
//   };
//   setGroepen: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
// };

// export default function Sidebar({ groepen, setGroepen }: Props) {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const onUpdate = () => {
//     if (!selectedGroep) return;
//     const newGroepen = {
//       ...groepen,
//       [selectedGroep?.groep]: selectedGroep?.tarief,
//     } as { [key: string]: number };
//     const saveDataToJsonFile = async () => {
//       try {
//         const response = await fetch("/api/groepen", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newGroepen),
//         });

//         if (response.ok) {
//           console.log("JSON file updated successfully");
//           setGroepen(newGroepen);
//         } else {
//           console.error("Failed to update JSON file");
//         }
//       } catch (error) {
//         console.error("Error updating JSON file:", error);
//       }
//     };
//     saveDataToJsonFile();
//   };

//   // useEffect(() => {
//   //   // Function to save data to JSON file
//   //   const saveDataToJsonFile = async () => {
//   //     try {
//   //       const response = await fetch("/api/groepen", {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify(groepen),
//   //       });

//   //       if (response.ok) {
//   //         console.log("JSON file updated successfully");
//   //       } else {
//   //         console.error("Failed to update JSON file");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error updating JSON file:", error);
//   //     }
//   //   };

//   //   saveDataToJsonFile(); // Call the function whenever data changes
//   // }, [groepen]);

//   const [selectedGroep, setSelectedGroep] = React.useState<{
//     [key: string]: number | string;
//   } | null>(null);

//   return (
//     <>
//       <Button
//         className="fixed top-0 right-0 z-50"
//         onClick={() => setIsOpen((value) => !value)}
//       >
//         <Cross1Icon />
//       </Button>
//       <div
//         className={cn(
//           "w-[0px] h-screen fixed top-0 right-0 bg-white z-10 overflow-auto p-4",
//           isOpen && "w-[500px] transition-all duration-300  border-l shadow-lg"
//         )}
//       >
//         <div className="flex flex-row relative mb-6 h-[50px]">
//           <div className="truncate w-3/4 text-2xl font-semibold">groepen</div>
//           <div className="w-1/4">tarief</div>
//         </div>
//         <div className="overflow-y-auto h-[calc(100vh-50px)]">
//           {groepen &&
//             Object.entries(groepen).map(([groep, tarief]) => (
//               <div className="flex flex-row relative gap-3 mb-2">
//                 <div key={groep} className="truncate w-3/4">
//                   {groep}
//                 </div>
//                 <div className="flex ">
//                   <Input
//                     value={
//                       selectedGroep?.groep == groep
//                         ? selectedGroep?.tarief
//                         : tarief
//                     }
//                     type="number"
//                     onChange={(e) =>
//                       setSelectedGroep({ groep: groep, tarief: e.target.value })
//                     }
//                     onFocus={() =>
//                       setSelectedGroep({ groep: groep, tarief: tarief })
//                     }
//                   />
//                   {selectedGroep?.groep === groep && (
//                     <>
//                       <Button
//                         className=""
//                         variant={"success"}
//                         onClick={onUpdate}
//                       >
//                         <CheckIcon />
//                       </Button>
//                       <Button
//                         className=""
//                         variant={"destructive"}
//                         onClick={() => setSelectedGroep(null)}
//                       >
//                         <Cross2Icon />
//                       </Button>
//                     </>
//                   )}
//                 </div>
//                 {/* <div className="w-1/4">{tarief}</div> */}
//               </div>
//             ))}
//         </div>
//       </div>
//     </>
//   );
// }
