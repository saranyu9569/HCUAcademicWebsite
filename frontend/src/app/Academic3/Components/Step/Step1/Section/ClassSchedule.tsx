import React from 'react';
import { useCourseContext } from '../../../../Data/CourseContext';

const ClassSchedule: React.FC = () => {
  const { courseDetails, setCourseDetails } = useCourseContext();

  const handleInputChange = (field: string, value: string) => {
    setCourseDetails(prevDetails => ({
      ...prevDetails,
      [field]: value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setCourseDetails(prevDetails => ({
      ...prevDetails,
      [field]: value
    }));
  };

  return (
    <div className="flex flex-col pt-4">
      <div className="flex flex-row">
        <h1 className="font-bold">7. สถานที่เรียน&emsp;</h1>
        <input
          type="text"
          value={courseDetails?.BuildingRoom || ""}
          onChange={(e) => handleInputChange("BuildingRoom", e.target.value)}
          className="w-96 p-1 border border-gray-300 rounded -mt-1 ml-34"
        />
      </div>

      <div className="pl-32">
        {/* ภาคบรรยาย */}
        <ScheduleSection
          title="ภาคบรรยาย"
          section={courseDetails?.SectionLec || ""}
          date={courseDetails?.DateLec || ""}
          startTime={courseDetails?.StartTimeLec || ""}
          endTime={courseDetails?.EndTimeLec || ""}
          classRoom={courseDetails?.ClassRoomLec || ""}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          prefix="Lec"
        />

        {/* ภาคปฏิบัติ */}
        <ScheduleSection
          title="ภาคปฏิบัติ"
          section={courseDetails?.SectionLab || ""}
          date={courseDetails?.DateLab || ""}
          startTime={courseDetails?.StartTimeLab || ""}
          endTime={courseDetails?.EndTimeLab || ""}
          classRoom={courseDetails?.ClassRoomLab || ""}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          prefix="Lab"
        />
      </div>
    </div>
  );
};

interface ScheduleSectionProps {
  title: string;
  section: string;
  date: string;
  startTime: string;
  endTime: string;
  classRoom: string;
  onInputChange: (field: string, value: string) => void;
  onSelectChange: (field: string, value: string) => void;
  prefix: string;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  title,
  section,
  date,
  startTime,
  endTime,
  classRoom,
  onInputChange,
  onSelectChange,
  prefix
}) => {
  return (
    <div className="flex flex-col pt-5">
      <h1 className="font-bold">{title}</h1>

      <div className="flex flex-row pt-2 pl-12">
        <label htmlFor="Section" className="mr-2">
          กลุ่ม
        </label>
        <input
          type="number"
          value={section}
          onChange={(e) => onInputChange(`Section${prefix}`, e.target.value)}
          className="w-14 p-1 border border-gray-300 rounded -mt-1"
        />

        <label htmlFor="Date" className="pl-5 pr-2">
          วัน
        </label>
        <select
        id="Date"
          className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
          value={date}
          onChange={(e) => onSelectChange(`Date${prefix}`, e.target.value)}
        >
          <option value="">เลือกวัน</option>
          <option value="Monday">จันทร์</option>
          <option value="Tuesday">อังคาร</option>
          <option value="Wednesday">พุธ</option>
          <option value="Thursday">พฤหัสบดี</option>
          <option value="Friday">ศุกร์</option>
          <option value="Saturday">เสาร์</option>
          <option value="Sunday">อาทิตย์</option>
        </select>

        <label htmlFor="Time" className="pl-5 pr-2">
          เวลา
        </label>
        <TimeSelect
          id="StartTime"
          value={startTime}
          onChange={(e) => onSelectChange(`StartTime${prefix}`, e.target.value)}
        />

        <h1 className="pl-2 pr-2">-</h1>

        <TimeSelect
          id="EndTime"
          value={endTime}
          onChange={(e) => onSelectChange(`EndTime${prefix}`, e.target.value)}
        />

        <h1>&emsp;น.</h1>

        <label htmlFor="ClassRoom" className="pl-5 pr-2">
          ห้อง
        </label>
        <input
          type="text"
          value={classRoom}
          onChange={(e) => onInputChange(`ClassRoom${prefix}`, e.target.value)}
          className="w-24 p-1 border border-gray-300 rounded -mt-1"
        />
      </div>
    </div>
  );
};

interface TimeSelectProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TimeSelect: React.FC<TimeSelectProps> = ({ id, value, onChange }) => {
  const times = ["08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30"];

  return (
    <select
      id={id}
      className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
      value={value}
      onChange={onChange}
    >
      <option value="">เลือกเวลา</option>
      {times.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default ClassSchedule;