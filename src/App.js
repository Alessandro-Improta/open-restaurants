import './App.css';
import DateTimePicker from 'react-datetime-picker';
import { useEffect, useState } from 'react';
import parsedData from './parsedData';


function App() {
  const [ filteredList, setFilteredList ] = useState([...parsedData]);
  const [ selectedDate, setSelectedDate ] = useState(new Date());

  useEffect(() => {
    filterList();
  }, [selectedDate])

  function filterFunction(element) {
    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth();
    let date = selectedDate.getDate();
    let day = selectedDate.getDay();
    let hours = selectedDate.getHours();

    let start = element.times[day].start;
    let end = element.times[day].end;
    
    if (element.times[day] && element.times[day].open) {
      let startDate = new Date(year, month, start.hours > 12 && end.hours < 4 && hours < 4 ? date - 1 : date, start.hours, start.minutes);
      let endDate = new Date(year, month, start.hours > 12 && end.hours < 4 && hours > 4 ? date + 1 : date, end.hours, end.minutes);
      if (startDate.getTime() < selectedDate.getTime() && endDate.getTime() > selectedDate.getTime()) {
        return true;
      }
    }
    return false;
  }

  function filterList() {
    let newList = parsedData.filter(restaurant => filterFunction(restaurant));
    setFilteredList(newList);
  }

  return (
    <>
      <DateTimePicker onChange={setSelectedDate} value={selectedDate} />
      {filteredList.map((restaurant, index) => (
        <p key={"key"+index}>{restaurant.name}</p>
      ))}
    </>
  );
}

export default App;
