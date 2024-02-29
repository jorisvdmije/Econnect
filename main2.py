import asyncio
from urllib.parse import urlparse, parse_qs, urlencode
from playwright.async_api import async_playwright
import aiohttp
import time
from itertools import chain

import json

with open('data.json', 'r') as file:
    data = json.load(file)

econnect_data_gekoppeld = data["econnect_data_gekoppeld"]
econnect_data_niet_gekoppeld = data["econnect_data_niet_gekoppeld"]

workflow_data_gekoppeld = data["workflow_data_gekoppeld"]
workflow_data_niet_gekoppeld = data["workflow_data_niet_gekoppeld"]

groepen = data["groepen"]
taskTypes = data["taskTypes"]

aa = {
    "Adviesvaardigheden": 22.5,
    "Arbeids- en gezondheidspsychologie": 22.5,
    "Basisopleiding coaching": 22.5,
    "Bedrijfspsychologie en organisatiegedrag": 22.5,
    "Begeleiding in organisaties": 25,
    "Coaching en begeleidingskunde": 50,
    "Communicatieve vaardigheden": 12.5,
    "Dyscalculie": 25,
    "Integrale opdracht HBO Bachelor Toegepaste Psychologie fase 1": 30,
    "Integrale opdracht HBO Bachelor Toegepaste Psychologie fase 3": 30,
"Interculturele psychiatrie": 11.5,
"Jeugdwet en jeugdhulp": 22.5,
"Kinderopvang": 12.5,
"Management van kinderopvang": 22.5,
"Masterclass Gedragsbeïnvloeding": 50,
"Masterclass Onderwijs- en Opleidingsmanagement": 50,
"Masterclass Onderwijspedagogiek": 50,
"Masterclass Ontwerpen en Realiseren van Leertrajecten": 50,
"Masterclass Psychologie en Gedrag": 50,
"Ondernemend gedrag (geschikt voor niveau 3 en 4) - K0072": 65,
"Ontwikkelings- en levensfasepsychologie": 22.5,
"Oplossingsgericht werken": 22.5,
"Organisatie en bestuur basisonderwijs": 22.5,
"Organisatie en kwaliteit VO/MBO": 22.5,
"Persoonlijke groei en zelfinzicht": 22.5,
"Professionele mediation": 25,
"Propedeuse Portfolio Bachelor Social Work profiel Welzijn en samenleving": 50,
"Zakelijk schrijven": 11.5
}
bb =  [
    { "groep": "Adviesvaardigheden", "tarief": "22" },
    { "groep": "Arbeids- en gezondheidspsychologie", "tarief": 22.5 },
    { "groep": "Basisopleiding coaching", "tarief": 22.5 },
    { "groep": "Bedrijfspsychologie en organisatiegedrag", "tarief": 22.5 },
    { "groep": "Begeleiding in organisaties", "tarief": 25 },
    { "groep": "Coaching en begeleidingskunde", "tarief": 50 },
    { "groep": "Communicatieve vaardigheden", "tarief": 12.5 },
    { "groep": "Dyscalculie", "tarief": 25 },
    {
      "groep": "Integrale opdracht HBO Bachelor Toegepaste Psychologie fase 1",
      "tarief": 30
    },
    {
      "groep": "Integrale opdracht HBO Bachelor Toegepaste Psychologie fase 3",
      "tarief": 30
    },
    { "groep": "Interculturele psychiatrie", "tarief": 11.5 },
    { "groep": "Jeugdwet en jeugdhulp", "tarief": 22.5 },
    { "groep": "Kinderopvang", "tarief": 12.5 },
    { "groep": "Management van kinderopvang", "tarief": 22.5 },
    { "groep": "Masterclass Gedragsbeïnvloeding", "tarief": 50 },
    { "groep": "Masterclass Onderwijs- en Opleidingsmanagement", "tarief": 50 },
    { "groep": "Masterclass Onderwijspedagogiek", "tarief": 50 },
    {
      "groep": "Masterclass Ontwerpen en Realiseren van Leertrajecten",
      "tarief": 50
    },
    { "groep": "Masterclass Psychologie en Gedrag", "tarief": 50 },
    {
      "groep": "Ondernemend gedrag (geschikt voor niveau 3 en 4) - K0072",
      "tarief": 65
    },
    { "groep": "Ontwikkelings- en levensfasepsychologie", "tarief": 22.5 },
    { "groep": "Oplossingsgericht werken", "tarief": 22.5 },
    { "groep": "Organisatie en bestuur basisonderwijs", "tarief": 22.5 },
    { "groep": "Organisatie en kwaliteit VO/MBO", "tarief": 22.5 },
    { "groep": "Persoonlijke groei en zelfinzicht", "tarief": 22.5 },
    { "groep": "Professionele mediation", "tarief": 25 },
    {
      "groep": "Propedeuse Portfolio Bachelor Social Work profiel Welzijn en samenleving",
      "tarief": 50
    },
    { "groep": "Zakelijk schrijven", "tarief": 11.5 }
  ],
