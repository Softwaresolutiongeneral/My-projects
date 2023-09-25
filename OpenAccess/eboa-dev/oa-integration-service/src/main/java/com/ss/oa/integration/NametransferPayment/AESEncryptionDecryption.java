package com.ss.oa.integration.NametransferPayment;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import org.springframework.stereotype.Service;

import java.security.spec.KeySpec;
import java.security.SecureRandom;


@Service
public class AESEncryptionDecryption {

    private static final String KEY_STRING = "HTBILL_EB_PAYMENT";
    private static final String PASSWORD = "tanHTbiLll@123";
    private static final String SALT = "HpayTNEBhtbill";
    private static final int ITERATIONS = 65536;
    private static final int KEY_SIZE = 128;

    
    public String EncryptDecrypt(String condition,String data) throws Exception {
       

        // Generate AES key using password and salt
        SecretKey secretKey = generateAESKey(PASSWORD.toCharArray(), SALT.getBytes(), ITERATIONS, KEY_SIZE);

        if (condition.equals("encryption")) {
        	// Encrypt the data
            String encryptedText = encrypt(data, secretKey);
            return encryptedText;
        	
        }
        
        if (condition.equals("decryption")) {
        	 // Decrypt the data
            String decryptedText = decrypt(data, secretKey);
            return decryptedText;
        	
        }
        
        return "";
    }

    private static SecretKey generateAESKey(char[] password, byte[] salt, int iterations, int keySize) throws Exception {
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        KeySpec spec = new PBEKeySpec(password, salt, iterations, keySize);
        SecretKey tmp = factory.generateSecret(spec);
        return new SecretKeySpec(tmp.getEncoded(), "AES");
    }

    private static String encrypt(String plainText, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes());
        return DatatypeConverter.printBase64Binary(encryptedBytes);
    }

    private static String decrypt(String encryptedText, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] decryptedBytes = cipher.doFinal(DatatypeConverter.parseBase64Binary(encryptedText));
        return new String(decryptedBytes);
    }
    
    
}
