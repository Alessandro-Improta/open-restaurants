const restHours = require("./rest_hours.json");
const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
class Times{
    constructor() {
        this["0"] = {
            open: false,
            start: null,
            end: null
        }
        this["1"] = {
            open: false,
            start: null,
            end: null
        }
        this["2"] = {
            open: false,
            start: null,
            end: null
        }
        this["3"] = {
            open: false,
            start: null,
            end: null
        }
        this["4"] = {
            open: false,
            start: null,
            end: null
        }
        this["5"] = {
            open: false,
            start: null,
            end: null
        }
        this["6"] = {
            open: false,
            start: null,
            end: null
        }

    } 
} 

function parseRestaurantData(data) {
    let dataCopy = [...data];
    for (let restaurantIndex = 0; restaurantIndex < dataCopy.length; restaurantIndex++ ) {
        let timesArray = [...dataCopy[restaurantIndex].times]
        dataCopy[restaurantIndex].times = createNewTimesObject(timesArray);
    }
    return dataCopy;
}


function createNewTimesObject(timesArray) {
    let newTimesObj = new Times();
    for (let timesIndex = 0; timesIndex < timesArray.length; timesIndex++) {
        let time = timesArray[timesIndex];
        let {arrayOfDaysByNumber, hours} = splitStringAndReturnDaysAndTimes(time);

        
        for (let dayIndex = 0; dayIndex < arrayOfDaysByNumber.length; dayIndex++) {
            let day = arrayOfDaysByNumber[dayIndex];
            newTimesObj[day].open = true;
            newTimesObj[day].start = {...hours[0]};
            newTimesObj[day].end = {...hours[1]};
        }
    }
    return newTimesObj;
}

function splitStringAndReturnDaysAndTimes(string) {
    let result = {
        arrayOfDaysByNumber: [],
        hours: []
    }
    let splitString = string.toLowerCase().split(' ');
    for (let stringIndex = 0; stringIndex < splitString.length; stringIndex++) {
        let string = splitString[stringIndex];
        if (string.includes('-') && string.length > 1) {
            let indexOfDash = string.indexOf('-');
            let start = days.indexOf(string.substr(indexOfDash - 3, 3));
            let end = days.indexOf(string.substr(indexOfDash + 1, 3));
            for (let i = 0; i < days.length; i++) {
                if (i >= start || i <= end) {
                    result.arrayOfDaysByNumber.push(i);
                }
            }
        }
    
        if (days.includes(string)) {
            result.arrayOfDaysByNumber.push(days.indexOf(string))
        }
    
        if (splitString[stringIndex + 1] == 'am') {
            let time = {}
            let timeStringSplit = string.split(':');
            time.hours = parseInt(timeStringSplit[0]);
            time.minutes = parseInt(timeStringSplit[1]) || 0;
            result.hours.push(time);
        }
    
        if (splitString[stringIndex + 1] == 'pm') {
            let time = {}
            let timeStringSplit = string.split(':');
            time.hours = parseInt(timeStringSplit[0]) + 12;
            time.minutes = parseInt(timeStringSplit[1]) || 0;
            result.hours.push(time);
        }
    }
    return result;
}

const parsedData = parseRestaurantData(restHours);
export default parsedData;