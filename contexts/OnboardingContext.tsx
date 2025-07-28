"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Types for the school data
interface SchoolData {
  name: string;
  address: string;
  email: string;
  phone: string;
  academicYear: string;
  country: string;
  logo: string | null;
  branches: any[];
  departments: any[];
  employees: any[];
  classes: any[];
  subjects: any[];
  students: any[];
  sessions: any[];
  notifications: {
    emailAlerts: boolean;
    pushNotifications: boolean;
  };
}

// Default empty state
const defaultSchoolData: SchoolData = {
  name: "",
  address: "",
  email: "",
  phone: "",
  academicYear: "",
  country: "",
  logo: null,
  branches: [],
  departments: [],
  employees: [],
  classes: [],
  subjects: [],
  students: [],
  sessions: [],
  notifications: {
    emailAlerts: false,
    pushNotifications: false,
  },
};

// Create context
const OnboardingContext = createContext<{
  schoolData: SchoolData;
  updateSchoolData: (data: Partial<SchoolData>) => void;
  resetOnboarding: () => void;
}>({
  schoolData: defaultSchoolData,
  updateSchoolData: () => {},
  resetOnboarding: () => {},
});

// Provider component
export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [schoolData, setSchoolData] = useState<SchoolData>(defaultSchoolData);

  // Load data from localStorage on startup
  useEffect(() => {
    const savedData = localStorage.getItem("schoolOnboardingData");
    if (savedData) {
      setSchoolData(JSON.parse(savedData));
    }
  }, []);

  // Update data and save to localStorage
  const updateSchoolData = (newData: Partial<SchoolData>) => {
    const updatedData = { ...schoolData, ...newData };
    setSchoolData(updatedData);
    localStorage.setItem("schoolOnboardingData", JSON.stringify(updatedData));
  };

  // Reset all data
  const resetOnboarding = () => {
    setSchoolData(defaultSchoolData);
    localStorage.removeItem("schoolOnboardingData");
  };

  return (
    <OnboardingContext.Provider
      value={{ schoolData, updateSchoolData, resetOnboarding }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

// Custom hook for easy access
export const useOnboarding = () => useContext(OnboardingContext);