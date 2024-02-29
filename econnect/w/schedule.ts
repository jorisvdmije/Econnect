import axios, { AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import schedule from "node-schedule";

const LOGIN_URL = "https://accounts.mijn-econnect.nl/api/Login";
const DATA_URL =
  "https://api.opleidingsgroep.nl/Exams/api/v1/exams-reservations";
const USERNAME = "mjmvanwonderen@gmail.com";
const PASSWORD = "i_cQESD*9sV%9sj";

// Axios instance to maintain cookies between requests
const jar = new CookieJar();
const client = wrapper(axios.create({ jar, withCredentials: true }));

async function login(): Promise<void> {
  try {
    await client.post(LOGIN_URL, {
      Username: USERNAME,
      Password: PASSWORD,
    });
    console.log("Login successful", client.defaults.headers);
  } catch (error) {
    console.error("Login failed:", error);
  }
}

async function fetchData(): Promise<void> {
  try {
    const response = await client.get(DATA_URL);
    console.log("Data fetched successfully");
    // Process the data
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

function startScheduling(): void {
  schedule.scheduleJob("*/1 * * * *", async function () {
    await fetchData();
  });
}

(async () => {
  await login(); // Initial login
  //   startScheduling();
})();
