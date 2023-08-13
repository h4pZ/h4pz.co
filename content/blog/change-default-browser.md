---
title: "Change Default Browser"
date: 2023-08-11T22:37:45+02:00
draft: true
---

Change the default web browser in Manjaro bspwm

In order to change the default web browser in Manjaro bspwm you need to change two files. First replace the entries in `~/.config/mimeapps.list` with your new default browser. For example `firefox.desktop` or `google-chrome.desktop`. Then change/add to `~/.profile` the line `export BROWSER=path_to_broswer` with the path of the browser binary (you can get it with `which firefox` for example) and that's all!


