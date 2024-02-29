import { Econnect } from "@/components/table/data/schema";
import { Groep } from "@/types";

export const getEconnectWrongPrices = (
  groepen: Groep[],
  econnect: Econnect[]
): Econnect[] => {
  return econnect.filter((econnect) => {
    if (!econnect.tarief) {
      return false;
    }
    console.log(econnect.tarief, "tarief");
    const groep = groepen.find((groep) => {
      return econnect.description === groep.groep;
    });
    return econnect.tariefEconnect !== groep?.tarief;
  });
};

export const getPriceDifference = (
  econnect: Econnect,
  groepen: { [key: string]: number }
): number => {
  if (!groepen[econnect.description] || !econnect.tarief) {
    return 0;
  }
  return groepen[econnect.description] - econnect.tarief;
};
