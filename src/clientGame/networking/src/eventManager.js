/*
    The websocket is will be used for multiple purposes hence multiple 
    events are transmitted using the same socket. Each message sent over 
    the web socket is a different event hence the eventmanager is responsible 
    for detecting the event and transfering the data to the respective event 
    handler script to preform an action on the server.

    Events are given as "{event: 'event_name', data: {}}"
*/

function EventHandler(message){
    const json = message.stringify(message);
    

}

module.exports = {EventHandler,};