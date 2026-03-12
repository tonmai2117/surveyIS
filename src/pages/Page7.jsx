import React, { useState, useEffect } from 'react';

function Page7({ onNext, updateData, formData, submitToGoogle }) {
  const [data, setData] = useState({
    Allocated_Set_1: formData.Allocated_Set_1 !== undefined ? formData.Allocated_Set_1 : 0,
    Allocated_Set_2: formData.Allocated_Set_2 !== undefined ? formData.Allocated_Set_2 : 0,
    Allocated_Set_3: formData.Allocated_Set_3 !== undefined ? formData.Allocated_Set_3 : 0,
  });

  const sum = Number(data.Allocated_Set_1) + Number(data.Allocated_Set_2) + Number(data.Allocated_Set_3);

  const handleChange = (name, value) => {
    let num = Number(value.replace(/\D/g, ''));
    if (isNaN(num)) num = 0;

    // Validate if the intended change exceeds 5 tickets, we just cap it or block it. Better to let them type if it's less than 5 total.
    setData(prev => {
      const remainingSumWithoutCurrent = sum - Number(prev[name]);
      if (remainingSumWithoutCurrent + num > 5) {
        return { ...prev, [name]: 5 - remainingSumWithoutCurrent };
      }
      return { ...prev, [name]: num };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sum === 5) {
      Object.keys(data).forEach(key => updateData(key, data[key]));
      onNext(8);
      // We automatically trigger submission on transition to 8. Or we can trigger it here directly:
      // We pass the new form data explicitly since state might be one tick behind in App.jsx
      submitToGoogle({ ...formData, ...data });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>ส่วนที่ 5: การทดสอบภาพลวงตาของการควบคุม</h2>
      <p>คำชี้แจง: ระบบนำตัวเลขที่ท่านเลือกในส่วนที่ 3 มาใช้ในสถานการณ์สมมตินี้</p>

      <div className="glass-panel" style={{ background: '#f8fafc', padding: '1.5rem', marginBottom: '2rem' }}>
        <strong>สถานการณ์:</strong> สมมติว่าท่านมีงบประมาณจำกัดที่ 400 บาท ซึ่งสามารถนำไปซื้อสลากได้ 5 ใบ (สลากใบละ 80 บาท)
        <br /><br />
        ท่านจะจัดสรรเงินจำนวนนี้ในการซื้อสลากที่ท่านได้เลือกตัวเลขด้วยตนเองอย่างไร (ใส่จำนวนใบ รวมกันให้ครบ 5 ใบพอดี)

        <div style={{ marginTop: '1rem', fontWeight: 'bold', color: sum !== 5 ? 'red' : 'var(--primary-color)' }}>
          สลากที่ใช้ไป: {sum} / 5 ใบ
        </div>
      </div>

      <div className="question-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div className="question-text" style={{ margin: 0 }}>
          เลขชุดที่ 1: <strong>{formData.Random_Number || '000000'}</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="number"
            min="0" max="5"
            value={data.Allocated_Set_1}
            onChange={(e) => handleChange('Allocated_Set_1', e.target.value)}
            className="text-input"
            style={{ width: '80px', textAlign: 'center' }}
          />
          <span style={{ fontWeight: '500' }}>ใบ</span>
        </div>
      </div>

      <div className="question-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div className="question-text" style={{ margin: 0 }}>
          เลขชุดที่ 2: <strong>{formData.Personal_Number || '000000'}</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="number"
            min="0" max="5"
            value={data.Allocated_Set_2}
            onChange={(e) => handleChange('Allocated_Set_2', e.target.value)}
            className="text-input"
            style={{ width: '80px', textAlign: 'center' }}
          />
          <span style={{ fontWeight: '500' }}>ใบ</span>
        </div>
      </div>

      <div className="question-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div className="question-text" style={{ margin: 0 }}>
          เลขชุดที่ 3: <strong>{formData.Social_Number || '000000'}</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="number"
            min="0" max="5"
            value={data.Allocated_Set_3}
            onChange={(e) => handleChange('Allocated_Set_3', e.target.value)}
            className="text-input"
            style={{ width: '80px', textAlign: 'center' }}
          />
          <span style={{ fontWeight: '500' }}>ใบ</span>
        </div>
      </div>

      <div className="btn-container">
        <button type="submit" className="btn btn-primary" disabled={sum !== 5}>
          ส่งคำตอบ
        </button>
      </div>
    </form>
  );
}

export default Page7;
