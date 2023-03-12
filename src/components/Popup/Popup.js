import React, { useState } from 'react';
import Calendar from './item/Calendar';
import Time from './item/Time';

export default function Popup({ setIsShowPopup }) {
  const date = new Date();
  const nowDate = {
    date,
    hour: date.getHours(),
    minute: Math.floor(date.getMinutes() / 10) * 10,
  };

  /**
   * 확인 버튼 클릭
   */
  const handleClickCheck = () => {};

  /**
   * 취소 버튼 클릭
   */
  const handleClickCancle = () => {
    setIsShowPopup(false);
  };

  /**
   * dimmed 클릭 시 이벤트
   */
  const handleClickDimmed = () => {
    setIsShowPopup(false);
  };

  /**
   * 커스텀한 셀렉트 박스의 클릭 아웃 시
   */
  const handleClickOut = () => {
    setCurrentOpened(null);
  };

  const [currentOpened, setCurrentOpened] = useState(null);

  return (
    <>
      <div className="popup__wrapper">
        <div className="header" onClick={handleClickOut}>
          <h1>응시 기간 설정</h1>
        </div>
        <div className="date__wrapper begin__date">
          <p className="title">응시 시작일</p>
          <div className="selects__wrapper">
            <Calendar
              id="begin-date"
              currentOpened={currentOpened}
              setCurrentOpened={setCurrentOpened}
              nowDate={nowDate.date}
            />
            <Time
              type="hour"
              id="begin-hour"
              currentOpened={currentOpened}
              setCurrentOpened={setCurrentOpened}
              nowDate={nowDate}
            />
            <Time
              type="minute"
              id="begin-minute"
              currentOpened={currentOpened}
              setCurrentOpened={setCurrentOpened}
              nowDate={nowDate}
            />
          </div>
        </div>
        <div className="date__wrapper">
          <p className="title">응시 마감일</p>
          <div className="selects__wrapper">
            <Calendar
              id="end-date"
              currentOpened={currentOpened}
              setCurrentOpened={setCurrentOpened}
              nowDate={nowDate.date}
            />
            <Time
              type="hour"
              id="end-hour"
              currentOpened={currentOpened}
              setCurrentOpened={setCurrentOpened}
              nowDate={nowDate}
            />
            <Time
              type="minute"
              id="end-minute"
              currentOpened={currentOpened}
              setCurrentOpened={setCurrentOpened}
              nowDate={nowDate}
            />
          </div>
        </div>
        <div className="button__wrapper" onClick={handleClickOut}>
          <button className="btn__cancle" onClick={handleClickCancle}>
            취소
          </button>
          <button className="btn__check" onClick={handleClickCheck}>
            확인
          </button>
        </div>
      </div>
      <div className="dimmed" onClick={handleClickDimmed} />
    </>
  );
}
