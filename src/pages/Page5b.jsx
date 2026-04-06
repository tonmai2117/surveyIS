import React, { useState } from 'react';

function Page5b({ onNext, updateData, formData }) {
  const [data, setData] = useState({
    Personal_Reason: formData.Personal_Reason || ''
  });

  const handleChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = data.Personal_Reason !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      updateData('Personal_Reason', data.Personal_Reason);
      onNext(8);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>ส่วนที่ 3.2: เหตุผลเบื้องหลังการเลือกตัวเลข (เลขเด็ดส่วนตัว)</h2>
      <p>คำชี้แจง: โปรดระบุเหตุผลในการเลือกตัวเลขของคุณ</p>

      <div className="question-block">
        <div className="question-text">
          ชุดที่ 2 (เลขเด็ดส่วนตัว): <strong>{formData.Personal_Number || 'ไม่มีข้อมูล'}</strong>
          <br />ท่านเลือกเลขเด็ดส่วนตัวนี้จากอะไร?
        </div>
        <div className="radio-group" style={{ flexDirection: 'column' }}>
          {['1. เลขจาก นิมิต ความฝัน ลางสังหรณ์', '2. เลขจากทะเบียนรถ บ้านเลขที่ ของใช้ที่รัก', '3. เลขวันเกิด วันสำคัญในชีวิต อายุ', '4. สูตรเด็ดส่วนตัว'].map(option => (
            <label key={option} className={`radio-label ${data.Personal_Reason === option ? 'selected' : ''}`}>
              <input type="radio" name="Personal_Reason" value={option} checked={data.Personal_Reason === option} onChange={(e) => handleChange('Personal_Reason', e.target.value)} className="radio-input" />
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

export default Page5b;
