<?php
add_action('wp_ajax_echo_search_radio', 'echo_search_radio');
add_action('wp_ajax_nopriv_echo_search_radio', 'echo_search_radio');
function echo_search_radio(){
    require_once RL_PATH . 'curl/curl.php';
    $curl_searchRadio = new Curl;
    $city_state = "";
    if(!empty($_POST['city']) && !empty($_POST['search_state'])){
        $city_state = ($_POST['search_city']).",".($_POST['search_state']);
    }else if(empty($_POST['city'])){
        $city_state = $_POST['search_state'];
    }else if(empty($_POST['state'])){
        $city_state = $_POST['search_city'];
    }
   // $lat='a';
    $latlong = "no";
    $response = $curl_searchRadio->get("https://maps.googleapis.com/maps/api/geocode/json?address=$city_state&sensor=false");
    $json_vals = json_decode($response->body);
    
    $response_status = $json_vals->{'status'};
    if($response_status == "OK"){
        $results = $json_vals->{'results'};
        $results_vals = $results[0];
        $latlong = $results_vals->{'geometry'}->{'location'};
       // $long =  $results_vals->{'geometry'}->{'location'}->{'lng'};
        $latlong_json = json_encode($latlong);
    }
    echo $latlong_json;
    //echo $city_state;
    //echo $response_status;
   // echo "succ";
    die();
}