req_data_econnect = {
    "data": None,
    "headers": None,
    "method": None
}

async def make_req(page, url, req_headers):
    
    # Use fetch to send the modified request
    response = await page.request.fetch(url, method=req_headers["method"], headers=req_headers["headers"], data=req_headers["data"])
    
    # Process the response if needed
    response_body = await response.json()
    return (response_body) # Do something with the response
    
# async def make_request_with_captured_data(url, captured_data):
#     async with aiohttp.ClientSession() as session:
#         headers = captured_data['headers']
#         cookies = {cookie['name']: cookie['value'] for cookie in captured_data['cookies']}
#         async with session.get(url, headers=headers, cookies=cookies) as response:
#             return await response.json()

async def modify_request(route, request):
    request = route.request
    headers = request.headers
    req_data_econnect['data'] = request.post_data
    req_data_econnect['headers'] = headers
    req_data_econnect['method'] = request.method
    url = urlparse(request.url)
    query_params = parse_qs(url.query)
    if 'limit' in query_params:
        query_params['limit'] = ['100']  

    modified_query = urlencode(query_params, doseq=True)
    modified_url = url._replace(query=modified_query).geturl()
    
    await route.continue_(url=modified_url)

captured_responses = []

captured_data = {'headers': None, 'cookies': None}
async def handle_opdrachten_response(response):
        url = response.url
        # Check if this is the response from the modified request
        if 'professional-tasks' in url and 'limit=100' in url:
            print("tasks")
            response_json = await response.json()
            captured_responses.append(response_json)
async def handle_tasks_response(response):
        url = response.url
        
        if "/api.opleidingsgroep.nl/Notifications/api/v1/professional-tasks/get-options?category=active&teacherId=142" in url:
            print("hehehehe")
            response_json = await response.json()
            fetched_taskTypes = response_json.get("taskTypes")
            fetched_groepen = response_json.get("products")

            # for fetched_groep in fetched_groepen:
            #     groep_bestaat = groepen.get(fetched_groep)
            #     if (not groep_bestaat):
            #         groepen[fetched_groep] = 0
            print(fetched_groepen, "fetched_groepen")
            for fetched_groep in fetched_groepen:
                groep_bestaat = False
                for groep in groepen:
                    if (groep["groep"] == fetched_groep):
                        groep_bestaat = True
                        break
                if (not groep_bestaat):
                    print(fetched_groep, "fetched_groep")
                    groepen.append({ "groep": fetched_groep, "tarief": 0 })
            for fetched_taskType in fetched_taskTypes:
                taskType_bestaat = False
                for taskType in taskTypes:
                    if (taskType["label"] == fetched_taskType["label"]):
                        taskType_bestaat = True
                        break
                if (not taskType_bestaat):
                    taskTypes.append(fetched_taskType)

