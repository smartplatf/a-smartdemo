<?php
class smartcomm
{
    private $smartsvr = "192.168.1.4";
    private $smartport = "9081";
    private $origin = "http://localhost";

    function postSmart($uri, $post, $sess)
    {
        $url = 'http://' . $this->smartsvr . ':' . $this->smartport . $uri;

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Origin: ' . $this->origin,
            'Session-Id: ' . $sess,
            'Content-Length: ' . strlen($post))
        );

        $result = curl_exec($ch);
        $json = json_decode($result);
        return $json;
    }
}
?>
