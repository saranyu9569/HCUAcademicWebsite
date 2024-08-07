import React from 'react';
import { useCourseContext } from '../../../../Data/CourseContext';

const EducationLevelSelect: React.FC = () => {
  const { courseDetails, setCourseDetails } = useCourseContext();

  const handleCourseYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCourseDetails(prevDetails => ({
      ...prevDetails,
      CourseYear: event.target.value
    }));
  };

  return (
    <div className="text-lg pt-4">
      <div className="flex flex-row gap-5">
        <h1 className="font-bold">
          3. ระดับการศึกษา/ ชั้นปีที่เรียน ภาคการศึกษาที่ {courseDetails?.Semester} ชั้นปีที่&nbsp;
        </h1>
        <select
          id="CourseYear"
          className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
          value={courseDetails?.CourseYear || ""}
          onChange={handleCourseYearChange}
        >
          <option value="">เลือกปี</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
    </div>
  );
};

export default EducationLevelSelect;