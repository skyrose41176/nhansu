import {AES, enc, mode, pad} from 'crypto-js';
const key = process.env.REACT_APP_PASSWORD_CIPHER ?? '';
export const encrypt = (text: string) => {
  try {
    const encrypted = AES.encrypt(text, key, {
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });
    return encrypted.toString();
  } catch (error) {
    return text;
  }
};

export const decrypt = (encryptedText: string) => {
  try {
    const decrypted = AES.decrypt(encryptedText, key);
    return decrypted.toString(enc.Utf8);
  } catch (error) {
    return encryptedText;
  }
};
