# Conversation
> Chat with Thomas!

This recipe uses the [Watson Conversation](https://www.ibm.com/watson/developercloud/conversation.html) , [Watson Text to Speech](https://www.ibm.com/watson/developercloud/text-to-speech.html) and [Watson Speech To Text](https://www.ibm.com/watson/services/speech-to-text.html) services to turn TJ into an voice based assistant, and my favorite thing, you can personilize it with every kind of information you want and in every language Watson services supports.

You can also use a powerbank to power your voice based assistant and let it wireless

## Build and Run
First, make sure you have configured your Raspberry Pi for Thomas by following the [instructions on README.md here](https://github.com/GuiJordao21/Thomas/blob/master/README.md).

Next, go to the `Thomas/Thomas/` folder and install the dependencies.

    $ cd Thomas/Thomas/
    $ npm install

Create instances of the [Watson Conversation](https://www.ibm.com/watson/developercloud/conversation.html),  [Watson Text to Speech](https://www.ibm.com/watson/developercloud/text-to-speech.html) and [Watson Speech To Text](https://www.ibm.com/watson/services/speech-to-text.html) services and note the authentication credentials.

Make a copy the default configuration file and update it with the Watson service credentials and the conversation workspace ID.

    $ cp config.default.js config.js
    $ nano config.js

enter your credentials and the conversation workspace ID in the specified places

Run!

    sudo node conversation.js

You can run this way, but there is an .sh script on the root folder that is the most apropriated for you to run. But running this is going to work as well.

> Note the `sudo` command. Root user access is required to run Thomas recipes.

# Watson Services
- [Watson Conversation](https://www.ibm.com/watson/developercloud/conversation.html)
- [Watson Text to Speech](https://www.ibm.com/watson/developercloud/text-to-speech.html)
- [Watson Speech To Text](https://www.ibm.com/watson/services/speech-to-text.html)
