import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FormData, FormDataKey, categoryMapping, courseNameMapping, courseGroupMapping } from '../Data/types';

interface DataTableProps {
  data: FormData[];
  onSave: (editedData: FormData, index: number) => void;
  onDelete: (index: number) => void;
  title: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, onSave, onDelete, title }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<FormData | null>(null);

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

  const handleInputChange = (key: FormDataKey, value: string) => {
    if (editedData) {
      let newValue = value;
      if (key === 'courseCategory') {
        newValue = Object.entries(categoryMapping).find(([k, v]) => v === value)?.[0] || value;
      } else if (key === 'courseName') {
        newValue = Object.entries(courseNameMapping).find(([k, v]) => v === value)?.[0] || value;
      } else if (key === 'courseGroup') {
        newValue = Object.entries(courseGroupMapping).find(([k, v]) => v === value)?.[0] || value;
      }
      setEditedData(prev => ({ ...prev!, [key]: newValue }));
    }
  };

  const isDescriptionColumn = (key: string) => ['DescriptionThai', 'DescriptionEng'].includes(key);

  if (data.length === 0) {
    return <div className="mt-10">ยังไม่มีข้อมูลใน {title}</div>;
  }

  return (
    <div className="mt-10 overflow-x-auto max-w-full">
      <h2 className="text-2xl mb-4">{title}</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-700">
            {(Object.keys(data[0]) as FormDataKey[]).map((key) => (
              <th key={key} className={`border border-gray-300 p-2 ${isDescriptionColumn(key) ? 'w-1/4' : 'whitespace-nowrap'}`}>
                {key}
              </th>
            ))}
            <th className="border border-gray-300 p-2 whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-gray-800">
              {(Object.keys(row) as FormDataKey[]).map((key) => (
                <td key={key} className={`border border-gray-300 p-2 ${isDescriptionColumn(key) ? 'max-w-[300px] min-w-[200px]' : ''}`}>
                  {editingIndex === rowIndex ? (
                    <input
                      type="text"
                      value={editedData![key]}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-full bg-gray-700 text-white p-1"
                    />
                  ) : (
                    <div className={isDescriptionColumn(key) ? 'truncate' : ''} title={isDescriptionColumn(key) ? row[key] : undefined}>
                      {key === 'courseCategory' ? categoryMapping[row[key] as keyof typeof categoryMapping] || row[key] :
                      key === 'courseName' ? courseNameMapping[row[key] as keyof typeof courseNameMapping] || row[key] :
                      key === 'courseGroup' ? courseGroupMapping[row[key] as keyof typeof courseGroupMapping] || row[key] :
                      row[key]}
                    </div>
                  )}
                </td>
              ))}
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

export default DataTable;