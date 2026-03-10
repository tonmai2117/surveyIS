import React, { useState } from 'react';

function Page2({ onNext, updateData, formData }) {
  const [qualify, setQualify] = useState(formData.QualifyScreening || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (qualify) {
      updateData('QualifyScreening', qualify);
      if (qualify === 'ไม่') {
        onNext(8); // End survey
      } else {
        onNext(3);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>แบบคัดกรองเบื้องต้น (Screening Form)</h2>
      <p className="text-light text-sm mb-4">หมายเหตุ: เพื่อให้ได้กลุ่มผู้ตอบแบบสอบถามที่ตรงตามพิสัยของงานวิจัย</p>

      <div className="question-block">
        <div className="question-text">ท่านเป็นบุคคลที่มีอายุมากกว่า 20 ปี และเคยซื้อสลากกินแบ่งรัฐบาลไทย อย่างน้อย 2 ครั้งในช่วง 3 เดือนที่ผ่านมา?</div>
        <div className="radio-group">
          {['ใช่', 'ไม่'].map(option => (
            <label key={option} className={`radio-label ${qualify === option ? 'selected' : ''}`}>
              <input
                type="radio"
                name="qualify"
                value={option}
                checked={qualify === option}
                onChange={(e) => setQualify(e.target.value)}
                className="radio-input"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="btn-container">
        <button type="submit" className="btn btn-primary" disabled={!qualify}>
          ต่อไป
        </button>
      </div>
    </form>
  );
}

export default Page2;
