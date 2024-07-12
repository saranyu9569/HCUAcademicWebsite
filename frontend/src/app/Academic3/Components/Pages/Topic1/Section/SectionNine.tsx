import React from "react";

const SectionNine = () => {
  const date = new Date();

  const result = date
    .toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/(\d+)$/, "พ.ศ. $1");
    
  return (
    <div className="pt-6">
      {" "}
      {/* 9.วันที่จัดทำรายละเอียดของรายวิชา หรือปรับปรุงล่าสุด */}
      <div className="flex flex-row">
        <h1 className="font-bold">
          8.&nbsp;วันที่จัดทำรายละเอียดของรายวิชา หรือปรับปรุงล่าสุด{" "}
        </h1>
        <h1 className="pl-2">{result}</h1>
      </div>
    </div>
  );
};

export default SectionNine;
