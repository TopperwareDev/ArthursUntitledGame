/*
    This module will return client window infomation as json
*/

import { get_absolute_height, get_absolute_width } from "./lib/get_window_dimensions";

//values are prewriten in to json just for orginisation and structural purposes
const window_data = {
    browser_height: undefined,
    browser_width: undefined,
}

export function update_window_data(){
    window_data.browser_height = get_absolute_height();
    window_data.browser_width = get_absolute_width();
    return window_data;
}