"use client";

import React, { useState } from "react";
import Step1 from "./Components/Step/Step1/Section1";
import { CourseProvider } from "./Data/CourseContext";
import Step2 from "./Components/Step/Step2/Step2";
import Step5 from "./Components/Step/Step5/Step5";
import Step3 from "./Components/Step/Step3/Step3";
import Step4 from "./Components/Step/Step4/Step4";

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CourseProvider>
            {" "}
            <Step1 />{" "}
          </CourseProvider>
        );
      case 2:
        return (
          <CourseProvider>
            {" "}
            <Step2 />{" "}
          </CourseProvider>
        );
      case 3:
        return (
          <CourseProvider>
            {" "}
            <Step3 />{" "}
          </CourseProvider>
        );
      case 4:
        return (
          <CourseProvider>
            {" "}
            <Step4 />{" "}
          </CourseProvider>
        );
      case 5:
        return (
          <CourseProvider>
            {" "}
            <Step5 />{" "}
          </CourseProvider>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {renderStep()}
      <div className="mt-4 flex justify-between">
        {currentStep > 1 && (
          <button onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">
            Previous
          </button>
        )}
        {currentStep < 5 && (
          <button
            onClick={nextStep}
            className="bg-orangered hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
