"use client";

import React, { useState, ChangeEvent } from "react";
import DataTable from "./Table/DataTable";
import { FormData } from "./Data/types";

const initialFormData: FormData = {
  courseCategory: "",
  courseName: "",
  courseGroup: "",
  courseID: "",
  courseNameThai: "",
  courseNameEng: "",
  Prerequisite: "",
  totalCredits: "",
  lectureHours: "",
  lectureGrading: "",
  labHours: "",
  labGrading: "",
  internHours: "",
  internGrading: "",
  DescriptionThai: "",
  DescriptionEng: "",
};

const FormInput: React.FC = () => {
  const [formDataList, setFormDataList] = useState<FormData[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [activeTable, setActiveTable] = useState<string | null>(null);

  const handleAddToTable = () => {
    setFormDataList(prev => [...prev, formData]);
    setFormData(initialFormData);
  };

  const handleSave = (editedData: FormData, index: number) => {
    setFormDataList(prev => {
      const newList = [...prev];
      newList[index] = editedData;
      return newList;
    });
  };

  const handleDelete = (index: number) => {
    setFormDataList(prev => prev.filter((_, i) => i !== index));
  };

  const toggleTable = (category: 'option1' | 'option2' | 'option3') => {
    setActiveTable(prev => prev === category ? null : category);
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const renderCourseNameOptions = () => {
    if (formData.courseCategory === "option1") {
      return (
        <>
          <option value="option1">วิชาบังคับ</option>
          <option value="option2">วิชาเลือก</option>
        </>
      );
    } else if (
      formData.courseCategory === "option2" ||
      formData.courseCategory === "option3"
    ) {
      return (
        <>
          <option value="option3">กลุ่มวิชาพื้นฐานวิชาชีพ</option>
          <option value="option4">กลุ่มวิชาเอกบังคับ</option>
          <option value="option5">กลุ่มวิชาเอกเลือก</option>
        </>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center max-h-screen">
      <div className="border-2 border-solid h-[95vh] w-[95vw] max-h-[75vh] max-w-[95vw] mt-5 bg-gray-900 p-10 overflow-y-auto">
        {/* Table toggle buttons */}
        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => toggleTable("option1")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            หมวดวิชาศึกษาทั่วไป          </button>
          <button
            onClick={() => toggleTable("option2")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            หมวดวิชาเฉพาะ
          </button>
          <button
            onClick={() => toggleTable("option3")}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            หมวดวิชาประสบการณ์ภาคสนาม
          </button>
        </div>

        {/* Tables */}
        {activeTable === "option1" && (
          <DataTable
            data={formDataList.filter(
              (data) => data.courseCategory === "option1"
            )}
            onSave={(editedData, index) =>
              handleSave(
                editedData,
                formDataList.findIndex(
                  (data) => data.courseCategory === "option1"
                ) + index
              )
            }
            onDelete={(index) =>
              handleDelete(
                formDataList.findIndex(
                  (data) => data.courseCategory === "option1"
                ) + index
              )
            }
            title="หมวดวิชาศึกษาทั่วไป"
          />
        )}
        {activeTable === "option2" && (
          <DataTable
            data={formDataList.filter(
              (data) => data.courseCategory === "option2"
            )}
            onSave={(editedData, index) =>
              handleSave(
                editedData,
                formDataList.findIndex(
                  (data) => data.courseCategory === "option2"
                ) + index
              )
            }
            onDelete={(index) =>
              handleDelete(
                formDataList.findIndex(
                  (data) => data.courseCategory === "option2"
                ) + index
              )
            }
            title="หมวดวิชาเฉพาะ"
          />
        )}
        {activeTable === "option3" && (
          <DataTable
            data={formDataList.filter(
              (data) => data.courseCategory === "option3"
            )}
            onSave={(editedData, index) =>
              handleSave(
                editedData,
                formDataList.findIndex(
                  (data) => data.courseCategory === "option3"
                ) + index
              )
            }
            onDelete={(index) =>
              handleDelete(
                formDataList.findIndex(
                  (data) => data.courseCategory === "option3"
                ) + index
              )
            }
            title="หมวดวิชาประสบการณ์ภาคสนาม"
          />
        )}
        <h1 className="text-2xl pt-10 mb-4">กลุ่มวิชา</h1>
        <div className="flex flex-col space-y-10">
          {/* Row for selectors */}

          <div className="flex flex-row space-x-10">
            {/* CourseCategory */}
            <div className="flex flex-col">
              <label htmlFor="courseCategory" className="text-white mb-2">
                หมวดวิชาศึกษา:
              </label>
              <select
                id="courseCategory"
                className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[250px] max-h-[40px]"
                value={formData.courseCategory}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="option1">หมวดวิชาศึกษาทั่วไป</option>
                <option value="option2">หมวดวิชาเฉพาะ</option>
                <option value="option3">หมวดวิชาประสบการณ์ภาคสนาม</option>
              </select>
            </div>

            {/* CourseName */}
            <div className="flex flex-col">
              <label htmlFor="courseName" className="text-white mb-2">
                วิชา:
              </label>
              <select
                id="courseName"
                className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[250px] max-h-[40px]"
                value={formData.courseName}
                onChange={handleChange}
              >
                <option value="">Select Course</option>
                {renderCourseNameOptions()}
              </select>
            </div>

            {/* Conditionally render CourseGroup */}
            {formData.courseCategory === "option1" && (
              <div className="flex flex-col">
                <label htmlFor="courseGroup" className="text-white mb-2">
                  กลุ่มวิชา:
                </label>
                <select
                  id="courseGroup"
                  className="p-2 border-2 border-gray-300 rounded-md text-black text-sm max-w-[280px] max-h-[40px]"
                  value={formData.courseGroup}
                  onChange={handleChange}
                >
                  <option value="">Select Group</option>
                  <option value="option1">กลุ่มวิชามนุษยศาสตร์</option>
                  <option value="option2">กลุ่มวิชาสังคมศาสตร์</option>
                  <option value="option3">
                    กลุ่มวิชาวิทยาศาสตร์และคณิตศาสตร์
                  </option>
                  <option value="option4">กลุ่มวิชาภาษา</option>
                </select>
              </div>
            )}
          </div>

          {/* Rows for input boxes */}
          <h1 className="text-2xl">รายละเอียดวิชา</h1>
          <div className="flex flex-nowrap w-full ">
            <div className="flex flex-row space-x-4 w-full gap-4 -mt-4">
              {/* CourseID */}
              <div className="flex flex-col">
                <label htmlFor="courseID" className="text-white mb-2">
                  รหัสวิชา:
                </label>
                <input
                  id="courseID"
                  type="text"
                  className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[250px] max-h-[40px]"
                  value={formData.courseID}
                  onChange={handleChange}
                />
              </div>

              {/* CourseNameThai */}
              <div className="flex flex-col">
                <label htmlFor="courseNameThai" className="text-white mb-2">
                  ชื่อวิชาภาษาไทย:
                </label>
                <input
                  id="courseNameThai"
                  type="text"
                  className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[250px] max-h-[40px]"
                  value={formData.courseNameThai}
                  onChange={handleChange}
                />
              </div>

              {/* CourseNameEng */}
              <div className="flex flex-col">
                <label htmlFor="courseNameEng" className="text-white mb-2">
                  ชื่อวิชาภาษาอังกฤษ:
                </label>
                <input
                  id="courseNameEng"
                  type="text"
                  className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[250px] max-h-[40px]"
                  value={formData.courseNameEng}
                  onChange={handleChange}
                />
              </div>

              {/* Prerequisite */}
              <div className="flex flex-col">
                <label htmlFor="Prerequisite" className="text-white mb-2">
                  Prerequisite:
                </label>
                <input
                  id="Prerequisite"
                  type="text"
                  className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[250px] max-h-[40px]"
                  value={formData.Prerequisite}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/*Credits Section*/}
          <h1 className="text-2xl mt-4">หน่วยกิต</h1>
          <div className="grid grid-cols-4 gap-4 w-full">
            {/* totalCredits */}
            <div className="flex items-center">
              <label htmlFor="totalCredits" className="text-white mr-2">
                จำนวนชั่วโมงรวม:
              </label>
              <input
                id="totalCredits"
                type="text"
                className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[50px] max-h-[35px]"
                value={formData.totalCredits}
                onChange={handleChange}
              />
            </div>

            {/* lectureHours */}
            <div className="flex items-center">
              <label htmlFor="lectureHours" className="text-white mr-2">
                จำนวนการเรียนทฤษฎี:
              </label>
              <input
                id="lectureHours"
                type="text"
                className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[50px] max-h-[35px]"
                value={formData.lectureHours}
                onChange={handleChange}
              />
            </div>

            {/* lectureGrading */}
            <div className="flex items-center">
              <label htmlFor="lectureGrading" className="text-white mr-2">
                จำนวนการเก็บคะแนนทฤษฎี:
              </label>
              <input
                id="lectureGrading"
                type="text"
                className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[50px] max-h-[35px]"
                value={formData.lectureGrading}
                onChange={handleChange}
              />
            </div>

            {/* labHours */}
            <div className="flex items-center">
              <label htmlFor="labHours" className="text-white mr-2">
                จำนวนการเรียนปฏิบัติ:
              </label>
              <input
                id="labHours"
                type="text"
                className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[50px] max-h-[35px]"
                value={formData.labHours}
                onChange={handleChange}
              />
            </div>

            {/* labGrading */}
            <div className="flex items-center">
              <label htmlFor="labGrading" className="text-white mr-2">
                จำนวนการเก็บคะแนนปฏิบัติ:
              </label>
              <input
                id="labGrading"
                type="text"
                className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[50px] max-h-[35px]"
                value={formData.labGrading}
                onChange={handleChange}
              />
            </div>

            {/* internHours */}
            <div className="flex items-center ml-1">
              <label htmlFor="internHours" className="text-white mr-2">
                จำนวนการเรียนสหกิจ:
              </label>
              <input
                id="internHours"
                type="text"
                className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[50px] max-h-[35px]"
                value={formData.internHours}
                onChange={handleChange}
              />
            </div>

            {/* internGrading */}
            <div className="flex items-center ml-1">
              <label htmlFor="internGrading" className="text-white mr-2">
                จำนวนการเก็บคะแนนสหกิจ:
              </label>
              <input
                id="internGrading"
                type="text"
                className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[50px] max-h-[35px]"
                value={formData.internGrading}
                onChange={handleChange}
              />
            </div>
          </div>

          <h1 className="text-2xl">คำอธิบายวิชา</h1>
          <div className="flex flex-col">
            <label htmlFor="DescriptionThai" className="text-white mr-2">
              คำอธิบายรายวิชาภาษาไทย:
            </label>
            <textarea
              id="DescriptionThai"
              className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[1000px] h-[150px]"
              value={formData.DescriptionThai}
              onChange={handleChangeTextArea}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="DescriptionEng" className="text-white mr-2">
              คำอธิบายรายวิชาภาษาอังกฤษ:
            </label>
            <textarea
              id="DescriptionEng"
              className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[1000px] h-[150px]"
              value={formData.DescriptionEng}
              onChange={handleChangeTextArea}
            />
          </div>
        </div>

        <div className="pt-10">
          <button
            className="bg-orangered hover:bg-red-500 p-2 rounded-md text-bold"
            onClick={handleAddToTable}
          >
            ADD TO Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormInput;
