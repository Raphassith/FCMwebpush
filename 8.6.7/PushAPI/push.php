<?php
$url = "https://fcm.googleapis.com/fcm/send";
$token = "token ที่ได้จาก ฺBrowser ในขั้นตอนก่อนหน้า";
$serverKey = 'Server Key ที่ Copy เก็บไว้';
$title = "ทดสอบ";
$body = "ข้อความทดสอบ";

$notification = array(
    'title' => $title,
    'body' => $body,
    //'icon' => '',
    'priority' => 'high',
    'sound' => 'default'
);

$arrayToSend = array(
    'to' => $token,
    'notification' => $notification,
);
$json = json_encode($arrayToSend);
$headers = array();
$headers[] = 'Content-Type: application/json';
$headers[] = 'Authorization: key=' . $serverKey;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//Send the request 
$response = curl_exec($ch);

echo '<pre>';
print_r($response);
echo '</pre>';
