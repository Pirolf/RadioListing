jQuery(document).ready(function(){
    var map;

var goldStar = {
    url: "http://www.explorelogancounty.com/css/icons/GoldStar.png",
    scaledSize: new google.maps.Size(32, 32)
};
var iconDefault = {
    url: "http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png",
    scaledSize: new google.maps.Size(32, 32)
};
var iconNearest = {
    url: "http://maps.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png",
    scaledSize: new google.maps.Size(32, 32)
};

function initialize() {
    var user_lat = document.getElementById("user_lat").title;
    var user_long = document.getElementById("user_long").title;
    var user_city = document.getElementById("user_city").title;
    var user_state = document.getElementById("user_state").title;
    var user_country = document.getElementById("user_country").title;
    var userLatlng = new google.maps.LatLng(user_lat, user_long);


    var mapOptions = {
        zoom: 12,
        center: userLatlng,
        scaleControl: true,
        streetViewControl: true,
        panControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        mapTypeControl: true,
        overviewMapControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE
        }
    };
    var radio_markers = new Array();
    var radio_info = new Array();

    var infowindow = new google.maps.InfoWindow({
        maxWidth: 160
    });
    var user_loc_info = "<h4>You are here!<h4><div class='user_loc'>" + user_city +
            ", " + user_state + ", " + user_country + "</div>";
    var userInfowindow = new google.maps.InfoWindow({
        maxWidth: 160,
        content: user_loc_info
    });
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var user_loc_marker = new google.maps.Marker({
        position: userLatlng,
        map: map,
        icon: goldStar,
        infowindow: userInfowindow
    });

    google.maps.event.addListener(user_loc_marker, 'mouseover', function() {
        userInfowindow.open(map, user_loc_marker);
    });
    google.maps.event.addListener(user_loc_marker, 'mouseout', function() {
        userInfowindow.close();
    });

    var request = new XMLHttpRequest();
    request.open("GET", "http://laborradio.org/wp-content/plugins/radio-listing/radiostations.xml", false);
    request.send();
    var xml = request.responseXML;
    var radios = xml.getElementsByTagName("radio_station");

    var minDist = 0;
    var nearestStation;
    var nearestInfo;
    for (var i = 0; i < radios.length; i++) {
        var radio = radios[i];
        var station_name = radio.getElementsByTagName("station");
        var station_addr = radio.getElementsByTagName("addr");
        var station_lat = radio.getElementsByTagName("lat");
        var station_long = radio.getElementsByTagName("long");
        var station_casttime = radio.getElementsByTagName("cast_time");
        var station_freq = radio.getElementsByTagName("freq");


        if (station_addr[0].firstChild !== null && station_lat !== null && station_long !== null) {
            console.log(station_addr[0].firstChild.nodeValue);
            var radioLatlng = new google.maps.LatLng(station_lat[0].firstChild.nodeValue, station_long[0].firstChild.nodeValue);
            var radio_name = station_name[0].firstChild.nodeValue;
            var radio_addr = station_addr[0].firstChild.nodeValue;
            var radio_casttime = "N/A", radio_freq = "N/A";
            if (station_casttime[0].firstChild !== null) {
                radio_casttime = station_casttime[0].firstChild.nodeValue;
            }
            if (station_freq[0].firstChild !== null) {
                radio_freq = station_freq[0].firstChild.nodeValue;
            }

            var radio_loc_marker = new google.maps.Marker({
                position: radioLatlng,
                map: map,
                icon: iconDefault
            });
            radio_markers.push(radio_loc_marker);

            var curr_info = "<div class='radio_name'><p>" + radio_name + "</p></div>" +
                    "<div class='radio_addr'><p>" + radio_addr + "</p></div>" +
                    "<div calss='freq'><p>Frequency: " + radio_freq + "</p></div>" +
                    "<div class='casttime'><p>Cast Time: " + radio_casttime + "</p></div>";
            radio_info.push(curr_info);
            google.maps.event.addListener(radio_loc_marker, 'mouseover', (function(radio_loc_marker, i) {
                return (function() {
                    infowindow.setContent(radio_info[i]);
                    infowindow.open(map, radio_loc_marker);
                });
            })(radio_loc_marker, i));
            google.maps.event.addListener(radio_loc_marker, 'mouseout', (function(radio_loc_marker, i) {
                return (function() {
                    infowindow.close();
                });
            })(radio_loc_marker, i));
            //calc distantce
            var currDist = google.maps.geometry.spherical.computeDistanceBetween(userLatlng, radioLatlng);
            console.log(currDist);
            if (i === 0) {
                nearestInfo = curr_info;
                minDist = currDist;
                nearestStation = radio_loc_marker;
            } else {
                if (currDist < minDist) {
                    minDist = currDist;
                    nearestInfo = curr_info;
                    nearestStation = radio_loc_marker;
                }
            }



        }

    }
    //disp nearest station info http://labs.google.com/ridefinder/images/mm_20_red.png'

    //  nearestStation.setIcon(iconNearest);
    nearestStation.setIcon(iconNearest);
    nearestStation.setAnimation(google.maps.Animation.DROP);
    google.maps.event.addListener(nearestStation, 'center_changed', toggleBounce);
}
function toggleBounce() {

    if (nearestStation.getAnimation() !== null) {
        nearestStation.setAnimation(null);
    } else {
        nearestStation.setAnimation(google.maps.Animation.BOUNCE);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
});





