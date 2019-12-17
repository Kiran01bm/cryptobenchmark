package com.kiran.crypto;

import java.security.SecureRandom;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class Crypto {

    private static final int AES256_KEY_SIZE = 256;
    private static final int AES192_KEY_SIZE = 192;
    private static final int AES128_KEY_SIZE = 128;
    private static final int GCM_IV_LENGTH = 16;
    private static final int GCM_TAG_LENGTH = 16;
    private static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private static SecureRandom rnd = new SecureRandom();
    private static long repetitionCount = 2000000;
    private static String cipherName = "aes-128-gcm";

    public static void main(String[] args) throws Exception {
        Crypto.repetitionCount = Long.parseLong(args[0]);
        Crypto.cipherName = args[1];
        KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
        SecretKey key;
        String decryptedText;
        byte[] cipherText;
        long timeTaken;

        if (Crypto.cipherName.indexOf(Crypto.AES128_KEY_SIZE) > -1) {
            keyGenerator.init(AES128_KEY_SIZE);
            key = keyGenerator.generateKey();
        } else if (Crypto.cipherName.indexOf(Crypto.AES192_KEY_SIZE) > -1) {
            keyGenerator.init(AES192_KEY_SIZE);
            key = keyGenerator.generateKey();
        } else if (Crypto.cipherName.indexOf(Crypto.AES256_KEY_SIZE) > -1) {
            keyGenerator.init(AES256_KEY_SIZE);
            key = keyGenerator.generateKey();
        } else {
            keyGenerator.init(AES256_KEY_SIZE);
            key = keyGenerator.generateKey();
        }

        byte[] IV = new byte[GCM_IV_LENGTH];
        SecureRandom random = new SecureRandom();
        random.nextBytes(IV);

        long startTime = System.currentTimeMillis();
        for (long i = 0; i < repetitionCount; i++) {
            cipherText = encrypt(randomString(60).getBytes(), key, IV);
            decryptedText = decrypt(cipherText, key, IV);
        }
        long endTime = System.currentTimeMillis();
        
	timeTaken=endTime-startTime;
        System.out.println(Crypto.cipherName + " time taken in milli seconds --> " + timeTaken); 
    }


    public static String randomString(int len) {
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        return sb.toString();
    }

    public static byte[] encrypt(byte[] plaintext, SecretKey key, byte[] IV) throws Exception {
        // Get Cipher Instance
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");

        // Create SecretKeySpec
        SecretKeySpec keySpec = new SecretKeySpec(key.getEncoded(), "AES");

        // Create GCMParameterSpec
        GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH * 8, IV);

        // Initialize Cipher for ENCRYPT_MODE
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, gcmParameterSpec);

        // Perform Encryption
        byte[] cipherText = cipher.doFinal(plaintext);

        return cipherText;
    }

    public static String decrypt(byte[] cipherText, SecretKey key, byte[] IV) throws Exception {
        // Get Cipher Instance
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");

        // Create SecretKeySpec
        SecretKeySpec keySpec = new SecretKeySpec(key.getEncoded(), "AES");

        // Create GCMParameterSpec
        GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH * 8, IV);

        // Initialize Cipher for DECRYPT_MODE
        cipher.init(Cipher.DECRYPT_MODE, keySpec, gcmParameterSpec);

        // Perform Decryption
        byte[] decryptedText = cipher.doFinal(cipherText);

        return new String(decryptedText);
    }
}
