const json = require("./rest_hours.json");
const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const newTimes = {
    0: {
        open: false,
        start: null,
        end: null
    },
    1: {
        open: false,
        start: null,
        end: null
    },
    2: {
        open: false,
        start: null,
        end: null
    },
    3: {
        open: false,
        start: null,
        end: null
    },
    4: {
        open: false,
        start: null,
        end: null
    },
    5: {
        open: false,
        start: null,
        end: null
    },
    6: {
        open: false,
        start: null,
        end: null
    }
};

console.log(json);

function parseRestaurantData(data) {
    let dataCopy = [...data];
    for (let restaurantIndex = 0; restaurantIndex < dataCopy.length; restaurantIndex++ ) {
        let timesArray = [...dataCopy[restaurantIndex].times]
        dataCopy[restaurantIndex].times = createNewTimesObject(timesArray);
        
        // restaurant.times = newTimesObj;
    }
    return dataCopy;
}

function createNewTimesObject(timesArray) {
    let newTimesObj = {...newTimes};
    for (let timesIndex = 0; timesIndex < timesArray.length; timesIndex++) {
        let time = timesArray[timesIndex];
        let arraysOfDaysByNumber = [];
        let hours = [];
        let splitString = time.toLowerCase().split(' ');
        for (let stringIndex = 0; stringIndex < splitString.length; stringIndex++) {
            let string = splitString[stringIndex];
            if (string.includes('-') && string.length > 1) {
                let indexOfDash = string.indexOf('-');
                let start = days.indexOf(string.substr(indexOfDash - 3, 3));
                let end = days.indexOf(string.substr(indexOfDash + 1, 3));
                for (let i = 0; i < days.length; i++) {
                    if (i > start || i < end) {
                        arraysOfDaysByNumber.push(i);
                    }
                }
            }
        
            if (days.includes(string)) {
                arraysOfDaysByNumber.push(days.indexOf(string))
            }
        
            if (splitString[stringIndex + 1] == 'am') {
                let time = {}
                let timeStringSplit = string.split(':');
                time.hours = parseInt(timeStringSplit[0]);
                time.minutes = parseInt(timeStringSplit[1]) || 0;
                hours.push(time);
            }
        
            if (splitString[stringIndex + 1] == 'pm') {
                let time = {}
                let timeStringSplit = string.split(':');
                time.hours = parseInt(timeStringSplit[0]) + 12;
                time.minutes = parseInt(timeStringSplit[1]) || 0;
                hours.push(time);
            }
        }
        for (let dayIndex = 0; dayIndex < arraysOfDaysByNumber.length; dayIndex++) {
            let day = arraysOfDaysByNumber[dayIndex];
            newTimesObj[day].open = true;
            newTimesObj[day].start = {...hours[0]};
            newTimesObj[day].end = {...hours[1]};
        }
    }
    return newTimesObj;
}

let parsedData = parseRestaurantData([...json]);
export default parsedData;