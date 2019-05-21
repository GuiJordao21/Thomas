import json
import watson_developer_cloud
import requests 
import config
from pydub import AudioSegment
from pydub.playback import play
#from transcribe import main
from subprocess import call
 
URL = 'http://9.18.172.41:3001/'

def conversationCall(search_file):
	assistant = watson_developer_cloud.AssistantV1(
		iam_apikey=config.iam_apikey,
		version='2018-09-20',
		url='https://gateway.watsonplatform.net/assistant/api'
	)

	response = assistant.message(
		workspace_id=config.workspace_id,
		input={
			'text': search_file
		}
	).get_result()

	#print(json.dumps(response, indent=2))

	#intent = response['intents'][0]['intent']

	if 'intents' in response:
		try:
			confidence = response['intents'][0]['confidence']
			print(confidence)
			intent = response['intents'][0]['intent']
			if confidence >= 0.6:
				print("certeza")
				#postar(intent)
				song = AudioSegment.from_wav("./audio"+intent+".wav")
				print (caminho_mac+intent+".wav")
				play(song)
				call(["python", "./SnowboyTest.py"])
		except:
			print("except")
			song = AudioSegment.from_wav("./audio" + "/anything_else.wav")
			play(song)
#			main()
			call(["python", "./transcribe.py"])

def postar(intent):
	print ("chamada funcao postar")
	print (intent)
	payload = {"key":intent}
	r = requests.post(URL, params=payload)
	
		
