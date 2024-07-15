import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useCourseContext } from "../../../../Data/CourseContext";

const CourseObjective: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const { courseDetails, setCourseDetails } = useCourseContext();

  const handleAdd = () => {
    if (input.trim()) {
      setCourseDetails((prev) => ({
        ...prev,
        CourseObjective: [...(prev?.CourseObjective || []), input.trim()],
      }));
      setInput("");
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditValue(courseDetails?.CourseObjective?.[index] || "");
  };

  const handleSave = (index: number) => {
    const updatedObjectives =
      courseDetails?.CourseObjective?.map((obj, i) =>
        i === index ? editValue : obj
      ) || [];
    setCourseDetails((prev) => ({
      ...prev,
      CourseObjective: updatedObjectives,
    }));
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    const updatedObjectives =
      courseDetails?.CourseObjective?.filter((_, i) => i !== index) || [];
    setCourseDetails((prev) => ({
      ...prev,
      CourseObjective: updatedObjectives,
    }));
  };

  return (
    <div className="w-full max-w-screen mx-auto">
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">วัตถุประสงค์</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseDetails?.CourseObjective?.map((objective, index) => (
            <tr key={index}>
              <td className="border p-2">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  objective
                )}
              </td>
              <td className="border p-2">
                {editIndex === index ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSave}
                      className="cursor-pointer mr-2 text-green-500"
                      onClick={() => handleSave(index)}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="cursor-pointer text-red-500"
                      onClick={handleCancel}
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="cursor-pointer mr-2 text-blue-500"
                      onClick={() => handleEdit(index)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="cursor-pointer text-red-500"
                      onClick={() => handleDelete(index)}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h1 className="text-lg font-bold pb-2">1. วัตถุประสงค์ของรายวิชา </h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter course objective"
        />
        <button
          onClick={handleAdd}
          className="mt-2 p-2 bg-orangered hover:bg-red-600 text-white rounded"
        >
          Add Objective
        </button>
      </div>
    </div>
  );
};

export default CourseObjective;
