import React, { useState } from 'react';
import { LOTTERY_CONFIG } from '../config';

function Page4({ onNext, updateData, formData }) {
  const [data, setData] = useState({
    Bought_At_Least_2_Times: formData.Bought_At_Least_2_Times || '',
    Tickets_Per_Draw: formData.Tickets_Per_Draw || '',
    Frequency: formData.Frequency || '',
    Last_Won_Source: formData.Last_Won_Source || '',
    Won_Last_Draw: formData.Won_Last_Draw || ''
  });

  const handleChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(data).every(val => val !== '')) {
      Object.keys(data).forEach(key => updateData(key, data[key]));

      // Logic requirement: If never bought, jump to page 11 immediately
      if (data.Bought_At_Least_2_Times === 'ไม่เคย') {
        onNext(11);
      } else {
        onNext(5);
      }
    }
  };

  const isFormValid = Object.values(data).every(val => val !== '');

  return (
    <form onSubmit={handleSubmit}>
      <h2>ส่วนที่ 2: ประสบการณ์และความรู้พื้นฐาน</h2>
      <p>คำชี้แจง: โปรดระบุข้อมูลเกี่ยวกับพฤติกรรมการซื้อสลากของท่าน</p>

      <div className="question-block">
        <div className="question-text">1. ท่านเคยซื้อสลากกินแบ่งรัฐบาล อย่างน้อย 2 ครั้งในรอบ 6 เดือนที่ผ่านมาหรือไม่?</div>
        <div className="radio-group">
          {['เคย', 'ไม่เคย'].map(option => (
            <label key={option} className={`radio-label ${data.Bought_At_Least_2_Times === option ? 'selected' : ''}`}>
              <input type="radio" name="Bought_At_Least_2_Times" value={option} checked={data.Bought_At_Least_2_Times === option} onChange={(e) => handleChange('Bought_At_Least_2_Times', e.target.value)} className="radio-input" />
              {option}
            </label>
          ))}
          {data.Bought_At_Least_2_Times === 'ไม่เคย' && (
            <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.5rem' }}>* การตอบตัวเลือกนี้จะถือเป็นการยุติการทำแบบสอบถาม</div>
          )}
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">2. โดยเฉลี่ยแล้ว ท่านซื้อสลากงวดละกี่ใบ?</div>
        <div className="radio-group">
          {['1 ใบ', '2-5 ใบ', '6-10 ใบ', 'มากกว่า 10 ใบ'].map(option => (
            <label key={option} className={`radio-label ${data.Tickets_Per_Draw === option ? 'selected' : ''}`}>
              <input type="radio" name="Tickets_Per_Draw" value={option} checked={data.Tickets_Per_Draw === option} onChange={(e) => handleChange('Tickets_Per_Draw', e.target.value)} className="radio-input" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">3. ความถี่ในการซื้อสลากของท่าน</div>
        <div className="radio-group">
          {['ซื้อทุกงวด', 'ซื้อเดือนละครั้ง', 'ซื้อนานๆ ครั้งไม่ได้ซื้อทุกเดือน แล้วแต่โอกาส'].map(option => (
            <label key={option} className={`radio-label ${data.Frequency === option ? 'selected' : ''}`}>
              <input type="radio" name="Frequency" value={option} checked={data.Frequency === option} onChange={(e) => handleChange('Frequency', e.target.value)} className="radio-input" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">4. ครั้งล่าสุดที่ท่านถูกรางวัล ท่านได้ตัวเลขจากที่มาใด</div>
        <div className="radio-group">
          {['ไม่เคยถูกรางวัลมาก่อนเลย', 'เลขจากการสุ่ม', 'เลขเด็ดส่วนตัว', 'เลขเด็ดในสังคม'].map(option => (
            <label key={option} className={`radio-label ${data.Last_Won_Source === option ? 'selected' : ''}`}>
              <input type="radio" name="Last_Won_Source" value={option} checked={data.Last_Won_Source === option} onChange={(e) => handleChange('Last_Won_Source', e.target.value)} className="radio-input" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">
          5. ในงวดล่าสุดที่ผ่านมา ประจำวันที่ {LOTTERY_CONFIG.drawDate} รางวัลที่ 1: {LOTTERY_CONFIG.firstPrize} เลขท้าย 2 ตัว: {LOTTERY_CONFIG.lastTwoDigits} ท่านถูกรางวัลใดๆ หรือไม่?
        </div>
        <div className="radio-group">
          {['ถูกรางวัล', 'ไม่ถูกรางวัล', 'ไม่ได้ซื้อในสลากในงวดดังกล่าว'].map(option => (
            <label key={option} className={`radio-label ${data.Won_Last_Draw === option ? 'selected' : ''}`}>
              <input type="radio" name="Won_Last_Draw" value={option} checked={data.Won_Last_Draw === option} onChange={(e) => handleChange('Won_Last_Draw', e.target.value)} className="radio-input" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="btn-container">
        <button type="submit" className="btn btn-primary" disabled={!isFormValid}>ต่อไป</button>
      </div>
    </form>
  );
}

export default Page4;
