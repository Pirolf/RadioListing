var circle = -1; //sentinal value
var currTarget = -1; //sentinal value
jQuery(document).ready(function($) {
    //load map first
    var searchRequest;
    var input_city = $("input[name='city']");
    var input_state = $("select[name='state']");
    var input_radius = $("input[name='radius']");

    $(".searchStation").submit(function(event) {
        console.log("Handler for .submit() called.");
        input_city.prop("disabled", true);
        input_state.prop("disabled", true);

        input_radius.prop("disabled", true);
        event.preventDefault();
        var city = input_city.val();
        var state = input_state.val();
        console.log(state);
        var radiusInMile = input_radius.val();
        searchRequest = $.ajax({
            url: ajaxurl,
            type: "post",
            dataType: "json",
            data: {"action": "echo_search_radio", "search_city": city, "search_state": state, "search_radius": radiusInMile},
            success: function(response_latlong) {
                var radiusInMeter = Number(radiusInMile) * 1600;
                console.log(response_latlong);
                console.log(response_latlong.lat);
                var centerLatlong = new google.maps.LatLng(response_latlong.lat, response_latlong.lng);
                map.setCenter(centerLatlong);
                if (circle !== -1) {
                    circle.setMap(null);
                    circle = -1;
                }
                /*
                if (currTarget !== -1) {
                    currTarget.setIcon(iconDefault);
                }
                currTarget = new google.maps.Marker({
                    position: centerLatlong,
                    map: map,
                    icon: goldStar
                    //infowindow: userInfowindow
                });
                */
                circle = new google.maps.Circle({
                    center: centerLatlong,
                    radius: radiusInMeter,
                    fillColor: "#ff69b4",
                    fillOpacity: 0.5,
                    strokeOpacity: 0.0,
                    strokeWeight: 0,
                    map: map
                });
                map.fitBounds(circle.getBounds());
                //do search
                for (var i = 0; i < radio_markers.length; i++) {
                    var curr_marker = radio_markers[i];//getPosition()
                    curr_marker.setIcon(iconDefault);
                    var currDist = google.maps.geometry.spherical.computeDistanceBetween(centerLatlong, curr_marker.getPosition());
                    console.log(currDist);
                    if (currDist <= radiusInMeter) {
                        console.log("near");
                        curr_marker.setIcon(iconWithinRadius);
                    }
                }
            }

        });
        searchRequest.fail(function(jqXHR, textStatus, errorThrown) {
            // log the error to the console
            console.error("The following error occured: " + textStatus + errorThrown);
        });
        // callback handler that will be called regardless
        // if the request failed or succeeded
        searchRequest.always(function() {
            // reenable the inputs
            input_city.prop("disabled", false);
            input_state.prop("disabled", false);
            input_radius.prop("disabled", false);
        });
    });

});


