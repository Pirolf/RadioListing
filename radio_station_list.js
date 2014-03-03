jQuery(document).ready(
        function() {

            jQuery("#accordion").accordion({
                header: "h3",
                autoheight: true,
                active: false,
                alwaysOpen: false,
                fillspace: false,
                collapsible: true
            });

            // jQuery("#accordion h3").css("color", "blue");
            var request = new XMLHttpRequest();
            request.open("GET", "http://laborradio.org/wp-content/plugins/radio-listing/radiostations.xml", false);
            request.send();
            var xml = request.responseXML;
            var radios = xml.getElementsByTagName("radio_station");
            for (var i = 0; i < radios.length; i++) {
                var radio = radios[i];
                var station_name = radio.getElementsByTagName("station");
                var station_state = radio.getElementsByTagName("state");
                var station_addr = radio.getElementsByTagName("addr");
                //var station_lat = radio.getElementsByTagName("lat");
                //var station_long = radio.getElementsByTagName("long");
                var station_casttime = radio.getElementsByTagName("cast_time");
                var station_freq = radio.getElementsByTagName("freq");

                var name = "", state = "", addr = "", cast = "", freq = "";
                if (station_state[0].firstChild !== null) {
                    state = station_state[0].firstChild.nodeValue;
                    if (station_name[0].firstChild !== null) {
                        name = station_name[0].firstChild.nodeValue;
                    }

                    if (station_addr[0].firstChild !== null) {
                        addr = station_addr[0].firstChild.nodeValue;
                    }
                    if (station_casttime[0].firstChild !== null) {
                        cast = station_casttime[0].firstChild.nodeValue;
                    }
                    if (station_freq[0].firstChild !== null) {
                        freq = station_freq[0].firstChild.nodeValue;
                    }
                    //find corresponding li
                    var accorLi = jQuery("#accordion").find("." + state + " ul");
                    if (accorLi !== null) {
                        accorLi.append("<li><span class='radio_name'>"+ name + "</span>"
                               /* +"<span class='radio_addr'>" + addr + "</span>"*/
                                +"<span class='radio_freq'>"+freq+"</span>"
                                +"<span class='radio_cast'>"+cast+"</span></li>");
                    } else {
                       // jQuery("#accordion").find(".state_container_" + state).css("display", "none"); 
                    }
                }


            }
            //hide 
            var state_arr = new Array("AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN",
        "MS", "MO", "MT", "NE", "NV", "NH", "NJ","NM","NY","NC","ND","OH","OK","OR",
        "PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY");
        for(var j = 0; j < state_arr.length; j++){
            var curr_state = state_arr[j];
            var curr_item = jQuery("#accordion").find(".state_container_" + curr_state + " ul li");

            jQuery("#accordion").find(".state_container_" + curr_state + " div").css("height", "auto");
            if(curr_item.length == 0){
              jQuery("#accordion").find(".state_container_" + curr_state).css("display", "none");
            }
        }
            
            
            
        }

);


