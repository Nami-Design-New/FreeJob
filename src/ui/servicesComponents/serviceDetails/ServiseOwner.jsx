import React from "react";
import StarsRate from "../../StartRate";
import { IoMdInformationCircleOutline } from "react-icons/io";
import OwnerComponent from "./OwnerComponent";

export default function ServiseOwner() {
  let instructions = true;
  return (
    <div className="service_card_owner">
      <OwnerComponent />
      <ul className="card_ul">
        <li className="rate d-flex justify-content-between">
          <p>Puplish Date</p>3 jan
          {/* <StarsRate rate="0" /> */}
        </li>
        <li className="d-flex justify-content-between">
          <p>Buyers</p>
          <span>0</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>Orders in Progress</p>
          <span>0</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>Service Price Starts From</p>
          <span>$100</span>
        </li>
        <li className=" d-flex justify-content-between">
          <p>Delivery Time</p>
          <span>3 days</span>
        </li>
      </ul>
      {instructions && (
        <>
          <div className="label d-flex align-items-center gap-2 mt-3">
            <IoMdInformationCircleOutline />
            <p className="p-0 m-0">instructions</p>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </>
      )}
    </div>
  );
}
