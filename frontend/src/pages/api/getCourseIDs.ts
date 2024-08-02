import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });

      const [rows] = await connection.execute('SELECT DISTINCT CourseID FROM Courses');
      await connection.end();
      
      console.log('Fetched course IDs:', rows);

      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching course IDs:', error);
      res.status(500).json({ message: 'Error fetching course IDs' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}