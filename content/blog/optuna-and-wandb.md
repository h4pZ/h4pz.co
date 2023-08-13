---
title: "Optuna and Wandb"
date: 2023-08-13T21:33:50+02:00
draft: false
---


[Weights and Biases][0] (WandB) is an experiment tracking, model optimization and dataset versioning tool. The cool thing about it is that the runs are stored on their cloud automatically. So, if you are training on a remote server, you just setup a few lines of code in your experiment and then you don't have to worry about getting back the results out of the instance before shutting it down. 
<!--more-->


This tool also allows you to do some hyperparameters sweeps. It comes with some predefined [algorithms][1] for this purpose. However, you might want to use an alternative method or library. In my case, I wanted to use [Optuna][2], which is a bayesian hyperparameter optimization framework. Unfortunately I couldn't find a single example on the web on how to do so. More specifically, I didn't find an example on how to run the study and get both the hyperparameter history and a parallel coordinate plot in WandB. So, that's what this blog entry is for.


[0]: https://www.wandb.com/
[1]: https://github.com/wandb/client/tree/master/wandb/sweeps
[2]: https://optuna.org/

## TLDR

I didn't know how to use WandB with Optuna such that I could get a parallel coordinate plot and the history of parameters, and since I couldn't find an example on Google, I made one.

## Optimization setup

For this blog post let's assume we have a data generating process

$$f(x_1, x_2 | \alpha, \beta) = \alpha x_1 + \beta x_2$$

and we observe the variables $y$, $x_1$ and $x_2$

$$y = f(x_1, x_2 | \alpha, \beta) + \epsilon$$

where,

$$x_i \sim \mathcal{N}(\mu=10, \sigma=3), \text{ } \forall \text{ } i \in \\{1, 2\\}$$

$$\epsilon \sim \mathcal{N}(0, 1)$$

$$\beta = 5$$

$$\alpha = 1 / 5$$

Also, let's assume we don't know the real values for $\alpha$ nor $\beta$. So, we want to find the best values for these parameters such that we minimize the mean squared error:

$$\underset{\hat{\alpha}, \hat{\beta}}{\mathrm{argmin}}\text{ } \frac{1}{N} \sum_{i}^{N} \left(y_i - \left(\hat{\alpha} x_{i,1} + \hat{\beta} x_{i,2}\right)\right)^2$$

This is the optimization problem that Optuna is going to solve.


## Code
```python
    import os
    import numpy as np
    import optuna
    import wandb
    
    
    class Objective(object):
        def __init__(self, seed):
            # Setting the seed to always get the same regression.
            np.random.seed(seed)
    
            # Building the data generating process.
            self.nobs = 1000
            self.epsilon = np.random.uniform(size=(self.nobs, 1))
            self.real_beta = 5.0
            self.real_alpha = 1.0 / 5.0
            self.X1 = np.random.normal(loc=10, scale=3, size=(self.nobs, 1))
            self.X2 = np.random.normal(loc=10, scale=3, size=(self.nobs, 1))
            self.y = self.X1 * self.real_alpha + \
                     self.X2 * self.real_beta + \
                     self.epsilon
    
    
        def __call__(self, trial):
            # Parameters.
            trial_alpha = trial.suggest_uniform("alpha", low=-10, high=10)
            trial_beta = trial.suggest_uniform("beta", low=-10, high=10)
    
            # Starting WandrB run.
            config = {"trial_alpha": trial_alpha,
                      "trial_beta": trial_beta}
            run = wandb.init(project="optuna",
                             name=f"trial_",
                             group="sampling",
                             config=config,
                             reinit=True)
    
            # Prediction and loss.
            y_hat = self.X1 * trial_alpha + self.X2 * trial_beta
            mse = ((self.y - y_hat) ** 2).mean()
    
            # WandB logging.
            with run:
                run.log({"mse": mse}, step=trial.number)
    
            return mse
    
    
    def main():
        # Execute an optimization by using an `Objective` instance.
        black_box = Objective(seed=4444)
        sampler = optuna.samplers.TPESampler(seed=4444)
        study = optuna.create_study(direction="minimize",
                                    sampler=sampler)
        study.optimize(black_box,
                       n_trials=100,
                       show_progress_bar=True)
        print(f"True alpha: {black_box.real_alpha}")
        print(f"True beta: {black_box.real_beta}")
        print(f"Best params: {study.best_params}")
    
        # Create the summary run.
        summary = wandb.init(project="optuna",
                             name="summary",
                             job_type="logging")
    
        # Getting the study trials.
        trials = study.trials
    
        # WandB summary.
        for step, trial in enumerate(trials):
            # Logging the loss.
            summary.log({"mse": trial.value}, step=step)
    
            # Logging the parameters.
            for k, v in trial.params.items():
                summary.log({k: v}, step=step)
    
    
    if __name__ == "__main__":
        main()
```

## Problem

In order to create a parallel coordiante plot on WandB for a project, one needs to have several runs of an experiment. This is not a problem since each Optuna trial can be logged as a run (this is done by setting `reinit=True`in `wandb.init()` on the `__call__`method). However, with this setup so far it's impossible to have a history of the parameters and mse over the study. This happens because each WandB run only contains one observation, so WandB will only be able to show one data point on its line plots (this will make the line plots default into a bar plot).

## Solution

The solution is to create a `summary` WandB run outside of the study and then log the mse and the parameters for each timestep from the history of the trials that Optuna saves in `study.trials`. This can be seen at the end of the `main` function. After running the code, one will get the plots shown above on WandB with Optuna :)

### disclaimer

This is the solution I came with for this problem. There might be an even easier solution or a trivial one that I missed. If someone knows a better way of doing this, please let me know.
