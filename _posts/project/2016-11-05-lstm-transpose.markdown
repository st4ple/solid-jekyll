---
layout: project
title:  "LSTM.transpose()"
date:   2016-11-05 18:00:00
author: John Gamboa
categories:
- project
- rnn
img: tlstm.png
thumb: tlstm.png
carousel:
- tlstm_full.png
tagged: LSTM, architecture, memory-networks
client: 
website: https://github.com/vaulttech/lstmJam
---
### What is LSTM.transpose()?
STM.transpose() is an experiment with an unfolded version of LSTMs. The hypothesis is that The gradients of a deep Neural Network following the same architecture of the LSTM unfolded through time (even those of the bottom layers) are efficiently trainable with Backpropagation, and won't be affected by the 'vanishing gradient' problem. This is the case even when the weights are not 'tied'

#### Code and references
The code is public and would like to have more people collaborate with us to make it better.
