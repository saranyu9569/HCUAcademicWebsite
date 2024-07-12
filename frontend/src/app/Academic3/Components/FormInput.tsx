"use client";

import React, { useState, useEffect } from "react";

interface CourseID {
  CourseID: string;
}

interface CourseDetails {
  CourseID?: string;
  CategoryName?: string;
  CourseName?: string;
  GroupName?: string;
  CourseNameThai?: string;
  CourseNameEng?: string;
  Prerequisite?: string;
  TotalCredits?: string;
  LectureHours?: string;
  LectureGrading?: string;
  LabHours?: string;
  LabGrading?: string;
  InternHours?: string;
  InternGrading?: string;
  DescriptionThai?: string;
  DescriptionEng?: string;
  CLOs?: string[];
  Semester?: string;
  CourseYear?: string;
  COrequisite?: string;
  TeacherName?: string;
  COTeacherName?: string;
  BuildingRoom?: string;
  Section?: string;
  Date?: string;
  StartTime?: string;
  EndTime?: string;
  ClassRoom?: string;
  ConsultTime?: string;
}

const InputForm = () => {
  const [courseIDs, setCourseIDs] = useState<CourseID[]>([]);
  const [selectedCourseID, setSelectedCourseID] = useState<string>("");
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );
  const currentYear = new Date().getFullYear() + 543;
  const date = new Date()

  const result = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).replace(/(\d+)$/, 'พ.ศ. $1');


  function getCreditsHours(lecHours: number): number {
    if (lecHours === 3) {
      return 45;
    } else if (lecHours === 2) {
      return 30;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    const fetchCourseIDs = async () => {
      try {
        const response = await fetch("/api/getCourseIDs");
        if (response.ok) {
          const data: CourseID[] = await response.json();
          setCourseIDs(data);
        } else {
          console.error("Failed to fetch course IDs");
        }
      } catch (error) {
        console.error("Error fetching course IDs:", error);
      }
    };

    fetchCourseIDs();
  }, []);

  useEffect(() => {
    if (courseDetails) {
      console.log("Current CourseDetails:", courseDetails);
    }
  }, [courseDetails]);

  const handleCourseIDChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const courseID = event.target.value;
    setSelectedCourseID(courseID);

    if (courseID) {
      try {
        const response = await fetch(
          `/api/getCourseDetails?courseID=${courseID}`
        );
        if (response.ok) {
          const data: CourseDetails = await response.json();
          setCourseDetails(data);
        } else {
          console.error("Failed to fetch course details");
          setCourseDetails(null);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
        setCourseDetails(null);
      }
    } else {
      setCourseDetails(null);
    }
  };

  const handleSemesterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSemester = event.target.value;
    if (courseDetails) {
      const updatedCourseDetails = { ...courseDetails, Semester: newSemester };
      setCourseDetails(updatedCourseDetails);
    }
  };

  const handleHoursChange = (field: string, value: string) => {
    if (courseDetails) {
      const updatedCourseDetails = { ...courseDetails, [field]: value };
      setCourseDetails(updatedCourseDetails);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCourseDetails((prevDetails) => {
      if (prevDetails === null) {
        return { Date: value };
      }
      return {
        ...prevDetails,
        Date: value,
      };
    });
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setCourseDetails((prevDetails) => {
      if (prevDetails === null) {
        return { StartTime: value };
      }
      return {
        ...prevDetails,
        StartTime: value,
      };
    });
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCourseDetails((prevDetails) => {
      if (prevDetails === null) {
        return { EndTime: value };
      }
      return {
        ...prevDetails,
        EndTime: value,
      };
    });
  };

  const handleCourseYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setCourseDetails((prevDetails) => {
      if (prevDetails === null) {
        return { CourseYear: value };
      }
      return {
        ...prevDetails,
        CourseYear: value,
      };
    });
  };

  return (
    <div className="flex flex-col items-center max-h-screen text-black">
      <div className="border-2 border-solid bg-white p-10 overflow-y-auto h-[95vh] w-[95vw] max-h-[75vh] max-w-[95vw] mt-5   md:h-[95vh] md:w-[95vw] md:max-h-[75vh] md:max-w-[95vw] md:mt-5 lg:h-[95vh] lg:w-[95vw] lg:max-h-[75vh] lg:max-w-[95vw] lg:mt-5 xl:h-[95vh] xl:w-[95vw] xl:max-h-[75vh] xl:max-w-[95vw] xl:mt-5 2xl:h-[95vh] 2xl:w-[95vw] 2xl:max-h-[75vh] 2xl:max-w-[95vw] 2xl:mt-5">
        <div className="mb-4">
          <label htmlFor="courseID" className="block mb-2">
            Course ID:
          </label>
          <select
            id="courseID"
            value={selectedCourseID}
            onChange={handleCourseIDChange}
            className="p-2 border-2 border-gray-300 rounded-md text-black"
          >
            <option value="">Select a Course ID</option>
            {courseIDs.map((course) => (
              <option key={course.CourseID} value={course.CourseID}>
                {course.CourseID}
              </option>
            ))}
          </select>
        </div>

        {/* หัวข้อ */}
        <div className="text-center text-lg font-bold text-black">
          <div>
            <h1 className="pt-10">รายละเอียดของรายวิชา</h1>
          </div>
          <div>
            <h1 className="p-2">
              คณะ วิทยาศาสตร์และเทคโนโลยี สาขาวิชา ปัญญาประดิษฐ์
            </h1>
          </div>
          <div className="flex flex-row justify-center">
            <h1 className="p-2">ภาคการศึกษาที่ </h1>
            <select
              value={courseDetails?.Semester || ""}
              onChange={handleSemesterChange}
              className="p-1 border-2 border-gray-300 rounded-md text-black w-12 h-8 mt-1"
            >
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>

            <div>
              <h1 className="p-2">ปีการศึกษา {currentYear}</h1>
            </div>
          </div>

          <div>
            <h1 className="p-2">มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ</h1>
          </div>

          <hr className="border-t-2 border-black w-full mt-2" />
        </div>

        {/* หมวดที่1 */}
        <div className="text-lg">
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
              {courseDetails?.CourseNameEng} <br /> (
              {courseDetails?.TotalCredits} หน่วยกิต)
            </h1>
          </div>

          {/* จำนวนชั่วโมงต่อภาคการศึกษา */}
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
                      บรรยาย{" "}
                      {getCreditsHours(
                        Number(courseDetails?.LectureHours) || 0
                      )}
                      &nbsp;ชั่วโมง&nbsp;ต่อภาคการศึกษา
                    </h1>
                  </td>
                  <td colSpan={2} className="px-6 py-4 whitespace-nowrap">
                    <h1>
                      ปฏิบัติ{" "}
                      {getCreditsHours(
                        Number(courseDetails?.LectureHours) || 0
                      )}
                      &nbsp;ชั่วโมง&nbsp;ต่อภาคการศึกษา
                    </h1>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* หลักสูตร และประเภทรายวิชา */}
          <div className="text-lg pt-4">
            <div className="flex flex-row gap-5">
              <h1 className="font-bold">2. หลักสูตร และประเภทรายวิชา</h1>
              <h1>
                หลักสูตรวิทยาศาสตร์บัณฑิต (ปัญญาประดิษฐ์) ประเภทราย
                {courseDetails?.CourseName}
              </h1>
            </div>
          </div>

          {/* 3. ระดับการศึกษา/ชั้นปีที่เรียน */}
          <div className="text-lg pt-4">
            <div className="flex flex-row gap-5">
              <h1 className="font-bold">
                3. ระดับการศึกษา/ ชั้นปีที่เรียน ภาคการศึกษาที่{" "}
                {courseDetails?.Semester} ชั้นปีที่&nbsp;
              </h1>
              <select
                id="CourseYear"
                className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
                value={courseDetails?.CourseYear || ""}
                onChange={handleCourseYearChange}
              >
                <option value="">เลือกปี</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>

          {/* 4.รายวิชาที่ต้องเรียนมาก่อน */}
          <div className="pt-4">
            <h1 className="font-bold">
              4. รายวิชาที่ต้องเรียนมาก่อน
              (Pre-requisite)&emsp;&emsp;&emsp;&emsp; &nbsp;
              {courseDetails?.Prerequisite}
            </h1>
          </div>

          {/* 5.รายวิชาที่ต้องเรียนพร้อมกัน */}
          <div className="flex flex-row pt-4">
            <h1 className="font-bold">
              5. รายวิชาที่ต้องเรียนพร้อมกัน
              (Co-requisite)&emsp;&emsp;&emsp;&emsp;
            </h1>
            <input
              type="text"
              value={courseDetails?.COrequisite || ""}
              onChange={(e) => handleHoursChange("COrequisite", e.target.value)}
              className="w-20 p-1 border border-gray-300 rounded -mt-1"
            />
          </div>

          {/* 6. ชื่ออาจารย์ประจำวิชา */}
          <div className="flex flex-col">
            <div className="flex flex-row pt-4">
              <h1 className="font-bold">
                6. ชื่ออาจารย์ผู้รับผิดชอบรายวิชา&emsp;
              </h1>
              <input
                type="text"
                value={courseDetails?.TeacherName || ""}
                onChange={(e) =>
                  handleHoursChange("TeacherName", e.target.value)
                }
                className="w-80 p-1 border border-gray-300 rounded -mt-1"
              />
            </div>

            <div className="flex flex-row pt-4">
              <h1 className="font-bold">
                &emsp;ชื่ออาจารย์ผู้รับผิดชอบร่วม&emsp;
              </h1>
              <input
                type="text"
                value={courseDetails?.COTeacherName || ""}
                onChange={(e) =>
                  handleHoursChange("COTeacherName", e.target.value)
                }
                className="w-80 p-1 border border-gray-300 rounded -mt-1 ml-8"
              />
            </div>
          </div>

          {/* 7. สถานที่เรียน */}
          <div className="flex flex-col pt-4">
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
                    onChange={(e) =>
                      handleHoursChange("Section", e.target.value)
                    }
                    className="w-10 p-1 border border-gray-300 rounded -mt-1"
                  />

                  <label htmlFor="Date" className="pl-5 pr-2">
                    วัน
                  </label>
                  <select
                    id="Date"
                    className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
                    value={courseDetails?.Date || ""}
                    onChange={handleDateChange}
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
                    id="StartTime"
                    className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
                    value={courseDetails?.StartTime || ""}
                    onChange={handleStartTimeChange}
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
                    id="EndTime"
                    className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
                    value={courseDetails?.EndTime || ""}
                    onChange={handleEndTimeChange}
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
                    onChange={(e) =>
                      handleHoursChange("ClassRoom", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleHoursChange("Section", e.target.value)
                    }
                    className="w-10 p-1 border border-gray-300 rounded -mt-1"
                  />

                  <label htmlFor="Date" className="pl-5 pr-2">
                    วัน
                  </label>
                  <select
                    id="Date"
                    className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
                    value={courseDetails?.Date || ""}
                    onChange={handleDateChange}
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
                    id="StartTime"
                    className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
                    value={courseDetails?.StartTime || ""}
                    onChange={handleStartTimeChange}
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
                    id="EndTime"
                    className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px] -mt-1"
                    value={courseDetails?.EndTime || ""}
                    onChange={handleEndTimeChange}
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
                    onChange={(e) =>
                      handleHoursChange("ClassRoom", e.target.value)
                    }
                    className="w-24 p-1 border border-gray-300 rounded -mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 8.วันที่จัดทำรายละเอียดของรายวิชา หรือปรับปรุงล่าสุด */}
          <div className="pt-6">
            <div className="flex flex-row">
            <h1 className="font-bold">8.&nbsp;วันที่จัดทำรายละเอียดของรายวิชา หรือปรับปรุงล่าสุด </h1>
            <h1 className="pl-2">{result}</h1>
            </div>
          </div>

          {/* 9.จำนวนชั่วโมงต่อสัปดาห์ที่อาจารย์ให้คำปรึกษาและแนะนำทางวิชาการเป็นรายบุคคล */}
          <div className="pt-6">
            <div className="flex flex-col">
            <h1 className="font-bold">9.จำนวนชั่วโมงต่อสัปดาห์ที่อาจารย์ให้คำปรึกษาและแนะนำทางวิชาการเป็นรายบุคคล</h1>
            <textarea
                value={courseDetails?.ConsultTime || ""}
                onChange={(e) => handleHoursChange("ConsultTime", e.target.value)}
                className="w-7/12 h-24 p-1 border border-gray-300 rounded -mt-1 mt-2"
              />
            </div>
          </div>












        </div>
      </div>
    </div>
  );
};

export default InputForm;
