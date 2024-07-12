import React,{useState} from "react";
import { CourseDetails } from "../../Values/types";

const SectionTen = () => {
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
    <div className="pt-6">
      {" "}
      {/* 10.จำนวนชั่วโมงต่อสัปดาห์ที่อาจารย์ให้คำปรึกษาและแนะนำทางวิชาการเป็นรายบุคคล */}
      <div className="flex flex-col">
        <h1 className="font-bold">
          9.จำนวนชั่วโมงต่อสัปดาห์ที่อาจารย์ให้คำปรึกษาและแนะนำทางวิชาการเป็นรายบุคคล
        </h1>
        <textarea
          value={courseDetails?.ConsultTime || ""}
          onChange={(e) => handleHoursChange("ConsultTime", e.target.value)}
          className="w-7/12 h-24 p-1 border border-gray-300 rounded -mt-1 mt-2"
        />
      </div>
    </div>
  );
};

export default SectionTen;
