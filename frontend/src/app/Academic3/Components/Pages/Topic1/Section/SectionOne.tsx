import React from 'react';
import { CourseDetails } from '../../Values/types';

interface SectionOneProps {
  courseDetails: CourseDetails | null;
}

const SectionOne: React.FC<SectionOneProps> = ({ courseDetails }) => {
  function getCreditsHours(lecHours: number): number {
    if (lecHours === 3) {
      return 45;
    } else if (lecHours === 2) {
      return 30;
    } else {
      return 0;
    }
  }

  return (
    <>
      <div>
        <h1 className="text-center text-lg p-5 font-bold">
          หมวดที่ 1 ข้อมูลทั่วไป
        </h1>
      </div>

      <div className="flex flex-col">
        <h1 className="text-left text-lg font-bold">
          1. รหัส-ชื่อวิชาและจำนวนหน่วยกิต
        </h1>
        <h1 className="p-4">
          {courseDetails?.CourseID} {courseDetails?.CourseNameThai}{" "}
          {courseDetails?.CourseNameEng} <br /> ({courseDetails?.TotalCredits}{" "}
          หน่วยกิต)
        </h1>
      </div>

      <div>
        <h1 className="text-left text-lg font-bold">จำนวนชั่วโมง/ภาคการศึกษา</h1>

        <table className="min-w-full divide-y divide-black border-black border mt-2">
          <thead className="bg-white text-center text-lg">
            <tr className="divide-x divide-black">
              <th colSpan={2} className="px-6 py-3 text-lg tracking-wider">
                บรรยาย
              </th>
              <th colSpan={2} className="px-6 py-3 text-lg tracking-wider">
                การฝึกปฏิบัติการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-black">
            <tr className="divide-x divide-black">
              <td colSpan={2} className="px-6 py-4 whitespace-nowrap">
                <h1>
                  บรรยาย{" "}
                  {getCreditsHours(Number(courseDetails?.LectureHours) || 0)}
                  &nbsp;ชั่วโมง&nbsp;ต่อภาคการศึกษา
                </h1>
              </td>
              <td colSpan={2} className="px-6 py-4 whitespace-nowrap">
                <h1>
                  ปฏิบัติ{" "}
                  {getCreditsHours(Number(courseDetails?.LectureHours) || 0)}
                  &nbsp;ชั่วโมง&nbsp;ต่อภาคการศึกษา
                </h1>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SectionOne;