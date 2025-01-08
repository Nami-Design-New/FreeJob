import React from "react";
import CheckBoxContainer from "./CheckBoxContainer";

export default function DepartmentFilterBox({ sections }) {
  return (
    <div className="departments w-100 mt-4">
      <h6>Section</h6>
      <ul className="deps">
        {sections.map((section) => (
          <CheckBoxContainer key={section.id} section={section} />
        ))}
      </ul>
    </div>
  );
}
