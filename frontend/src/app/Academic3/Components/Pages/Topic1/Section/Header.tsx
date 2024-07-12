'use client';

import React from 'react'
import { CourseDetails } from '../../Values/types';

interface HeaderProps {
  courseDetails: CourseDetails | null;
  setCourseDetails: React.Dispatch<React.SetStateAction<CourseDetails | null>>;
}

const Header: React.FC<HeaderProps> = ({ courseDetails, setCourseDetails }) => {
    const currentYear = new Date().getFullYear() + 543;

    const handleSemesterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        const newSemester = event.target.value;
        if (courseDetails) {
          const updatedCourseDetails = { ...courseDetails, Semester: newSemester };
          setCourseDetails(updatedCourseDetails);
        }
      };

  return (
    <div className="text-center text-lg font-bold text-black">
      <div>
        <h1 className="pt-10">รายละเอียดของรายวิชา</h1>
      </div>
      <div>
        <h1 className="p-2">
          คณะ วิทยาศาสตร์และเทคโนโลยี สาขาวิชา ปัญญาประดิษฐ์
        </h1>
      </div>
      <div className="flex flex-row justify-center">
        <h1 className="p-2">ภาคการศึกษาที่ </h1>
        <select
          value={courseDetails?.Semester || ""}
          onChange={handleSemesterChange}
          className="p-1 border-2 border-gray-300 rounded-md text-black w-12 h-8 mt-1"
        >
          <option value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <h1 className="p-2">ปีการศึกษา {currentYear}</h1>
      </div>
      <div>
        <h1 className="p-2">มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ</h1>
      </div>
      <hr className="border-t-2 border-black w-full mt-2" />
    </div>
  )
}

export default Header;