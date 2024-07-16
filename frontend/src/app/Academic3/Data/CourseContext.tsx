// CourseContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CourseDetails } from './types'; // Import CourseDetails from types.ts

interface CourseContextType {
  courseDetails: CourseDetails;
  setCourseDetails: React.Dispatch<React.SetStateAction<CourseDetails>>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const initialCourseDetails: CourseDetails = {
  ploCloMappings: {},
  resources: {
    mainTextbooks: [],
    additionalResources: [],
    recommendedResources: [],
  },
};

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courseDetails, setCourseDetails] = useState<CourseDetails>(initialCourseDetails);

  return (
    <CourseContext.Provider value={{ courseDetails, setCourseDetails }}>
      {children}
    </CourseContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};