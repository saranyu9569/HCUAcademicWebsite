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

export const categoryMapping = {
  option1: "หมวดวิชาศึกษาทั่วไป",
  option2: "หมวดวิชาเฉพาะ",
  option3: "หมวดวิชาประสบการณ์ภาคสนาม",
};

export const courseNameMapping = {
  option1: "วิชาบังคับ",
  option2: "วิชาเลือก",
  option3: "กลุ่มวิชาพื้นฐานวิชาชีพ",
  option4: "กลุ่มวิชาเอกบังคับ",
  option5: "กลุ่มวิชาเอกเลือก",
};

export const courseGroupMapping = {
  option1: "กลุ่มวิชามนุษยศาสตร์",
  option2: "กลุ่มวิชาสังคมศาสตร์",
  option3: "กลุ่มวิชาวิทยาศาสตร์และคณิตศาสตร์",
  option4: "กลุ่มวิชาภาษา",
};

export interface CLO {
  courseID: string;
  clo: string;
}