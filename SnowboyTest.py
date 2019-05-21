import snowboydecoder
from subprocess import call
from transcribe import main

def detected_callback():
    print ("hotword detected")
#    call(["python", "/home/pi/newThomasTest/Snowboy/transcribe.py"])
    main()
detector = snowboydecoder.HotwordDetector("Ok__amanda.pmdl", sensitivity=0.5, audio_gain=1)
detector.start(detected_callback)
