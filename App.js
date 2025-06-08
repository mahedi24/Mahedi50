import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState('');
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const current = time.toTimeString().slice(0, 5);
    if (alarmTime === current) {
      setIsAlarmRinging(true);
      const alarmSound = new Audio('/alarm.mp3');
      alarmSound.play();
    }
  }, [time, alarmTime]);

  const stopAlarm = () => {
    setIsAlarmRinging(false);
  };

  return (
    <div className="vintage-clock">
      <h1 className="title">🕰 Vintage Alarm Clock</h1>
      <div className="clock-display">{time.toLocaleTimeString()}</div>

      <div className="alarm-section">
        <label>Set Alarm: </label>
        <input
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
        />
      </div>

      {isAlarmRinging && (
        <div className="alarm-popup">
          <p>⏰ Alarm Ringing!</p>
          <button onClick={stopAlarm}>Stop</button>
        </div>
      )}
    </div>
  );
}