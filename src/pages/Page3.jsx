import React, { useState } from 'react';

function Page3({ onNext, updateData, formData }) {
  const [data, setData] = useState({
    Gender: formData.Gender || '',
    Age_Range: formData.Age_Range || '',
    Income: formData.Income || '',
    Education: formData.Education || ''
  });

  const isFormValid = Object.values(data).every(val => val !== '');

  const handleChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      Object.keys(data).forEach(key => updateData(key, data[key]));
      onNext(4);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>ส่วนที่ 1: ปัจจัยทางประชากรศาสตร์ (Demographic)</h2>
      <p>คำชี้แจง: โปรดเลือกคำตอบที่ตรงกับความเป็นจริงของท่านที่สุด</p>

      <div className="question-block">
        <div className="question-text">1. เพศ</div>
        <div className="radio-group">
          {['ชาย', 'หญิง', 'LGBTQ+', 'ไม่ประสงค์ตอบ'].map(option => (
            <label key={option} className={`radio-label ${data.Gender === option ? 'selected' : ''}`}>
              <input type="radio" name="Gender" value={option} checked={data.Gender === option} onChange={(e) => handleChange('Gender', e.target.value)} className="radio-input" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">2. อายุ</div>
        <div className="radio-group">
          {['20-25 ปี', '26-30 ปี', '31-35 ปี', '36-40 ปี', 'มากกว่า 41 ปี'].map(option => (
            <label key={option} className={`radio-label ${data.Age_Range === option ? 'selected' : ''}`}>
              <input type="radio" name="Age_Range" value={option} checked={data.Age_Range === option} onChange={(e) => handleChange('Age_Range', e.target.value)} className="radio-input" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">3. รายได้เฉลี่ยต่อเดือน</div>
        <div className="radio-group">
          {['น้อยกว่า 15,000 บาท', '15,001 - 30,000 บาท', '30,001 - 50,000 บาท', '50,001 - 100,000 บาท', 'มากกว่า 100,000 บาท'].map(option => (
            <label key={option} className={`radio-label ${data.Income === option ? 'selected' : ''}`}>
              <input type="radio" name="Income" value={option} checked={data.Income === option} onChange={(e) => handleChange('Income', e.target.value)} className="radio-input" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="question-block">
        <div className="question-text">4. ระดับการศึกษาสูงสุด</div>
        <div className="radio-group">
          {['ประถมศึกษา', 'มัธยมศึกษา / ปวช.', 'อนุปริญญา / ปวส.', 'ปริญญาตรี', 'สูงกว่าปริญญาตรี'].map(option => (
            <label key={option} className={`radio-label ${data.Education === option ? 'selected' : ''}`}>
              <input type="radio" name="Education" value={option} checked={data.Education === option} onChange={(e) => handleChange('Education', e.target.value)} className="radio-input" />
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

export default Page3;
