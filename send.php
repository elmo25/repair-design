<?php
$userName = $_POST['userName'];
$userPhone = $_POST['userPhone'];
$userEmail = $_POST['userEmail'];




// Load Composer's autoloader
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  //Server settings
  $mail->SMTPDebug = 0;                      // Enable verbose debug output
  $mail->isSMTP();                                            // Send using SMTP
  $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
  $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
  $mail->Username   = 'antonantonov2454@gmail.com';                     // SMTP username
  $mail->Password   = 'antonAAA';                               // SMTP password
  $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
  $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

  //Recipients
  $mail->setFrom('antonantonov2454@gmail.com', 'Антон');
  $mail->addAddress('vetll25@icloud.com');     // Add a recipient


  // Attachments
  $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
  $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

  // Content
  $mail->isHTML(true);                                  // Set email format to HTML
  $mail->Subject = 'Новая заявка с сайта';
  $mail->Body    = "Имя пользователя: ${userName},  телефон: ${userPhone}, его email: ${userEmail}";


  $mail->send();
  header('Location:thanks.html');
  echo 'Письмо отправлено';
} catch (Exception $e) {
  echo "Письмо не отправлено, есть ошибка.Код ошибки: {$mail->ErrorInfo}";
}
