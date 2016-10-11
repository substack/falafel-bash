#!/bin/bash
sudo rmmod r8169 && sudo modprobe r8169
sudo pkill wpa_supplicant
sudo service networking restart

echo you can mention sudo
echo you can even start with \
sudo on its own line yay
