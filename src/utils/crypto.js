// Enkripsi string dengan password
function encryptData(data, password) {
  return CryptoJS.AES.encrypt(data, password).toString();
}

// Dekripsi string terenkripsi dengan password
function decryptData(encrypted, password) {
  try {
    var bytes = CryptoJS.AES.decrypt(encrypted, password);
    var decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch (err) {
    return null;
  }
}
