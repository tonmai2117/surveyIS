import React, { useState } from 'react';
import './index.css';

import Page0 from './pages/Page0';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Page6 from './pages/Page6';
import Page7 from './pages/Page7';
import Page8 from './pages/Page8';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const totalPages = 8;
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFkwhBwAq4ghFJTLFtjaaIvclKNgTq0GdGsfwyOVMU6mVp7tgmfU376TE1L2u2x-MP/exec';

  const handleNext = (nextPg) => {
    // If we jump completely to page 8 early, we DO NOT submit data
    // because they failed consent or screening. We just show the thank you page.
    if (nextPg === 8 && currentPage < 7) {
      setCurrentPage(8);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If they finished page 7 naturally, we go to 8 and submit
    if (currentPage === 7 && nextPg === 8) {
      // In Page 7 we pass the final merged data back up manually, so this block relies on what Page 7 calls directly if we let it
      // Actually, since Page 7 calls submitToGoogle directly, we shouldn't submit twice.
      // So we just transition the UI, the submission is handled by Page 7 calling `submitToGoogleSheets(customData)`
      setCurrentPage(8);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage(nextPg || currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Allow explicit passed data if state hasn't updated immediately
  const submitToGoogleSheets = async (dataToSubmit = formData) => {
    setIsSubmitting(true);
    setCurrentPage(8);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      if (!SCRIPT_URL) {
        console.warn("⚠️ Simulation Mode: Application missing Google Apps Script URL. Form data is:", dataToSubmit);
        // Simulate a tiny delay for realism before showing success
        await new Promise(r => setTimeout(r, 1500));
        setSubmitSuccess(true);
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(dataToSubmit),
      });
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Submission failed", error);
      setSubmitSuccess(false);
    }
    setIsSubmitting(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 0:
        return <Page0 onNext={handleNext} />;
      case 1:
        return <Page1 onNext={handleNext} updateData={updateData} formData={formData} />;
      case 2:
        return <Page2 onNext={handleNext} updateData={updateData} formData={formData} />;
      case 3:
        return <Page3 onNext={handleNext} updateData={updateData} formData={formData} />;
      case 4:
        return <Page4 onNext={handleNext} updateData={updateData} formData={formData} />;
      case 5:
        return <Page5 onNext={handleNext} updateData={updateData} formData={formData} />;
      case 6:
        return <Page6 onNext={handleNext} updateData={updateData} formData={formData} />;
      case 7:
        return <Page7 onNext={handleNext} updateData={updateData} formData={formData} submitToGoogle={submitToGoogleSheets} />;
      case 8:
        return <Page8 isSubmitting={isSubmitting} submitSuccess={submitSuccess} formData={formData} />;
      default:
        return <div>Unknown Page</div>;
    }
  };

  const calculateProgress = () => {
    if (currentPage === 0) return 0;
    return ((currentPage - 1) / (totalPages - 1)) * 100;
  };

  return (
    <div className="app-container">
      <div className="glass-panel">

        {currentPage > 0 && currentPage < 8 && (
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>
          </div>
        )}

        {currentPage > 0 && currentPage < 8 && (
          <h1 style={{ marginBottom: "1.5rem" }}>แบบสอบถามงานวิจัย: อิทธิพลของอคติทางความคิดต่อพฤติกรรมการเลือกซื้อสลากกินแบ่งรัฐบาล</h1>
        )}

        <div key={currentPage} className="fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
