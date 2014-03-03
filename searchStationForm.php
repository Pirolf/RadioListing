<?php
    $searchFormHTML = "<form class='searchStation' method='post' action=''>
    <div class='city'>
        <input type='text' name='city' placeholder='City'></input> 
    </div>
    <div class='state'>
        <select name='state'>
            <option value='WI'>Wisconsin</option>
            <option value='CA'>California</option>
        </select>
    </div>
    <div class='radius'>
        <input type='number' name='radius' placeholder='Search Radius'></input>
    </div>
    <input type='hidden' name='search_radio_action' value='yes'></input>
    <div class='submit_button'>
        <input type='submit' value='Update'></input>
    </div>
</form>";
    echo $searchFormHTML;
?>
<!--form class='searchStation' method='post' action=''>
    <div class='city'>
        <input type='text' name='city' placeholder='City'></input> 
    </div>
    <div class='state'>
        <select name='state'>
            <option value=''>Select State</option>
            <option value='WI'>Wisconsin</option>
        </select>
    </div>
    <div class='radius'>
        <input type='number' name='radius' placeholder='Search Radius'></input>
    </div>
    <input type='hidden' name='search_radio_action' value='yes'></input>
    <div class='submit_button'>
        <input type='submit' value='Update'></input>
    </div>
</form-->
