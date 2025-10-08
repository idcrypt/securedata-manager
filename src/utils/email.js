// Utility untuk mengirim file backup ke email (opsional, contoh integrasi)
// Menggunakan EmailJS (https://www.emailjs.com/) atau API lain

// Import emailjs jika menggunakan emailjs
// import emailjs from 'emailjs-com';

export async function sendBackupToEmail(fileContent, email, lang = "en") {
  // Contoh dengan emailjs, pastikan sudah setup emailjs di project!
  // emailjs.send(service_id, template_id, {
  //   to_email: email,
  //   file_content: fileContent,
  //   lang: lang
  // }, user_id);

  // Untuk demo, hanya alert
  alert(
    lang === "en"
      ? "Feature to send backup to email is not implemented yet."
      : "Fitur kirim backup ke email belum tersedia."
  );
}
