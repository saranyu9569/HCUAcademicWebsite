import React from 'react'
import { useCourseContext } from '../../../../Data/CourseContext'

const PLO: React.FC = () => {
  const { courseDetails } = useCourseContext()

  const plos = [
    {
      plo: "PLO 1. มีความรู้และทักษะในการออกแบบขั้นตอนวิธี รวมถึงเลือกใช้เครื่องมือในการแก้ไขปัญหาทางปัญญาประดิษฐ์",
      subplos: [
        {
          text: "SubPLO-1.1. มีความรู้ และทักษะในการออกแบบขั้นตอนวิธี แบบจำลองที่เกี่ยวข้อง เพื่อใช้ในการแก้ไขปัญหาทางด้านปัญญาประดิษฐ์ (Knowledge)",
          cloMapping: [1, 1, 1, 0, 0]
        },
        {
          text: "SubPLO-1.2. เลือกใช้เครื่องมือในการแก้ไขปัญหาทางปัญญาประดิษฐ์ได้อย่างเหมาะสม (Skill)",
          cloMapping: [0, 0, 0, 1, 1]
        }
      ]
    },
    {
      plo: "PLO 2. มีทักษะกระบวนการคิดที่เป็นระบบ สามารถประยุกต์ใช้ความรู้ทางปัญญาประดิษฐ์ร่วมกับศาสตร์อื่น และพัฒนาระบบงานที่ส่งเสริมคุณภาพชีวิตได้",
      subplos: [
        {
          text: "SubPLO-2.1. มีทักษะกระบวนการคิดอย่างเป็นระบบ(Skill)",
          cloMapping: [0, 1, 1, 1, 0]
        },
        {
          text: "SubPLO-2.2. ประยุกต์ใช้ความรู้ทางปัญญาประดิษฐ์ร่วมกับความรู้ในศาสตร์อื่นที่เกี่ยวข้องเพื่อสร้างสรรค์ผลงานที่แก้ปัญหาการทำงานได้ (Knowledge, Skill)",
          cloMapping: [0, 0, 0, 1, 1]
        }
      ]
    }
  ]

  const cloCount = courseDetails?.CLOs?.length || 1 

  return (
    <div className="w-full max-w-screen mx-auto text-black pt-10 overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">4. ความสอดคล้องของผลลัพธ์การเรียนรู้ที่คาดหวังของหลักสูตร (Program Learning Outcome : PLOs) <br/>&emsp;&nbsp;และผลลัพธ์การเรียนรู้ที่คาดหวังระดับรายวิชา (Course-level Learning Outcomes: CLOs)</h2>
      <table className="w-full border-collapse border border-gray-800">
        <thead>
          <tr className="bg-pink-200">
            <th className="border border-gray-800 p-2" rowSpan={2}>PLOs/CLOs</th>
            {Array.from({ length: cloCount }, (_, i) => (
              <th key={i} className="border border-gray-800 p-2">CLO<br />{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plos.map((plo, ploIndex) => (
            <React.Fragment key={ploIndex}>
              <tr className="bg-pink-200">
                <td className="border border-gray-800 p-2" colSpan={cloCount + 1}>{plo.plo}</td>
              </tr>
              {plo.subplos.map((subplo, subploIndex) => (
                <tr key={`${ploIndex}-${subploIndex}`}>
                  <td className="border border-gray-800 p-2">{subplo.text}</td>
                  {subplo.cloMapping.map((mapped, cloIndex) => (
                    <td key={cloIndex} className="border border-gray-800 p-2 text-center">
                      {mapped ? '✓' : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PLO