async def run():
    async with async_playwright() as playwright:
        # launch the browser and open page
        browser = await playwright.chromium.launch(headless=False) 
        page = await browser.new_page() 

        # Navigate to the login page
        await page.goto('https://accounts.mijn-econnect.nl/idsvr/core/Account/Login?ReturnUrl=%2Fidsvr%2Fcore%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Deconnectspahostclient2%26redirect_uri%3Dhttps%253A%252F%252Fmijn-econnect.nl%252Foidccallback%26response_mode%3Dform_post%26response_type%3Did_token%26scope%3Dopenid%26state%3DOpenIdConnect.AuthenticationProperties%253DIpkTTHVYuOHC1d4BsveQFuim3h_dQ1egxZ_E01TN_QKVYHAGvz78qQ63SeQ2ABLecA_m_KcN30bBwJdEtL39qXXA6iSmqlkj8oHkD95BU_NB_iuqNpUXPw1QtUOLQtExQleqV7LbgNNBsCc3Z8AA2tKo98fC63m2YfEmr72DxmJMN7MthTgb4BaXy342MpfQlvKo001sNF0IFVw6jsTneCJwQdC-qkOFK589uD_l2htL74DbOpXwwqpctE5siqHXyM1gWdzEU_obHKos82EQcw%26nonce%3D638432902420499125.ZjY1NDI3NDEtOTZjNy00MjNiLWFhZWQtNDlkM2ZlMjAyNTdkMzdmNGYyZmQtZDA4ZS00ODEzLThlMmYtOTRhYjJkYzNhNmZi')

        # Fill in the login form and click the login button as before
        await page.get_by_role("link", name="Allow all cookies").click()
        await page.fill('input[name="Username"]', 'mjmvanwonderen@gmail.com')
        await page.fill('input[name="Password"]', 'i_cQESD*9sV%9sj')
        await page.get_by_role("button", name="Inloggen").click()
        # got to the page with the data
        await page.goto("https://mijn-econnect.nl/#/professionals/active-tasks")

        await page.route('**/api.opleidingsgroep.nl/Notifications/api/v1/professional-tasks**', modify_request)
        page.on('response', handle_tasks_response)
        page.on('response', handle_opdrachten_response)
        while len(captured_responses) == 0:
            await asyncio.sleep(0.1) 
            print("waiting for response")
        tasks = []
        for response in captured_responses[0]:
            id = response.get("examSubscriptionId")
            if (id):
                url = f"https://api.opleidingsgroep.nl/Exams/api/v1/exam-subscriptions/{id}/get-exam-for-review"
                request = asyncio.create_task(make_req(page, url, req_data_econnect))

                tasks.append(request)
        
            # Wait for all tasks to complete
        econnect_details = await asyncio.gather(*tasks)

        # set attributes on econnect_details that are not in the response
        for detail in econnect_details:
            for info in captured_responses[0]:
                if (info.get("examSubscriptionId") == detail.get("examSubscription").get("examSubscriptionId")):
                    date_only = info.get("taskDate").split('T')[0]
                    detail["taskDate"] = date_only
                    taskType = info.get("taskType")
                    for task in taskTypes:
                        if (task["id"] == taskType):
                            detail["taskType"] = task["label"]
                            break

        return econnect_details
       
captured_data = {'headers': None, 'cookies': None}

async def make_request_with_captured_data(url, captured_data):
    async with aiohttp.ClientSession() as session:
        headers = captured_data['headers']
        for cookie in captured_data['cookies']:
            session.cookie_jar.update_cookies({cookie['name']: cookie['value']})
        async with session.post(url, headers=headers) as response:
            return await response.json()

req_data = {
    "data": None,
    "headers": None,
    "method": None
}



async def get_headers(route):
    request = route.request
    headers = request.headers

    req_data['data'] = request.post_data
    req_data['headers'] = headers
    req_data['method'] = request.method

    await route.continue_()

