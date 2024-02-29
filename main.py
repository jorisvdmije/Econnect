groep = {
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
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# import requests
# import time

# # Path to your WebDriver
# driver = webdriver.Chrome('/Users/jorisvdmije/Downloads/chromedriver-mac-arm64 2/chromedriver')

# login_url = "https://accounts.mijn-econnect.nl/idsvr/core/Account/Login?ReturnUrl=%2Fidsvr%2Fcore%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Deconnectspahostclient2%26redirect_uri%3Dhttps%253A%252F%252Fmijn-econnect.nl%252Foidccallback%26response_mode%3Dform_post%26response_type%3Did_token%26scope%3Dopenid%26state%3DOpenIdConnect.AuthenticationProperties%253Dqc7U1aMAECIkiRQS0oGvSGoTsyAzmWbx4Mbg0V08iQx79mejhtgH92soHrbejVTWizAbViPPm3zgnHzOK8pppelU9mlLUn1ieAtmYaRKG_IVkJKINK2IYt5VrxmouAEJ8B5Sgudku1P8sIwsgkfA6hu9ShgajOyvaM9Psp1sqxNzQJcsFt3R1G21AhYorsDostsVMyJHplF5FwDYRF_oGi3SFkpzxuDlo1An6_K7bKezk828TrkN-FeM50iyvIK66L88RnPOsa5zeVbw2DAD3w%26nonce%3D638432825077823921.NzgzZmEzMmQtYjY3Ny00ZGQ2LWE1MGUtNjI0YmU2YjVmYjhlYjg4MWEwNTQtOGFlNS00NmVkLTgyMWYtZDQ1NzM5MzAxOTQ0"
# # Open the login page
# driver.get(login_url)


# # Find the username and password fields and fill them in
# username = driver.find_element(By.NAME, 'Username')
# password = driver.find_element(By.NAME, 'Password')

# print(username)

# username.send_keys('mjmvanwonderen@gmail.com')
# password.send_keys('i_cQESD*9sV%9sj')

# # Find the login button and click it (adjust the selector as needed)
# login_button = driver.find_element(By.XPATH, '//button[@type="submit"]')
# login_button.click()

# # Wait for login to complete
# time.sleep(5)  # Adjust timing according to your needs


# import requests
# from bs4 import BeautifulSoup

# # Get login page for cookies and tokens
# login_url = "https://accounts.mijn-econnect.nl/idsvr/core/Account/Login?ReturnUrl=%2Fidsvr%2Fcore%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Deconnectspahostclient2%26redirect_uri%3Dhttps%253A%252F%252Fmijn-econnect.nl%252Foidccallback%26response_mode%3Dform_post%26response_type%3Did_token%26scope%3Dopenid%26state%3DOpenIdConnect.AuthenticationProperties%253Dqc7U1aMAECIkiRQS0oGvSGoTsyAzmWbx4Mbg0V08iQx79mejhtgH92soHrbejVTWizAbViPPm3zgnHzOK8pppelU9mlLUn1ieAtmYaRKG_IVkJKINK2IYt5VrxmouAEJ8B5Sgudku1P8sIwsgkfA6hu9ShgajOyvaM9Psp1sqxNzQJcsFt3R1G21AhYorsDostsVMyJHplF5FwDYRF_oGi3SFkpzxuDlo1An6_K7bKezk828TrkN-FeM50iyvIK66L88RnPOsa5zeVbw2DAD3w%26nonce%3D638432825077823921.NzgzZmEzMmQtYjY3Ny00ZGQ2LWE1MGUtNjI0YmU2YjVmYjhlYjg4MWEwNTQtOGFlNS00NmVkLTgyMWYtZDQ1NzM5MzAxOTQ0"

# session = requests.Session()
# # login_page = session.get(login_url)
# # soup = BeautifulSoup(login_page.text, 'html.parser')

# # Example for extracting a CSRF token

# data = {
#     "__RequestVerificationToken": "CfDJ8JC5buuxGQ9Jk-moZigsUk2k9kCNxOTMpm24z9Q_NobBdqtfE8PyRv4pukuYkFlzG2wS5aL4FCVYwKvQcaOlrV9BNNcSlzAlFIj5tBeA8d_5eFgJuT6cO8K35Sjz6hUDzPfUp1-u58sa8trhH_VHyjQ",
#     # "ReturnUrl": "adf",
#     'Username': 'mjmvanwonderen@gmail.com',
#     'Password': "i_cQESD*9sV%9sj",
# }

# print(data.get("Password"))

# response = session.post(login_url, data=data)
# print(response.text)
# # Check response
# if response.status_code == 200:
#     print("Login might be successful.")
# else:
#     print("Login failed with status code:", response.status_code)

import requests

session = requests.Session()
login_url = 'https://accounts.mijn-econnect.nl/idsvr/core/Account/Login?ReturnUrl=%2Fidsvr%2Fcore%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Deconnectspahostclient2%26redirect_uri%3Dhttps%253A%252F%252Fmijn-econnect.nl%252Foidccallback%26response_mode%3Dform_post%26response_type%3Did_token%26scope%3Dopenid%26state%3DOpenIdConnect.AuthenticationProperties%253D7oyXBV2Av28p_e5_YxRkWl5tUjRMjXXFwhwlBZ4p16B2ZBm99tdAD5CVb7DaPgoj_KIZx3GhFcdTsPWMnHe4TUzTVHgJ16UykUHcanTSr8WgKWouaDalFRW0BMyyg7tC6Pno0Wc6qGH-BYp7A8uXjKqOJMeVkOy9dg0ols52Cx9ExCuhKfriuzeZD_-17P7WkvHEvXVVBPyrozHj8CERZJaBhrw8w-Jv4g0-g1XCCxK-OLvFLewnRNCKc5ljmIRUpdQpem6LF0bsSg3wk24rdA%26nonce%3D638432861371290450.YzYzZDE4NDEtMTY5OC00MGNjLWIyOTktMDFiY2IyZjE4NDczOTQ0ZjRkYjMtNDFkNC00ZGQzLTllZWMtMjBiZjMzYjY3NTlk'
credentials = {'Username': 'mjmvanwonderen@gmail.com', 'Password': 'i_cQESD*9sV%9sj'}
response = requests.post(login_url, data=credentials)
if response.status_code == 200:
    print("Login might be successful, check further.")
elif response.status_code == 302:
    print("Login successful, redirected.")
else:
    print(response.status_code)
print(session)

data_url = 'https://api.opleidingsgroep.nl/Notifications/api/v1/professional-tasks?category=active&limit=40&offset=0&teacherId=142'
response = session.get(data_url)
data = response.json()

print(data)