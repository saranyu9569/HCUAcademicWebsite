'use client'

import React, { useState, useEffect } from 'react';
import { useCourseContext } from '../../../../Data/CourseContext';
import { CourseDetails, ScheduleItem } from '../../../../Data/types';

const CourseScheduleTable: React.FC = () => {
  const { courseDetails, setCourseDetails } = useCourseContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseDetails) {
      if (!courseDetails.schedule || courseDetails.schedule.length === 0) {
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
          topics: [],
        }));

        const labItems = labDates.map(date => ({
          date,
          type: 'Lab' as const,
          clos: [],
          activities: '',
          instructor: getInstructor(courseDetails),
          topics: [],
        }));

        const newSchedule = [...lectureItems, ...labItems].sort((a, b) => a.date.localeCompare(b.date));
        setCourseDetails(prevDetails => ({ ...prevDetails, schedule: newSchedule }));
      }
      setIsLoading(false);
    }
  }, [courseDetails, setCourseDetails]);

  const generateDates = (day: string): string[] => {
    const start = new Date(new Date().getFullYear(), 7, 1); 
    const end = new Date(new Date().getFullYear(), 11, 31);
    const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day);
    
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

  const getHours = (details: CourseDetails): string => {
    const lectureHours = details.LectureGrading || '0';
    const labHours = details.LabGrading || '0';
    const internHours = details.InternGrading || '0';
    return `${lectureHours}/${labHours}/${internHours}`;
  };

  const handleUpdateItem = (index: number, updatedItem: ScheduleItem) => {
    setCourseDetails(prevDetails => {
      const newSchedule = [...(prevDetails.schedule || [])];
      newSchedule[index] = updatedItem;
      return { ...prevDetails, schedule: newSchedule };
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!courseDetails || !courseDetails.schedule) {
    return <div>No schedule data available.</div>;
  }

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
        {courseDetails.schedule.map((item, index) => (
          <ScheduleRow
            key={index}
            item={item}
            onUpdate={(updatedItem) => handleUpdateItem(index, updatedItem)}
            clos={courseDetails.CLOs || []}
            hours={getHours(courseDetails)}
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
  const [newTopicType, setNewTopicType] = useState<string>('Lecture');
  const [newTopicDescription, setNewTopicDescription] = useState<string>('');

  const addTopic = () => {
    if (newTopicDescription.trim()) {
      const updatedTopics = [...item.topics, { type: newTopicType, description: newTopicDescription.trim() }];
      onUpdate({ ...item, topics: updatedTopics });
      setNewTopicDescription('');
    }
  };

  const removeTopic = (index: number) => {
    const updatedTopics = item.topics.filter((_, i) => i !== index);
    onUpdate({ ...item, topics: updatedTopics });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const thaiDays = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    
    let dayName = thaiDays[date.getDay()];

    const thaiDate = date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    return `${dayName} ${thaiDate}`;
  };

  return (
    <tr>
      <td className="border border-black p-2 w-48">
        <div className="mt-1 text-sm text-gray-600">
          {formatDate(item.date)}
        </div>
        <input
          type="date"
          value={item.date}
          onChange={(e) => onUpdate({ ...item, date: e.target.value })}
          className="w-36 p-1 border rounded"
        />
      </td>
      <td className="border border-black p-2">
        {item.topics.map((topic, index) => (
          <div key={index} className="flex justify-between items-center mb-1">
            <span>{`${topic.type}: ${topic.description}`}</span>
            <button onClick={() => removeTopic(index)} className="text-red-500">×</button>
          </div>
        ))}
        <div className="flex items-center mt-2">
          <select
            value={newTopicType}
            onChange={(e) => setNewTopicType(e.target.value)}
            className="p-1 border rounded mr-2"
          >
            <option value="Lecture">ทฤษฎี</option>
            <option value="Lab">ปฏิบัติ</option>
            <option value="MidtermTest">สอบกลางภาค</option>
            <option value="FinalTest">สอบปฏิบัติภาค</option>
          </select>
          <input
            type="text"
            value={newTopicDescription}
            onChange={(e) => setNewTopicDescription(e.target.value)}
            placeholder="Enter topic description"
            className="p-1 border rounded mr-2"
          />
          <button onClick={addTopic} className="bg-blue-500 text-white p-1 rounded">Add</button>
        </div>
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