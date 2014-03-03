<?php
require_once RL_PATH . 'curl/curl.php';
if ($_POST['search_radio_action'] == 'yes') {
    $city=''; $state=''; $radius = -1;
    if (!empty($_POST['city'])) {
        $city = sani($_POST['city']);
    }
    if (!empty($_POST['state'])) {
        $state = sani($_POST['state']);
    }
    if (!empty($_POST['radius'])) {
        $radius = sani($_POST['radius']);
    }
    $curl_searchRadio = new Curl;
    $response = $curl_searchRadio->get("https://maps.googleapis.com/maps/api/geocode/json?address=$city,$state&sensor=false");
    $json_vals = json_decode($response->body);
    $response_status = $json_vals->{'status'};
    if($response_status == "OK"){
        $lat = $json_vals->{'geometry'}->{'location'}->{'lat'};
        $long =  $json_vals->{'geometry'}->{'location'}->{'long'};
        $latlong = $lat.$long;
    }
}

function sani($input_val) {
    return htmlentities($input_val);
}
