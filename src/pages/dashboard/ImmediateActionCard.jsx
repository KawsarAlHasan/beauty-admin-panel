import React from "react";
import { Link } from "react-router-dom";
import { EnvironmentOutlined, CalendarOutlined } from "@ant-design/icons";

const cards = [
  {
    id: "CARD-001",
    location: "Substructure",
    description:
      "Floorhand observed bypassing machine guard to clear jammed equipment without lockout/tagout.",
    date: "Jan 25, 2025",
    priority: "High",
  },
  {
    id: "CARD-001",
    location: "Substructure",
    description:
      "Floorhand observed bypassing machine guard to clear jammed equipment without lockout/tagout.",
    date: "Jan 25, 2025",
    priority: "High",
  },
  {
    id: "CARD-001",
    location: "Substructure",
    description:
      "Floorhand observed bypassing machine guard to clear jammed equipment without lockout/tagout.",
    date: "Jan 25, 2025",
    priority: "High",
  },
];

function ActionCard({ card }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-lg">
      {/* Blue left border accent */}
      <div className="flex flex-1">
        <div className="w-1 bg-blue-700 rounded-l-xl flex-shrink-0" />
        <div className="p-4 flex flex-col flex-1 gap-2">
          {/* Card ID */}
          <p className="text-blue-700 text-xs font-semibold tracking-wide">
            {card.id}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-800 font-bold text-sm">
            <EnvironmentOutlined className="text-gray-700 text-sm" />
            <span>{card.location}</span>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed flex-1">
            {card.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <CalendarOutlined />
              <span>{card.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              <span className="text-red-500 text-xs font-semibold">
                {card.priority}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImmediateActionCard() {
  return (
    <div className="bg-white p-4 lg:p-6 rounded-2xl  mt-4 lg:mt-5 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="mainTitle">
            Immediate Action Required
          </h2>
          <p className="text-blue-700 text-sm mt-1">
            These cards have been flagged for urgent attention
          </p>
        </div>
        <span className="bg-red-500 text-white py-1.5 px-4 rounded-full text-sm font-semibold whitespace-nowrap">
          5 cards
        </span>
      </div>

      {/* See All */}
      <div className="flex justify-end mt-1">
        <Link
          to="/card-submission"
          className="text-blue-700 text-sm font-medium hover:underline"
        >
          See All
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-2">
        {cards.map((card, index) => (
          <ActionCard key={index} card={card} />
        ))}
      </div>
    </div>
  );
}

export default ImmediateActionCard;