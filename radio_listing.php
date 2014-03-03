<?php

/*
  Plugin Name: Radio Listing
  Plugin URI: http://argusinvent.com
  Description: Radio Listing for laborradio.org
  Version: 0.14.2.14
  Author URI: yt.argusinvent.com
 */

define('RL_PATH', plugin_dir_path(__FILE__));
define('RL_URL', plugin_dir_url(__FILE__));

include(RL_PATH . "google_radio_map.php");
include(RL_PATH . "ui_test.php");
add_action('wp_enqueue_scripts', 'rl_enqueue_scripts');

function rl_enqueue_scripts() {
   // wp_enqueue_script("jquery", "http://code.jquery.com/jquery-1.10.2.min.js", array(), "1.10");
    wp_enqueue_style("jquery_ui_css", "http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css", array(), false);
  //  wp_enqueue_script("jquery_ui", "http://code.jquery.com/ui/1.10.4/jquery-ui.js", array("jquery", "jquery_ui_css"));
    
    if (is_page("radio-map")) {

        
        //wp_enqueue_script("google_map_api", "https://maps.googleapis.com/maps/api/js?key=AIzaSyCnLlOccjPK3QcohGU_hi_cYf3hOX7jDW8&sensor=true", array("jquery"));
        wp_enqueue_script("google_map_api", "https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCv9zVjNyONG-f2Z_Wi1VcnRX_BTf1iks8&sensor=false", array("jquery"));
        wp_enqueue_script("google_map_sphereDist", "http://maps.google.com/maps/api/js?sensor=false&v=3&libraries=geometry", array("jquery"));
        wp_enqueue_script("radio_list", RL_URL . "radio_station_list.js", array("jquery","jquery-ui-accordion", "google_map_api","google_map_sphereDist" ));
        wp_enqueue_script("render_map", RL_URL . "render_map.js", array("google_map_api", "google_map_sphereDist"));
        
        wp_enqueue_style('radio_map_css', RL_URL . "radio_map.css", array(), false);
    }
    if(is_page("ui-test")){
        wp_enqueue_script("radio_list", RL_URL . "radio_station_list.js", array("jquery-ui-accordion"));
    }
}
