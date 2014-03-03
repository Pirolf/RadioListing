<?php

require_once RL_PATH . 'curl/curl.php';
add_shortcode("google_radio_map", "google_radio_map");

function google_radio_map() {
    include_once RL_PATH ."searchStationForm.php";
    $curl = new Curl;
    $client_ip = get_client_ip();
    /*
      $response = $curl->post('ipinfo.io', array('ip' => '8.8.8.8'));
      echo $response->body;
      print_r($response->headers);
     * 
     */

    $response = $curl->get('ipinfo.io/' . $client_ip . '/geo');
   // echo $response->body; # A string containing everything in the response except for the headers
//print_r($response->headers); # An associative array containing the response headers
    $json_vals = json_decode($response->body);
    $loc = $json_vals->{'loc'};
    $city = $json_vals->{'city'};
    $state = $json_vals->{'region'};
    $country = $json_vals->{'country'};
    
    $loc_arr = explode(",", $loc);
    
    $user_lat = $loc_arr[0];
    $user_long = $loc_arr[1];

  //  echo $user_lat . ", " . $user_long;
    show_map($user_lat, $user_long, $city, $state, $country);
    // echo  "<div id='map-canvas'></div>";
}

function show_map($lat, $long, $city, $state, $country) {
    $map_wrapper_html = "";
    $map_wrapper_html .= "<span style='display:none;' id='user_lat' title='$lat'>$lat</span>"
            . "<span style='display:none;' id='user_long' title='$long'>$long</span>"
            . "<span style='display:none;' id='user_city' title='$city'>$city</span>"
            . "<span style='display:none;' id='user_state' title='$state'>$state</span>"
            . "<span style='display:none;' id='user_country' title='$country'>$country</span>";
    $map_wrapper_html .= "<div id='map-canvas'></div><div id='accordion'>".state_list()."</div>";
    echo $map_wrapper_html;
}

function get_client_ip() {
    $ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if (getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if (getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if (getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if (getenv('HTTP_FORWARDED'))
        $ipaddress = getenv('HTTP_FORWARDED');
    else if (getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';

    return $ipaddress;
}
function state_list(){
    $state_arr = array("AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN",
        "MS", "MO", "MT", "NE", "NV", "NH", "NJ","NM","NY","NC","ND","OH","OK","OR",
        "PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY");
    $curr_state_html = "";
    foreach($state_arr as $curr_state){
         $curr_state_html .= "
    
    <div class='state_container_$curr_state'>"
                 . "<h3>$curr_state</h3><div class='$curr_state'>
        <ul>
        </ul>
        
    </div></div>";
    }
    return $curr_state_html;
   
}