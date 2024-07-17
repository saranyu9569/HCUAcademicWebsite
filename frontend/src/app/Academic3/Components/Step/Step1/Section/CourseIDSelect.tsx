import React from 'react';
import { useCourseContext } from '../../../../Data/CourseContext';
import { CourseDetails } from '../../../../Data/types'; // Make sure to import CourseDetails type

interface CourseID {
  CourseID: string;
}

interface CourseIDSelectProps {
  courseIDs: CourseID[];
  selectedCourseID: string;
  onCourseIDChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CourseIDSelect: React.FC<CourseIDSelectProps> = ({ courseIDs, selectedCourseID, onCourseIDChange }) => {
  const { setCourseDetails } = useCourseContext();

  const handleCourseIDChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onCourseIDChange(event); 
    
    const courseID = event.target.value;
    if (courseID) {
      fetch(`/api/getCourseDetails?courseID=${courseID}`)
        .then(response => response.json())
        .then((data: CourseDetails) => {
          setCourseDetails(data);
        })
        .catch(error => {
          console.error("Error fetching course details:", error);
          // Set to an empty CourseDetails object instead of null
          setCourseDetails({} as CourseDetails);
        });
    } else {
      // Set to an empty CourseDetails object instead of null
      setCourseDetails({} as CourseDetails);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="courseID" className="block mb-2">
        Course ID:
      </label>
      <select
        id="courseID"
        value={selectedCourseID}
        onChange={handleCourseIDChange}
        className="p-2 border-2 border-gray-300 rounded-md text-black"
      >
        <option value="">Select a Course ID</option>
        {courseIDs.map((course) => (
          <option key={course.CourseID} value={course.CourseID}>
            {course.CourseID}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseIDSelect;