import React, { useEffect, useState } from 'react';

export default function Calendar({ id, dateData, setDateData, currentOpened, setCurrentOpened, periodSelected }) {
  // 달력에서 현재 선택된 월
  const [currentDate, setCurrentDate] = useState(new Date());
  // 달력 렌더링 데이터
  const [calendarData, setCalendarData] = useState([]);
  // 응시 시작일 & 응시 마감일
  const { beginDate, endDate } = dateData;

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  /**
   * 달력에서 날짜 선택 시 이벤트
   * @param {*} newSelected
   */
  const handleClickSelectDate = (newSelected) => {
    let newDate = newSelected;
    let startDate = new Date(beginDate);
    let finishDate = new Date(endDate);

    newDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    finishDate.setHours(0, 0, 0, 0);

    newDate = newDate.getTime();
    startDate = startDate.getTime();
    finishDate = finishDate.getTime();

    if (startDate === finishDate) {
      if (id === 'beginDate') {
        if (newDate < startDate) {
          setDateData((prevData) => ({ ...prevData, beginDate: newSelected.toISOString() }));
        } else {
          setDateData({ beginDate: newSelected.toISOString(), endDate: newSelected.toISOString() });
        }
      }

      if (id === 'endDate') {
        if (endDate < newDate) {
          setDateData((prevData) => ({ ...prevData, endDate: newSelected.toISOString() }));
        } else {
          setDateData({ beginDate: newSelected.toISOString(), endDate: newSelected.toISOString() });
        }
      }
    }

    if (startDate !== finishDate) {
      if (startDate <= newDate && newDate <= finishDate) {
        setDateData((prevData) => ({ ...prevData, endDate: newSelected.toISOString() }));
      } else {
        setDateData({ beginDate: newSelected.toISOString(), endDate: newSelected.toISOString() });
      }
    }

    setCurrentOpened(null);
  };

  /**
   * 달력 그리기
   */
  const renderCalendar = () => {
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const nextMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1).getDay();

    // 이전 달의 날짜들
    const prevDays = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthLastDay - i);
      prevDays.push(
        <div key={`prev-${day}`} className="day prev-month">
          {prevMonthLastDay - i}
        </div>
      );
    }

    // 현재 선택된 달의 날짜들
    const currentDays = [];
    for (let i = 1; i <= lastDay; i++) {
      let day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      let startDate = new Date(beginDate);
      let finishDate = new Date(endDate);

      day.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      finishDate.setHours(0, 0, 0, 0);

      const isSelect = startDate.getTime() <= day.getTime() && day.getTime() <= finishDate.getTime();
      currentDays.push(
        <div
          key={`current-${day}`}
          className={`day current-month ${isSelect && 'selected'}`}
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
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
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
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  /**
   * 다음달로 이동
   */
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  useEffect(() => {
    renderCalendar();
  }, [currentDate, beginDate, endDate]);

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
        {id === 'beginDate' &&
          `${new Date(beginDate).getFullYear()}년 ${new Date(beginDate).getMonth() + 1}월 ${new Date(
            beginDate
          ).getDate()}일`}
        {id === 'endDate' &&
          `${new Date(endDate).getFullYear()}년 ${new Date(endDate).getMonth() + 1}월 ${new Date(endDate).getDate()}일`}
      </button>
      {currentOpened === id && (
        <div className="calendar">
          <div className="header">
            <p>
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
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
