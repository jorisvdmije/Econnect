"use server";

import { EconnectItem, Groep, WorkflowItem } from "@/types";
import fetchEconnect from "./fetch-econnect";
import fetchWorkflow from "./fetch-workflow";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";

// import { db } from "../lib/db/index.js";

// const groepen = {
//   Adviesvaardigheden: 22.5,
//   "Arbeids- en gezondheidspsychologie": 22.5,
//   "Basisopleiding coaching": 22.5,
//   "Bedrijfspsychologie en organisatiegedrag": 22.5,
//   "Begeleiding in organisaties": 25,
//   "Coaching en begeleidingskunde": 50,
//   "Communicatieve vaardigheden": 12.5,
//   Dyscalculie: 25,
//   "Integrale opdracht HBO Bachelor Toegepaste Psychologie fase 1": 30,
//   "Integrale opdracht HBO Bachelor Toegepaste Psychologie fase 3": 30,
//   "Interculturele psychiatrie": 11.5,
//   "Jeugdwet en jeugdhulp": 22.5,
//   Kinderopvang: 12.5,
//   "Management van kinderopvang": 22.5,
//   "Masterclass Gedragsbe\u00efnvloeding": 50,
//   "Masterclass Onderwijs- en Opleidingsmanagement": 50,
//   "Masterclass Onderwijspedagogiek": 50,
//   "Masterclass Ontwerpen en Realiseren van Leertrajecten": 50,
//   "Masterclass Psychologie en Gedrag": 50,
//   "Ondernemend gedrag (geschikt voor niveau 3 en 4) - K0072": 65,
//   "Ontwikkelings- en levensfasepsychologie": 22.5,
//   "Oplossingsgericht werken": 22.5,
//   "Organisatie en bestuur basisonderwijs": 22.5,
//   "Organisatie en kwaliteit VO/MBO": 22.5,
//   "Persoonlijke groei en zelfinzicht": 22.5,
//   "Professionele mediation": 25,
//   "Propedeuse Portfolio Bachelor Social Work profiel Welzijn en samenleving": 50,
//   "Zakelijk schrijven": 11.5,
//   "kinderen en gedragsproblemen": 11.5,
//   "Cognitieve psychologie": 0,
//   Didactiek: 0,
//   "Integrale opdracht HBO Bachelor Social Work fase 1": 0,
//   "Integrale opdracht HBO Consulent Seksuele Gezondheid (met subsidie) (e-learning)": 0,
//   "Management voor zorg en welzijn": 0,
//   "Masterclass Digitale Technologie voor Leren en Ontwikkelen": 0,
//   "Orthopedagogiek en begeleiding": 0,
//   "Portfolio fase 3 Bachelor Social Work profiel Zorg": 0,
//   "Portfolio fase 4 Bachelor Social Work profiel Zorg": 50,
//   "Post Bachelor Oplossingsgericht Coachen": 0,
//   "Professioneel en oplossingsgericht werken": 0,
//   "Sociaal domein en ontwikkelingen": 0,
//   "Sociaal-maatschappelijke problematiek": 0,
//   "Sociale psychologie": 0,
//   "Integrale opdracht HBO Bachelor Toegepaste Psychologie fase 3 (e-learning)": 0,
//   "Integrale opdracht HBO Bachelor Pedagogiek fase 2": 0,
//   "Gedrag in organisaties": 0,
//   "Integrale opdracht HBO Bachelor Pedagogiek fase 3": 0,
//   "Interventies sociaal werk": 0,
//   "Kinderen en gedragsproblemen": 0,
//   "Pedagogisch handelen": 0,
// };

