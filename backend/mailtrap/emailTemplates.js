export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifikasi Email Anda</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verifikasi Email Anda</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Halo,</p>
    <p>Terima kasih telah mendaftar! Kode verifikasi Anda adalah:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Masukkan kode ini di halaman verifikasi untuk menyelesaikan pendaftaran.</p>
    <p>Kode ini akan kedaluwarsa dalam 15 menit demi alasan keamanan.</p>
    <p>Jika Anda tidak membuat akun dengan kami, abaikan email ini.</p>
    <p>Hormat kami,<br>Har lojin</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Ini adalah pesan otomatis, harap jangan membalas email ini.</p>
  </div>
</body>
</html>`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Kata Sandi Berhasil</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Reset Kata Sandi Berhasil</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Halo,</p>
    <p>Kami mengkonfirmasi bahwa kata sandi Anda telah berhasil direset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>Jika Anda tidak melakukan reset kata sandi ini, segera hubungi tim kami.</p>
    <p>Demi keamanan, kami menyarankan Anda untuk:</p>
    <ul>
      <li>Menggunakan kata sandi yang kuat dan unik</li>
      <li>Mengaktifkan autentikasi dua faktor jika tersedia</li>
      <li>Menghindari penggunaan kata sandi yang sama di beberapa situs</li>
    </ul>
    <p>Terima kasih telah membantu kami menjaga keamanan akun Anda.</p>
    <p>Hormat kami,<br>har lojin</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Ini adalah pesan otomatis, harap jangan membalas email ini.</p>
  </div>
</body>
</html>

`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atur Ulang Kata Sandi Anda</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Reset Kata Sandi</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Halo,</p>
    <p>Kami menerima permintaan untuk mengatur ulang kata sandi Anda. Jika Anda tidak membuat permintaan ini, abaikan email ini.</p>
    <p>Untuk mengatur ulang kata sandi Anda, klik tombol di bawah ini:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Kata Sandi</a>
    </div>
    <p>Link ini akan kedaluwarsa dalam 1 jam demi alasan keamanan.</p>
    <p>Hormat kami,<br>har lojin</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Ini adalah pesan otomatis, harap jangan membalas email ini.</p>
  </div>
</body>
</html>
`;
