// types.ts
export interface FormData {
  courseCategory: string;
  courseName: string;
  courseGroup: string;
  courseID: string;
  courseNameThai: string;
  courseNameEng: string;
  Prerequisite: string;
  totalCredits: string;
  lectureHours: string;
  lectureGrading: string;
  labHours: string;
  labGrading: string;
  internHours: string;
  internGrading: string;
  DescriptionThai: string;
  DescriptionEng: string;
}

export type FormDataKey = keyof FormData;