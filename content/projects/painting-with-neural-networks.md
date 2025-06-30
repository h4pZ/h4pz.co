---
title: "Painting With Neural Networks"
date: 2023-09-10T19:25:34+02:00
draft: false
thumbnail: "/images/projects/painting-with-neural-networks/metalhead.jpg"
---

This project was born as one of my first course work for the  Creative Applications of Deep Learning  course on Kadenze (which I recommend). The idea of this project was to train a function that maps points (x, y) regarding the location of a pixel in R2, to a point (R, G, B) corresponding to the values of each channel in the pixel.
<!--more-->
 

The architecture is simply a feed forward with the hyper-parameters mentioned below as Default settings. I used two images  with this architecture. The first one is from the movie Metalhead and the second one is a low polygon illustration of Daenerys by Mordi Levi. The result of each network can be seen to the right. The left column corresponds to the original image and the right column corresponds to the reconstruction of the image by the network at different train steps. In addition to this, I did a small grid search and see how the selection of hyper-parameters affects the output. The grid search is constrained by the default settings, meaning that only one parameter of the default setting can be different at a time.

 

# Default settings
```python
number of neurons = 20
number of layers = 6
learning rate = 0.001
activation function = "relu"
```

# Gridsearch settings
```python
number of neurons = [1, 5, 10]
number of layers = [1, 3]
learning rate = [1, 0.1, 0.01]
activation function = [sigmoid, tanh]
```

# Gridsearch results

![original image](/images/projects/painting-with-neural-networks/metalhead.jpg "Original image from the movie Metalhead showing a close-up portrait of a person's face")

![sigmoid](/images/projects/painting-with-neural-networks/metalhead-act-0.gif "Animation showing neural network reconstruction of the Metalhead image using sigmoid activation function over training steps")
![tanh](/images/projects/painting-with-neural-networks/metalhead-act-1.gif "Animation showing neural network reconstruction of the Metalhead image using tanh activation function over training steps")
![lr1](/images/projects/painting-with-neural-networks/metalhead-lR-0.gif "Animation showing neural network reconstruction with learning rate 1.0 demonstrating training progression")
![lr2](/images/projects/painting-with-neural-networks/metalhead-lR-1.gif "Animation showing neural network reconstruction with learning rate 0.1 demonstrating training progression")
![lr3](/images/projects/painting-with-neural-networks/metalhead-lR-2.gif "Animation showing neural network reconstruction with learning rate 0.01 demonstrating training progression")
![nl0](/images/projects/painting-with-neural-networks/metalhead-nL-0.gif "Animation showing neural network reconstruction with 1 layer demonstrating limited learning capacity")
![nl1](/images/projects/painting-with-neural-networks/metalhead-nL-1.gif "Animation showing neural network reconstruction with 3 layers demonstrating improved learning capacity")
![nn0](/images/projects/painting-with-neural-networks/metalhead-nN-0.gif "Animation showing neural network reconstruction with 1 neuron per layer demonstrating minimal representation capacity")
![nn1](/images/projects/painting-with-neural-networks/metalhead-nN-1.gif "Animation showing neural network reconstruction with 5 neurons per layer demonstrating moderate representation capacity")
![nn2](/images/projects/painting-with-neural-networks/metalhead-nN-2.gif "Animation showing neural network reconstruction with 10 neurons per layer demonstrating higher representation capacity")
