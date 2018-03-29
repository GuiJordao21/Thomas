#!/bin/bash

diff intents.json newIntents.json
if [ $? -ne 0 ]
then
	rm intents.json
	mv newIntents.json intents.json
else
	rm newIntents.json
fi

diff examples.json newExamples.json
if [ $? -ne 0 ]
then
	rm examples.json
	mv newExamples.json examples.json
else
	rm newExamples.json
fi

diff answers.json newAnswers.json
if [ $? -ne 0 ]
then
	rm answers.json
	mv newAnswers.json answers.json
else
	rm newAnswers.json
fi
