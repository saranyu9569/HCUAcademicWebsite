import React,{useState} from "react";
import { CourseDetails } from "../../Values/types";

const SectionSeven = () => {
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
    <div className="flex flex-col">
      {" "}
      {/* 7. ชื่ออาจารย์ประจำวิชา */}
      <div className="flex flex-row pt-4">
        <h1 className="font-bold">6. ชื่ออาจารย์ผู้รับผิดชอบรายวิชา&emsp;</h1>
        <input
          type="text"
          value={courseDetails?.TeacherName || ""}
          onChange={(e) => handleHoursChange("TeacherName", e.target.value)}
          className="w-80 p-1 border border-gray-300 rounded -mt-1"
        />
      </div>
      <div className="flex flex-row pt-4">
        <h1 className="font-bold">&emsp;ชื่ออาจารย์ผู้รับผิดชอบร่วม&emsp;</h1>
        <input
          type="text"
          value={courseDetails?.COTeacherName || ""}
          onChange={(e) => handleHoursChange("COTeacherName", e.target.value)}
          className="w-80 p-1 border border-gray-300 rounded -mt-1 ml-8"
        />
      </div>
    </div>
  );
};

export default SectionSeven;
