import json
import watson_developer_cloud

def listar(dic_intencao, config):

    conversation = watson_developer_cloud.ConversationV1(
        username=config['username'],
        password=config['password'],
        version='2017-05-26'
    )

    dic_exemplos = {}

    for num in range(0, len(dic_intencao)):

        response = conversation.list_examples(
            workspace_id = config['workspace_id'],
            intent = dic_intencao[num]
        )

        for numero in range(0,len(response['examples'])):
            dic_exemplos[(response['examples'][numero]['text'])] = dic_intencao[num]

    return dic_exemplos

if __name__ == '__main__':
    listar()