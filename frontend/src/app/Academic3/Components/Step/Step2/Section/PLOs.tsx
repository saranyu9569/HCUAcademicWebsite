import React from 'react'
import { useCourseContext } from '../../../../Data/CourseContext'

interface SubPLO {
  text: string;
}

interface PLO {
  plo: string;
  subplos: SubPLO[];
}

const PLO: React.FC = () => {
  const { courseDetails, setCourseDetails } = useCourseContext()
  const ploCloMappings = courseDetails.ploCloMappings || {};
  
  const plos: PLO[] = [
    {
      plo: "PLO 1. มีความรู้และทักษะในการออกแบบขั้นตอนวิธี รวมถึงเลือกใช้เครื่องมือในการแก้ไขปัญหาทางปัญญาประดิษฐ์",
      subplos: [
        {
          text: "SubPLO-1.1. มีความรู้ และทักษะในการออกแบบขั้นตอนวิธี แบบจำลองที่เกี่ยวข้อง เพื่อใช้ในการแก้ไขปัญหาทางด้านปัญญาประดิษฐ์ (Knowledge)",
        },
        {
          text: "SubPLO-1.2. เลือกใช้เครื่องมือในการแก้ไขปัญหาทางปัญญาประดิษฐ์ได้อย่างเหมาะสม (Skill)",
        }
      ]
    },
    {
      plo: "PLO 2. มีทักษะกระบวนการคิดที่เป็นระบบ สามารถประยุกต์ใช้ความรู้ทางปัญญาประดิษฐ์ร่วมกับศาสตร์อื่น และพัฒนาระบบงานที่ส่งเสริมคุณภาพชีวิตได้",
      subplos: [
        {
          text: "SubPLO-2.1. มีทักษะกระบวนการคิดอย่างเป็นระบบ(Skill)",
        },
        {
          text: "SubPLO-2.2. ประยุกต์ใช้ความรู้ทางปัญญาประดิษฐ์ร่วมกับความรู้ในศาสตร์อื่นที่เกี่ยวข้องเพื่อสร้างสรรค์ผลงานที่แก้ปัญหาการทำงานได้ (Knowledge, Skill)",
        },
        {
          text: "SubPLO-2.3. มีทักษะในการพัฒนาหรือประยุกต์ระบบงานที่ใช้ประโยชน์ด้านส่งเสริมคุณภาพชีวิต (Skills, Character)",
        },
      ]
    },
    {
      plo: "PLO 3. มีความรับผิดชอบต่อตนเองและสังคม ตามหลักคุณธรรม 6 ประการและเศรษฐกิจพอเพียง และมีการพัฒนาความรู้อย่างต่อเนื่องตลอดชีวิต",
      subplos: [
        {
          text: "SubPLO-3.1. แสดงออกซึ่งพฤติกรรมที่มีคุณธรรม 6 ประการ ได้แก่ ขยัน อดทน ประหยัด เมตตา ซื่อสัตย์ กตัญญู และดำเนินชีวิตตามแนวปรัชญาของเศรษฐกิจพอเพียง (Ethics)",
        },
        {
          text: "SubPLO-3.2. มีความรับผิดชอบต่อตนเอง องค์กร และสังคมต่อ ผลกระทบ จากการพัฒนาและประยุกต์ใช้เครื่องมือที่เกี่ยวข้องกับ ปัญญาประดิษฐ์ (Character)",
        },
        {
          text: "SubPLO-3.3. พัฒนาความรู้ ความชำนาญทางคอมพิวเตอร์และปัญญาประดิษฐ์ได้ด้วยตนเองอย่างต่อเนื่อง (Knowledge, Skills, Character)",
        }
      ]
    },
    {
      plo: "PLO 4. สามารถสื่อสาร และทำงานร่วมกับผู้อื่นได้",
      subplos: [
        {
          text: "SubPLO-4.1. สามารถสื่อสารด้วยภาษาไทย/ภาษาต่างประเทศได้อย่างมีประสิทธิภาพ (Character)",
        },
        {
          text: "SubPLO-4.2. ทำงานร่วมกับผู้อื่นได้อย่างมีประสิทธิภาพทั้งในบทบาทความเป็นผู้นำ และผู้ตาม (Character)",
        }
      ]
    }
  ]

  const cloCount = courseDetails?.CLOs?.length || 5

  const handleCheckboxChange = (ploIndex: number, subploIndex: number, cloIndex: number) => {
    const key = `${ploIndex}-${subploIndex}-${cloIndex}`;
    setCourseDetails(prevDetails => ({
      ...prevDetails,
      ploCloMappings: {
        ...ploCloMappings,
        [key]: !ploCloMappings[key]
      }
    }));
  }

  const renderTable = (isCheckbox: boolean) => (
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
                {Array.from({ length: cloCount }, (_, cloIndex) => (
                  <td key={cloIndex} className="border border-gray-800 p-2 text-center">
                    {isCheckbox ? (
                      <input 
                        type="checkbox" 
                        checked={ploCloMappings[`${ploIndex}-${subploIndex}-${cloIndex}`] || false}
                        onChange={() => handleCheckboxChange(ploIndex, subploIndex, cloIndex)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    ) : (
                      ploCloMappings[`${ploIndex}-${subploIndex}-${cloIndex}`] ? '✓' : ''
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )

  return (
    <div className="w-full max-w-screen mx-auto text-black pt-10 overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">4. ความสอดคล้องของผลลัพธ์การเรียนรู้ที่คาดหวังของหลักสูตร (Program Learning Outcome : PLOs) <br/>&emsp;&nbsp;และผลลัพธ์การเรียนรู้ที่คาดหวังระดับรายวิชา (Course-level Learning Outcomes: CLOs)</h2>
      
      {renderTable(true)}

      <h3 className="text-lg font-bold mt-8 mb-4">Selected Mappings:</h3>
      {renderTable(false)}
    </div>
  )
}

export default PLO