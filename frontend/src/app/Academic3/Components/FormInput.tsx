'use client'

import React, { useState, useEffect } from "react";

interface CourseID {
  CourseID: string;  // Updated to match the database column name
}

const InputForm = () => {
  const [courseIDs, setCourseIDs] = useState<CourseID[]>([]);
  const [selectedCourseID, setSelectedCourseID] = useState<string>("");

  useEffect(() => {
    const fetchCourseIDs = async () => {
      try {
        console.log('Fetching course IDs...');
        const response = await fetch('/api/getCourseIDs');
        if (response.ok) {
          const data: CourseID[] = await response.json();
          console.log('Received data:', data);
          if (Array.isArray(data) && data.length > 0) {
            console.log('First course ID:', data[0].CourseID);
          } else {
            console.log('Data is empty or not an array');
          }
          setCourseIDs(data);
        } else {
          console.error('Failed to fetch course IDs');
        }
      } catch (error) {
        console.error('Error fetching course IDs:', error);
      }
    };

    fetchCourseIDs();
  }, []);

  useEffect(() => {
    console.log('Updated courseIDs:', courseIDs);
  }, [courseIDs]);

  const handleCourseIDChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseID(event.target.value);
  };

  return (
    <div className="flex flex-col items-center max-h-screen">
      <div className="border-2 border-solid bg-gray-900 p-10 overflow-y-auto h-[95vh] w-[95vw] max-h-[75vh] max-w-[95vw] mt-5   md:h-[95vh] md:w-[95vw] md:max-h-[75vh] md:max-w-[95vw] md:mt-5 lg:h-[95vh] lg:w-[95vw] lg:max-h-[75vh] lg:max-w-[95vw] lg:mt-5 xl:h-[95vh] xl:w-[95vw] xl:max-h-[75vh] xl:max-w-[95vw] xl:mt-5 2xl:h-[95vh] 2xl:w-[95vw] 2xl:max-h-[75vh] 2xl:max-w-[95vw] 2xl:mt-5">
        <div className="mb-4">
          <label htmlFor="courseID" className="block text-white mb-2">Course ID:</label>
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
        {/* Add more form fields as needed */}
      </div>
    </div>
  );
};

export default InputForm;