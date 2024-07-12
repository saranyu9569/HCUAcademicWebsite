import React, { useState } from "react";
import { CourseDetails } from "../../Values/types";

const SectionFive = () => {
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );

  const handleHoursChange = (field: string, value: string) => {
    if (courseDetails) {
      const updatedCourseDetails = { ...courseDetails, [field]: value };
      setCourseDetails(updatedCourseDetails);
    }
  };
  
  return (
    <div className="flex flex-row pt-4">
      {" "}
      {/* 5.รายวิชาที่ต้องเรียนพร้อมกัน */}
      <h1 className="font-bold">
        5. รายวิชาที่ต้องเรียนพร้อมกัน (Co-requisite)&emsp;&emsp;&emsp;&emsp;
      </h1>
      <input
        type="text"
        value={courseDetails?.COrequisite || ""}
        onChange={(e) => handleHoursChange("COrequisite", e.target.value)}
        className="w-20 p-1 border border-gray-300 rounded -mt-1"
      />
    </div>
  );
};

export default SectionFive;
