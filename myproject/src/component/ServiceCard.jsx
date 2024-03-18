import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {service.fName} {service.lName}
      </h3>
      <p>
        <span className="font-semibold">Service:</span> {service.service}
      </p>
      <p>
        <span className="font-semibold">Location:</span>{" "}
        {service.province}, {service.amphure}, {service.tambon}
      </p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ServiceCard;
