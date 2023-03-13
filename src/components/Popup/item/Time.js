import React, { useState } from 'react';

export default function Time({ type, id, currentOpened, setCurrentOpened, setTimeData, periodSelected }) {
  const hourArr = [
    { name: '오전 12시', value: 0 },
    { name: '오전 1시', value: 1 },
    { name: '오전 2시', value: 2 },
    { name: '오전 3시', value: 3 },
    { name: '오전 4시', value: 4 },
    { name: '오전 5시', value: 5 },
    { name: '오전 6시', value: 6 },
    { name: '오전 7시', value: 7 },
    { name: '오전 8시', value: 8 },
    { name: '오전 9시', value: 9 },
    { name: '오전 10시', value: 10 },
    { name: '오전 11시', value: 11 },
    { name: '오후 12시', value: 12 },
    { name: '오후 1시', value: 13 },
    { name: '오후 2시', value: 14 },
    { name: '오후 3시', value: 15 },
    { name: '오후 4시', value: 16 },
    { name: '오후 5시', value: 17 },
    { name: '오후 6시', value: 18 },
    { name: '오후 7시', value: 19 },
    { name: '오후 8시', value: 20 },
    { name: '오후 9시', value: 21 },
    { name: '오후 10시', value: 22 },
    { name: '오후 11시', value: 23 },
  ];

  const minuteArr = [
    { name: '0분', value: 0 },
    { name: '10분', value: 10 },
    { name: '20분', value: 20 },
    { name: '30분', value: 30 },
    { name: '40분', value: 40 },
    { name: '50분', value: 50 },
  ];

  const [currentName, setCurrentName] = useState(
    type === 'hour'
      ? hourArr.find((item) => item.value === periodSelected).name
      : minuteArr.find((item) => item.value === periodSelected).name
  );
  const [, setCurrentValue] = useState(periodSelected);

  /**
   * 시간 선택 클릭 시 options 노출 제어
   * @param {string} id
   */
  const handleClickTime = (id) => {
    if (currentOpened !== id) {
      setCurrentOpened(id);
    } else {
      setCurrentOpened(null);
    }
  };

  /**
   * 옵션 클릭 시 이벤트
   * @param {object<name:string, value:number>} optVal
   */
  const handleClickOption = (option) => {
    setCurrentName(option.name);
    setCurrentValue(option.value);

    setTimeData((prevData) => ({ ...prevData, [id]: option.value }));

    setCurrentOpened(null);
  };

  return (
    <div className="selectbox__wrapper">
      <button className="btn__select" onClick={() => handleClickTime(id)}>
        {currentName}
      </button>
      {currentOpened === id && (
        <ul className="selectbox-option">
          {type === 'hour' &&
            hourArr.map((hour) => (
              <li key={hour.value}>
                <button className="option-btn" onClick={() => handleClickOption(hour)}>
                  {hour.name}
                </button>
              </li>
            ))}
          {type === 'minute' &&
            minuteArr.map((minute) => (
              <li key={minute.value}>
                <button className="option-btn" value={minute.value} onClick={() => handleClickOption(minute)}>
                  {minute.name}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
