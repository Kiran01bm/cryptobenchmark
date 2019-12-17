## Sample for AES with GCM Cipher

Note: Tests are on my MAC.

### Summary of Observations:
128 to 192 - approx 10% increase in CPU usage and response time..
192 to 256 - approx 10% increase in CPU usage and response time is like 5% increase...
128 to 256 - approx 20% increase in CPU usage, 15% increase in responsetime..

### Respone Times:
```
aes-128-gcm  Execution time: %dms 41895
aes-192-gcm  Execution time: %dms 44704
aes-256-gcm  Execution time: %dms 46647
```

### Resource Utilisation
![Resource Usage](images/resourceUsage.png?raw=true "Resource Utilisation During Test")

### Miscellaneous
[Ref here](https://crypto.stackexchange.com/a/48669/75235)
Some one did a test with some ASIC hardware - approximately 5*10^18≈2^62.117 encryptions per second. That means, for the full key they needed ≈2^128/2^62.117=2^65.883 seconds. 

This is approximately:
68*1018 seconds
18.9*1015 hours
2.158*1012 years. Written as integer: 2,158,000,000,000

And they compare with the age of the universe - 13.799⋅109=13,799,000,000.

So a rough estimation would be 156.4 times the age of the universe for testing all keys.