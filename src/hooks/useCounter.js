import { useState, useEffect } from 'react';

export const useCounter = (startDate = new Date('2022-05-26T00:00:00Z')) => {
  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const start = new Date(startDate);
      
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      let hours = now.getHours() - start.getHours();
      let minutes = now.getMinutes() - start.getMinutes();
      let seconds = now.getSeconds() - start.getSeconds();

      // Adjust negative values
      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        months--;
        const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonthLastDay;
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      setTime({ years, months, days, hours, minutes, seconds });
    };

    // Calculate immediately on mount
    calculateTime();
    
    // Update every second
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return time;
};
