# Lucky draw

See [#4](https://github.com/kevin940726/challenges/issues/4).

## Reviewers

- Kai Hao

## Challenge

Make a lucky draw machine like [this](https://lab.sp88.com.tw/luckydraw/) such that

- Users should be able to paste in poll list or create serial number automatically.
- Users should be able to select how many winners there would be.
- The draw should be as random as possible.
- No external library to handle the random functionality.

## On Randomness

1. Use Linear Congruential Generator with

```
a = 1664525
c = 1013904223
m = math.pow(2, 32)
seed = Date.now()
```

(parameters from the Numerical Recipes book)

Alternatives include RC4 and Mersenne twister...etc.

This is the randomizing algo Java utilizes internally with their own parameters.
This method is not cryptographically safe.

## Test the randomness

1. Diehard test

2. visual inspection
