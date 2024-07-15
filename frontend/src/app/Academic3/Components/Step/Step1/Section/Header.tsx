import React from 'react';
import { useCourseContext } from '../../../../Data/CourseContext';

const SemesterSelect: React.FC = () => {
  const { courseDetails, setCourseDetails } = useCourseContext();

  const handleSemesterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCourseDetails(prevDetails => ({
      ...prevDetails,
      Semester: event.target.value
    }));
  };

  return (
    <select
      value={courseDetails?.Semester || ""}
      onChange={handleSemesterChange}
      className="p-1 border-2 border-gray-300 rounded-md text-black w-12 h-8 mt-1"
    >
      <option value=""></option>
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
  );
};

export default SemesterSelect;