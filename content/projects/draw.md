---
title: "Draw"
date: 2023-09-10T20:16:03+02:00
draft: false
thumbnail: "/images/projects/draw/DKdNSxFXUAA2wEf.gif"
---

Draw is a model that recreates the mechanism of attention done by humans. This model has T time steps (defined by the user) over which the recurrent neural network will recreate the original image step by step. Letting the network decide which patches of the image is going to draw first in a blank canvas. I used this model over a single image instead of over a whole data set, because I wanted to see how the model which is intended to work with MNIST, or CIFAR would work over one picture. I trained the DRAW network with two images, the first one which I found randomly on archillet project and the other one which is done by Laura Makabresku (NSFW warning for the LM webpage).

Note: I used only a single channel for the DRAW model on the random glitch image.

![img](/images/projects/draw/glitch.jpg "Original glitch artwork image with digital distortion effects and abstract patterns")
![img](/images/projects/draw/raven.jpg "Original black and white photograph of a raven by Laura Makabresku")
![img](/images/projects/draw/DKdNSxFXUAA2wEf.gif "DRAW model animation showing step-by-step reconstruction of the glitch image with attention mechanism")
![img](/images/projects/draw/smallraven_1096000.gif "DRAW model final training stage animation showing complete reconstruction of the raven image")

# Bonus gifs

The following gifs corresponds to different stages of the training of the raven picture.

![img](/images/projects/draw/asdasd.gif "Early stage DRAW model training animation showing initial attempts at reconstructing the raven image")
![img](/images/projects/draw/smallraven_554000.gif "Mid-stage DRAW model training animation at 554,000 iterations showing improved raven reconstruction")
![img](/images/projects/draw/smallraven_600000.gif "Advanced stage DRAW model training animation at 600,000 iterations showing refined raven reconstruction")
![img](/images/projects/draw/smallraven_1096000.gif "Final stage DRAW model training animation at 1,096,000 iterations showing complete raven reconstruction")
