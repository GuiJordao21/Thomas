import json
import watson_developer_cloud

def listar(config):
    assistant = watson_developer_cloud.AssistantV1(
        iam_apikey=config['iam_apikey'],
        version=config['version']
    )

    response = assistant.list_intents(
        workspace_id = config['workspace_id']
    ).get_result()
    
#    print(json.dumps(response, indent=2))

    tamanho = len(response['intents'])
    dic = {}

    for num in range(0, tamanho):
        dic[num] = response['intents'][num]['intent']

    print(dic)
    return dic

if __name__ == '__main__':
    listar()
