# register a user

# import requests
# headersList = {}
# payload = {
# 'email': "justinbenito2213005@ssn.edu.in",
# 'password': "Justin@2005",
# 'company': "SSNCE"
# }
# try:
#     response = requests.post('https://asr.iitm.ac.in/api/accounts/create-user/', data=payload, headers=headersList)
#     print(response.json())
# except Exception as e:
#     print(e)


# login user

# import requests

# headersList = {}
# payload = {
# 'email': "justinbenito2213005@ssn.edu.in",
# 'password': "Justin@2005",
# }
# try:
#     response = requests.post('https://asr.iitm.ac.in/api/accounts/login/',
#     data=payload, headers=headersList)
#     print(response.json())
# except Exception as e:
#     print(e)


# asr code

import requests
headersList = {
"Authorization": "Token 1b0fedcb19b28f1500918dea8847ad3f2864ab5b79221c8c98734218ecd57404"
}
files = {
'file': open('tamil.mp3', 'rb'),
'language': (None, 'tamil'),
'vtt': (None, 'true'),
}

try:
    response = requests.post('https://asr.iitm.ac.in/api/asr/', files=files,
    headers=headersList)
    print(response.json())
except Exception as e:
    print(e)