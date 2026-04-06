import React, { useState } from 'react';

function Page5a({ onNext, updateData, formData }) {
  const [data, setData] = useState({
    Random_Reason: formData.Random_Reason || ''
  });

  const handleChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = data.Random_Reason !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      updateData('Random_Reason', data.Random_Reason);
      onNext(7);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>ส่วนที่ 3.1: เหตุผลเบื้องหลังการเลือกตัวเลข (จากการสุ่ม)</h2>
      <p>คำชี้แจง: โปรดระบุเหตุผลในการเลือกตัวเลขของคุณ</p>

      <div className="question-block">
        <div className="question-text">
          ชุดที่ 1 (ตัวเลขจากการสุ่ม): <strong>{formData.Random_Number || 'ไม่มีข้อมูล'}</strong>
          <br />ท่านมีวิธีการสุ่มตัวเลขนี้อย่างไร?
        </div>
        <div className="radio-group" style={{ flexDirection: 'column' }}>
          {['1. นึกตัวเลขในหัวแบบรวดเร็ว', '2. หลับตาจิ้ม หรือสุ่มกดมั่วๆ'].map(option => (
            <label key={option} className={`radio-label ${data.Random_Reason === option ? 'selected' : ''}`}>
              <input type="radio" name="Random_Reason" value={option} checked={data.Random_Reason === option} onChange={(e) => handleChange('Random_Reason', e.target.value)} className="radio-input" />
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

export default Page5a;
