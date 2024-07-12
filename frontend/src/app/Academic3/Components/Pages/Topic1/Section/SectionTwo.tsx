// SectionTwo.tsx (similar for SectionThree and SectionFour)
import React from "react";
import { CourseDetails } from "../../Values/types";

interface SectionTwoProps {
  courseDetails: CourseDetails | null;
}

const SectionTwo: React.FC<SectionTwoProps> = ({ courseDetails }) => {
  return (
    <div className="text-lg pt-4">
      <div className="flex flex-row gap-5">
        <h1 className="font-bold">2. หลักสูตร และประเภทรายวิชา</h1>
        <h1>
          หลักสูตรวิทยาศาสตร์บัณฑิต (ปัญญาประดิษฐ์) ประเภทราย
          {courseDetails?.CourseName}
        </h1>
      </div>
    </div>
  );
};

export default SectionTwo;