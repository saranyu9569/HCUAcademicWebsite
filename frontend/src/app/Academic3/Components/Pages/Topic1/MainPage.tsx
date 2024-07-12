"use client";

import React, { useState, useEffect } from "react";
import { CourseDetails } from '../Values/types';
import ChooseCourseID from "../Topic1/Section/ChooseCourseID";
import Header from "../Topic1/Section/Header";
import SectionOne from "../Topic1/Section/SectionOne";
import SectionTwo from "../Topic1/Section/SectionTwo";
import SectionThree from "../Topic1/Section/SectionThree";
import SectionFour from "../Topic1/Section/SectionFour";
import SectionFive from "../Topic1/Section/SectionFive";
import SectionSix from "../Topic1/Section/SectionSix";
import SectionSeven from "../Topic1/Section/SectionSeven";
import SectionEight from "../Topic1/Section/SectionEight";
import SectionNine from "../Topic1/Section/SectionNine";
import SectionTen from "../Topic1/Section/SectionTen";

const InputForm = () => {
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
 
  return (
    <div className="flex flex-col items-center max-h-screen text-black">
      <div className="border-2 border-solid bg-white p-10 overflow-y-auto h-[95vh] w-[95vw] max-h-[75vh] max-w-[95vw] mt-5   md:h-[95vh] md:w-[95vw] md:max-h-[75vh] md:max-w-[95vw] md:mt-5 lg:h-[95vh] lg:w-[95vw] lg:max-h-[75vh] lg:max-w-[95vw] lg:mt-5 xl:h-[95vh] xl:w-[95vw] xl:max-h-[75vh] xl:max-w-[95vw] xl:mt-5 2xl:h-[95vh] 2xl:w-[95vw] 2xl:max-h-[75vh] 2xl:max-w-[95vw] 2xl:mt-5">
        
        <ChooseCourseID setCourseDetails={setCourseDetails}/>
        <Header courseDetails={courseDetails} setCourseDetails={setCourseDetails}/>
        
        
        {/* หมวดที่1 */}
        <div className="text-lg">
          <SectionOne courseDetails={courseDetails}/>
          <SectionTwo courseDetails={courseDetails}/>
          <SectionThree />
          <SectionFour courseDetails={courseDetails} />
          <SectionFive />
          <SectionSix />
          <SectionSeven />
          <SectionEight />
          <SectionNine />
          <SectionTen />
        </div>
      </div>
    </div>
  );
};

export default InputForm;
