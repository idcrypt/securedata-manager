// Utility untuk enkripsi dan dekripsi data rahasia menggunakan AES
// Menggunakan library crypto-js (harus di-install: npm install crypto-js)

import CryptoJS from "crypto-js";

// Enkripsi string dengan password
export function encryptData(data, password) {
  return CryptoJS.AES.encrypt(data, password).toString();
}

// Dekripsi string terenkripsi dengan password
export function decryptData(encrypted, password) {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch (err) {
    return null;
  }
}
