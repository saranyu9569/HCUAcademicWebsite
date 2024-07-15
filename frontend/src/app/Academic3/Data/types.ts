export interface CourseID {
  CourseID: string;
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

  //Step2 
  CourseObjective?: string[];
}