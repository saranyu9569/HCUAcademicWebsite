// CourseContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CourseDetails, CLODetail, EvaluationMethods } from './types';

interface CourseContextType {
  courseDetails: CourseDetails;
  setCourseDetails: React.Dispatch<React.SetStateAction<CourseDetails>>;
  examMethods: {
    midterm: boolean;
    final: boolean;
  };
  setExamMethods: React.Dispatch<React.SetStateAction<{ midterm: boolean; final: boolean }>>;
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
  CLOs: [], 
  cloDetails: [],
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
  schedule: [],
};

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courseDetails, setCourseDetails] = useState<CourseDetails>(initialCourseDetails);
  const [examMethods, setExamMethods] = useState<{ midterm: boolean; final: boolean }>({
    midterm: false,
    final: false,
  });

  return (
    <CourseContext.Provider value={{ courseDetails, setCourseDetails, examMethods, setExamMethods }}>
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