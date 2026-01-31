---
title: "From Empirical Risk Minimization to REINFORCE"
date: 2026-01-24
draft: true
thumbnail: "/images/blog/docker/thumbnail.png"
summary: How are Empirical Risk Minimization, Montecarlo Estimation, Score Gradient Estimation and REINFORCE connected?
---

In this blog post I'll attempt to clearly link Empirical Risk Minimization, Montecarlo Estimation, Score Gradient Estimation and REINFORCE from first principles. The goal is to present them under the same view of a learning problem, estimation and inductive inference, which is the business that everyone in AI is involved with. To start let me set the stage first with Empirical Risk Minimization. 

## Empirical Risk Minimization

Vapnik in his book **The Nature of Statistical Learning Theory** [[1]](#ref-1) defined the learning problem as: 

> a problem of finding a desired dependence using a *limited* number of observations.

This dependence is defined under three components:

1. A generator $G$ of random vectors $x \in \mathbb{R}^n$, drawn independently from a fixed but unknown probability distribution function $F(x)$.
2. A supervisor $S$ who returns an output value $y$ to every input vector $x$, according to a conditional distribution function $F(y|x)$, also fixed but unknown.
3. A learning machine $LM$ capable of implementing a set of functions $f(x, \theta)$, $\theta \in \Theta$, where $\Theta$ is a set of parameters.

This desired dependence is found by choosing from the given set of functions $f(x, \theta)$, $\theta \in \Theta$, the one that best approximates the supervisor's response given a finite sample $\{(x\_i, y\_i)\}\_{i=1}^{l} \sim F(x,y) = F(x)F(y|x)$.

This learning problem can be approached via **Risk Minimization** in which the goal is to measure a loss or discrepancy $L(y, f(x, \theta))$ between $y$ and $f(x, \theta)$ and find the $\theta$ that minimizes the expected discrepancy. Note that we are minimizing the *expected* risk functional $R(f)$ since both $x, y$ are random variables!

 $$R(f) = \int L(y, f(x, \theta)) \ dF(x, y) = \underset{(x,y) \sim F(x,y)}{\mathbb{E}}[L(y, f(x, \theta))]$$

Unfortunately we can't minimize this function as $F(x, y)$ is unknown, otherwise it wouldn't be a learning problem. Instead we minimize the **Empirical Risk** which is defined as:


$$R\_{emp}(f) = \frac{1}{l} \sum\_{i=1}^{l} L(y\_i, f(x\_i))$$

and the minimization of this empirical risk functional is solved by

$$f^* = \underset{f \in \mathcal{H}}{\arg\min} \, R\_{emp}(f) = \underset{f \in \mathcal{H}}{\arg\min} \frac{1}{l} \sum\_{i=1}^{l} L(y\_i, f(x\_i))$$

where $\mathcal{H} = \{f(x, \theta) : \theta \in \Theta\}$ is the hypothesis space, the set of all functions that the learning machine can implement by varying the parameter $\theta$ over the parameter space $\Theta$.


ERM requires *uniform* convergence over all $f \in \mathcal{H}$ simultaneously (defined below), which depends on the complexity of the hypothesis space.

$$\sup\_{f \in \mathcal{H}} |R\_{emp}(f) - R(f)| \xrightarrow{P} 0$$

Under the above condition, we have guarantees that empirical risk minimization will minimize the risk functional $R(f)$. This however, doesn't mean that Monte Carlo Estimation is out of the picture!




## Monte Carlo Estimation

Now the problem becomes how to find the function $f^*$ that minimizes the empirical risk functional. Searching the entire hypothesis space $\mathcal{H}$ is intractable. One way to explore the hypothesis space is via Stochastic Approximation Inference [[1]](#ref-1), also known as stochastic gradient descent, batch gradient descent and minibatch gradient descent. In general, this process looks like:

$$\theta\_{t+1} = \theta\_t - \alpha\_t \nabla\_\theta R(f\_t), \quad t=1,2,3,\ldots,T$$

Unfortunately, we can't calculate this quantity directly since $F(x,y)$ is unknown, so we perform a pointwise approximation via Monte Carlo estimation (justified by the law of large numbers) using a batch of $B$ samples from our training set. Effectively computing an estimator for the gradient of the risk.

$$\nabla\_\theta R(f\_t) = \nabla\_\theta \underset{(x,y) \sim F(x,y)}{\mathbb{E}}[L(y, f(x, \theta\_t))] = \underset{(x,y) \sim F(x,y)}{\mathbb{E}}[\nabla\_\theta L(y, f(x, \theta\_t))]$$

$$\approx \frac{1}{B} \sum\_{i=1}^{B} \nabla\_\theta L(y\_i, f(x\_i, \theta\_t)) = \nabla\_\theta R\_{emp}(f\_t) = \widehat{\nabla\_\theta R(f\_t)}$$

Thus, the weight update becomes:

$$\theta\_{t+1} = \theta\_t - \alpha\_t \nabla\_\theta R\_{emp}(f\_t) = \theta\_t - \alpha\_t \frac{1}{B} \sum\_{i=1}^{B} \nabla\_\theta L(y\_i, f(x\_i, \theta\_t))$$

Each gradient step moves us from one hypothesis to another in the hypothesis space:

$$f\_1 \xrightarrow{\nabla\_\theta R} f\_2 \xrightarrow{\nabla\_\theta R} \cdots \xrightarrow{\nabla\_\theta R} f\_T$$

or equivalently in parameter space:

$$\theta\_1 \to \theta\_2 \to \cdots \to \theta\_T$$

This stochastic approximation process has convergence guarantees under the Robbins-Monro conditions [[2]](#ref-2). With this technique we move through the hypothesis space in search for $f^*$.


## Score Gradient Estimation

One of the key things that was used to introduce the Monte Carlo estimator for the gradient of $R(f\_t)$ is that the gradient of the expectation is the expectation of the gradient. This works above but it isn't true everywhere.

Imagine you have a function $Q(s)$ that you want to maximize or minimize and that it depends on $s \sim p(s; \theta)$ which is a sample from a distribution parametrized by, let's say, a neural network. Since the function depends on a stochastic variable, we maximize its expected value:

$$J(\theta) = \underset{s \sim p(s; \theta)}{\mathbb{E}}[Q(s)] = \int Q(s)  p(s; \theta) \, ds$$

If we want to maximize the function by exploring the hypothesis space $\Theta$ in a similar fashion as above via stochastic approximation given that it's too large, we need to get an estimator of the gradient of the expectation in order to do a parameter update like:

$$\theta\_{t+1} = \theta\_t + \alpha\_t \nabla\_\theta J(\theta\_t), \quad t=1,2,3,\ldots,T$$

So let's see what happens when we take the gradient of $J(\theta)$:

$$\nabla\_\theta J(\theta) = \nabla\_\theta \underset{s \sim p(s; \theta)}{\mathbb{E}}[Q(s)] = \nabla\_\theta \int Q(s) p(s; \theta) ds = \int Q(s) \nabla\_\theta p(s; \theta) ds$$

We can move the gradient inside the integral since it's a linear operator. However, once we arrive at the above expression, we can't re-define the integral as an expectation. To alleviate this we use the log-derivative trick.

We start by multiplying and dividing by $p(s; \theta)$ inside the integral:

$$\int Q(s) \nabla\_\theta p(s; \theta) ds = \int Q(s) p(s; \theta) \frac{\nabla\_\theta p(s; \theta)}{p(s; \theta)} ds$$

Notice that $\frac{\nabla\_\theta p(s; \theta)}{p(s; \theta)} = \nabla\_\theta \log p(s; \theta)$ by the chain rule. So:

$$= \int Q(s) p(s; \theta) \nabla\_\theta \log p(s; \theta) ds$$

$$= \underset{s \sim p(s; \theta)}{\mathbb{E}}[Q(s) \nabla\_\theta \log p(s; \theta)]$$

$$\approx \frac{1}{B} \sum\_{i=1}^{B} Q(s\_i) \nabla\_\theta \log p(s\_i; \theta) = \widehat{\nabla\_\theta J(\theta)}$$

This is the way we arrive at the gradient estimator $\widehat{\nabla\_\theta J(\theta)}$. This is called the Score Gradient Estimator since the gradient of the log probability distribution $\nabla\_\theta \log p(s; \theta)$ is called the score (or informant). Armed with this estimator we can update our stochastic parameter update process accordingly and optimize away:

$$\theta\_{t+1} = \theta\_t + \alpha\_t \widehat{\nabla\_\theta J(\theta\_t)} = \theta\_t + \alpha\_t \frac{1}{B} \sum\_{i=1}^{B} Q(s\_i) \nabla\_\theta \log p(s\_i; \theta\_t)$$

## REINFORCE

> ...apply in general to any learner whose input-output mappings consists of a parameterized input-controlled distribution function from which outputs are randomly generated, and the corresponding algorithms modify the learner's distribution function on the basis of performance feedback. Because of the gradient approach used here, the only restriction on the potential applicability of these results is that certain obvious differentiability conditions must be met...

## References

<a id="ref-1"></a>[ 1 ] Vladimir N. Vapnik. The Nature of Statistical Learning Theory. Second Edition. Springer, 2000.

<a id="ref-2"></a>[ 2 ] Herbert Robbins and Sutton Monro. A Stochastic Approximation Method. The Annals of Mathematical Statistics, 22(3):400-407, 1951.