async def modify_first_request(route, request):
    headers = request.headers
    original_body = request.post_data or '{}'
    
    # Convert the body to a Python dictionary
    try:
        body_data = json.loads(original_body)
    except json.JSONDecodeError:
        body_data = {}

    # Modify the request body here
    body_data['paging']['pageSize'] = 100

    # Continue the request with modifications
    await route.continue_(headers=headers, post_data=json.dumps(body_data))



async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()

        # Step 1: Login
        await page.goto("https://web-ncoi.workflowwise.net/login?redirectUrl=%2Fredirect-url%2FL2FwcC9kZG0vdHJhbnNhY3Rpb25hbC93b3JrbGlzdC9UVFZCMlBQdXJjaGFzZXM%3D")
        await page.get_by_placeholder("User name").fill("mjmvanwonderen@gmail.com")
        await page.get_by_placeholder("Password").fill("Monique55!!!")
        await page.get_by_role("button", name="Sign in").click()

        time.sleep(1)
        await page.goto("https://web-ncoi.workflowwise.net/app/ddm/transactional/worklist/TTVB2PPurchases")

       
        await page.route('**/api/worklist/TTVB2PPurchases*', modify_first_request)

        await page.route('**/api/personal/TTVB2PPurchases/**', get_headers)

        ids = []

       

        async def handle_response(response):
            if '/api/worklist/TTVB2PPurchases' in response.url:

                json_response = await response.json()
                ids.extend(json_response['data']["metadata"].keys())  # Extract ID

        page.on('response', handle_response)

        while ids is None or req_data["headers"] is None:
            await asyncio.sleep(0.1) 

        urls = [f"https://ncoi.workflowwise.net/api/personal/TTVB2PPurchases/{id}/lines" for id in ids]

        opdrachten = []

        for url in urls:
            res = await make_req(page, url, req_data)

            # result = res["data"][1]["normalizedCollection"]["entities"]["TranTTVB2PPurchasesDetailLn"]
            result = res.get("data")
            if (not result):
                print("no data attribute on list item")

            result = result[1]
            if (not result):
                print("no data[1] attribute on list item")
            result = result.get("normalizedCollection")
            if (not result):
                print("no data[1][normalizedCollection] attribute on list item")
            result = result.get("entities")
            if (not result):
                print("no data[1][normalizedCollection][entities] attribute on list item")
            result = result.get("TranTTVB2PPurchasesDetailLn")
            if (not result):
                print("no data[1][normalizedCollection][entities][TranTTVB2PPurchasesDetailLn] attribute on list item")
            opdrachten = list(chain(opdrachten, list(result.values())))
        return opdrachten
            

        # await browser.close()
    # return 

async def main_async():
    # Use asyncio.gather to run both functions in parallel
    econnenct_data, workflow_data = await asyncio.gather(
        run(),
        main()
    )

    return econnenct_data, workflow_data
fetched_econnenct_data, fetched_workflow_data = asyncio.run(main_async())

for fetched_workflow_item in fetched_workflow_data:
    workflow_id = fetched_workflow_item.get("id")

    if (any(workflow_item.get('id') == workflow_id for workflow_item in workflow_data_niet_gekoppeld) or any(workflow_item.get('id') == workflow_id for workflow_item in workflow_data_gekoppeld)):
        continue
    date_only = fetched_workflow_item.get("ExpectedDeliveryDate").split('T')[0]
    
    new_workflow_item = {
        "id": workflow_id,
        "amount": fetched_workflow_item.get("QuantityOrdered"),
        "price": fetched_workflow_item.get("PriceDC"),
        "taskDate": date_only,
        "description": fetched_workflow_item.get("Descr"),
        "amountAssigned": 0,
        
    }
    workflow_data_niet_gekoppeld.append(new_workflow_item)

from datetime import datetime
def is_same_day(date_str1, date_str2):
    return date_str1 == date_str2

fetched_ids = []

