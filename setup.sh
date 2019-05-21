#!/bin/bash

echo "install pyaudio..."
sudo apt-get install python-pyaudio python3-pyaudio sox
sudo pip install pyaudio
echo "install libatlas..."
sudo apt-get install libatlas-base-dev
echo "install watson developer cloud..."
sudo pip install watson_developer_cloud
echo "install pydub..."
sudo pip install pydub
echo "install watson developer cloud..."
sudo pip3 install watson_developer_cloud
echo "install pydub..."
sudo pip3 install pydub
echo "install levenshetein..."
sudo pip3 install python-levenshtein
echo "install swig for configure snowboy"
wget http://downloads.sourceforge.net/swig/swig-3.0.10.tar.gz
sudo apt-get install libpcre3 libpcre3-dev
./configure --prefix=/usr                  \
        --without-clisp                    \
        --without-maximum-compile-warnings &&
make
make install &&
install -v -m755 -d /usr/share/doc/swig-3.0.10 &&
cp -v -R Doc/* /usr/share/doc/swig-3.0.10
