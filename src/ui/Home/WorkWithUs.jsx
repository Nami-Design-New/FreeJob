import React from "react";
import SectionHeader from "../SectionHeader";
import StepsToStartCard from "../cards/StepsToStartCard";

const workWithUs = [
  {
    id: "1",
    title: "Browse projects",
    description:
      " Whatever your skills or experience, you&apos;ll find opportunities that suit you on Yingaz. Discover projects that suit your abilities and start working on what you love.",
    imageUrl: "./images/icon1.png",
  },
  {
    id: "2",
    title: "Define your skills",
    description:
      " Clearly showcase your skills and experience on your profile. The more accurate your information is, the better your chances of attracting the right clients.",
    imageUrl: "./images/icon2.png",
  },
  {
    id: "3",
    title: "Register your account",
    description:
      "Create a free account on FREEJOB in minutes. Enter your basic details and start customizing your profile.",
    imageUrl: "./images/icon3.png",
  },
];
export default function WorkWithUs() {
  return (
    <div className="work_with_us">
      <SectionHeader
        title="Start working with us"
        description="Most viewed and best selling projects ever"
      />
      <div className="mt-5">
        <div className="row">
          {workWithUs.map((item) => (
            <div key={item.id} className="col-md-4 mt-5 ">
              <StepsToStartCard step={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
