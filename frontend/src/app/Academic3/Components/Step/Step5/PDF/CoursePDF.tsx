import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  CourseDetails,
  CLODetail,
  ScheduleItem,
  ResourceItem,
} from "../../../../Data/types";

Font.register({
  family: "Thai Sarabun New",
  src: "/fonts/THSarabunNew.ttf",
});

interface PLO {
  plo: string;
  subplos: { text: string }[];
}

const plos: PLO[] = [
  {
    plo: "PLO 1. มีความรู้และทักษะในการออกแบบขั้นตอนวิธี รวมถึงเลือกใช้เครื่องมือในการแก้ไขปัญหาทางปัญญาประดิษฐ์",
    subplos: [
      {
        text: "SubPLO-1.1. มีความรู้ และทักษะในการออกแบบขั้นตอนวิธี แบบจำลองที่เกี่ยวข้อง เพื่อใช้ในการแก้ไขปัญหาทางด้านปัญญาประดิษฐ์ (Knowledge)",
      },
      {
        text: "SubPLO-1.2. เลือกใช้เครื่องมือในการแก้ไขปัญหาทางปัญญาประดิษฐ์ได้อย่างเหมาะสม (Skill)",
      },
    ],
  },
  {
    plo: "PLO 2. มีทักษะกระบวนการคิดที่เป็นระบบ สามารถประยุกต์ใช้ความรู้ทางปัญญาประดิษฐ์ร่วมกับศาสตร์อื่น และพัฒนาระบบงานที่ส่งเสริมคุณภาพชีวิตได้",
    subplos: [
      {
        text: "SubPLO-2.1. มีทักษะกระบวนการคิดอย่างเป็นระบบ(Skill)",
      },
      {
        text: "SubPLO-2.2. ประยุกต์ใช้ความรู้ทางปัญญาประดิษฐ์ร่วมกับความรู้ในศาสตร์อื่นที่เกี่ยวข้องเพื่อสร้างสรรค์ผลงาน ที่แก้ปัญหาการทำงานได้ (Knowledge, Skill)",
      },
      {
        text: "SubPLO-2.3. มีทักษะในการพัฒนาหรือประยุกต์ระบบงานที่ใช้ประโยชน์ด้านส่งเสริมคุณภาพชีวิต (Skills, Character)",
      },
    ],
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
      },
    ],
  },
  {
    plo: "PLO 4. สามารถสื่อสาร และทำงานร่วมกับผู้อื่นได้",
    subplos: [
      {
        text: "SubPLO-4.1. สามารถสื่อสารด้วยภาษาไทย/ภาษาต่างประเทศได้อย่างมีประสิทธิภาพ (Character)",
      },
      {
        text: "SubPLO-4.2. ทำงานร่วมกับผู้อื่นได้อย่างมีประสิทธิภาพทั้งในบทบาทความเป็นผู้นำ และผู้ตาม (Character)",
      },
    ],
  },
];

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Thai Sarabun New",
  },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  title: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  titleHeader: { fontSize: 14, fontWeight: "bold" },
  subtitle: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  text: { marginBottom: 5 },
  list: { marginLeft: 20 },
  bulletContainer: {
    flexDirection: "row",
    marginBottom: 5,
    paddingLeft: 10,
  },
  bullet: {
    width: 10,
    fontSize: 12,
  },
  bulletText: {
    flex: 1,
    paddingLeft: 5,
    fontSize: 12,
  },
});

const tableStyles = StyleSheet.create({
  table: {
    borderWidth: 0.5,
    borderColor: "#000000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.25,
    borderBottomColor: "#000000",
  },
  tableCol: {
    borderRightWidth: 0.5,
    borderRightColor: "#000000",
  },
  tableHeader: {
    backgroundColor: "#FFC0CBB0",
  },
  tableCell: {
    margin: 5,
    fontSize: 8,
    textAlign: "left",
  },
  ploHeader: {
    backgroundColor: "#FFC0CB",
  },
  subploRow: {
    backgroundColor: "#FFFFFF",
  },
  checkmark: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
});

