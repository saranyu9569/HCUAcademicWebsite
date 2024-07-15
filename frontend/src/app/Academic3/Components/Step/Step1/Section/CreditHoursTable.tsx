import React from 'react';
import { useCourseContext } from '../../../../Data/CourseContext';

const CreditHoursTable: React.FC = () => {
  const { courseDetails } = useCourseContext();

  function getCreditsLecHours(lecHours: number): number {
    if (lecHours === 3) {
      return 45;
    } else {
      return 30;
    }
  }

  function getCreditsLabHours(lecHours: number):number {
    if (lecHours === 3) {
      return 0;
    } else {
      return 30;
    }
  }

  const lectureHours = Number(courseDetails?.LectureHours) || 0;

  return (
    <div>
      <h1 className="text-left text-lg font-bold">
        จำนวนชั่วโมง/ภาคการศึกษา
      </h1>

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
                บรรยาย {getCreditsLecHours(lectureHours)}
                &nbsp;ชั่วโมง&nbsp;ต่อภาคการศึกษา
              </h1>
            </td>
            <td colSpan={2} className="px-6 py-4 whitespace-nowrap">
              <h1>
                ปฏิบัติ {getCreditsLabHours(lectureHours)}
                &nbsp;ชั่วโมง&nbsp;ต่อภาคการศึกษา
              </h1>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CreditHoursTable;