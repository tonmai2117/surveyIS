import React, { useState } from 'react';

function Page5({ onNext, updateData, formData }) {
  const [data, setData] = useState({
    Random_Number: formData.Random_Number || '',
    Personal_Number: formData.Personal_Number || '',
    Social_Number: formData.Social_Number || ''
  });

  const handleChange = (name, value) => {
    // Only allow numbers, max 6 digits
    const formatted = value.replace(/\D/g, '').slice(0, 6);
    setData(prev => ({ ...prev, [name]: formatted }));
  };

  const { Random_Number, Personal_Number, Social_Number } = data;

  const isAllFilled = Object.values(data).every(val => val.length === 6);

  // ตรวจสอบว่ามีตัวเลขซ้ำกันหรือไม่
  const hasDuplicates = () => {
    if (!isAllFilled) return false;
    if (Random_Number === Personal_Number) return true;
    if (Random_Number === Social_Number) return true;
    if (Personal_Number === Social_Number) return true;
    return false;
  };

  const isFormValid = isAllFilled && !hasDuplicates();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      Object.keys(data).forEach(key => updateData(key, data[key]));
      onNext(6);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>ส่วนที่ 3: การทดสอบพฤติกรรมการเลือกตัวเลข (Selection Behavior)</h2>
      <p>คำชี้แจง: จำลองสถานการณ์ว่าท่านกำลังจะซื้อสลากในงวดที่จะถึงนี้ โปรดกรอกตัวเลข 6 หลัก</p>

      <div className="question-block">
        <div className="question-text">1. หากท่านต้องซื้อสลากจากการสุ่มเลขโปรดระบุ "เลขสลาก 6 หลัก" ที่ท่านต้องการซื้อมากที่สุดในงวดนี้</div>
        <input
          type="text"
          value={data.Random_Number}
          onChange={(e) => handleChange('Random_Number', e.target.value)}
          placeholder="000000"
          className="text-input"
          maxLength="6"
        />
        {data.Random_Number.length > 0 && data.Random_Number.length < 6 && (
          <div style={{ color: 'red', fontSize: '0.85rem', marginTop: '4px' }}>* กรุณากรอกให้ครบ 6 หลัก</div>
        )}
      </div>

      <div className="question-block">
        <div className="question-text">2. หากท่านต้องซื้อสลากจาก "เลขเด็ดส่วนตัว" (เช่น ความฝัน วันเกิด ทะเบียนรถ) โปรดระบุ "เลขสลาก 6 หลัก" ที่ต้องซื้อ</div>
        <input
          type="text"
          value={data.Personal_Number}
          onChange={(e) => handleChange('Personal_Number', e.target.value)}
          placeholder="000000"
          className="text-input"
          maxLength="6"
        />
      </div>

      <div className="question-block">
        <div className="question-text">3. หากท่านต้องซื้อสลากจาก "เลขเด็ดในสังคม" (สิ่งศักดิ์สิทธิ์ เลขข่าวดัง) โปรดระบุ "เลขสลาก 6 หลัก" ที่ต้องซื้อ</div>
        <input
          type="text"
          value={data.Social_Number}
          onChange={(e) => handleChange('Social_Number', e.target.value)}
          placeholder="000000"
          className="text-input"
          maxLength="6"
        />
      </div>

      <div className="btn-container">
        {hasDuplicates() && (
          <div style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 'bold' }}>
            * กรุณากรอกชุดตัวเลขให้แตกต่างกันทั้ง 3 ชุด
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={!isFormValid}>ต่อไป</button>
      </div>
    </form>
  );
}

export default Page5;
