#!/bin/bash

node /home/pi/tjbot_github/Thomas/conversation.js

if [ $? -eq 1 ]
	then
		/home/pi/tjbot_github/inicial.sh &
		exit
fi
