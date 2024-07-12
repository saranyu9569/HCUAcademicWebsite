import React, { useState } from "react";
import { CourseDetails } from "../../Values/types";

const SectionEight = () => {
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );

  const handleHoursChange = (field: string, value: string) => {
    if (courseDetails) {
      const updatedCourseDetails = { ...courseDetails, [field]: value };
      setCourseDetails(updatedCourseDetails);
    }
  };

  const handleDateLecChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCourseDetails((prevDetails) => {
      if (prevDetails === null) {
        return { DateLec: value };
      }
      return {
        ...prevDetails,
        DateLec: value,
      };
    });
  };

  const handleDateLabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCourseDetails((prevDetails) => {
      if (prevDetails === null) {
        return { DateLab: value };
      }
      return {
        ...prevDetails,
        DateLab: value,
      };
    });
  };

  const handleStartLecTimeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setCourseDetails((prevDetails) => {
      if (prevDetails === null) {
        return { StartTimeLec: value };
      }
      return {
        ...prevDetails,
        StartTimeLec: value
      };
    });
  };

  const handleStartLabTimeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setCourseDetails((prevDetails) => {
      if (prevDetails === null) {
        return { StartTimeLab: value };
      }
      return {
        ...prevDetails,
        StartTimeLab: value
      };
    });
  };

  const handleEndLecTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCourseDetails((prevDetails) => {
      if (prevDetails === null) {
        return { EndTimeLec: value };
      }
      return {
        ...prevDetails,
        EndTimeLec: value
      };
    });
  };

  const handleEndLabTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCourseDetails((prevDetails) => {
      if (prevDetails === null) {
        return { EndTimeLab: value };
      }
      return {
        ...prevDetails,
        EndTimeLab: value
      };
    });
  };
  
  return (
    <div className="flex flex-col pt-4">
      {" "}
      {/* 8. สถานที่เรียน */}
      <div className="flex flex-row">
        <h1 className="font-bold">7. สถานที่เรียน&emsp;</h1>
        <input
          type="text"
          value={courseDetails?.BuildingRoom || ""}
          onChange={(e) => handleHoursChange("Room", e.target.value)}
          className="w-96 p-1 border border-gray-300 rounded -mt-1 ml-34"
        />
      </div>
      <div className="pl-32">
        {/* ภาคบรรยาย */}
        <div className="flex flex-col pt-5">
          <h1 className="font-bold">ภาคบรรยาย</h1>

          <div className="flex flex-row pt-2 pl-12">
            <label htmlFor="Section" className="mr-2">
              กลุ่ม
            </label>
            <input
              type="number"
              value={courseDetails?.Section || ""}
              onChange={(e) => handleHoursChange("Section", e.target.value)}
              className="w-10 p-1 border border-gray-300 rounded -mt-1"
            />

            <label htmlFor="Date" className="pl-5 pr-2">
              วัน
            </label>
            <select
              id="DateLec"
              className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
              value={courseDetails?.DateLec || ""}
              onChange={handleDateLecChange}
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
            <select
              id="StartTimeLec"
              className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
              value={courseDetails?.StartTimeLec || ""}
              onChange={handleStartLecTimeChange}
            >
              <option value="">เลือกเวลาเริ่ม</option>
              <option value="08:30">08:30</option>
              <option value="09:30">09:30</option>
              <option value="10:30">10:30</option>
              <option value="11:30">11:30</option>
              <option value="12:30">12:30</option>
              <option value="13:30">13:30</option>
              <option value="14:30">14:30</option>
              <option value="15:30">15:30</option>
              <option value="16:30">16:30</option>
              <option value="17:30">17:30</option>
            </select>

            <h1 className="pl-2 pr-2">-</h1>

            <select
              id="EndTimeLec"
              className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
              value={courseDetails?.EndTimeLec || ""}
              onChange={handleEndLecTimeChange}
            >
              <option value="">เลือกเวลาจบ</option>
              <option value="08:30">08:30</option>
              <option value="09:30">09:30</option>
              <option value="10:30">10:30</option>
              <option value="11:30">11:30</option>
              <option value="12:30">12:30</option>
              <option value="13:30">13:30</option>
              <option value="14:30">14:30</option>
              <option value="15:30">15:30</option>
              <option value="16:30">16:30</option>
              <option value="17:30">17:30</option>
            </select>

            <h1>&emsp;น.</h1>

            <label htmlFor="Time" className="pl-5 pr-2">
              ห้อง
            </label>
            <input
              type="number"
              value={courseDetails?.ClassRoom || ""}
              onChange={(e) => handleHoursChange("ClassRoom", e.target.value)}
              className="w-24 p-1 border border-gray-300 rounded -mt-1"
            />
          </div>
        </div>

        {/* ภาคปฏิบัติ */}
        <div className="flex flex-col pt-5">
          <h1 className="font-bold">ภาคปฏิบัติ</h1>

          <div className="flex flex-row pt-2 pl-12">
            <label htmlFor="Section" className="mr-2">
              กลุ่ม
            </label>
            <input
              type="number"
              value={courseDetails?.Section || ""}
              onChange={(e) => handleHoursChange("Section", e.target.value)}
              className="w-10 p-1 border border-gray-300 rounded -mt-1"
            />

            <label htmlFor="Date" className="pl-5 pr-2">
              วัน
            </label>
            <select
              id="DateLab"
              className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
              value={courseDetails?.DateLab || ""}
              onChange={handleDateLabChange}
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
            <select
              id="StartTimeLab"
              className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
              value={courseDetails?.StartTimeLab || ""}
              onChange={handleStartLabTimeChange}
            >
              <option value="">เลือกเวลาเริ่ม</option>
              <option value="08:30">08:30</option>
              <option value="09:30">09:30</option>
              <option value="10:30">10:30</option>
              <option value="11:30">11:30</option>
              <option value="12:30">12:30</option>
              <option value="13:30">13:30</option>
              <option value="14:30">14:30</option>
              <option value="15:30">15:30</option>
              <option value="16:30">16:30</option>
              <option value="17:30">17:30</option>
            </select>

            <h1 className="pl-2 pr-2">-</h1>

            <select
              id="EndTimeLab"
              className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
              value={courseDetails?.EndTimeLab || ""}
              onChange={handleEndLabTimeChange}
            >
              <option value="">เลือกเวลาจบ</option>
              <option value="08:30">08:30</option>
              <option value="09:30">09:30</option>
              <option value="10:30">10:30</option>
              <option value="11:30">11:30</option>
              <option value="12:30">12:30</option>
              <option value="13:30">13:30</option>
              <option value="14:30">14:30</option>
              <option value="15:30">15:30</option>
              <option value="16:30">16:30</option>
              <option value="17:30">17:30</option>
            </select>

            <h1>&emsp;น.</h1>

            <label htmlFor="Time" className="pl-5 pr-2">
              ห้อง
            </label>
            <input
              type="number"
              value={courseDetails?.ClassRoom || ""}
              onChange={(e) => handleHoursChange("ClassRoom", e.target.value)}
              className="w-24 p-1 border border-gray-300 rounded -mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionEight;