const cloTableStyles = StyleSheet.create({
  table: {
    borderWidth: 0.5,
    borderColor: "#000000",
    marginTop: 10,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000000",
    flexWrap: "nowrap",
  },
  headerRow: {
    backgroundColor: "#FFC0CBB0",
  },
  col: {
    borderRightWidth: 0.5,
    borderRightColor: "#000000",
    flex: 1,
    flexShrink: 1,
  },
  cell: {
    margin: 3,
    fontSize: 8,
    textAlign: "left",
    flexWrap: "wrap",
    flexShrink: 1,
  },
  headerCell: {
    margin: 3,
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
    flexWrap: "wrap",
  },
  bulletPoint: {
    marginLeft: 5,
  },
});

const convertDateToThai = (englishDate: string): string => {
  const dayMap: { [key: string]: string } = {
    Monday: "วันจันทร์",
    Tuesday: "วันอังคาร",
    Wednesday: "วันพุธ",
    Thursday: "วันพฤหัสบดี",
    Friday: "วันศุกร์",
    Saturday: "วันเสาร์",
    Sunday: "วันอาทิตย์",
  };

  return dayMap[englishDate] || englishDate;
};

const date = new Date();

const formatDateWithBuddhistEra = (date: Date): string => {
  const buddhistYear = date.getFullYear() + 543;

  const dateWithoutYear = date.toLocaleDateString("th-TH", {
    month: "long",
    day: "numeric",
  });

  return `${dateWithoutYear} พ.ศ. ${buddhistYear}`;
};

const CurrentDate = formatDateWithBuddhistEra(date);

interface CoursePDFProps {
  courseDetails: CourseDetails;
}

