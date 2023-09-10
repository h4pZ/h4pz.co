---
title: "Mixture Density Network"
date: 2023-09-10T20:26:47+02:00
draft: true
thumbnail: "/images/projects/mdn/henr.jpg"
---


The mixture density network or MDN was specified by Christopher Bishop in his book Pattern Recognition and Machine Learning. This model tries to predict the marginal probability of a variable Y by a mixture of Gaussian distributions and a latent variable z defined by the network it self. One advantage of this architecture, unlike the softmax function, is that it can express a wide range of probability distributions. For this project I implemented a multivariate Gaussian density network with the purpose to predict (like in the painting images with neural networks post) the most probable (R, G, B) vector  for a pixel wich position is given by a point (x, y) in R2. I trained this network with two images. One oil painting by Henrik Uldalen and an illustration by Simon Weaner.
View fullsize Simon Weaner Illustration
Simon Weaner Illustration
View fullsize Henrik Uldalen oil painting
Henrik Uldalen oil painting

The hyper-parameters for the network can be seen above and the code it self can be seen in my repository. In addition to this, the code can represent 3 types of varcov matrices: isotropic, diagonal and a non-zero symmetric varcov. I present the results for both the isotropic and diagonal MDN models. Unfortunately the non-zero symmetric varcov suffers from two problems. The first one is that at the moment of writing/coding, the implementation for the determinant in tensorflow is cpu bound. The second one is that there is no guarantee that the varcov computed by the network is going to have full rank, rendering impossible inverting it and calculating the probability density function.
training videos



<div class="video-wrapper">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/gwCsTHtiCU4?si=kCBiJAiKwHBOAPPu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

<div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/t5xHxtwC_pE?si=FGmW3GV9M4x8_9V0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
