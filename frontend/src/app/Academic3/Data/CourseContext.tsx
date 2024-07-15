import React, { createContext, useState, useContext } from 'react';
import { CourseDetails } from './types';

interface CourseContextType {
  courseDetails: CourseDetails | null;
  setCourseDetails: React.Dispatch<React.SetStateAction<CourseDetails | null>>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);

  return (
    <CourseContext.Provider value={{ courseDetails, setCourseDetails }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};