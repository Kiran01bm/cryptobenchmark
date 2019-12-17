## Sample for AES with GCM Cipher

Note: Tests are on my MAC.

### Summary of Observations:
1. 128 to 192 - approx 10% increase in CPU usage and response time..
2. 192 to 256 - approx 10% increase in CPU usage and response time is like 5% increase...
3. 128 to 256 - approx 20% increase in CPU usage, 15% increase in responsetime..

### Respone Times:
```
aes-128-gcm  Execution time: %dms 41895
aes-192-gcm  Execution time: %dms 44704
aes-256-gcm  Execution time: %dms 46647
```

### Resource Utilisation
![Resource Usage](images/resourceUsage.png?raw=true "Resource Utilisation During Test")

### How long does it take to brute force a 128 bit key ?
[Ref here](https://crypto.stackexchange.com/a/48669/75235)
Some one did a test with ASIC hardware (special purpose hardware, which can't be programmed to do anything else - but it's the best for speed) - which did approximately 5*10^18≈2^62.117 encryptions per second. That means, for the full key they needed ≈2^128/2^62.117=2^65.883 seconds. 

This is approximately:
1. 68*10^18 seconds
2. 18.9*10^15 hours
3. 2.158*10^12 years. Written as integer: 2,158,000,000,000

And they compare with the age of the universe - 13.799⋅109=13,799,000,000.

So a rough estimation would be 156.4 times the age of the universe for testing all keys.
