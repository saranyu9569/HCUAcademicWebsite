import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { courseID } = req.query;

    if (!courseID) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });

      const [rows] = await connection.execute(`
        SELECT 
          c.*,
          cc.CategoryName,
          cn.CourseName,
          cg.GroupName,
          GROUP_CONCAT(clos.CLO SEPARATOR '|') AS CLOs
        FROM 
          Courses c
        LEFT JOIN 
          CourseCategories cc ON c.CourseCategoryID = cc.id
        LEFT JOIN 
          CourseNames cn ON c.CourseNameID = cn.id
        LEFT JOIN 
          CourseGroups cg ON c.CourseGroupID = cg.id
        LEFT JOIN
          CLOs clos ON c.CourseID = clos.CourseID
        WHERE 
          c.CourseID = ?
        GROUP BY
          c.CourseID
      `, [courseID]);

      await connection.end();

      if (Array.isArray(rows) && rows.length > 0) {
        const courseDetails = rows[0] as any;
        courseDetails.CLOs = courseDetails.CLOs ? courseDetails.CLOs.split('|') : [];
        res.status(200).json(courseDetails);
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      res.status(500).json({ message: 'Error fetching course details' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}