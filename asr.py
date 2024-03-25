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

# import requests
# headersList = {
# "Authorization": "Token 177b6b879fc7fd42367088f0f6fa3a66dc2e535caece5368b1d46fcd786884ca"
# }
# files = {
# 'file': open('tamil.mp3', 'rb'),
# 'language': (None, 'tamil'),
# 'vtt': (None, 'true'),
# }

# try:
#     response = requests.post('https://asr.iitm.ac.in/api/asr/', files=files,
#     headers=headersList)
#     print(response.json())
# except Exception as e:
#     print(e)



# check out speach synthesis


# import os
# import requests

# def request_synthesize(text_to_synthesize, voice):
#     url = 'http://speech.ssn.edu.in/SpeechSynthesis/synthesise.php'
#     payload = {'options': voice, 'word': text_to_synthesize}
#     headers = {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}

#     response = requests.post(url, data=payload, headers=headers)
#     print(response)
#     if response.ok:
#         res_txt = response.text
#         src_start_position = res_txt.find("src=\"wav") + 9
#         src_end_position = res_txt.find("type=\"audio/wav") - 2
#         wav_file_name = res_txt[src_start_position:src_end_position]

#         audio_url = "http://speech.ssn.edu.in/SpeechSynthesis/play.php?name=" + wav_file_name
#         return audio_url
#     else:
#         return None

# def save_wav_locally(audio_url, output_directory):
#     response = requests.get(audio_url)
#     if response.ok:
#         file_name = audio_url.split('/')[-1]
#         file_path = os.path.join(output_directory, file_name)
#         with open(file_path, 'wb') as f:
#             f.write(response.content)
#         return file_path
#     else:
#         return None

# def synthesize_selected_male(text):
#     voice = "hts_tamil_male"
#     audio_url = request_synthesize(text, voice)
#     print(audio_url)
#     if audio_url:
#         output_directory = "./output"
#         if not os.path.exists(output_directory):
#             os.makedirs(output_directory)
#         wav_file_path = save_wav_locally(audio_url, output_directory)
#         if wav_file_path:
#             print(f"Audio saved successfully at: {wav_file_path}")
#         else:
#             print("Failed to save audio locally.")
#     else:
#         print("Failed to synthesize audio.")

# def synthesize_selected_female(text):
#     voice = "hts_tamil_female"
#     audio_url = request_synthesize(text, voice)
#     if audio_url:
#         output_directory = "./output"
#         if not os.path.exists(output_directory):
#             os.makedirs(output_directory)
#         wav_file_path = save_wav_locally(audio_url, output_directory)
#         if wav_file_path:
#             print(f"Audio saved successfully at: {wav_file_path}")
#         else:
#             print("Failed to save audio locally.")
#     else:
#         print("Failed to synthesize audio.")

# # Example usage:
# input_text = "வணக்கம்"
# synthesize_selected_male(input_text)
# #synthesize_selected_female(input_text)
