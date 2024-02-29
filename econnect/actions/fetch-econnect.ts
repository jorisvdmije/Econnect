"use server";
import { promises as fs } from "fs";
import { chromium } from "playwright";
// import fetchEconnect from "@/webscraping/fetch-econnect";

async function makeReq(page, url, reqHeaders) {
  // Use fetch to send the modified request
  const response = await page.request.fetch(url, {
    method: reqHeaders.method,
    headers: reqHeaders.headers,
    body: reqHeaders.data,
  });

  // Process the response if needed
  const responseBody = await response.json();
  return responseBody; // Do something with the response
}

const reqDataEconnect = {
  data: undefined,
  headers: undefined,
  method: undefined,
};

async function getHeaders(route, request) {
  reqDataEconnect.data = request.postData();
  reqDataEconnect.headers = request.headers();
  reqDataEconnect.method = request.method();
}
function wait(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
export default async function fetchEconnect() {
  try {
    const jsonData = await fs.readFile(
      "/Users/jorisvdmije/Desktop/programming/webscraping/data.json"
    );
    const data = JSON.parse(jsonData.toString());
    const groepen = data["groepen"];
    const taskTypes = data["taskTypes"];

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the login page
    await page.goto(
      "https://accounts.mijn-econnect.nl/idsvr/core/Account/Login?ReturnUrl=%2Fidsvr%2Fcore%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Deconnectspahostclient2%26redirect_uri%3Dhttps%253A%252F%252Fmijn-econnect.nl%252Foidccallback%26response_mode%3Dform_post%26response_type%3Did_token%26scope%3Dopenid%26state%3DOpenIdConnect.AuthenticationProperties%253DIpkTTHVYuOHC1d4BsveQFuim3h_dQ1egxZ_E01TN_QKVYHAGvz78qQ63SeQ2ABLecA_m_KcN30bBwJdEtL39qXXA6iSmqlkj8oHkD95BU_NB_iuqNpUXPw1QtUOLQtExQleqV7LbgNNBsCc3Z8AA2tKo98fC63m2YfEmr72DxmJMN7MthTgb4BaXy342MpfQlvKo001sNF0IFVw6jsTneCJwQdC-qkOFK589uD_l2htL74DbOpXwwqpctE5siqHXyM1gWdzEU_obHKos82EQcw%26nonce%3D638432902420499125.ZjY1NDI3NDEtOTZjNy00MjNiLWFhZWQtNDlkM2ZlMjAyNTdkMzdmNGYyZmQtZDA4ZS00ODEzLThlMmYtOTRhYjJkYzNhNmZi"
    );

    // Fill in the login form and click the login button
    await page.fill('input[name="Username"]', "mjmvanwonderen@gmail.com");
    await page.fill('input[name="Password"]', "i_cQESD*9sV%9sj");
    const element = await page.$("#cookiebotwrapper");

    try {
      // Dismiss the "Allow Cookies" banner if present
      await page.evaluate(() => {
        const cookieBanner = document.querySelector("#cookiebotwrapper");
        if (cookieBanner) {
          cookieBanner.remove(); // Remove the banner from the DOM
        }
      });

      // Scroll to the "Submit" button if necessary
      // await page.evaluate(() => {
      //   const submitButton = document.querySelector("#submit-button");
      //   if (submitButton) {
      //     submitButton.scrollIntoView({ behavior: "smooth", block: "center" });
      //   }
      // });
      await page.click("#submit-button");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
    // Go to the page with the data
    await page.goto("https://mijn-econnect.nl/#/professionals/active-tasks");

    // await wait(3);
    // get the headers
    await page.route(
      "**/api.opleidingsgroep.nl/Notifications/api/v1/professional-tasks**",
      getHeaders
    );

    while (!reqDataEconnect.headers) {
      await wait(0.1);
    }
    // get groeps and task types
    const optionsUrl =
      "https://api.opleidingsgroep.nl/Notifications/api/v1/professional-tasks/get-options?category=active&teacherId=142";
    const optionsResponse = await makeReq(page, optionsUrl, reqDataEconnect);
    const { taskTypes: fetchedTaskTypes, products: fetchedGroepen } =
      optionsResponse;

    for (const taskType of fetchedTaskTypes) {
      if (!taskTypes.find((task) => task.id === taskType["id"]))
        taskTypes.push(taskType);
    }

    for (const groep of fetchedGroepen) {
      if (!groepen.find((g) => g.groep === groep))
        groepen.push({ groep: groep, tarief: 0 });
    }

    // get the tasks
    const tasksUrl =
      "https://api.opleidingsgroep.nl/Notifications/api/v1/professional-tasks?category=active&limit=100&offset=0&teacherId=142";
    const econnectResponse = await makeReq(page, tasksUrl, reqDataEconnect);
    const tasks = [];

    for (const econnect of econnectResponse) {
      const id = econnect.examSubscriptionId;
      if (id) {
        const url = `https://api.opleidingsgroep.nl/Exams/api/v1/exam-subscriptions/${id}/get-exam-for-review`;
        const request = makeReq(page, url, reqDataEconnect); // Assuming makeReq is properly defined

        tasks.push(request);
      }
    }

    // Wait for all tasks to complete
    const econnectDetails = await Promise.all(tasks);

    // Additional processing as per Python code
    econnectDetails.forEach((detail) => {
      const info = econnectResponse.find(
        (i) =>
          i.examSubscriptionId === detail.examSubscription.examSubscriptionId
      );
      if (info) {
        const dateOnly = info.taskDate.split("T")[0];
        detail.taskDate = dateOnly;
        const taskType = taskTypes.find((t) => t.id === info.taskType);
        if (taskType) {
          detail.taskType = taskType.label;
        }
      }
    });

    const stringifyData = JSON.stringify(data, null, 2);

    await fs.writeFile(
      "/Users/jorisvdmije/Desktop/programming/webscraping/data.json",
      stringifyData
    );
    browser.close();
    console.log("succes econnect");
    return econnectDetails;
  } catch (error) {
    console.error("Error fetching exams:", error);
    return [];
  }
}
