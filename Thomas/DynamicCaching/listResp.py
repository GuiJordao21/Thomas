import json
import watson_developer_cloud

def listar(config):
    
    conversation = watson_developer_cloud.ConversationV1(
        username=config['username'],
        password=config['password'],
        version='2017-05-26'
    )

    response = conversation.list_dialog_nodes(
        workspace_id = config['workspace_id']
    )

    tamanho = len(response['dialog_nodes'])
    dic = {}

    for num in range(0,tamanho):
        key = response['dialog_nodes'][num]['conditions'] 
        key = key.replace('#','')
        dic[key] = response['dialog_nodes'][num]['output']['text']['values'][0]
    
    return dic

if __name__ == '__main__':
    listar()