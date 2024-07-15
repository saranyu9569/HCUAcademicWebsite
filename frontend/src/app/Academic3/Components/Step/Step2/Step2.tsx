"use client";

import React, { useState } from "react";
import { CourseID, CourseDetails } from "../../../Data/types";
import { useCourseContext } from "../../../Data/CourseContext";
import CourseObjective from "../Step2/Section/CourseObjective";
import CourseDescription from "./Section/CourseDescription";
import CLOs from "./Section/CLOs";
import PLO from "./Section/PLOs";

const Step2 = () => {
  const [courseIDs, setCourseIDs] = useState<CourseID[]>([]);
  const [selectedCourseID, setSelectedCourseID] = useState<string>("");
  const { courseDetails, setCourseDetails } = useCourseContext();
  
  return (
    <div className="flex flex-col items-center max-h-screen text-black">
      <div className="border-2 border-solid bg-white p-10 overflow-y-auto h-[95vh] w-[95vw] max-h-[75vh] max-w-[95vw] mt-5 md:h-[95vh] md:w-[95vw] md:max-h-[75vh] md:max-w-[95vw] md:mt-5 lg:h-[95vh] lg:w-[95vw] lg:max-h-[75vh] lg:max-w-[95vw] lg:mt-5 xl:h-[95vh] xl:w-[95vw] xl:max-h-[75vh] xl:max-w-[95vw] xl:-mt-2 2xl:h-[95vh] 2xl:w-[95vw] 2xl:max-h-[75vh] 2xl:max-w-[95vw] 2xl:mt-5">
        <div className="pb-10">
            <h1 className="text-center font-bold text-lg">หมวดที่ 2 วัตถุประสงค์และผลลัพธ์การเรียนรู้</h1>
        </div>

        <CourseObjective />

        <CourseDescription />

        <CLOs />

        <PLO />
      </div>
    </div>
  );
};

export default Step2;