const renderPLOCLOTable = (courseDetails: CourseDetails) => (
  <View style={tableStyles.table}>
    <View style={[tableStyles.tableRow, tableStyles.tableHeader]}>
      <View style={[tableStyles.tableCol, { flex: 4 }]}>
        <Text
          style={[
            tableStyles.tableCell,
            { textAlign: "center", fontWeight: "bold" },
          ]}
        >
          PLOs/CLOs
        </Text>
      </View>
      {Array.from({ length: 5 }, (_, i) => (
        <View key={i} style={[tableStyles.tableCol, { flex: 1 }]}>
          <Text
            style={[
              tableStyles.tableCell,
              { textAlign: "center", fontWeight: "bold" },
            ]}
          >
            CLO {i + 1}
          </Text>
        </View>
      ))}
    </View>
    {plos.map((plo, ploIndex) => (
      <React.Fragment key={ploIndex}>
        <View style={[tableStyles.tableRow, tableStyles.ploHeader]}>
          <View
            style={[tableStyles.tableCol, { flex: 9, borderRightWidth: 0 }]}
          >
            <Text style={tableStyles.tableCell}>{plo.plo}</Text>
          </View>
        </View>
        {plo.subplos.map((subplo, subploIndex) => (
          <View
            key={`${ploIndex}-${subploIndex}`}
            style={[tableStyles.tableRow, tableStyles.subploRow]}
          >
            <View style={[tableStyles.tableCol, { flex: 4 }]}>
              <Text style={tableStyles.tableCell}>{subplo.text}</Text>
            </View>
            {Array.from({ length: 5 }, (_, cloIndex) => (
              <View key={cloIndex} style={[tableStyles.tableCol, { flex: 1 }]}>
                <Text style={tableStyles.checkmark}>
                  {courseDetails.ploCloMappings[
                    `${ploIndex}-${subploIndex}-${cloIndex}`
                  ] || false
                    ? "X"
                    : ""}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </React.Fragment>
    ))}
  </View>
);

const preprocessDescription = (description: string) => {
  return description.replace(/\s+/g, " ").trim();
};

const renderCreditHoursTable = (lectureHours: number) => {
  const getCreditsLecHours = (lecHours: number): number => {
    return lecHours === 3 ? 45 : 30;
  };

  const getCreditsLabHours = (lecHours: number): number => {
    return lecHours === 3 ? 0 : 30;
  };

  return (
    <View style={tableStyles.table}>
      <View style={[tableStyles.tableRow]}>
        <View style={[tableStyles.tableCol, { flex: 1 }]}>
          <Text
            style={[
              tableStyles.tableCell,
              { textAlign: "center", fontWeight: "bold" },
            ]}
          >
            บรรยาย
          </Text>
        </View>
        <View style={[tableStyles.tableCol, { flex: 1 }]}>
          <Text
            style={[
              tableStyles.tableCell,
              { textAlign: "center", fontWeight: "bold" },
            ]}
          >
            การฝึกปฏิบัติการ
          </Text>
        </View>
      </View>
      <View style={tableStyles.tableRow}>
        <View style={[tableStyles.tableCol, { flex: 1 }]}>
          <Text style={[tableStyles.tableCell, { textAlign: "center" }]}>
            บรรยาย {getCreditsLecHours(lectureHours)} ชั่วโมง ต่อภาคการศึกษา
          </Text>
        </View>
        <View style={[tableStyles.tableCol, { flex: 1 }]}>
          <Text style={[tableStyles.tableCell, { textAlign: "center" }]}>
            ปฏิบัติ {getCreditsLabHours(lectureHours)} ชั่วโมง ต่อภาคการศึกษา
          </Text>
        </View>
      </View>
    </View>
  );
};

const renderCLOTable = (courseDetails: CourseDetails) => (
  <View style={cloTableStyles.table}>
    <View style={[cloTableStyles.row, cloTableStyles.headerRow]}>
      <View style={[cloTableStyles.col, { flex: 2.5 }]}>
        <Text style={cloTableStyles.headerCell}>
          ผลลัพธ์การเรียนรู้ที่คาดหวังของรายวิชา (CLOs)
        </Text>
      </View>
      <View style={[cloTableStyles.col, { flex: 2.5 }]}>
        <Text style={cloTableStyles.headerCell}>วิธีการจัดการเรียนรู้</Text>
      </View>
      <View style={[cloTableStyles.col, { flex: 2 }]}>
        <Text style={cloTableStyles.headerCell}>
          วิธีการวัดประเมินผลการเรียนรู้
        </Text>
      </View>
    </View>
    {courseDetails.cloDetails.map((cloDetail, index) => (
      <View key={index} style={cloTableStyles.row}>
        <View style={[cloTableStyles.col, { flex: 2.5 }]}>
          <Text style={cloTableStyles.cell}>
            {`CLO ${index + 1}. ${preprocessDescription(
              cloDetail.description
            )}`}
          </Text>
        </View>
        <View style={[cloTableStyles.col, { flex: 2.5 }]}>
          <Text style={cloTableStyles.cell}>{cloDetail.teachingMethods}</Text>
        </View>
        <View style={[cloTableStyles.col, { flex: 2 }]}>
          {Object.entries(cloDetail.evaluationMethods)
            .filter(
              ([method, value]) =>
                value === true || (method === "อื่นๆ" && value !== "")
            )
            .map(([method, value], methodIndex) => (
              <Text key={methodIndex} style={cloTableStyles.cell}>
                • {method === "อื่นๆ" ? value : method}
              </Text>
            ))}
        </View>
      </View>
    ))}
  </View>
);

const CoursePDF: React.FC<CoursePDFProps> = ({ courseDetails }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={[styles.titleHeader, { textAlign: "center" }]}>
          รายละเอียดของรายวิชา
        </Text>
        <Text style={[styles.titleHeader, { textAlign: "center" }]}>
          คณะวิทยาศาสตร์และเทคโนโลยี สาขา วิชาปัญญาประดิษฐ์
        </Text>
        <Text style={[styles.titleHeader, { textAlign: "center" }]}>
          ภาคการศึกษา {courseDetails.Semester} ปีการศึกษา 2567
        </Text>
        <Text style={[styles.titleHeader, { textAlign: "center" }]}>
          มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ
        </Text>

        <Text style={[styles.titleHeader, { textAlign: "center" }]}>
          หมวดที่ 1 ข้อมูลทั่วไป
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          1. รหัส-ชื่อวิชาและหลักสูตร
        </Text>
        <Text style={[styles.text, { textAlign: "left" }]}>
          {" "}
          {courseDetails.CourseID} {courseDetails.CourseNameThai}{" "}
          {courseDetails.CourseNameEng}
        </Text>
        <Text style={styles.text}>({courseDetails.TotalCredits} หน่วยกิต)</Text>

        {/* จำนวนชั่วโมง */}
        <Text style={[styles.subtitle, { marginTop: 2 }]}>
          จำนวนชั่วโมง/ภาคการศึกษา
        </Text>
        {renderCreditHoursTable(Number(courseDetails.LectureHours) || 0)}

        <Text style={[styles.text, { textAlign: "left", marginTop: 4 }]}>
          2. หลักสูตร และประเภทรายวิชา หลักสูตรวิทยาศาสตร์บัณฑิต (ปัญญาประดิษฐ์)
          ประเภทราย{courseDetails.CourseName}
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          3. ระดับการศึกษา/ ชั้นปีที่เรียน ภาคการศึกษาที่{" "}
          {courseDetails.Semester}/ชั้นปีที่ {courseDetails.CourseYear}
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          4. รายวิชาที่ต้องเรียนมาก่อน (Pre-requisite){" "}
          {courseDetails.Prerequisite}
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          5. รายวิชาที่ต้องเรียนพร้อมกัน (Co-requisite){" "}
          {courseDetails.COrequisite}
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          6. ชื่ออาจารย์ผู้รับผิดชอบรายวิชา {courseDetails.TeacherName}
        </Text>
        <Text style={[styles.text, { textAlign: "left" }]}>
          {" "}
          ชื่ออาจารย์ผู้รับผิดชอบร่วม {courseDetails.COTeacherName}
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          7. สถานที่เรียน {courseDetails.BuildingRoom}
        </Text>
        <Text style={[styles.text, { textAlign: "left" }]}>ภาคบรรยาย</Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          กลุ่ม {courseDetails.SectionLec}{" "}
          {courseDetails.DateLec
            ? convertDateToThai(courseDetails.DateLec)
            : "Date not provided"}{" "}
          เวลา{courseDetails.StartTimeLec} - {courseDetails.EndTimeLec} น. ห้อง{" "}
          {courseDetails.ClassRoomLec}
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>ภาคปฏิบัติ</Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          กลุ่ม {courseDetails.SectionLab}{" "}
          {courseDetails.DateLab
            ? convertDateToThai(courseDetails.DateLab)
            : "Date not provided"}{" "}
          เวลา{courseDetails.StartTimeLab} - {courseDetails.EndTimeLab} น. ห้อง{" "}
          {courseDetails.ClassRoomLab}
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          วันที่จัดทำรายละเอียดของรายวิชา หรือปรับปรุงล่าสุด {CurrentDate}
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          9.
          จำนวนชั่วโมงต่อสัปดาห์ที่อาจารย์ให้คำปรึกษาและแนะนำทางวิชาการเป็นรายบุคคล
        </Text>
        <Text style={[styles.text, { textAlign: "left" }]}>
          {courseDetails.ConsultTime}
        </Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text
          style={[
            styles.titleHeader,
            { textAlign: "center", marginBottom: "10px" },
          ]}
        >
          หมวดที่ 2 วัตถุประสงค์และผลลัพธ์การเรียนรู้
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          1. วัตถุประสงค์ของรายวิชา
        </Text>
        <Text style={[styles.text, { textAlign: "left" }]}>
          {courseDetails.CourseObjective &&
          courseDetails.CourseObjective.length > 0 ? (
            courseDetails.CourseObjective.map((objective, index) => (
              <Text key={index} style={styles.text}>
                • {objective} {"\n"}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No course objectives available</Text>
          )}
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          2. คำอธิบายรายวิชา
        </Text>
        <Text style={[styles.text, { textAlign: "left" }]}>
          {courseDetails.DescriptionThai}
          {"\n"}
          {courseDetails.DescriptionEng}
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          3. ผลลัพธ์การเรียนรู้ที่คาดหวังของรายวิชา (Course-level Learning
          OutComes: CLOs) นักศึกษาสามารถ{"\n"}(ระบุผลลัพธ์การเรียนรู้ตาม Bloom
          &apos;s Taxonomy)
        </Text>
        <Text style={[styles.text, { textAlign: "left" }]}>
          เมื่อสิ้นสุดการเรียนการสอนแล้ว นักศึกษาที่สำเร็จการศึกษาในรายวิชานี้
          สามารถ
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          {courseDetails.CLOs && courseDetails.CLOs.length > 0 ? (
            courseDetails.CLOs.map((clo, index) => (
              <Text key={index} style={styles.text}>
                CLO {index + 1}. {clo} {"\n"}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>No CLOs available</Text>
          )}
        </Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={[styles.text, { textAlign: "left" }]}>
          4. ความสอดคล้องของผลลัพธ์การเรียนรู้ที่คาดหวังของหลักสูตร (Program
          Learning Outcome : PLOs){"\n"}
          และผลลัพธ์การเรียนรู้ที่คาดหวังระดับรายวิชา (Course-level Learning
          Outcomes: CLOs)
        </Text>
        {renderPLOCLOTable(courseDetails)}
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text
          style={[
            styles.titleHeader,
            { textAlign: "center", marginBottom: "10px" },
          ]}
        >
          หมวดที่ 3 การพัฒนาผลลัพธ์การเรียนรู้ที่คาดหวังของรายวิชา
        </Text>
        {renderCLOTable(courseDetails)}
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text
          style={[
            styles.titleHeader,
            { textAlign: "center", marginBottom: "10px" },
          ]}
        >
          หมวดที่ 5 ทรัพยากรประกอบการเรียนการสอน
        </Text>
        {courseDetails.resources ? (
          <>
            <Text style={styles.text}>
              1. ตำราและเอกสารหลักที่ใช้ในการเรียนการสอน
            </Text>
            {courseDetails.resources.mainTextbooks &&
            courseDetails.resources.mainTextbooks.length > 0 ? (
              courseDetails.resources.mainTextbooks.map(
                (item: ResourceItem, index: number) => (
                  <Text key={item.id} style={styles.text}>
                    {index + 1}. {item.text}
                  </Text>
                )
              )
            ) : (
              <Text style={styles.text}>ไม่มีตำราและเอกสารการเรียนการสอน</Text>
            )}

            <Text style={styles.text}>
              2. เอกสารอ่านประกอบ/สื่ออิเล็กทรอนิกส์/แหล่งอ้างอิงอื่นๆ
              ที่นักศึกษาควรอ่านเพิ่มเติม
            </Text>
            {courseDetails.resources.additionalResources &&
            courseDetails.resources.additionalResources.length > 0 ? (
              courseDetails.resources.additionalResources.map(
                (item: ResourceItem, index: number) => (
                  <Text key={item.id} style={styles.text}>
                    {index + 1}. {item.text}
                  </Text>
                )
              )
            ) : (
              <Text style={styles.text}>
                ไม่มีเอกสารการเรียนการสอนเพิ่มเติมที่แนะนำ
              </Text>
            )}
            <Text style={styles.text}>3. เอกสารและข้อมูลแนะนำ</Text>
            {courseDetails.resources.recommendedResources &&
            courseDetails.resources.recommendedResources.length > 0 ? (
              courseDetails.resources.recommendedResources.map(
                (item: ResourceItem, index: number) => (
                  <Text key={item.id} style={styles.text}>
                    {index + 1}. {item.text}
                  </Text>
                )
              )
            ) : (
              <Text style={styles.text}>
                No recommended resources available
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.text}>No resources available</Text>
        )}
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text
          style={[
            styles.titleHeader,
            { textAlign: "center", marginBottom: "10px" },
          ]}
        >
          หมวดที่ 6 การประเมินรายวิชาและกระบวนการปรับปรุง
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          1. กลยุทธ์การประเมินประสิทธิผลของรายวิชาโดยนักศึกษา
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          การประเมินประสิทธิผลในรายวิชานี้ที่จัดทำโดยนักศึกษาได้จัดกิจกรรมในการนำแนวคิดและ
          ความเห็นจาก{"\n"}นักศึกษาได้ดังนี้
        </Text>

        <Text style={[styles.text, {textAlign: "left", marginBottom:"10px"}]}>
          - การสนทนากลุ่มระหว่างผู้สอนและผู้เรียน{"\n"}
          - การสังเกตการณ์จากพฤติกรรมของผู้เรียน{"\n"}
          - แบบประเมินผู้สอนด้วยระบบคอมพิวเตอร์ของมหาวิทยาลัย และ/หรือ สาขาวิชาฯ เป็นผู้สำรวจ{"\n"}
          - แบบประเมินรายวิชาด้วยระบบคอมพิวเตอร์ของมหาวิทยาลัย และ/หรือ สาขาวิชาฯ เป็นผู้สำรวจ{"\n"}
        </Text>
        
        <Text style={[styles.text, { textAlign: "left" }]}>
          2. กลยุทธ์การประเมินการสอน
        </Text>
        <Text style={[styles.text, { textAlign: "left" }]}>
          ในการเก็บข้อมูลเพื่อประเมินการสอนได้มีกลยุทธ์ดังนี้
        </Text>
        <Text style={[styles.text, {textAlign: "left", marginBottom:"10px"}]}>
          - การวัดผลสัมฤทธิ์ทางการศึกษา{"\n"}
          - การสัมภาษณ์แนวคิดและทัศนคติของนักศึกษา{"\n"}
          - การแลกเปลี่ยนความคิดเห็นกับอาจารย์ผู้สอนร่วม{"\n"}
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          3. วิธีการปรับปรุงการสอน
        </Text>
        <Text style={[styles.text, {textAlign: "left", marginBottom:"10px"}]}>
          - การประชุมคณะกรรมการบริหารหลักสูตรฯ{"\n"}
          - การประชุมปรึกษาหารือเกี่ยวกับการเรียนการสอน{"\n"}
          - การวิจัยในชั้นเรียน{"\n"}
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          4. การทวนสอบผลลัพธ์การเรียนรู้ของรายวิชาของนักศึกษา
        </Text>
        <Text style={[styles.text, {textAlign: "left", marginBottom:"10px"}]}>
         ในระหว่างกระบวนการสอนรายวิชา มีการทวนสอบผลสัมฤทธิ์ในรายหัวข้อ ตามที่คาดหวังจากการเรียนรู้ใน{"\n"}
         รายวิชา ได้จากการสอบถามนักศึกษา หรือการสุ่มตรวจผลงานของนักศึกษา รวมถึงพิจารณาจากผลการทดสอบย่อย{"\n"}
         และหลังการออกผลการรียนรายวิชา มีการทวนสอบผลสัมฤทธิ์โดยรวมในวิชาได้ดังนี้
        </Text>
        <Text style={[styles.text, {textAlign: "left", marginBottom:"10px"}]}>
        -มีการตั้งคณะกรรมการในสาขาวิชาเป็นคณะกรรมการบริหารหลักสูตร เพื่อตรวจสอบผลการประเมินการ{"\n"}
        เรียนรู้ของนักศึกษา โดยตรวจสอบข้อสอบ วิธีการให้คะแนนสอบ และพิจารณาผลสอบ รวมถึงการทำแบบรายงานผล{"\n"}
        การทวนสอบผลสัมฤทธิ์ทางการเรียนตามมาตรฐานผลการเรียนรู้ โดยมีคณะกรรมการวิชาการประจำคณะฯ เป็นผู้{"\n"}พิจารณา
        </Text>

        <Text style={[styles.text, { textAlign: "left" }]}>
          5. การดำเนินการทบทวนและการวางแผนปรับปรุงประสิทธิผลของรายวิชา
        </Text>
        <Text style={[styles.text, {textAlign: "left", marginBottom:"10px"}]}>
       จากผลการประเมิน และทวนสอบผลสัมฤทธิ์ประสิทธิผลรายวิชา จะมีการวางแผนการปรับปรุงการสอนและ{"\n"}
       รายละเอียดวิชา เพื่อให้เกิดคุณภาพมากขึ้น ดังนี้
        </Text>
        <Text style={[styles.text, {textAlign: "left", marginBottom:"10px"}]}>
        - ปรับปรุงรายวิชาทุกปี ตามผลการประเมินและจากการประชุมเพื่อพัฒนาการเรียนการสอน{"\n"}
        - ปรับปรุงรายวิชาและหลักสูตรตามข้อกำหนดของกรอบมาตรฐานคุณวุฒิระดับอุดมศึกษาแห่งชาติ พ.ศ.{"\n"}
        2552 และตามเกณฑ์มาตรฐานหลักสูตรระดับปริญญาตรี พ.ศ.2558 ในปีการศึกษา 2565
        </Text>
      </View>
    </Page>
  </Document>
);

export default CoursePDF;
