import intents
import examples
import listResp
import json
import subprocess
from pathlib import Path

def main():
    
    """
    here we call 3 external functions to update all of our json files.
    
    We start with the intents then we get the example sentences and finally the answers.
    
    you need to configure the configureConversation.json file with your own credentials(just username, password and workspace id)  
    """
    with open('configureConversation.json') as json_data:
        config = json.load(json_data)
    
    #calling function that lists the intents
    dic_intencao = intents.listar(config)
    
    arquivo = open("intents.json",'w')
        
    dic_intencao_json = json.dumps(dic_intencao, indent=2).encode('utf-8')

    print(dic_intencao_json)
    
    #creating json file
    dic_intencao_json = dic_intencao_json.decode('unicode-escape')
    arquivo.write(dic_intencao_json)
    arquivo.close()
    
    #Here, we list the examples from conversation
    dic_exemplo = examples.listar(dic_intencao, config)
    
    arquivo = open("examples.json",'w')

    dic_examples_json = json.dumps(dic_exemplo, indent=2).encode('utf-8')

    print(dic_examples_json)

    #creating json file
    dic_examples_json = dic_examples_json.decode('unicode-escape')
    arquivo.write(dic_examples_json)
    arquivo.close()
    
    #Here we list the answers from your conversation
    list_answers = listResp.listar(config)
    
    
    if Path("answers.json").exists():
        arquivo = open("newAnswers.json",'w')
    else:
        arquivo = open("answers.json",'w')
    
    list_answers_json = json.dumps(list_answers, indent=2).encode('utf-8')
    list_answers_json = list_answers_json.decode('unicode-escape')
    #creating json file
    arquivo.write(list_answers_json)
    arquivo.close()
    
    """
        this line bellow is no loger needed but it's an interesting function to control the files that you have on this folder,
        check out if you think it's any good for you, is a very simple shell script
    """
    #subprocess.call(['/home/pi/tjbot_getting_ready/recipes/DynamicCaching/checkForNames.sh'])

if __name__ == '__main__':
    main()