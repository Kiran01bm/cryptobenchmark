#/bin/bash

# Build/Compile
javac -d /usr/apps/crypto/classes /usr/apps/crypto/src/*.java

# Run/Execute
java -cp /usr/apps/crypto/classes com.kiran.crypto.Crypto 2000000 aes-256-gcm
