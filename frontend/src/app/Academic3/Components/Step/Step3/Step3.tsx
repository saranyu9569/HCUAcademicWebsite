import React from "react";
import Section3 from "./Section/Section3";

const Step3 = () => {
  return (
    <div className="flex flex-col items-center max-h-screen text-black">
      <div className="border-2 border-solid bg-white p-10 overflow-y-auto h-[95vh] w-[95vw] max-h-[75vh] max-w-[95vw] mt-5 md:h-[95vh] md:w-[95vw] md:max-h-[75vh] md:max-w-[95vw] md:mt-5 lg:h-[95vh] lg:w-[95vw] lg:max-h-[75vh] lg:max-w-[95vw] lg:mt-5 xl:h-[95vh] xl:w-[95vw] xl:max-h-[75vh] xl:max-w-[95vw] xl:-mt-2 2xl:h-[95vh] 2xl:w-[95vw] 2xl:max-h-[75vh] 2xl:max-w-[95vw] 2xl:mt-5">
        <h1 className="text-lg font-bold text-center pb-4">หมวดที่ 3 การพัฒนาผลการเรียนรู้ของนักศึกษา</h1>
        
        <Section3 />
      </div>
    </div>
  );
};

export default Step3;
