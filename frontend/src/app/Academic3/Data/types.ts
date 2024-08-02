// types.ts

export interface CourseID {
  CourseID: string;
}

export interface ScheduleItem {
  date: string;
  type: 'Lecture' | 'Lab' | 'Midterm Exam' | 'Final Exam';
  clos: string[];
  activities: string;
  instructor: string;
  topics: { type: string; description: string }[];
}

export interface ResourceItem {
  id: string;
  text: string;
}

export interface CourseResources {
  mainTextbooks: ResourceItem[];
  additionalResources: ResourceItem[];
  recommendedResources: ResourceItem[];
}

export interface EvaluationMethods {
  การส่งงาน: boolean;
  การอภิปรายและการซักถามและการตอบคำถาม: boolean;
  การเขียนรายงาน: boolean;
  การนำเสนอ: boolean;
  การสอบทฤษฎี: boolean;
  การสอบปฏิบัติ: boolean;
  สอบกลางภาค: boolean;
  สอบปลายภาค: boolean;
  อื่นๆ: string;
}

export interface CLODetail {
  id: string;
  description: string;
  teachingMethods: string;
  evaluationMethods: EvaluationMethods;
}

export interface CourseDetails {
  CourseID?: string;
  CategoryName?: string;
  CourseName?: string;
  GroupName?: string;
  CourseNameThai?: string;
  CourseNameEng?: string;
  Prerequisite?: string;
  TotalCredits?: string;
  LectureHours?: string;
  LectureGrading?: string;
  LabHours?: string;
  LabGrading?: string;
  InternHours?: string;
  InternGrading?: string;
  DescriptionThai?: string;
  DescriptionEng?: string;
  CLOs?: string[];
  Semester?: string;
  CourseYear?: string;
  COrequisite?: string;
  TeacherName?: string;
  COTeacherName?: string;
  BuildingRoom?: string;
  SectionLec?: string;
  SectionLab?: string;
  DateLec?: string;
  DateLab?: string;
  StartTimeLec?: string;
  EndTimeLec?: string;
  StartTimeLab?: string;
  EndTimeLab?: string;
  ClassRoomLec?: string;
  ClassRoomLab?: string;
  ConsultTime?: string;

  // Step2 
  CourseObjective?: string[];
  ploCloMappings: Record<string, boolean>;

  // Step3
  cloDetails: CLODetail[];

  // Step4 
  schedule: ScheduleItem[];

  // Step5
  resources: CourseResources;
}