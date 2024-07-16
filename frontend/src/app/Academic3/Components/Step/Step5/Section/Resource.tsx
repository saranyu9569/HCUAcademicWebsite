// ResourcesComponent.tsx

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { useCourseContext } from '../../../../Data/CourseContext';
import { ResourceItem, CourseResources } from '../../../../Data/types';

const ResourcesComponent: React.FC = () => {
  const { courseDetails, setCourseDetails } = useCourseContext();
  const [inputValues, setInputValues] = useState<Record<keyof CourseResources, string>>({
    mainTextbooks: '',
    additionalResources: '',
    recommendedResources: '',
  });
  const [editingItem, setEditingItem] = useState<{ id: string; type: keyof CourseResources; text: string } | null>(null);

  if (!courseDetails.resources) {
    setCourseDetails(prev => ({
      ...prev,
      resources: {
        mainTextbooks: [],
        additionalResources: [],
        recommendedResources: [],
      },
    }));
  }

  const addResource = (type: keyof CourseResources) => {
    if (inputValues[type].trim()) {
      const newItem: ResourceItem = { id: Date.now().toString(), text: inputValues[type].trim() };
      setCourseDetails(prev => ({
        ...prev,
        resources: {
          ...prev.resources,
          [type]: [...(prev.resources?.[type] || []), newItem],
        },
      }));
      setInputValues(prev => ({ ...prev, [type]: '' }));
    }
  };

  const startEditing = (type: keyof CourseResources, id: string, text: string) => {
    setEditingItem({ id, type, text });
  };

  const saveEdit = () => {
    if (editingItem) {
      setCourseDetails(prev => ({
        ...prev,
        resources: {
          ...prev.resources,
          [editingItem.type]: prev.resources?.[editingItem.type]?.map(item =>
            item.id === editingItem.id ? { ...item, text: editingItem.text } : item
          ) || [],
        },
      }));
      setEditingItem(null);
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  const deleteResource = (type: keyof CourseResources, id: string) => {
    setCourseDetails(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        [type]: prev.resources?.[type]?.filter(item => item.id !== id) || [],
      },
    }));
  };

  const handleInputChange = (type: keyof CourseResources, value: string) => {
    setInputValues(prev => ({ ...prev, [type]: value }));
  };

  const handleEditInputChange = (value: string) => {
    if (editingItem) {
      setEditingItem(prev => prev ? { ...prev, text: value } : null);
    }
  };

  const renderTable = (type: keyof CourseResources, title: string) => (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Resource</th>
            <th className="border p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {courseDetails.resources?.[type]?.map(item => (
            <tr key={item.id}>
              <td className="border p-2">
                {editingItem?.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.text}
                    onChange={(e) => handleEditInputChange(e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  item.text
                )}
              </td>
              <td className="border p-2">
                {editingItem?.id === item.id ? (
                  <>
                    <button onClick={saveEdit} className="mr-2 text-green-500">
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button onClick={cancelEdit} className="text-gray-500">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(type, item.id, item.text)} className="mr-2 text-blue-500">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => deleteResource(type, item.id)} className="text-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mb-2 pt-2">
        <input
          type="text"
          value={inputValues[type]}
          onChange={(e) => handleInputChange(type, e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Enter resource"
        />
        <button
          onClick={() => addResource(type)}
          className="ml-2 px-4 py-2 bg-orangered text-white rounded"
        >
          Add
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 text-lg">
      <h2 className="text-lg font-bold mb-4 text-center">หมวดที่ 5 ทรัพยากรประกอบการเรียนการสอน</h2>
      {renderTable('mainTextbooks', '1. ตำราและเอกสารหลักที่ใช้ในการเรียนการสอน')}
      {renderTable('additionalResources', '2. เอกสารอ่านประกอบ/สื่ออิเล็กทรอนิกส์/แหล่งอ้างอิงอื่นๆ ที่นักศึกษาควรอ่านเพิ่มเติม')}
      {renderTable('recommendedResources', '3. เอกสารและข้อมูลแนะนำ')}
    </div>
  );
};

export default ResourcesComponent;