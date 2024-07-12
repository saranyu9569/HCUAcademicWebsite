"use client";

import React, { useState, useEffect } from "react";

interface CourseID {
  CourseID: string;
}

interface CourseDetails {
  CourseID: string;
  CategoryName: string;
  CourseName: string;
  GroupName: string;
  CourseNameThai: string;
  CourseNameEng: string;
  Prerequisite: string;
  TotalCredits: string;
  LectureHours: string;
  LectureGrading: string;
  LabHours: string;
  LabGrading: string;
  InternHours: string;
  InternGrading: string;
  DescriptionThai: string;
  DescriptionEng: string;
  CLOs: string[];
  Semester?: string;
  SemesteslecHours: string;
  SemesteslabHours: string;
  CourseYear?: string;
}

const InputForm = () => {
  const [courseIDs, setCourseIDs] = useState<CourseID[]>([]);
  const [selectedCourseID, setSelectedCourseID] = useState<string>("");
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );
  const currentYear = new Date().getFullYear() + 543;

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
              {courseDetails?.TotalCredits} หน่วกิต)
            </h1>
          </div>

          {/* จำนวนชั่วโมงต่อภาคการศึกษา */}
          <div>
            <h1 className="text-left text-lg font-bold">
              จำนวนชั่วโมง/ภาคการศึกษา
            </h1>

            <table className="min-w-full divide-y divide-black border-black border mt-2">
              <thead className="bg-white text-black text-center text-sm">
                <tr className="divide-x divide-black">
                  <th
                    colSpan={2}
                    className="px-6 py-3 font-medium tracking-wider"
                  >
                    บรรยาย
                  </th>
                  <th
                    colSpan={2}
                    className="px-6 py-3 font-medium tracking-wider"
                  >
                    การฝึกปฏิบัติ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-black">
                <tr className="divide-x divide-black">
                  <td colSpan={2} className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={courseDetails?.SemesteslecHours || ""}
                      onChange={(e) =>
                        handleHoursChange("SemesteslecHours", e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td colSpan={2} className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={courseDetails?.SemesteslabHours || ""}
                      onChange={(e) =>
                        handleHoursChange("SemesteslabHours", e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                    />
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

          {/* ระดับการศึกษา/ชั้นปีที่เรียน */}
          <div className="text-lg pt-4">
            <div className="flex flex-row gap-5">
              <h1 className="font-bold">
                3. ระดับการศึกษา/ ชั้นปีที่เรียน ภาคการศึกษาที่{" "}
                {courseDetails?.Semester} ชั้นปีที่
              </h1>
              <input
                type="text"
                value={courseDetails?.CourseYear || ""}
                onChange={(e) =>
                  handleHoursChange("CourseYear", e.target.value)
                }
                className="w-10 p-1 border border-gray-300 rounded -mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
