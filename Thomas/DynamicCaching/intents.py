import json
import watson_developer_cloud

def listar(config):
    conversation = watson_developer_cloud.ConversationV1(
        username=config['username'],
        password=config['password'],
        version='2017-05-26'
    )

    response = conversation.list_intents(
        workspace_id = config['workspace_id']
    )

    tamanho = len(response['intents'])
    dic = {}

    for num in range(0, tamanho):
        dic[num] = response['intents'][num]['intent']

    print(dic)
    return dic

if __name__ == '__main__':
    listar()