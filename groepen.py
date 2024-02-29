import asyncio
from urllib.parse import urlparse, parse_qs, urlencode
from playwright.async_api import async_playwright
import aiohttp
import time
from itertools import chain
import datetime

import json

captured_responses = []

async def handle_response(response):
    url = response.url
    # Check if this is the response from the modified request
    if 'ding' in url:
        response_json = await response.json()
        captured_responses.append(response_json)

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
        await page.goto("https://mijn-econnect.nl/#/professionals/product-reservation")

        # await page.route('**/api.opleidingsgroep.nl/Notifications/api/v1/professional-tasks**', modify_request)
        page.on('response', handle_response)


import requests

def send_pushover_notification(user_key, api_token, message, url, url_title):
    data = {
        "token": api_token,
        "user": user_key,
        "message": message,
        "url": url,
        "url_title": url_title,
    }
    response = requests.post("https://api.pushover.net/1/messages.json", data=data)
    return response.json()

# Voorbeeldgebruik
api_token = 'adqx5y9v85cdc5azwxivpf1ud69waw'
user_key = 'u7soizbxedxa4wys9cdzj3247ewind'
message = 'hoi'
url = 'https://www.voorbeeld.com'
url_title = 'Bezoek Voorbeeld'

send_pushover_notification(user_key, api_token, message, url, url_title)