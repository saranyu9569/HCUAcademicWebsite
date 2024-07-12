'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { CourseID, CourseDetails } from '../../Values/types';

interface ChooseCourseIDProps {
  setCourseDetails: React.Dispatch<React.SetStateAction<CourseDetails | null>>;
}

const ChooseCourseID: React.FC<ChooseCourseIDProps> = ({ setCourseDetails }) => {
  const [courseIDs, setCourseIDs] = useState<CourseID[]>([]);
  const [selectedCourseID, setSelectedCourseID] = useState<string>("");

  const fetchCourseDetails = useCallback(async (courseID: string) => {
    if (!courseID) {
      setCourseDetails(null);
      return;
    }

    try {
      const response = await fetch(`/api/getCourseDetails?courseID=${courseID}`);
      if (response.ok) {
        const data: CourseDetails = await response.json();
        setCourseDetails(data);
      } else {
        console.error("Failed to fetch course details");
        setCourseDetails(null);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      setCourseDetails(null);
    }
  }, [setCourseDetails]);

  const handleCourseIDChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const courseID = event.target.value;
    setSelectedCourseID(courseID);
    fetchCourseDetails(courseID);
  };

  useEffect(() => {
    const fetchCourseIDs = async () => {
      try {
        const response = await fetch("/api/getCourseIDs");
        if (response.ok) {
          const data: CourseID[] = await response.json();
          setCourseIDs(data);
        } else {
          console.error("Failed to fetch course IDs");
        }
      } catch (error) {
        console.error("Error fetching course IDs:", error);
      }
    };

    fetchCourseIDs();
  }, []);

  useEffect(() => {
    if (selectedCourseID) {
      console.log("Selected CourseID:", selectedCourseID);
    }
  }, [selectedCourseID]);

  return (
    <div>
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
    </div>
  )
}

export default ChooseCourseID