for fetched_econnect_item in fetched_econnenct_data:
    econnect_id = fetched_econnect_item.get("examSubscription").get("moduleInstanceId")
    econnect_groep = fetched_econnect_item.get("examSubscription").get("moduleName")
    econnect_tarief = fetched_econnect_item["tariffValue"]
    econnect_student = fetched_econnect_item.get("studentName")
    
    tarief = 0
    for groep in groepen:
        if (groep["groep"] == econnect_groep):
            tarief = groep["tarief"]
            fetched_econnect_item["tarief"] = econnect_tarief
            break

    id = f"{econnect_id}{econnect_student}" if 'studentName' in fetched_econnect_item else econnect_id
    
    is_old = any(d["id"] == id for d in econnect_data_niet_gekoppeld)
    
    if (not is_old):
        new_econnect_item = {
            "id": id,
            "description": econnect_groep,
            "tariffEconnect": econnect_tarief,
            "tarief": tarief,
            "status": "actief",
            "taskDate": fetched_econnect_item.get("taskDate"),
            "taskType": fetched_econnect_item.get("taskType"),
            "studentName": econnect_student,
            "verschilTarief": 0,
        }

        if (tarief):
            if (not econnect_tarief == tarief):
                new_econnect_item["verschilTarief"] = tarief - econnect_tarief
                data["foutive_tarieven"].append(new_econnect_item)

        econnect_data_niet_gekoppeld.append(new_econnect_item)
   
    fetched_ids.append(id)

def delete_workflow_by_id(list_of_dicts, id_to_delete):
    for item in list_of_dicts:
        if item.get("id") == id_to_delete:
            list_of_dicts.remove(item)
            return item

def delete_econnect_by_id(list_of_dicts, id_to_delete):
    for item in list_of_dicts:
        if item.get("id") == id_to_delete:
            list_of_dicts.remove(item)
            return item

for item in econnect_data_niet_gekoppeld:
    # kijk of nog actief is

    if (not any(old_fetched_id == item.get('id') for old_fetched_id in fetched_ids)):
        item["status"] = "nietActief"

    econnect_id = item.get("id")

    for value in workflow_data_niet_gekoppeld:
        workflow_date  = value["taskDate"]
        workflow_opdracht_naam = value.get("description")

        econnect_opdracht_naam = item.get("description")
        econnect_date = item.get("taskDate") 
        if (workflow_date == None): 
            continue
        if (econnect_date == None): 
            continue

        if (is_same_day(workflow_date, econnect_date) and econnect_opdracht_naam in workflow_opdracht_naam):
            value["amountAssigned"] += 1
            if (value.get("amountAssigned") == value.get("amount")):
                poped = delete_workflow_by_id(workflow_data_niet_gekoppeld, value.get("id"))
                workflow_data_gekoppeld.append(poped)

            econnect = delete_econnect_by_id(econnect_data_niet_gekoppeld, econnect_id)
            econnect_data_gekoppeld.append(econnect)
            
            # else: 
            #     value["gekoppeldeOpdrachten"] += 1
            #     list_niet_gekoppelde_econnect.remove(item)

            #     item2 = item.set("workflow_id", poped.get("id"))
            #     list_gekoppelde_econnect.append(item2)

        
with open('data.json', 'w') as file:
    json.dump(data, file, indent=4)
# # "taskType": 2,
# #     "taskDate": "2024-02-02T00:00:00Z",
# #     "moduleName": "Propedeuse Portfolio Bachelor Social Work profiel Welzijn en samenleving",
# #     "studentName": "Janneke Paul",
# #     "studentId": "MXny0vWP",
# #     "moduleInstanceId": "MX188Zv",
# #     "productNumber": 2353872,
# #     "programId": null,
# #     "programNumber": null,
# #     "eventId": null,
# #     "examSubscriptionId": "MXYX8VJ",
# #     "examType": "fase portfolio opdrachten",
# #     "eLearningAssignmentId": null,
# #     "lessonId": null,
# #     "taxExempted": true,
# #     "eventDate": null,
# #     "studentNumber": 4818226,
# #     "examSubscriptionReviewId": null,
# #     "examReviewVersionNumber": null,
# #     "isIndependentExam": false,
# #     "poNumber": null,
# #     "phaseName": null