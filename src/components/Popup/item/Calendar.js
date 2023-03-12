import React, { useEffect, useState } from 'react';

export default function Calendar({ id, currentOpened, setCurrentOpened, nowDate }) {
  const [date, setDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(nowDate);

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const handleClickSelectDate = (newSelected) => {
    if (selectedDate !== newSelected) {
      setSelectedDate(newSelected);
    }
    setCurrentOpened(null);
  };

  /**
   * 달력 그리기
   */
  const renderCalendar = () => {
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const nextMonthFirstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).getDay();

    // 이전 달의 날짜들
    const prevDays = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = new Date(date.getFullYear(), date.getMonth() - 1, prevMonthLastDay - i);
      prevDays.push(
        <div key={`prev-${day}`} className="day prev-month">
          {prevMonthLastDay - i}
        </div>
      );
    }

    // 현재 선택된 달의 날짜들
    const currentDays = [];
    for (let i = 1; i <= lastDay; i++) {
      const day = new Date(date.getFullYear(), date.getMonth(), i);
      const currentDateStr = `${day.getFullYear()}-${day.getMonth()}-${i}`;
      const selectedDateStr = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;
      currentDays.push(
        <div
          key={`current-${day}`}
          className={`day current-month ${currentDateStr === selectedDateStr && 'selected'}`}
          onClick={() => {
            handleClickSelectDate(day);
          }}
        >
          {i}
        </div>
      );
    }

    // 다음 달의 날짜들
    const nextDays = [];
    for (let i = 1; i <= 7 - nextMonthFirstDay; i++) {
      const day = new Date(date.getFullYear(), date.getMonth() + 1, i);
      nextDays.push(
        <div key={`next-${day}`} className="day next-month">
          {i}
        </div>
      );
    }

    const totalDays = [...prevDays, ...currentDays, ...nextDays];
    let cells = [];
    const rows = [];

    // 주 별로 끊어서 row로 set
    totalDays.forEach((day, index) => {
      if (index === 0 || index % 7 !== 0) {
        cells.push(day);
      } else {
        rows.push(
          <div key={`row-${index / 7}`} className="days-row">
            {cells}
          </div>
        );
        cells = [day];
      }

      // 마지막 index 도달 시 row push
      if (index === totalDays.length - 1) {
        rows.push(
          <div key={`row-${(index + 1) / 7}`} className="days-row">
            {cells}
          </div>
        );
      }
    });

    setCalendarData(rows);
  };

  /**
   * 이전 달로 이동
   */
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  /**
   * 다음달로 이동
   */
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  useEffect(() => {
    renderCalendar();
  }, [date, selectedDate]);

  /**
   * 날짜 선택 클릭 시 이벤트
   * @param {string} id
   */
  const handleClickOpenCalendar = (id) => {
    if (currentOpened !== id) {
      setCurrentOpened(id);
    } else {
      setCurrentOpened(null);
    }
  };

  return (
    <div className="calendar__wrapper">
      <button className="calendar__select" onClick={() => handleClickOpenCalendar(id)}>
        {`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`}
      </button>
      {currentOpened === id && (
        <div className="calendar">
          <div className="header">
            <p>
              {date.getFullYear()}년 {date.getMonth() + 1}월
            </p>
            <div className="month-btn__wrapper">
              <button onClick={handlePrevMonth}>&lt;</button>
              <button onClick={handleNextMonth}>&gt;</button>
            </div>
          </div>
          <div className="days-header">
            {days.map((day) => (
              <div key={day} className="day-header">
                {day}
              </div>
            ))}
          </div>
          {calendarData}
        </div>
      )}
    </div>
  );
}
