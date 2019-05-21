from conversation import conversationCall
from transcribe import main
from levenshtein_py import distance
from pydub import AudioSegment
from pydub.playback import play
from subprocess import call
from pprint import pprint
from typing import List
import Levenshtein
import time
import json
import requests
import pyaudio  
import wave 

URL = 'https://node-icc.mybluemix.net/automation'
search_file = ""

def search_c(source: str, lookup: List[str]) -> List[dict]:
    search_results = [{'ratio': 0.0}]
    for index, record in enumerate(lookup):
        intent = lookup[record]
        ratio = Levenshtein.ratio(source, record)
        search_result = {'ratio': ratio, 'data': record, 'id': index, 'intent': intent}
        search_results.append(search_result)
        if len(search_results) > 1:
            search_results.remove(min(search_results, key=lambda x: x['ratio']))
    search_results.sort(key=lambda x: x['ratio'], reverse=True)
    return search_results


def search_p(source: str, lookup: List[str]) -> List[dict]:
    search_results = [{'ratio': 0.0}]
    for index, record in enumerate(lookup):
        ratio = distance(source, record)['ratio']
        search_result = {'ratio': ratio, 'data': record, 'id': index}
        search_results.append(search_result)
        if len(search_results) > 3:
            search_results.remove(min(search_results, key=lambda x: x['ratio']))
    search_results.sort(key=lambda x: x['ratio'], reverse=True)
    return search_results
    
def postar(result_intent):
    print ("chamada funcao postar")
    print (result_intent)
    payload = {"key":result_intent}
    print(payload)
    r = requests.post(URL, data=payload)


if __name__ == '__main__':
    print('enter the database filename')
    #db_file = open('input.txt')
    #print('\nenter the search filename')
    with open('transcript.json') as f:
        search_file = json.load(f)
    #search_file =  "gosta ia um vin" #open('test_input.txt')
    with open('./DynamicCaching/examples.json') as f:
        db_file = json.load(f)
    #search_list = db_file.read().splitlines()
    #db_file.close()
        search_list = db_file
        #pprint(db_file)

    search_string = search_file #.read()
    #search_file.close()

    print("beginning search...")
    begin_time = time.process_time()

    results = search_c(search_string, search_list)

    end_time = time.process_time()
#    print(f"finished search. runtime: {end_time - begin_time} ({end_time} - {begin_time})")

    for result in results:
#        print(f"{result['id']}: {result['ratio']}, {result['intent']}")
        result_ratio = (result['ratio'])
        result_intent = (result['intent'])
        print(result_intent)
    if result_intent == 'desativar':
        print("callHotWord")
        call(["python", "./SnowboyTest.py"])
    if result_ratio >= 0.7:
        try:
            postar(result_intent)
        except:
            print("Post Error")
        song = AudioSegment.from_wav("./audio/"+result_intent+".wav")
        play(song)
        print("callFollowUp")
        #main()
        call(["python", "./transcribe.py"])
    if result_ratio <= 0.1:
        print("callHotWord")
        call(["python", "./SnowboyTest.py"])
    else:
        conversationCall(search_file)
        print("chamando conversation")
