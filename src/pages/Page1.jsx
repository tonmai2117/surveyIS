import React, { useState } from 'react';

function Page1({ onNext, updateData, formData }) {
  const [consent, setConsent] = useState(formData.Consent || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (consent) {
      updateData('Consent', consent);
      if (consent === 'ไม่ยินยอม') {
        onNext(8); // End survey
      } else {
        onNext(2);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>แบบฟอร์มยินยอมเข้าร่วมการวิจัยอิสระ (Consent form)</h2>
      <p>
        การเข้าร่วมการวิจัยนี้เป็นไปตามความสมัครใจของผู้ตอบแบบสอบถาม ข้อมูลที่ได้รับจากแบบสอบถามทั้งหมดจะถูกใช้เพื่อวัตถุประสงค์ในการรวบรวม วิเคราะห์ และนำเสนอผลการวิจัยในภาพรวมเท่านั้น ผู้ทำงานวิจัยขอให้คำมั่นว่าข้อมูลทั้งหมดจะถูกเก็บเป็นความลับภายใต้มาตรการความปลอดภัยตามหลักการวิจัยสากล และจะไม่ถูกเปิดเผยหรือเชื่อมโยงถึงตัวตนของผู้ตอบแบบสอบถาม ทั้งนี้ผู้เข้าร่วมวิจัยสามารถ ขอยุติการการตอบแบบสอบถามได้ทุกเมื่อ โดยไม่มีข้อผูกมัดหรือผลเสียใดๆ จึงขอความกรุณาท่านโปรดให้ข้อมูลที่เป็น จริงและสมบูรณ์ และขอแสดงความขอบคุณเป็นอย่างสูงที่ให้ความร่วมมือในครั้งนี้
      </p>

      <div className="question-block">
        <div className="radio-group">
          {['ยินยอม', 'ไม่ยินยอม'].map(option => (
            <label key={option} className={`radio-label ${consent === option ? 'selected' : ''}`}>
              <input
                type="radio"
                name="consent"
                value={option}
                checked={consent === option}
                onChange={(e) => setConsent(e.target.value)}
                className="radio-input"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="btn-container">
        <button type="submit" className="btn btn-primary" disabled={!consent}>
          ต่อไป
        </button>
      </div>
    </form>
  );
}

export default Page1;
