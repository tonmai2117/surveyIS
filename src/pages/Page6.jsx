import React, { useState } from 'react';

function Page6({ onNext, updateData, formData }) {
  const [data, setData] = useState({
    Stat_Q1: formData.Stat_Q1 || '',
    Stat_Q2: formData.Stat_Q2 || '',
    Stat_Q3: formData.Stat_Q3 || '',
    Stat_Q4: formData.Stat_Q4 || '',
    Stat_Q5: formData.Stat_Q5 || ''
  });

  const handleChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(data).every(val => val !== '')) {
      // Loop over the answers and extract just the first part (ก., ข., ค.)
      Object.keys(data).forEach(key => {
        const fullAnswer = data[key];
        const shortAnswer = fullAnswer.split(' ')[0]; // Splits by space and takes the first element (e.g. "ก.")
        updateData(key, shortAnswer);
      });
      onNext(7);
    }
  };

  const isFormValid = Object.values(data).every(val => val !== '');

  return (
    <form onSubmit={handleSubmit}>
      <h2>ส่วนที่ 4: แบบทดสอบความรู้สถิติเบื้องต้น (Statistical Literacy Test)</h2>
      <p>คำชี้แจง: แบบทดสอบจำนวน 5 ข้อ เพื่อวัดความเข้าใจเรื่องโอกาสและความน่าจะเป็น</p>

      <div className="question-block">
        <div className="question-text">1. ในการจับลูกบอลออกจากกล่อง ในกล่องมีลูกบอลสีขาว 10 ลูก สีดำ 10 ลูก ครั้งแรกจับได้สีขาว เมื่อจับเสร็จใส่ลูกบอลดังกล่าวกลับลงไปในกล่องแล้วจับใหม่ ลูกบอลที่จับได้ในครั้งต่อไปจะเป็นสีขาว หรือสีดำ</div>
        <div className="radio-group">
          {['ก. มีโอกาสออก "ขาว" มากกว่า', 'ข. มีโอกาสออก "ดำ" มากกว่า', 'ค. มีโอกาสออก "ดำ" และ "ขาว" เท่ากัน 50/50'].map(option => (
            <label key={option} className={`radio-label ${data.Stat_Q1 === option ? 'selected' : ''}`}>
              <input type="radio" name="Stat_Q1" value={option} checked={data.Stat_Q1 === option} onChange={(e) => handleChange('Stat_Q1', e.target.value)} className="radio-input" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">2. ในการออกรางวัลสลากกินแบ่งรัฐบาล ระหว่างชุดตัวเลข 123456 กับชุดตัวเลขเลขที่ 598321 เลขชุดใดมีโอกาสถูกรางวัลที่ 1 มากกว่ากัน?</div>
        <div className="radio-group">
          {['ก. 598321 มีโอกาสน้อยกว่า', 'ข. 123456 มีโอกาสน้อยกว่า', 'ค. ทั้งสองเลขมีโอกาสถูกรางวัลเท่ากันเป๊ะ'].map(option => (
            <label key={option} className={`radio-label ${data.Stat_Q2 === option ? 'selected' : ''}`}>
              <input type="radio" name="Stat_Q2" value={option} checked={data.Stat_Q2 === option} onChange={(e) => handleChange('Stat_Q2', e.target.value)} className="radio-input" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">3. สมมติว่าเลขท้าย 2 ตัว "85" ไม่เคยออกรางวัลเลยตลอด 10 ปีที่ผ่านมา ท่านคิดว่าในงวดถัดไป เลข "85" มีโอกาสออกรางวัลอย่างไรเมื่อเทียบกับเลขอื่น?</div>
        <div className="radio-group">
          {['ก. มีโอกาสออกมากกว่าเลขอื่น', 'ข. มีโอกาสออกน้อยกว่าเลขอื่น', 'ค. มีโอกาสออกเท่ากับเลขอื่นๆ ทุกตัว'].map(option => (
            <label key={option} className={`radio-label ${data.Stat_Q3 === option ? 'selected' : ''}`}>
              <input type="radio" name="Stat_Q3" value={option} checked={data.Stat_Q3 === option} onChange={(e) => handleChange('Stat_Q3', e.target.value)} className="radio-input" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">4. ท่านคิดว่าในการโยนเหรียญที่เที่ยงตรง (มีหัวและก้อย) ผลการโยนเหรียญแบบใดที่มีโอกาสยากที่สุด?</div>
        <div className="radio-group">
          {['ก. มีโอกาสออก "ก้อย ก้อย หัว ก้อย หัว" มากกว่า', 'ข. มีโอกาสออก "หัว หัว หัว หัว หัว หัว" มากกว่า', 'ค. มีโอกาสเท่ากันทั้ง 2 ข้อ'].map(option => (
            <label key={option} className={`radio-label ${data.Stat_Q4 === option ? 'selected' : ''}`}>
              <input type="radio" name="Stat_Q4" value={option} checked={data.Stat_Q4 === option} onChange={(e) => handleChange('Stat_Q4', e.target.value)} className="radio-input" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">5. ในการทอยลูกเต๋า 2 ลูกพร้อมกัน ท่านคิดว่าเหตุการณ์ใด เกิดขึ้นได้น้อยกว่า?</div>
        <div className="radio-group">
          {['ก. ออก 6 ทั้ง 2 ลูก', 'ข. ออก 5 และ 6', 'ค. ทั้งสองเหตุการณ์มีโอกาสเกิดขึ้นเท่ากัน'].map(option => (
            <label key={option} className={`radio-label ${data.Stat_Q5 === option ? 'selected' : ''}`}>
              <input type="radio" name="Stat_Q5" value={option} checked={data.Stat_Q5 === option} onChange={(e) => handleChange('Stat_Q5', e.target.value)} className="radio-input" />
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

export default Page6;
