// CLOInputTable.tsx

import React from 'react';
import { useCourseContext } from '../../../../Data/CourseContext';
import { CLODetail, EvaluationMethods } from '../../../../Data/types';

const defaultEvaluationMethods: EvaluationMethods = {
  'การส่งงาน': false,
  'การอภิปรายและการซักถามและการตอบคำถาม': false,
  'การเขียนรายงาน': false,
  'การนำเสนอ': false,
  'การสอบทฤษฎี': false,
  'การสอบปฏิบัติ': false,
  'สอบกลางภาค': false,
  'สอบปลายภาค': false,
  'อื่นๆ': ''
};

const CLOInputTable: React.FC = () => {
  const { courseDetails, setCourseDetails } = useCourseContext();

  const handleTeachingMethodChange = (index: number, value: string) => {
    const updatedCLODetails = [...(courseDetails.cloDetails || [])];
    if (!updatedCLODetails[index]) {
      updatedCLODetails[index] = {
        id: `clo-${index}`,
        description: courseDetails.CLOs?.[index] || '',
        teachingMethods: '',
        evaluationMethods: { ...defaultEvaluationMethods }
      };
    }
    updatedCLODetails[index].teachingMethods = value;
    setCourseDetails(prev => ({ ...prev, cloDetails: updatedCLODetails }));
  };

  const handleEvaluationMethodChange = (index: number, method: keyof EvaluationMethods, value: boolean | string) => {
    const updatedCLODetails = [...(courseDetails.cloDetails || [])];
    if (!updatedCLODetails[index]) {
      updatedCLODetails[index] = {
        id: `clo-${index}`,
        description: courseDetails.CLOs?.[index] || '',
        teachingMethods: '',
        evaluationMethods: { ...defaultEvaluationMethods }
      };
    }
    updatedCLODetails[index].evaluationMethods = { 
      ...updatedCLODetails[index].evaluationMethods,
      [method]: value 
    };
    setCourseDetails(prev => ({ ...prev, cloDetails: updatedCLODetails }));
  };

  return (
    <table className="border-collapse w-full">
      <thead className='bg-pink-200'>
        <tr>
          <th className="border border-black p-2 w-1/6">ผลลัพธ์การเรียนรู้ที่คาดหวังของรายวิชา (CLOs)</th>
          <th className="border border-black p-2">วิธีการจัดการเรียนรู้</th>
          <th className="border border-black p-2">วิธีการวัดประเมินผลการเรียนรู้</th>
        </tr>
      </thead>
      <tbody className='bg-gray-50'>
        {courseDetails.CLOs && courseDetails.CLOs.length > 0 ? (
          courseDetails.CLOs.map((clo: string, index: number) => (
            <tr key={index}>
              <td className="border border-black p-2">
                <div className="flex items-start flex-col">
                  <span className="mr-2 min-w-[60px] flex-shrink-0 pb-2">CLO {index + 1}.</span>
                  <span className="flex-grow">{clo}</span>
                </div>
              </td>
              <td className="border border-black p-2">
                <textarea
                  className="w-full p-1 h-56"
                  value={courseDetails.cloDetails?.[index]?.teachingMethods || ''}
                  onChange={(e) => handleTeachingMethodChange(index, e.target.value)}
                />
              </td>
              <td className="border border-black p-2">
                {Object.entries(courseDetails.cloDetails?.[index]?.evaluationMethods || defaultEvaluationMethods).map(([method, value]) => (
                  <div key={method} className="mb-1">
                    {method !== 'อื่นๆ' ? (
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={value as boolean}
                          onChange={(e) => handleEvaluationMethodChange(index, method as keyof EvaluationMethods, e.target.checked)}
                        />
                        <span>{method}</span>
                      </label>
                    ) : (
                      <div className="flex items-center">
                        <label className="flex items-center">
                          <span className="mr-2">อื่นๆ:</span>
                          <input
                            type="text"
                            className="border border-gray-300 p-1"
                            value={value as string}
                            onChange={(e) => handleEvaluationMethodChange(index, 'อื่นๆ', e.target.value)}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="border border-black p-2 text-center">No CLOs available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CLOInputTable;