// CourseContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CourseDetails, CLODetail, EvaluationMethods } from './types';

interface CourseContextType {
  courseDetails: CourseDetails;
  setCourseDetails: React.Dispatch<React.SetStateAction<CourseDetails>>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const initialCourseDetails: CourseDetails = {
  CourseID: '',
  CategoryName: '',
  CourseName: '',
  GroupName: '',
  CourseNameThai: '',
  CourseNameEng: '',
  Prerequisite: '',
  TotalCredits: '',
  LectureHours: '',
  LectureGrading: '',
  LabHours: '',
  LabGrading: '',
  InternHours: '',
  InternGrading: '',
  DescriptionThai: '',
  DescriptionEng: '',
  CLOs: [], // Keep the existing CLOs property
  cloDetails: [], // Add the new cloDetails property
  Semester: '',
  CourseYear: '',
  COrequisite: '',
  TeacherName: '',
  COTeacherName: '',
  BuildingRoom: '',
  SectionLec: '',
  SectionLab: '',
  DateLec: '',
  DateLab: '',
  StartTimeLec: '',
  EndTimeLec: '',
  StartTimeLab: '',
  EndTimeLab: '',
  ClassRoomLec: '',
  ClassRoomLab: '',
  ConsultTime: '',
  CourseObjective: [],
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

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};