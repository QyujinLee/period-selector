import React, { useState } from 'react';
import Popup from '../Popup/Popup';

export default function Main() {
  const [isShowPopup, setIsShowPopup] = useState(false);

  /**
   * 팝업 열기
   */
  const handleClickBtn = () => {
    setIsShowPopup(true);
  };

  return (
    <div className="main__wrapper">
      <button className="popup__open" onClick={handleClickBtn}>
        응시기간 설정 대화상자 열기
      </button>
      {isShowPopup && <Popup setIsShowPopup={setIsShowPopup} />}
    </div>
  );
}