async function mainAsync() {
  // Use Promise.all to run both functions in parallel
  const [fetchedEconnenctData, fetchedWorkflowData] = await Promise.all([
    fetchEconnect(),
    fetchWorkflow(),
  ]);

  return { fetchedEconnenctData, fetchedWorkflowData };
}
export const fetchData = async () => {
  const jsonData = await fs.readFile(
    "/Users/jorisvdmije/Desktop/programming/webscraping/data.json"
  );
  const data = JSON.parse(jsonData.toString());
  const groepen = data["groepen"] as Groep[];

  const econnectData = data["econnect_data_niet_gekoppeld"] as EconnectItem[];
  const workflowData = data["workflow_data_niet_gekoppeld"] as WorkflowItem[];
  //   const econnectData = [];
  let fetchedIds: string[] = [];
  const { fetchedEconnenctData, fetchedWorkflowData } = await mainAsync();

  fetchedEconnenctData.forEach((fetchedEconnectItem) => {
    const econnectId = fetchedEconnectItem.examSubscription.moduleInstanceId;
    const econnectGroep = fetchedEconnectItem.examSubscription.moduleName;
    const econnectTarief = fetchedEconnectItem.tariffValue;
    const econnectStudent = fetchedEconnectItem.studentName;

    // Assuming 'groepen' is an object where keys are group names and values are tariffs
    const groep = groepen.find((groep) => groep.groep === econnectGroep);
    if (!groep) {
    }
    fetchedEconnectItem.tarief = groep?.tarief || 0;

    const id = fetchedEconnectItem.studentName
      ? `${econnectId}${econnectStudent}`
      : econnectId;

    const isOld = econnectData.some((item) => item.id === id);

    if (!isOld) {
      const newEconnectItem = {
        id: id,
        description: econnectGroep,
        tariefEconnect: econnectTarief,
        tarief: groep?.tarief || 0,
        status: "actief",
        taskDate: fetchedEconnectItem.taskDate,
        taskType: fetchedEconnectItem.taskType,
        studentName: econnectStudent,
        workflowId: null,
      };

      econnectData.push(newEconnectItem);
    }

    // Assuming 'fetchedIds' is an array to track all processed IDs
    fetchedIds.push(id);
  });

  fetchedWorkflowData.forEach((fetchedWorkflowItem) => {
    const workflowId = fetchedWorkflowItem.id;

    if (workflowData.some((item) => item.id === workflowId)) {
      return; // Skip to next iteration
    }

    const dateOnly = fetchedWorkflowItem.ExpectedDeliveryDate.split("T")[0];

    const newWorkflowItem = {
      id: workflowId,
      amount: fetchedWorkflowItem.QuantityOrdered,
      price: fetchedWorkflowItem.PriceDC,
      taskDate: dateOnly,
      description: fetchedWorkflowItem.Descr,
      amountAssigned: 0,
    };

    workflowData.push(newWorkflowItem);
  });

  econnectData.forEach((item) => {
    // Check if still active
    if (!fetchedIds.includes(item.id)) {
      item.status = "nietActief";
    }

    const econnectId = item.id;

    fetchedWorkflowData.forEach((value, index) => {
      const workflowDate = value.taskDate;
      const workflowOpdrachtNaam = value.description;
      const econnectOpdrachtNaam = item.description;
      const econnectDate = item.taskDate;

      if (workflowDate === null || econnectDate === null) {
        return; // Equivalent to 'continue' in a for loop
      }

      if (
        workflowDate == econnectDate &&
        workflowOpdrachtNaam.includes(econnectOpdrachtNaam)
      ) {
        if (value.amountAssigned < value.amount) {
          value.amountAssigned += 1;

          item.workflowId = value.id;
        }
      }
    });
  });

  const jdata = JSON.stringify(data, null, 2);

  await fs.writeFile(
    "/Users/jorisvdmije/Desktop/programming/webscraping/data.json",
    jdata
  );
  revalidatePath("/");
  console.log("data");
  return { success: true };
};
//   await db.$transaction([
//     db.econnect.deleteMany({}),
//     db.econnect.createMany({
//       data: econnectData,
//     }),
//   ]);

//   await db.$transaction([
//     db.workflow.deleteMany({}),
//     db.workflow.createMany({
//       data: workflowData,
//     }),
//   ]);

// function deleteWorkflowById(listOfDicts, idToDelete) {
//   const index = listOfDicts.findIndex((item) => item.id === idToDelete);
//   if (index !== -1) {
//     return listOfDicts.splice(index, 1)[0]; // Splice returns an array of removed items
//   }
// }

// function deleteEconnectById(listOfDicts, idToDelete) {
//   const index = listOfDicts.findIndex((item) => item.id === idToDelete);
//   if (index !== -1) {
//     return listOfDicts.splice(index, 1)[0];
//   }
// }

// (async () => {
//   await main();
// })();
