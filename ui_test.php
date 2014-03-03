<?php
add_shortcode("ui_test", "ui_test");
function ui_test(){
    return "<div id='accordian'><h3>Section 1</h3>
  <div>
    <p>Mauris mauris ante, blandit et</p>
  </div>
  <h3>Section 2</h3>
  <div>
    <p>Sed non urna. Donec et ante. </p>
  </div></div>";
}
