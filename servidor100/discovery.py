import os
import sys
import json
from watson_developer_cloud import DiscoveryV1

def main(frase):

    discovery = DiscoveryV1(
            username="",
            password="",
            version="2017-11-07"
        )

    print(frase)
    qopts = {'query': frase}
    #qopts = {'query':resp['input']['text']}
    my_query = discovery.query('','',qopts)
    textos = json.dumps(my_query)
    textos = json.loads(textos)

    lista = {}
    num = 1

    print(len(textos['results']))
    # print(textos['results'][0]['text'])

    for i in range(0,len(textos['results'])):
        lista.update({str(num):textos['results'][i]['text']})
        num = int(num)+1
        print(textos['results'][i]['text'])
        print(i)

    # return textos['results'][0]['text']
    return lista
if __name__=="__main__":
    main()
