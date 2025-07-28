// hooks/useOnboardingData.ts
import { useState, useEffect } from "react";

export const useOnboardingData = () => {
  const [schoolData, setSchoolData] = useState<any>({});

  // Load data from localStorage on init
  useEffect(() => {
    const savedData = localStorage.getItem("schoolOnboardingData");
    if (savedData) {
      setSchoolData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  const updateSchoolData = (newData: any) => {
    const updatedData = { ...schoolData, ...newData };
    setSchoolData(updatedData);
    localStorage.setItem("schoolOnboardingData", JSON.stringify(updatedData));
  };

  return { schoolData, updateSchoolData };
};