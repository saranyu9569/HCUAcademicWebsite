import React from "react";
import { useCourseContext } from "../../../../Data/CourseContext";

const CLOs: React.FC = () => {
  const { courseDetails } = useCourseContext();

  return (
    <div className="w-full max-w-screen mx-auto text-black pt-10">
      <h2 className="text-lg font-bold mb-4">
        3. ผลลัพธ์การเรียนรู้ที่คาดหวังของรายวิชา (Course-level Learning
        Outcomes: CLOs) นักศึกษาสามารถ
        <br/>&emsp;
        (ระบุผลลัพธ์การเรียนรู้ตาม Bloom&apos;s Taxonomy)
      </h2>
      <h3 className="pl-14 pb-1">
        เมื่อสิ้นสุดการเรียนการสอนแล้ว นักศึกษาที่สำเร็จการศึกษาในรายวิชานี้
        สามารถ
      </h3>
      {courseDetails?.CLOs && courseDetails.CLOs.length > 0 ? (
        <ul className="list-none pl-5">
          {courseDetails.CLOs.map((clo: string, index: number) => (
            <li key={index} className="mb-2 flex">
              <span className="mr-2 min-w-[60px]">CLO {index + 1}.</span>
              <span>{clo}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No CLOs available for this course.</p>
      )}
    </div>
  );
};

export default CLOs;
