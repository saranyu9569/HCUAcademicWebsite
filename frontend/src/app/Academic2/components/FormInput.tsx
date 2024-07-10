"use client";

import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import DataTable from "./Table/DataTable";
import CLOsTable from "./Table/CLOsTable";
import {
  FormData,
  CLO,
  categoryMapping,
  courseNameMapping,
  courseGroupMapping,
} from "./Data/types";

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
  const [closList, setClosList] = useState<CLO[]>([]);
  const [currentCLO, setCurrentCLO] = useState<string>("");

  const handleAddToTable = () => {
    const convertedFormData = {
      ...formData,
      courseCategory:
        categoryMapping[
          formData.courseCategory as keyof typeof categoryMapping
        ] || formData.courseCategory,
      courseName:
        courseNameMapping[
          formData.courseName as keyof typeof courseNameMapping
        ] || formData.courseName,
      courseGroup:
        formData.courseCategory === "option1"
          ? courseGroupMapping[
              formData.courseGroup as keyof typeof courseGroupMapping
            ] || formData.courseGroup
          : "none",
    };
    setFormDataList((prev) => [...prev, convertedFormData]);
    setFormData(initialFormData);
  };

  const handleSave = (editedData: FormData, index: number) => {
    setFormDataList((prev) => {
      const newList = [...prev];
      newList[index] = editedData;
      return newList;
    });
  };

  const handleDelete = (index: number) => {
    setFormDataList((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTable = (category: "option1" | "option2" | "option3") => {
    setActiveTable((prev) => (prev === category ? null : category));
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => {
      let updatedFormData = {
        ...prevFormData,
        [id]: value,
      };

      // If courseCategory changes to option2 or option3, set courseGroup to empty string
      if (
        id === "courseCategory" &&
        (value === "option2" || value === "option3")
      ) {
        updatedFormData.courseGroup = "none";
      }

      return updatedFormData;
    });
  };

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleAddCLO = () => {
    if (formData.courseID && currentCLO) {
      setClosList((prev) => [
        ...prev,
        { courseID: formData.courseID, clo: currentCLO },
      ]);
      setCurrentCLO("");
    }
  };

  const handleSaveCLO = (editedData: CLO, index: number) => {
    setClosList((prev) => {
      const newList = [...prev];
      newList[index] = editedData;
      return newList;
    });
  };

  const handleDeleteCLO = (index: number) => {
    setClosList((prev) => prev.filter((_, i) => i !== index));
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

  const handleSaveToDatabase = async () => {
    try {
      const response = await axios.post("/api/saveData", {
        formDataList,
        closList,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Error saving data to database:", error);
    }
  };

  return (
    <div className="flex flex-col items-center max-h-screen">
      <div className="border-2 border-solid bg-gray-900 p-10 overflow-y-auto h-[95vh] w-[95vw] max-h-[75vh] max-w-[95vw] mt-5   md:h-[95vh] md:w-[95vw] md:max-h-[75vh] md:max-w-[95vw] md:mt-5 lg:h-[95vh] lg:w-[95vw] lg:max-h-[75vh] lg:max-w-[95vw] lg:mt-5 xl:h-[95vh] xl:w-[95vw] xl:max-h-[75vh] xl:max-w-[95vw] xl:mt-5 2xl:h-[95vh] 2xl:w-[95vw] 2xl:max-h-[75vh] 2xl:max-w-[95vw] 2xl:mt-5">
        {/* Table toggle buttons */}
        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => toggleTable("option1")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded lg:py-2 lg:px-4 xl:py-2 xl:px-4 2xl:py-2 2xl:px-4"
          >
            หมวดวิชาศึกษาทั่วไป
          </button>
          <button
            onClick={() => toggleTable("option2")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded lg:py-2 lg:px-4 xl:py-2 xl:px-4 2xl:py-2 2xl:px-4"
          >
            หมวดวิชาเฉพาะ
          </button>
          <button
            onClick={() => toggleTable("option3")}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded lg:py-2 lg:px-4 xl:py-2 xl:px-4 2xl:py-2 2xl:px-4"
          >
            หมวดวิชาประสบการณ์ภาคสนาม
          </button>
        </div>

        {/* Tables */}
        {activeTable === "option1" && (
          <DataTable
            data={formDataList.filter(
              (data) => data.courseCategory === categoryMapping.option1
            )}
            onSave={(editedData, index) =>
              handleSave(
                editedData,
                formDataList.findIndex(
                  (data) => data.courseCategory === categoryMapping.option1
                ) + index
              )
            }
            onDelete={(index) =>
              handleDelete(
                formDataList.findIndex(
                  (data) => data.courseCategory === categoryMapping.option1
                ) + index
              )
            }
            title="หมวดวิชาศึกษาทั่วไป"
          />
        )}
        {activeTable === "option2" && (
          <DataTable
            data={formDataList.filter(
              (data) => data.courseCategory === categoryMapping.option2
            )}
            onSave={(editedData, index) =>
              handleSave(
                editedData,
                formDataList.findIndex(
                  (data) => data.courseCategory === categoryMapping.option2
                ) + index
              )
            }
            onDelete={(index) =>
              handleDelete(
                formDataList.findIndex(
                  (data) => data.courseCategory === categoryMapping.option2
                ) + index
              )
            }
            title="หมวดวิชาเฉพาะ"
          />
        )}
        {activeTable === "option3" && (
          <DataTable
            data={formDataList.filter(
              (data) => data.courseCategory === categoryMapping.option3
            )}
            onSave={(editedData, index) =>
              handleSave(
                editedData,
                formDataList.findIndex(
                  (data) => data.courseCategory === categoryMapping.option3
                ) + index
              )
            }
            onDelete={(index) =>
              handleDelete(
                formDataList.findIndex(
                  (data) => data.courseCategory === categoryMapping.option3
                ) + index
              )
            }
            title="หมวดวิชาประสบการณ์ภาคสนาม"
          />
        )}

        {/* CLOs Table */}
        {(formData.courseCategory === "option2" ||
          formData.courseCategory === "option3") && (
          <CLOsTable
            data={closList}
            onSave={handleSaveCLO}
            onDelete={handleDeleteCLO}
          />
        )}

        <h1 className="text-2xl pt-10 mb-4">กลุ่มวิชา</h1>
        <div className="flex flex-col space-y-10">
          {/* Row for selectors */}

          <div className="flex flex-col lg:flex-row lg:space-x-10 xl:flex-row xl:space-x-10 2xl:flex-row 2xl:space-x-10">
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
            <div className="flex flex-col w-full gap-4 -mt-4 lg:flex-row lg:space-x-4  xl:flex-row xl:space-x-4 2xl:flex-row 2xl:space-x-4">
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
          <div className="grid grid-cols gap-4 w-full lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
            {/* totalCredits */}
            <div className="flex items-center">
              <label htmlFor="totalCredits" className="text-white mr-2">
                จำนวนชั่วโมงรวม:
              </label>
              <input
                id="totalCredits"
                type="text"
                className="p-2 border-2 border-gray-300 rounded-md text-black max-w-[50px] max-h-[35px] lg:ml-10 xl:ml-17 2xl:ml-17"
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

        {/* CLOs input (only show when courseCategory is option2 or option3) */}
        {(formData.courseCategory === "option2" ||
          formData.courseCategory === "option3") && (
          <div className="flex flex-col mt-4">
            <h2 className="text-2xl mb-2">CLOs</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                value={currentCLO}
                onChange={(e) => setCurrentCLO(e.target.value)}
                placeholder="Enter CLO"
                className="p-2 border-2 border-gray-300 rounded-md text-black flex-grow"
              />
              <button
                onClick={handleAddCLO}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add CLO
              </button>
            </div>
          </div>
        )}

        <div className="pt-10">
          <button
            className="bg-orangered hover:bg-red-500 p-2 rounded-md text-bold"
            onClick={handleAddToTable}
          >
            ADD TO Table
          </button>

          <button
            className="bg-green-500 hover:bg-green-700 p-2 rounded-md text-bold ml-4"
            onClick={handleSaveToDatabase}
          >
            SAVE TO DATABASE
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormInput;
