<?php

class Lib
{
    const loginUrl = "http://lageless-001-site1.htempurl.com/Login/Authen";
    const mainUrl = "http://lageless-001-site1.htempurl.com/";
    const bookUrl = "http://lageless-001-site1.htempurl.com/book/1";
    const cookie = "cookie.dat";

    public function  __construct($login, $pass)
    {
        $postData = "Login="  .$login. "&Password=" .$pass;
        $this->initCurl(self::loginUrl, self::loginUrl, $postData);
    }

    private function initCurl($url, $ref, $post)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_REFERER, $ref);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        curl_setopt($ch, CURLOPT_COOKIEFILE, self::cookie);
        curl_setopt($ch, CURLOPT_COOKIEJAR, self::cookie);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

        $result = curl_exec($ch);
        $headers = curl_getinfo($ch, CURLINFO_HEADER_OUT);
        curl_close($ch);

        print_r($headers);

        return $result;
    }

    private function loadPage()
    {

    }
}