import React, { useState } from 'react';

function Page5c({ onNext, updateData, formData }) {
  const [data, setData] = useState({
    Social_Reason: formData.Social_Reason || ''
  });

  const handleChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = data.Social_Reason !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      updateData('Social_Reason', data.Social_Reason);
      onNext(9);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>ส่วนที่ 3.3: เหตุผลเบื้องหลังการเลือกตัวเลข (เลขเด็ดในสังคม)</h2>
      <p>คำชี้แจง: โปรดระบุเหตุผลในการเลือกตัวเลขของคุณ</p>

      <div className="question-block">
        <div className="question-text">
          ชุดที่ 3 (เลขเด็ดในสังคม): <strong>{formData.Social_Number || 'ไม่มีข้อมูล'}</strong>
          <br />ท่านเลือกเลขเด็ดในสังคมนี้จากอะไร?
        </div>
        <div className="radio-group" style={{ flexDirection: 'column' }}>
          {['1. ข่าวบุคคลสำคัญ (เช่น วันเกิด/อายุ/ทะเบียนรถ ของนายกฯ ดารา หรือบุคคลในกระแส)', '2. ข่าวเหตุการณ์สำคัญระดับประเทศ/โลก (เช่น วันเปิดสภา วันเลือกตั้ง วันหยุดนักขัตฤกษ์)', '3. ข่าวอุบัติเหตุหรือเหตุการณ์แปลกประหลาด (เช่น ทะเบียนรถที่ประสบเหตุ บ้านเลขที่เกิดเหตุ)', '4. สิ่งศักดิ์สิทธิ์และความเชื่อทางโชคลาง (เช่น ตีเลขจากต้นไม้ สัตว์รูปร่างแปลกตา เลขจากศาลเจ้าดัง)'].map(option => (
            <label key={option} className={`radio-label ${data.Social_Reason === option ? 'selected' : ''}`}>
              <input type="radio" name="Social_Reason" value={option} checked={data.Social_Reason === option} onChange={(e) => handleChange('Social_Reason', e.target.value)} className="radio-input" />
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

export default Page5c;
