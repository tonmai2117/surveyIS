import React from 'react';

function Page8({ isSubmitting, submitSuccess, formData }) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
      
      {isSubmitting && (
        <>
          <h2 style={{ color: 'var(--primary-color)' }}>กำลังส่งข้อมูล...</h2>
          <p>กรุณารอสักครู่ ระบบกำลังบันทึกข้อมูลของคุณอย่างปลอดภัย</p>
        </>
      )}

      {!isSubmitting && submitSuccess === true && (
        <>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', 
            background: '#10b981', color: 'white', 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            fontSize: '2rem', margin: '0 auto 1.5rem auto'
          }}>
            ✓
          </div>
          <h2 style={{ color: '#10b981' }}>ส่งข้อมูลเสร็จสมบูรณ์</h2>
          <p>ขอขอบคุณที่ให้ความร่วมมือในการตอบแบบสอบถามสำหรับงานวิจัยครั้งนี้</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
            ข้อมูลทั้งหมดจะถูกเก็บเป็นความลับและนำไปใช้วิเคราะห์ในภาพรวมเท่านั้น
          </p>
        </>
      )}

      {!isSubmitting && submitSuccess === false && formData.Consent !== 'ไม่ยินยอม' && formData.QualifyScreening !== 'ไม่' && formData.Bought_At_Least_2_Times !== 'ไม่เคย' && (
         <>
         <div style={{ 
           width: '80px', height: '80px', borderRadius: '50%', 
           background: '#ef4444', color: 'white', 
           display: 'flex', justifyContent: 'center', alignItems: 'center',
           fontSize: '2rem', margin: '0 auto 1.5rem auto'
         }}>
           ✕
         </div>
         <h2 style={{ color: '#ef4444' }}>เกิดข้อผิดพลาดในการส่งข้อมูล</h2>
         <p>แต่เรายังขอขอบคุณที่คุณสละเวลาเข้ามามีส่วนร่วม</p>
       </>
      )}

      {/* Disqualified User Message */}
      {!isSubmitting && submitSuccess === null && (formData.Consent === 'ไม่ยินยอม' || formData.QualifyScreening === 'ไม่' || formData.Bought_At_Least_2_Times === 'ไม่เคย') && (
        <>
          <h2 style={{ color: 'var(--text-dark)' }}>ขอบคุณที่ให้ความสนใจ</h2>
          <p>คุณสมบัติของคุณไม่ตรงตามเงื่อนไขของการวิจัยในครั้งนี้</p>
          <p>อย่างไรก็ตาม เราขอขอบคุณที่สละเวลาเข้าร่วมแบบสอบถาม</p>
        </>
      )}

      <div style={{ marginTop: '3rem' }}>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-secondary" 
          style={{ margin: '0 auto' }}
        >
          กลับหน้าแรก
        </button>
      </div>
    </div>
  );
}

export default Page8;
