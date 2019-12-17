## Sample for AES with GCM Cipher

Note: Tests are on my MAC.

### Summary of Observations:
```
Java
Run #1 aes-128-gcm time taken in milli seconds --> 38270
Run #3 aes-192-gcm time taken in milli seconds --> 37021
Run #5 aes-256-gcm time taken in milli seconds --> 36718

NodeJS
Run #2 aes-128-gcm  Execution time: %dms 44909
Run #4 aes-192-gcm  Execution time: %dms 43786
Run #6 aes-256-gcm  Execution time: %dms 44079

Run numbers are the order in which I ran the test so that you can see the graph and co-relate.. Java is much more efficient in handling Crypto I guess.. Better Performance at lesser CPU but it does consume more memory...

```

### Resource Utilisation
![Java NodeJS Compare](images/javaNodeJsCompare.png?raw=true "Java NodeJS Compare")

### How long does it take to brute force a 128 bit key ?
[Ref here](https://crypto.stackexchange.com/a/48669/75235)
Some one did a test with ASIC hardware (special purpose hardware, which can't be programmed to do anything else - but it's the best for speed) - which did approximately 5*10^18≈2^62.117 encryptions per second. That means, for the full key they needed ≈2^128/2^62.117=2^65.883 seconds. 

This is approximately:
1. 68*10^18 seconds
2. 18.9*10^15 hours
3. 2.158*10^12 years. Written as integer: 2,158,000,000,000

And they compare with the age of the universe - 13.799⋅10^9=13,799,000,000.

So a rough estimation would be 156.4 times the age of the universe for testing all keys.
