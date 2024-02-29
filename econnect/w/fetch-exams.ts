import { chromium } from "playwright";
import { promises as fs } from "fs";
import axios from "axios";

function wait(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds));
}

export default async function fetchExams() {
  try {
    const jsonData = await fs.readFile(
      "/Users/jorisvdmije/Desktop/programming/webscraping/econnect/w/dist/exams.json"
    );
    const data = JSON.parse(jsonData.toString());
    const exams = data["exams"] as { id: string; date: string }[];
    const dates = data["dates"] as string[];

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    // Navigate to the login page
    await page.goto(
      "https://accounts.mijn-econnect.nl/idsvr/core/Account/Login?ReturnUrl=%2Fidsvr%2Fcore%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Deconnectspahostclient2%26redirect_uri%3Dhttps%253A%252F%252Fmijn-econnect.nl%252Foidccallback%26response_mode%3Dform_post%26response_type%3Did_token%26scope%3Dopenid%26state%3DOpenIdConnect.AuthenticationProperties%253DIpkTTHVYuOHC1d4BsveQFuim3h_dQ1egxZ_E01TN_QKVYHAGvz78qQ63SeQ2ABLecA_m_KcN30bBwJdEtL39qXXA6iSmqlkj8oHkD95BU_NB_iuqNpUXPw1QtUOLQtExQleqV7LbgNNBsCc3Z8AA2tKo98fC63m2YfEmr72DxmJMN7MthTgb4BaXy342MpfQlvKo001sNF0IFVw6jsTneCJwQdC-qkOFK589uD_l2htL74DbOpXwwqpctE5siqHXyM1gWdzEU_obHKos82EQcw%26nonce%3D638432902420499125.ZjY1NDI3NDEtOTZjNy00MjNiLWFhZWQtNDlkM2ZlMjAyNTdkMzdmNGYyZmQtZDA4ZS00ODEzLThlMmYtOTRhYjJkYzNhNmZi"
    );

    // Fill in the login form and click the login button
    await page.fill('input[name="Username"]', "mjmvanwonderen@gmail.com");
    await page.fill('input[name="Password"]', "i_cQESD*9sV%9sj");

    try {
      // Dismiss the "Allow Cookies" banner if present
      await page.evaluate(() => {
        const cookieBanner = document.querySelector("#cookiebotwrapper");
        if (cookieBanner) {
          cookieBanner.remove(); // Remove the banner from the DOM
        }
      });

      // Scroll to the "Submit" button if necessary
      await page.evaluate(() => {
        const submitButton = document.querySelector("#submit-button");
        if (submitButton) {
          submitButton.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });

      // Submit the form programmatically
      // await page.$eval("#submit-button", (button) => button.click()); // Click the "Submit" button
      // await page.click('text="Inloggen"');
      await page.click("#submit-button");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
    // await page.click('text="Allow all cookies"');
    // await page.click('text="Inloggen"');
    // await page.click("#submit-button");
    // Go to the page with the data
    await page.goto(
      "https://mijn-econnect.nl/#/professionals/exams-reservations"
    );

    let fetchedExams = [] as { examId: string; moduleName: string }[];
    page.on("response", async (response) => {
      if (
        response
          .url()
          .includes(
            "https://api.opleidingsgroep.nl/Exams/api/v1/exams-reservations"
          )
      ) {
        const aa = await response.json();
        fetchedExams = [...aa];
      }
    });

    let i = 0;
    while (fetchedExams.length === 0) {
      i++;
      if (i === 100) {
        await page.goto(
          "https://mijn-econnect.nl/#/professionals/exams-reservations"
        );
      }
      if (i === 200) {
        console.log("failed to fetch exams");
      }
      await wait(100);
    }
    const newExams = fetchedExams
      .filter((exam) => {
        return !exams.some((oldExam) => oldExam.id === exam.examId);
      })
      .map((exam) => ({
        id: exam.examId,
        date: new Date().toISOString(),
        description: exam.moduleName,
      }));

    exams.push(...newExams);
    dates.push(new Date().toISOString());

    const stringifyData = JSON.stringify(data, null, 2);

    await fs.writeFile(
      "/Users/jorisvdmije/Desktop/programming/webscraping/econnect/w/dist/exams.json",
      stringifyData
    );
    console.log("success");
    if (newExams.length > 0) {
      let mess = "";
      for (const exam of newExams) {
        mess = mess + ` ${exam.description}`;
      }
      const message = `${newExams.length} new exams have been added to the list. ${mess}`;

      await sendNotification(message);
    }
    browser.close();
  } catch (error) {
    console.error("Error fetching exams:", error);
    return [];
  }
}

(async () => {
  await fetchExams();
})();

const sendNotification = async (message: string) => {
  const pushoverUserKey = "u7soizbxedxa4wys9cdzj3247ewind";
  const pushoverToken = "adqx5y9v85cdc5azwxivpf1ud69waw";

  const content = {
    token: pushoverToken,
    user: pushoverUserKey,
    message: message,
  };

  await axios
    .post("https://api.pushover.net/1/messages.json", content)
    .then((response) => {
      console.log("Notification sent successfully:", response.data);
    })
    .catch((error) => {
      console.error("Failed to send notification:", error);
    });
};
