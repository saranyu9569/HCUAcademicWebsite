import React from 'react';
import { CourseDetails } from '../../Values/types';

interface SectionFourProps {
  courseDetails: CourseDetails | null;
}

const SectionFour: React.FC<SectionFourProps> = ({ courseDetails }) => {
  return (
    <div className="pt-4">
      <h1 className="font-bold">
        4. รายวิชาที่ต้องเรียนมาก่อน
        (Pre-requisite)&emsp;&emsp;&emsp;&emsp; &nbsp;
        {courseDetails?.Prerequisite}
      </h1>
    </div>
  );
};

export default SectionFour;