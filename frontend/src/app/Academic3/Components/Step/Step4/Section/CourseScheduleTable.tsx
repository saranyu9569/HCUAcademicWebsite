'use client'

import React, { useState, useEffect } from 'react';
import { useCourseContext } from '../../../../Data/CourseContext';
import { CourseDetails } from '../../../../Data/types';

interface ScheduleItem {
    date: string;
    type: 'Lecture' | 'Lab' | 'Midterm Exam' | 'Final Exam';
    clos: string[];
    activities: string;
    instructor: string;
  }

const CourseScheduleTable: React.FC = () => {
  const { courseDetails } = useCourseContext();
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    if (courseDetails) {
      const lectureDay = courseDetails.DateLec;
      const labDay = courseDetails.DateLab;
      const lectureDates = lectureDay ? generateDates(lectureDay) : [];
      const labDates = labDay ? generateDates(labDay) : [];

      const lectureItems = lectureDates.map(date => ({
        date,
        type: 'Lecture' as const,
        clos: [],
        activities: '',
        instructor: getInstructor(courseDetails),
      }));

      const labItems = labDates.map(date => ({
        date,
        type: 'Lab' as const,
        clos: [],
        activities: '',
        instructor: getInstructor(courseDetails),
      }));

      setScheduleItems([...lectureItems, ...labItems].sort((a, b) => a.date.localeCompare(b.date)));
    }
  }, [courseDetails]);

  const generateDates = (day: string): string[] => {
    const start = new Date(new Date().getFullYear(), 7, 1); // August 1st
    const end = new Date(new Date().getFullYear(), 11, 31); // December 31st
    const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
    
    const dates: string[] = [];
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === dayIndex) {
        dates.push(d.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const getInstructor = (details: CourseDetails): string => {
    if (details.COTeacherName && details.COTeacherName !== 'ไม่มี' && details.COTeacherName !== 'None') {
      return `${details.TeacherName || ''}, ${details.COTeacherName}`;
    }
    return details.TeacherName || '';
  };

  const getHours = (): string => {
    const lectureHours = courseDetails?.LectureGrading || 0;
    const labHours = courseDetails?.LabGrading || 0;
    const internHours = courseDetails?.InternGrading || 0;
    return `${lectureHours}/${labHours}/${internHours}`;
  };

  const handleUpdateItem = (index: number, updatedItem: ScheduleItem) => {
    const newItems = [...scheduleItems];
    newItems[index] = updatedItem;
    setScheduleItems(newItems);
  };

  return (
    <table className="w-full border-collapse border border-black">
      <thead>
        <tr className="bg-pink-200">
          <th className="border border-black p-2">วัน/เดือน/ปี</th>
          <th className="border border-black p-2">หัวข้อ/รายละเอียด</th>
          <th className="border border-black p-2">CLOs</th>
          <th className="border border-black p-2">กิจกรรมการเรียนการสอนและสื่อที่ใช้</th>
          <th className="border border-black p-2">จำนวนชั่วโมง</th>
          <th className="border border-black p-2">ชื่อผู้สอน</th>
        </tr>
      </thead>
      <tbody>
        {scheduleItems.map((item, index) => (
          <ScheduleRow
            key={index}
            item={item}
            onUpdate={(updatedItem) => handleUpdateItem(index, updatedItem)}
            clos={courseDetails?.CLOs || []}
            hours={getHours()}
          />
        ))}
      </tbody>
    </table>
  );
};

const ScheduleRow: React.FC<{
    item: ScheduleItem;
    onUpdate: (item: ScheduleItem) => void;
    clos: string[];
    hours: string;
  }> = ({ item, onUpdate, clos, hours }) => {
    const formatDate = (dateString: string, type: string) => {
      const date = new Date(dateString);
      const thaiDays = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
      
      let dayName = thaiDays[date.getDay()];
  
      const thaiDate = date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  
      if (type === 'MidtermTest') {
        return `สอบกลางภาค: ${dayName} ${thaiDate}`;
      } else if (type === 'FinalTest') {
        return `สอบปลายภาค: ${dayName} ${thaiDate}`;
      } else {
        return `${type === 'Lecture' ? 'บรรยาย' : 'ปฏิบัติ'}: ${dayName} ${thaiDate}`;
      }
    };

  return (
    <tr>
      <td className="border border-black p-2">
      <div className="mt-1 text-sm text-gray-600">
          {formatDate(item.date, item.type)}
        </div>
        <input
          type="date"
          value={item.date}
          onChange={(e) => onUpdate({ ...item, date: e.target.value })}
          className="w-full p-1 border rounded"
        />
      </td>
      <td className="border border-black p-2">
        <select
          value={item.type}
          onChange={(e) => onUpdate({ ...item, type: e.target.value as ScheduleItem['type'] })}
          className="w-full p-1 border rounded"
        >
          <option value="Lecture">ทฤษฎี</option>
          <option value="Lab">ปฏิบัติ</option>
          <option value="MidtermTest">สอบกลางภาค</option>
          <option value="FinalTest">สอบปฏิบัติภาค</option>
        </select>
      </td>
      <td className="border border-black p-2">
        {clos.map((clo, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={item.clos.includes(clo)}
              onChange={(e) => {
                const newClos = e.target.checked
                  ? [...item.clos, clo]
                  : item.clos.filter(c => c !== clo);
                onUpdate({ ...item, clos: newClos });
              }}
              className="mr-2"
            />
            <label>{`CLO ${index + 1}`}</label>
          </div>
        ))}
      </td>
      <td className="border border-black p-2">
        <textarea
          value={item.activities}
          onChange={(e) => onUpdate({ ...item, activities: e.target.value })}
          className="w-full p-1 border rounded"
          rows={3}
        />
      </td>
      <td className="border border-black p-2 text-center">{hours}</td>
      <td className="border border-black p-2 text-center">{item.instructor}</td>
    </tr>
  );
};

export default CourseScheduleTable;