import React, { useState } from 'react';
import './index.css';

import Page0 from './pages/Page0';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Page5a from './pages/Page5a';
import Page5b from './pages/Page5b';
import Page5c from './pages/Page5c';
import Page6 from './pages/Page6';
import Page7 from './pages/Page7';
import Page8 from './pages/Page8';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const totalPages = 11;
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFkwhBwAq4ghFJTLFtjaaIvclKNgTq0GdGsfwyOVMU6mVp7tgmfU376TE1L2u2x-MP/exec';

  const handleNext = (nextPg) => {
    // If we jump completely to page 11 early, we DO NOT submit data
    // because they failed consent or screening. We just show the thank you page.
    if (nextPg === 11 && currentPage < 10) {
      setCurrentPage(11);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If they finished page 10 naturally, we go to 11 and submit
    if (currentPage === 10 && nextPg === 11) {
      // Submission is handled by Page7 calling submitToGoogleSheets(customData)
      setCurrentPage(11);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage(nextPg || currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const getBangkokTimestamp = () => {
    return new Date().toLocaleString("sv-SE", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // Allow explicit passed data if state hasn't updated immediately
  const submitToGoogleSheets = async (dataToSubmit = formData) => {
    const payload = {
      ...dataToSubmit,
      Survey_End_Timestamp: getBangkokTimestamp(),
    };

    setIsSubmitting(true);
    setCurrentPage(11);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      if (!SCRIPT_URL) {
        console.warn("⚠️ Simulation Mode: Application missing Google Apps Script URL. Form data is:", payload);
        // Simulate a tiny delay for realism before showing success
        await new Promise(r => setTimeout(r, 1500));
        setSubmitSuccess(true);
        setIsSubmitting(false);
        return;
      }

      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
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
        return <Page5a onNext={handleNext} updateData={updateData} formData={formData} />;
      case 7:
        return <Page5b onNext={handleNext} updateData={updateData} formData={formData} />;
      case 8:
        return <Page5c onNext={handleNext} updateData={updateData} formData={formData} />;
      case 9:
        return <Page6 onNext={handleNext} updateData={updateData} formData={formData} />;
      case 10:
        return <Page7 onNext={handleNext} updateData={updateData} formData={formData} submitToGoogle={submitToGoogleSheets} />;
      case 11:
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

        {currentPage > 0 && currentPage < 11 && (
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>
          </div>
        )}

        {currentPage > 0 && currentPage < 11 && (
          <h1 style={{ marginBottom: "1.5rem" }}>
            แบบสอบถามงานวิจัย: อิทธิพลของอคติทางความคิดต่อพฤติกรรมการเลือกซื้อสลากกินแบ่งรัฐบาล
          </h1>
        )}

        <div key={currentPage} className="fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;

