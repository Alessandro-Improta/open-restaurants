import './App.css';
import DateTimePicker from 'react-datetime-picker';
import { useEffect, useState } from 'react';
import parsedData from './parsedData';


function App() {
  const [ filteredList, setFilteredList ] = useState([...parsedData]);
  const [ selectedDate, setSelectedDate ] = useState(new Date());

  useEffect(() => {
    console.log(selectedDate);
    console.log(typeof selectedDate.getDay());
    console.log(typeof selectedDate.getHours());
    console.log(typeof selectedDate.getMinutes());



  }, [selectedDate])

  console.log(parsedData);
  return (
    <>
      <DateTimePicker onChange={setSelectedDate} value={selectedDate} />
      {}
    </>
  );
}

export default App;
