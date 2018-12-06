#!/bin/bash

node /home/pi/Thomas/Thomas/conversation.js

if [ $? -eq 1 ]
	then
		/home/pi/Thomas/inicial.sh &
		exit
fi
