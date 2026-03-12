import React from 'react';

function Page0({ onNext }) {
  return (
    <div className="fade-in">
      <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-color)", textAlign: "center" }}>คำชี้แจงแบบสอบถาม</h2>

      <div className="glass-panel" style={{ lineHeight: "1.7", marginBottom: "2rem", padding: "1.5rem", background: "#f8fafc" }}>
        <p style={{ marginBottom: "1rem", textIndent: "2rem" }}>
          งานวิจัยอิสระนี้เป็นส่วนหนึ่งในการศึกษาค้นคว้าอิสระตามหลักสูตรเศรษฐศาสตร์มหาบัณฑิต สาขาเศรษฐศาสตร์ธุรกิจ โดยมีวัตถุประสงค์หลักเพื่อศึกษาเกี่ยวกับอิทธิพลของอคติทางความคิดว่ามีผลต่อการเลือกซื้อสลากกินแบ่งรัฐบาลแบบกำหนดตัวเลขด้วยตนเอง
        </p>
        <p style={{ textIndent: "2rem" }}>
          งานวิจัยนี้เป็นงานวิจัยเชิงสำรวจ (Survey Research) ทำการเก็บข้อมูลโดยใช้แบบสอบถามออนไลน์ (Online Questionnaire) โดยแบ่งออกเป็น  6 ส่วน ดังนี้
        </p>

        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem", marginTop: "1rem" }}>
          <li style={{ marginBottom: "0.5rem" }}><strong>ส่วนที่ 1:</strong> ปัจจัยทางประชากรศาสตร์ (Demographic)</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>ส่วนที่ 2:</strong> ประสบการณ์และความรู้พื้นฐานเกี่ยวกับสลาก</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>ส่วนที่ 3:</strong> การทดสอบพฤติกรรมการเลือกตัวเลข</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>ส่วนที่ 4:</strong> แบบทดสอบความรู้ทางสถิติ</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>ส่วนที่ 5:</strong> การทดสอบภาพลวงตาของการควบคุม</li>
          <li style={{ marginBottom: "0.5rem" }}><strong>ส่วนที่ 6:</strong> แสดง Persona (รูปแบบบุคคลสมมติ)</li>
        </ul>

        <p style={{ fontSize: "0.9rem", color: "var(--text-light)", fontStyle: "italic", margin: 0, padding: "1rem", background: "#f1f5f9", borderRadius: "8px" }}>
          <strong>*หมายเหตุ:</strong> รูปแบบบุคคลสมมติ (Persona) ที่ปรากฏ เป็นเพียงส่วนเสริมที่ผู้วิจัยออกแบบไว้เพื่อความบันเทิงที่ผู้ตอบแบบสอบถามให้ความกรุณาตอบแบบสอบถามนี้จนสิ้นสุดการทำแบบสอบถาม ผลลัพธ์ที่แสดงผลออกมาไม่สามารถนำไปใช้อ้างอิงถึงบุคลิกภาพ นิสัย หรือระบุตัวตนที่แท้จริงของผู้ร่วมตอบแบบสอบถามได้
        </p>
      </div>

      <div className="btn-container">
        <button onClick={() => onNext(1)} className="btn btn-primary" style={{ padding: "0.75rem 3rem", fontSize: "1.1rem" }}>
          เริ่มทำแบบสอบถาม
        </button>
      </div>
    </div>
  );
}

export default Page0;
