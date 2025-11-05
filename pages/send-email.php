<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Include PHPMailer (you need to install it)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // If using Composer
// OR include PHPMailer files manually:
// require 'PHPMailer/src/Exception.php';
// require 'PHPMailer/src/PHPMailer.php';
// require 'PHPMailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $mail = new PHPMailer(true);
    
    try {
        // SMTP Configuration - UPDATE THESE SETTINGS
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';  // Your SMTP server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'your-email@gmail.com';  // Your email
        $mail->Password   = 'your-app-password';     // Your app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        
        // Email settings
        $mail->setFrom('misbhiwadi@gmail.com', 'Website Contact Form');
        $mail->addAddress('misbhiwadi@gmail.com');
        $mail->addReplyTo($input['email'], $input['name']);
        
        $mail->isHTML(false);
        $mail->Subject = 'New Query from Website - ' . $input['name'];
        
        $mail->Body = "
New Query Submission from Website

Customer Details:
- Name: " . $input['name'] . "
- Email: " . $input['email'] . "
- Phone: " . $input['phone'] . "

Product Selection:
- Main Product: " . $input['product'] . "
- Sub Product: " . $input['subProduct'] . "
- Service: " . $input['service'] . "

Message:
" . $input['message'] . "

Submission Time: " . $input['submissionTime'];
        
        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
        
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Email failed: ' . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
