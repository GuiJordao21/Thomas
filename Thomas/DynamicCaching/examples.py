import json
import watson_developer_cloud

def listar(dic_intencao, config):

    print(config)
    
    assistant = watson_developer_cloud.AssistantV1(
        iam_apikey=config['iam_apikey'],
        version=config['version']
    )

    dic_exemplos = {}

    for num in range(0, len(dic_intencao)):

        response = assistant.list_examples(
            workspace_id = config['workspace_id'],
            intent = dic_intencao[num]
        ).get_result()

        for numero in range(0,len(response['examples'])):
            dic_exemplos[(response['examples'][numero]['text'])] = dic_intencao[num]

    return dic_exemplos

if __name__ == '__main__':
    listar()
