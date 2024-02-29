import { chromium } from "playwright";

async function makeReq(page, url, reqHeaders) {
  // Use fetch to send the modified request
  const response = await page.request.fetch(url, {
    method: reqHeaders.method,
    headers: reqHeaders.headers,
    data: reqHeaders.data,
  });
  // Process the response if needed
  const responseBody = await response.json();
  return responseBody; // Do something with the response
}

async function modifyFirstRequest(route) {
  const headers = route.request().headers();
  const originalBody = route.request().postData() || "{}";

  let bodyData;
  try {
    bodyData = JSON.parse(originalBody);
  } catch (error) {
    bodyData = {};
  }

  // Modify the request body here
  if (!bodyData.paging) {
    bodyData.paging = {};
  }
  bodyData.paging.pageSize = 100;

  await route.continue({
    headers: headers,
    postBody: JSON.stringify(bodyData),
  });
}

let reqData = {
  data: null,
  headers: null,
  method: null,
};

async function getHeaders(route) {
  const request = route.request();

  reqData.data = request.postData();
  reqData.headers = request.headers();
  reqData.method = request.method();

  await route.continue();
}

export default async function fetchWorkflow() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Login
  await page.goto(
    "https://web-ncoi.workflowwise.net/login?redirectUrl=%2Fredirect-url%2FL2FwcC9kZG0vdHJhbnNhY3Rpb25hbC93b3JrbGlzdC9UVFZCMlBQdXJjaGFzZXM%3D"
  );
  await page.fill('[placeholder="User name"]', "mjmvanwonderen@gmail.com");
  await page.fill('[placeholder="Password"]', "Monique55!!!");
  await page.click('role=button[name="Sign in"]');
  await page.waitForTimeout(1000); // Using setTimeout for delay
  await page.goto(
    "https://web-ncoi.workflowwise.net/app/ddm/transactional/worklist/TTVB2PPurchases"
  );

  await page.route("**/api/worklist/TTVB2PPurchases*", modifyFirstRequest);
  await page.route("**/api/personal/TTVB2PPurchases/**", getHeaders);

  const ids = [];

  page.on("response", async (response) => {
    if (response.url().includes("/api/worklist/TTVB2PPurchases")) {
      const jsonResponse = await response.json();
      ids.push(...Object.keys(jsonResponse.data.metadata)); // Extract ID
    }
  });

  while (ids.length === 0 || !reqData.headers) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const urls = ids.map(
    (id) =>
      `https://ncoi.workflowwise.net/api/personal/TTVB2PPurchases/${id}/lines`
  );
  let opdrachten = [];
  for (const url of urls) {
    const res = await makeReq(page, url, reqData);

    let result = res.data;
    if (!result) {
      console.log("no data attribute on list item");
      continue; // Skip to the next iteration if result is not found
    }

    result = result[1]; // Accessing the second item in the data array
    if (!result) {
      console.log("no data[1] attribute on list item");
      continue; // Skip to the next iteration if result is not found
    }

    result = result.normalizedCollection;
    if (!result) {
      console.log("no data[1][normalizedCollection] attribute on list item");
      continue; // Skip to the next iteration if result is not found
    }

    result = result.entities;
    if (!result) {
      console.log(
        "no data[1][normalizedCollection][entities] attribute on list item"
      );
      continue; // Skip to the next iteration if result is not found
    }

    result = result.TranTTVB2PPurchasesDetailLn;
    if (!result) {
      console.log(
        "no data[1][normalizedCollection][entities][TranTTVB2PPurchasesDetailLn] attribute on list item"
      );
      continue; // Skip to the next iteration if result is not found
    }

    // Combine current 'opdrachten' with new results using spread operator
    opdrachten = [...opdrachten, ...Object.values(result)];
  }
  browser.close();
  return opdrachten;
}
