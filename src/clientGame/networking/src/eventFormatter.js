function formatEvent(EventType, dataJson){
    const stringifyData = JSON.stringify(dataJson);
    const event = {event: EventType, data: stringifyData};
    const stringifyEvent = JSON.stringify(event)
    return stringifyEvent;
}

module.exports = {formatEvent,};