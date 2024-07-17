"use client";

import React, { useState, useEffect } from "react";
import CourseIDSelect from "./Section/CourseIDSelect";
import SemesterSelect from "./Section/Header";
import CreditHoursTable from "./Section/CreditHoursTable";
import EducationLevelSelect from "./Section/CourseYear";
import ClassSchedule from "./Section/ClassSchedule";
import { CourseID, CourseDetails } from '../../../Data/types';
import { useCourseContext } from '../../../Data/CourseContext';


const Step1 = () => {
  const [courseIDs, setCourseIDs] = useState<CourseID[]>([]);
  const [selectedCourseID, setSelectedCourseID] = useState<string>("");
  const { courseDetails, setCourseDetails } = useCourseContext();
  const currentYear = new Date().getFullYear() + 543;
  const date = new Date();

  const result = date
    .toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/(\d+)$/, "พ.ศ. $1");


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
          setCourseDetails({} as CourseDetails);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
        setCourseDetails({} as CourseDetails);
      }
    } else {
      setCourseDetails({} as CourseDetails);
    }
  };

  const handleHoursChange = (field: string, value: string) => {
    if (courseDetails) {
      const updatedCourseDetails = { ...courseDetails, [field]: value };
      setCourseDetails(updatedCourseDetails);
    }
  };

  return (
    <div className="flex flex-col items-center max-h-screen text-black">
      <div className="border-2 border-solid bg-white p-10 overflow-y-auto h-[95vh] w-[95vw] max-h-[75vh] max-w-[95vw] mt-5   md:h-[95vh] md:w-[95vw] md:max-h-[75vh] md:max-w-[95vw] md:mt-5 lg:h-[95vh] lg:w-[95vw] lg:max-h-[75vh] lg:max-w-[95vw] lg:mt-5 xl:h-[95vh] xl:w-[95vw] xl:max-h-[75vh] xl:max-w-[95vw] xl:-mt-2 2xl:h-[95vh] 2xl:w-[95vw] 2xl:max-h-[75vh] 2xl:max-w-[95vw] 2xl:mt-5">
        <CourseIDSelect
          courseIDs={courseIDs}
          selectedCourseID={selectedCourseID}
          onCourseIDChange={handleCourseIDChange}
        />

        {/* หัวข้อ */}
        <div className="text-center text-lg font-bold text-black">
          <h1 className="pt-10">รายละเอียดของรายวิชา</h1>
          <h1 className="p-2">
            คณะ วิทยาศาสตร์และเทคโนโลยี สาขาวิชา ปัญญาประดิษฐ์
          </h1>
          <div className="flex flex-row justify-center">
            <h1 className="p-2">ภาคการศึกษาที่ </h1>
            <SemesterSelect />
            <h1 className="p-2">ปีการศึกษา {currentYear}</h1>
          </div>
          <h1 className="p-2">มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ</h1>
        </div>

        {/* หมวดที่1 */}

        {/* 1. จำนวนชั่วโมงต่อภาคการศึกษา */}
        <div className="text-lg">
          <h1 className="text-center text-lg p-5 font-bold">
            หมวดที่ 1 ข้อมูลทั่วไป
          </h1>

          <div className="flex flex-col">
            <h1 className="text-left text-lg font-bold">
              1. รหัส-ชื่อวิชาและจำนวนหน่วยกิต
            </h1>
            <h1 className="p-4">
              {courseDetails?.CourseID} {courseDetails?.CourseNameThai}{" "}
              {courseDetails?.CourseNameEng} <br />(
              {courseDetails?.TotalCredits} หน่วยกิต)
            </h1>
          </div>
          
          {/* ตารางหน่วยกิต */}
          <CreditHoursTable />

          {/* 2. หลักสูตร และประเภทรายวิชา */}
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
          <EducationLevelSelect />


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

          <ClassSchedule />

          {/* 8.วันที่จัดทำรายละเอียดของรายวิชา หรือปรับปรุงล่าสุด */}
          <div className="pt-6">
            <div className="flex flex-row">
              <h1 className="font-bold">
                8.&nbsp;วันที่จัดทำรายละเอียดของรายวิชา หรือปรับปรุงล่าสุด{" "}
              </h1>
              <h1 className="pl-2">{result}</h1>
            </div>
          </div>

          {/* 9.จำนวนชั่วโมงต่อสัปดาห์ที่อาจารย์ให้คำปรึกษาและแนะนำทางวิชาการเป็นรายบุคคล */}
          <div className="pt-6">
            <div className="flex flex-col">
              <h1 className="font-bold">
                9.จำนวนชั่วโมงต่อสัปดาห์ที่อาจารย์ให้คำปรึกษาและแนะนำทางวิชาการเป็นรายบุคคล
              </h1>
              <textarea
                value={courseDetails?.ConsultTime || ""}
                onChange={(e) =>
                  handleHoursChange("ConsultTime", e.target.value)
                }
                className="w-7/12 h-24 p-1 border border-gray-300 rounded -mt-1 mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
