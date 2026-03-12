import React, { useMemo } from 'react';

function Page8({ isSubmitting, submitSuccess, formData }) {
  const persona = useMemo(() => {
    if (!formData) return null;

    const s1 = Number(formData.Allocated_Set_1 || 0); // เลขสุ่ม
    const s2 = Number(formData.Allocated_Set_2 || 0); // เลขเด็ดส่วนตัว
    const s3 = Number(formData.Allocated_Set_3 || 0); // เลขเด็ดสังคม

    const maxAlloc = Math.max(s1, s2, s3);

    // Calculate stat score
    // Correct answers: Q1: ค., Q2: ค., Q3: ค., Q4: ค., Q5: ก.
    const statScore = [
      formData.Stat_Q1 === 'ค.',
      formData.Stat_Q2 === 'ค.',
      formData.Stat_Q3 === 'ค.',
      formData.Stat_Q4 === 'ค.',
      formData.Stat_Q5 === 'ก.'
    ].reduce((score, isCorrect) => score + (isCorrect ? 1 : 0), 0);

    const defaultPersona = {
      id: 5,
      title: 'นักบวชแห่งเหลียงซาน เหนือฟ้ายังมีฟ้าสุดจะหยั่งถึง',
      description: 'คุณคือผู้ที่อยู่เหนือทุกสรรพสิ่ง สุดหยั่งถึง จับทางไม่ได้เปรียบดังเต๋าที่ว่างเปล่าแต่ไม่ว่าง เหมือนจะรู้ความหมายแต่กลับไม่รู้'
    };

    if (maxAlloc > 0) {
      if (s2 === maxAlloc && s2 > s1 && s2 > s3) {
        return {
          id: 1,
          title: 'สายมูเตลู ผู้หยั่งรู้ฟ้าดิน (The Internal Controller)',
          description: 'คุณเป็นคนเชื่อมั่นในสัญชาตญาณตัวเองสูงปรี๊ด! คุณเชื่อว่าโชคชะตาอยู่ในมือคุณ (Illusion of Control) มักถูกดึงดูดด้วยเลขที่มาจากความฝันหรือทะเบียนรถป้ายแดง ระวังนิดนึงนะ บางทีสถิติก็สำคัญกว่าความรู้สึก!'
        };
      } else if (s3 === maxAlloc && s3 > s1 && s3 > s2) {
        return {
          id: 2,
          title: 'สายตามกระแส โบกสะบัดพัดลม (The Social Surfer)',
          description: 'คุณคือสายเกาะติดเทรนด์! ถ้างวดนี้เลขไหนดัง เลขไหนมาแรง คุณไม่มีทางพลาด คุณรู้สึกอุ่นใจเมื่อได้ซื้อเลขที่คนส่วนใหญ่เชื่อมั่น แต่จำไว้นะ โอกาสถูกก็เท่าเดิม ไม่ได้แปลว่าเลขดังจะออกเสมอไป!'
        };
      } else if (s1 === maxAlloc && s1 > s2 && s1 > s3) {
        // เพิ่มเงื่อนไข && s1 > s2 && s1 > s3 เพื่อให้รัดกุมขึ้น กรณีที่เท่ากันจะปัดหลุดไป 5 
        if (statScore >= 4) {
          return {
            id: 3,
            title: 'นักสถิติอินดี้โลจิกทะลุปรอท (The Rational Randomizer)',
            description: 'สุดยอด! คุณคือมนุษย์เหตุผลผู้ไม่ตกเป็นเหยื่อของการตลาดสลาก คุณรู้ดีว่าการออกรางวัลคือเหตุการณ์สุ่ม (Random events) ที่เป็นอิสระต่อกัน คุณจึงซื้อเพื่อความบันเทิงโดยไม่ยึดติดกับสตอรี่ใดๆ'
          };
        } else if (formData.Stat_Q2 === 'ข.') {
          return {
            id: 4,
            title: 'นักสืบจับผิดแพทเทิร์น (The Pattern Seeker)',
            description: 'คุณเป็นคนช่างสังเกตและเชื่อว่าสลากต้องมีการ "กระจายตัว" ที่ดูเนียนตา คุณเกลียดเลขเรียงและเลขซ้ำงวดก่อนหน้าเพราะคิดว่า "มันไม่ออกหรอก!" แต่ระวังนะ ธรรมชาติของการสุ่ม บางทีมันก็ไม่ได้กระจายตัวสวยงามอย่างที่คุณคิดหรอก!'
          };
        }
      }
    }

    // Fallback persona when no specific condition is met
    return defaultPersona;
  }, [formData]);

  const disqualified = (!isSubmitting && submitSuccess === null && (formData.Consent === 'ไม่ยินยอม' || formData.QualifyScreening === 'ไม่' || formData.Bought_At_Least_2_Times === 'ไม่เคย'));

  return (
    <div style={{ textAlign: 'center', padding: '2rem 0' }}>

      {isSubmitting && (
        <>
          <h2 style={{ color: 'var(--primary-color)' }}>กำลังส่งข้อมูล...</h2>
          <p>กรุณารอสักครู่ ระบบกำลังบันทึกข้อมูลของคุณอย่างปลอดภัย</p>
        </>
      )}

      {/* ถ้าไม่มี persona หรือไม่ตรงเงื่อนไข แสดงหน้าขอบคุณปกติ */}
      {!isSubmitting && submitSuccess === true && !persona && (
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

      {/* ถ้ามี persona แสดงผลลัพธ์ persona แทนหน้าขอบคุณปกติ */}
      {!isSubmitting && submitSuccess === true && persona && (
        <div className="fade-in">
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: '#8b5cf6', color: 'white',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            fontSize: '2.5rem', margin: '0 auto 1.5rem auto',
            boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)'
          }}>
            ✨
          </div>
          <h2 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>ผลลัพธ์ Persona ของคุณ</h2>
          <h3 style={{ color: 'var(--text-dark)', marginBottom: '1.5rem' }}>{persona.title}</h3>

          <div className="glass-panel" style={{ background: '#f8fafc', padding: '2rem', marginBottom: '2rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
            <div style={{
              width: '100%', marginBottom: '1.5rem', display: 'flex',
              justifyContent: 'center', alignItems: 'center'
            }}>
              <img
                src={`/persona${persona.id}.png`}
                alt={persona.title}
                style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>
            <p style={{ lineHeight: '1.7', color: '#334155', fontSize: '1.05rem', margin: 0 }}>
              {persona.description}
            </p>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
            ✓ ข้อมูลของคุณถูกส่งเข้าสู่ระบบเรียบร้อยแล้ว<br />
            ขอขอบคุณที่ให้ความร่วมมือในการตอบแบบสอบถามสำหรับงานวิจัยครั้งนี้
          </p>
        </div>
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
      {disqualified && (
        <>
          <h2 style={{ color: 'var(--text-dark)' }}>ขอบคุณที่ให้ความสนใจ</h2>
          <p>คุณสมบัติของคุณไม่ตรงตามเงื่อนไขของการวิจัยในครั้งนี้</p>
          <p>อย่างไรก็ตาม เราขอขอบคุณที่สละเวลาเข้าร่วมแบบสอบถาม</p>
        </>
      )}

      {!isSubmitting && (
        <div style={{ marginTop: '3rem' }}>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-secondary"
            style={{ margin: '0 auto' }}
          >
            กลับหน้าแรก
          </button>
        </div>
      )}
    </div>
  );
}

export default Page8;
