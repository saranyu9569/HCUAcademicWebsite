import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'AcademicWebsite',
};

const categoryMapping = {
  'หมวดวิชาศึกษาทั่วไป': 1,
  'หมวดวิชาเฉพาะ': 2,
  'หมวดวิชาประสบการณ์ภาคสนาม': 3,
};

const courseNameMapping = {
  'วิชาบังคับ': 1,
  'วิชาเลือก': 2,
  'กลุ่มวิชาพื้นฐานวิชาชีพ': 3,
  'กลุ่มวิชาเอกบังคับ': 4,
  'กลุ่มวิชาเอกเลือก': 5,
};

const courseGroupMapping = {
  'กลุ่มวิชามนุษยศาสตร์': 1,
  'กลุ่มวิชาสังคมศาสตร์': 2,
  'กลุ่มวิชาวิทยาศาสตร์และคณิตศาสตร์': 3,
  'กลุ่มวิชาภาษา': 4,
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { formDataList, closList } = req.body;

    try {
      const connection = await mysql.createConnection(dbConfig);

      for (const formData of formDataList) {
        const courseCategoryID = categoryMapping[formData.courseCategory] || null;
        const courseNameID = courseNameMapping[formData.courseName] || null;
        const courseGroupID = courseGroupMapping[formData.courseGroup] || null;

        await connection.execute(
          `INSERT INTO Courses (CourseID, CourseNameThai, CourseNameEng, Prerequisite, TotalCredits, LectureHours, LectureGrading, LabHours, LabGrading, InternHours, InternGrading, DescriptionThai, DescriptionEng, CourseCategoryID, CourseNameID, CourseGroupID) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            formData.courseID,
            formData.courseNameThai,
            formData.courseNameEng,
            formData.Prerequisite,
            formData.totalCredits,
            formData.lectureHours,
            formData.lectureGrading,
            formData.labHours,
            formData.labGrading,
            formData.internHours,
            formData.internGrading,
            formData.DescriptionThai,
            formData.DescriptionEng,
            courseCategoryID,
            courseNameID,
            courseGroupID,
          ]
        );
      }

      for (const clo of closList) {
        await connection.execute(
          `INSERT INTO CLOs (CourseID, CLO) VALUES (?, ?)`,
          [clo.courseID, clo.clo]
        );
      }

      await connection.end();
      res.status(200).json({ message: 'Data saved successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while saving the data.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}