import json
import watson_developer_cloud

def listar(config):
    
    assistant = watson_developer_cloud.AssistantV1(
        iam_apikey=config['iam_apikey'],
        version=config['version']
    )

    response = assistant.list_dialog_nodes(
        workspace_id = config['workspace_id']
    ).get_result()
    
    print(response)

    tamanho = len(response['dialog_nodes'])
    dic = {}

    for num in range(0,tamanho):
        key = response['dialog_nodes'][num]['conditions'] 
        key = key.replace('#','')
        dic[key] = response['dialog_nodes'][num]['output']['text']['values'][0]
        #dic[key] = response['dialog_nodes'][num]['output']['generic'][0]['values'][0]['text'] # versões novas do assistant
    
    return dic

if __name__ == '__main__':
    listar()
