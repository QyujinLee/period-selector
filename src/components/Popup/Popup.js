import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPeriod } from '../../reducers/periodReducer';
import Calendar from './item/Calendar';
import Time from './item/Time';

export default function Popup({ setIsShowPopup }) {
  const { beginDate, endDate, beginTime, endTime } = useSelector((state) => state.period);
  const [dateData, setDateData] = useState({ beginDate, endDate });
  const [timeData, setTimeData] = useState({
    beginHour: Number(beginTime.split(':')[0]),
    beginMinute: Number(beginTime.split(':')[1]),
    endHour: Number(endTime.split(':')[0]),
    endMinute: Number(endTime.split(':')[1]),
  });
  const dispatch = useDispatch();

  /**
   * 확인 버튼 클릭
   */
  const handleClickCheck = () => {
    dispatch(
      setPeriod({
        beginDate: dateData.beginDate,
        endDate: dateData.endDate,
        beginTime: `${timeData.beginHour}:${timeData.beginMinute}`,
        endTime: `${timeData.endHour}:${timeData.endMinute}`,
      })
    );
    setIsShowPopup(false);
  };

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
              id="beginDate"
              dateData={dateData}
              setDateData={setDateData}
              currentOpened={currentOpened}
              setCurrentOpened={setCurrentOpened}
              periodSelected={beginDate}
            />
            <Time
              type="hour"
              id="beginHour"
              currentOpened={currentOpened}
              setCurrentOpened={setCurrentOpened}
              setTimeData={setTimeData}
              periodSelected={Number(beginTime.split(':')[0])}
            />
            <Time
              type="minute"
              id="beginMinute"
              currentOpened={currentOpened}
              setCurrentOpened={setCurrentOpened}
              setTimeData={setTimeData}
              periodSelected={Number(beginTime.split(':')[1])}
            />
          </div>
        </div>
        <div className="date__wrapper">
          <p className="title">응시 마감일</p>
          <div className="selects__wrapper">
            <Calendar
              id="endDate"
              dateData={dateData}
              setDateData={setDateData}
              currentOpened={currentOpened}
              setCurrentOpened={setCurrentOpened}
              periodSelected={endDate}
            />
            <Time
              type="hour"
              id="endHour"
              currentOpened={currentOpened}
              setCurrentOpened={setCurrentOpened}
              setTimeData={setTimeData}
              periodSelected={Number(endTime.split(':')[0])}
            />
            <Time
              type="minute"
              id="endMinute"
              currentOpened={currentOpened}
              setCurrentOpened={setCurrentOpened}
              setTimeData={setTimeData}
              periodSelected={Number(endTime.split(':')[1])}
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
