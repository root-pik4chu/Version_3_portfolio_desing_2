import React, { useState, useEffect } from 'react';

const DataTime = () => {
  const [dateTime, setDateTime] = useState('');
  
  useEffect(() => {
    // Function to update the time
    const updateTime = () => {
      // Create a date object for current time
      const now = new Date();
      
      // Convert to India/Maharashtra time (UTC+5:30)
      // First get the UTC time by adding the local timezone offset
      const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
      
      // Then add the India offset (+5:30 = 5.5 hours = 330 minutes = 19800000 milliseconds)
      const indiaTime = new Date(utcTime + 19800000);
      
      // Format the time in the GMT+6 (Kazakhstan) format
      const hours = indiaTime.getHours().toString().padStart(2, '0');
      const minutes = indiaTime.getMinutes().toString().padStart(2, '0');
      const seconds = indiaTime.getSeconds().toString().padStart(2, '0');
      
      // Format the AM/PM
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      // Format the date
      const day = indiaTime.getDate().toString().padStart(2, '0');
      const month = (indiaTime.getMonth() + 1).toString().padStart(2, '0');
      const year = indiaTime.getFullYear();
      
      // Combine into the desired format: GMT+6 (02:43 AM, KZ)
      const formattedTime = `GMT+5:30 [${hours}:${minutes} ${ampm}, Maharashtra]`;
      
      
      setDateTime(`${formattedTime} `);
    };
    
    // Update immediately
    updateTime();
    
    // Update every second
    const intervalId = setInterval(updateTime, 1000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  return (
   
   <div className="">{dateTime}</div>
);
};

export default DataTime;