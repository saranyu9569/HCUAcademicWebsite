// CLOsTable.tsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CLO } from '../Data/types';

interface CLOsTableProps {
  data: CLO[];
  onSave: (editedData: CLO, index: number) => void;
  onDelete: (index: number) => void;
}

const CLOsTable: React.FC<CLOsTableProps> = ({ data, onSave, onDelete }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<CLO | null>(null);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedData(data[index]);
  };

  const handleSave = () => {
    if (editedData !== null && editingIndex !== null) {
      onSave(editedData, editingIndex);
      setEditingIndex(null);
      setEditedData(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedData(null);
  };

  const handleInputChange = (key: keyof CLO, value: string) => {
    if (editedData) {
      setEditedData(prev => ({ ...prev!, [key]: value }));
    }
  };

  if (data.length === 0) {
    return <div className="mt-10">No CLOs available</div>;
  }

  return (
    <div className="mt-10 overflow-x-auto">
      <h2 className="text-2xl mb-4">CLOs Table</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-300 p-2 whitespace-nowrap">Course ID</th>
            <th className="border border-gray-300 p-2 whitespace-nowrap">CLO</th>
            <th className="border border-gray-300 p-2 whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-gray-800">
              <td className="border border-gray-300 p-2">{row.courseID}</td>
              <td className="border border-gray-300 p-2">
                {editingIndex === rowIndex ? (
                  <input
                    type="text"
                    value={editedData!.clo}
                    onChange={(e) => handleInputChange('clo', e.target.value)}
                    className="w-full bg-gray-700 text-white p-1"
                  />
                ) : (
                  row.clo
                )}
              </td>
              <td className="border border-gray-300 p-2">
                <div className="flex justify-center space-x-2">
                  {editingIndex === rowIndex ? (
                    <>
                      <button onClick={handleSave} className="text-green-500 hover:text-green-700">
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button onClick={handleCancel} className="text-yellow-500 hover:text-yellow-700">
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(rowIndex)} className="text-blue-500 hover:text-blue-700">
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button onClick={() => onDelete(rowIndex)} className="text-red-500 hover:text-red-700">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CLOsTable;