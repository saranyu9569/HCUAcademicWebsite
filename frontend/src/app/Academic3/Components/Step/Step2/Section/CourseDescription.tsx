import React from 'react'
import { useCourseContext } from '../../../../Data/CourseContext'

const CourseDescription: React.FC = () => {
  const { courseDetails } = useCourseContext()

  return (
    <div className="w-full max-w-screen mx-auto text-black pt-10">
      <h2 className="text-xl font-bold mb-4">2. คำอธิบายรายวิชา</h2>
      
      <div className="p-4 pb-2 rounded">
        <p className="text-sm leading-relaxed indent-8">
          {courseDetails?.DescriptionThai || 'ไม่มีคำอธิบายภาษาไทย'}
        </p>
      </div>

      <div className="mb-4 p-4 rounded">
        <p className="text-sm leading-relaxed indent-8">
          {courseDetails?.DescriptionEng || 'No English description available'}
        </p>
      </div>
    </div>
  )
}

export default CourseDescription