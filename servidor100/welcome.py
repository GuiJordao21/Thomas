import os
import collections
import json
from flask import Flask, jsonify, request, redirect, url_for, send_file, render_template
import jinja2
import requests
from watson_developer_cloud import DiscoveryV1
app = Flask(__name__)

sites = {
		'intent':'https://somewebsite.com/',
		'another_intent':'https://anotherwebsite.com/',
		'how_many_intentios_you_want':'http://how-many-sites-you-need/'
		}

retorno_url = '/init'
texto100 = ''
cont=0

@app.route('/', methods=['GET', 'POST'])
def Welcome():
	r = request.get_json()
	#r = {'key':'era cognitiva na ibm'}
	global retorno_url
	global texto100
	global sites
	global cont
	chaveRed = ''

	print(r)

	if r is None:
		retorno_url = '/init'

	else:
		if ' ' in r['key']:
			cont+=1
			texto100 = r['key']
			texto100 = disc(texto100)
			if cont % 2 == 0:
				retorno_url = '/template'
			else:
				retorno_url = '/template1'
		else:
			chaveRed = r['key']
			retorno_url = sites[chaveRed]

	return app.send_static_file('index.html')

@app.route('/url', methods=['POST'])
def url():
	global retorno_url
	return retorno_url

@app.route('/init', methods=['GET'])
def init():
	return app.send_static_file('celebration.html')

# @app.route('/farmacia', method=['POST'])
# def farmacia():
# 	return app.send_static_file('farmacia.html')

# @app.route('/hospital', method=['POST'])
# def farmacia():
# 	return app.send_static_file('hospital.html')

# @app.route('/emergencia', method=['POST'])
# def farmacia():
# 	return app.send_static_file('emergencia.html')

#"hospital":"/hospital",
#"emergencia":"/emergencia",
#"farmacia":"/farmacia"

def disc(frase):
	r = requests.get('https://gateway.watsonplatform.net/discovery/api/v1/environments/<env>/collections/<col>/query?version=2017-11-07&deduplicate=false&highlight=true&passages=true&passages.count=5&query='+frase, auth=('<user>', '<pass>'))
	query = r.json()
	lista = {}
	resultsLenght = len(query["results"])

	for num in range(0, resultsLenght):
		lista[str(num + 1)] = query['results'][num]['text']

	lista = collections.OrderedDict(sorted(lista.items()))
	if "10" in lista:
		tmp = lista["10"]
		lista.pop("10", None)
		lista.update({"10":tmp})

	print(lista)

	return lista

@app.route('/template', methods=['POST', 'GET'])
def template():
	global texto100
	return render_template('template.html', blabla=texto100)

@app.route('/template1', methods=['POST', 'GET'])
def template1():
	global texto100
	return render_template('template.html', blabla=texto100)

@app.route('/conteudo', methods=['POST', 'GET'])
def conteudo():
	global texto100
	return texto100

port = os.getenv('PORT', '3001')

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=int(port))
# app.run(host='localhost', port=int(port))
