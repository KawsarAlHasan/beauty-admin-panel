import React, { useState } from "react";
import { message, Modal, Select } from "antd";
import { API } from "../api/api";
import CatchError from "./CatchError";
import { useQueryClient } from "@tanstack/react-query";

const { Option } = Select;

const statusConfig = {
  ACTIVE: {
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    dot: "#10b981",
    pulse: true,
    label: "Active",
  },
  PENDING: {
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    dot: "#f59e0b",
    label: "Pending",
  },
  INACTIVE: {
    color: "#6b7280",
    bg: "#f9fafb",
    border: "#e5e7eb",
    dot: "#9ca3af",
    label: "Inactive",
  },
  SUSPENDED: {
    color: "#c2410c",
    bg: "#fff7ed",
    border: "#fed7aa",
    dot: "#ea580c",
    label: "Suspended",
  },
  DELETED: {
    color: "#b91c1c",
    bg: "#fef2f2",
    border: "#fecaca",
    dot: "#ef4444",
    label: "Deleted",
  },
  NOT_SUBMITTED: {
    color: "#1d4ed8",
    bg: "#eff6ff",
    border: "#bfdbfe",
    dot: "#3b82f6",
    label: "Not Submitted",
  },
};

const EditIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export default function StatusBadge({
  api_endpoint,
  id,
  status,
  refetch,
  statusOptions = [],
  isEditable,
  queryClientTable,
}) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [editHover, setEditHover] = useState(false);

  const config = statusConfig[status] || {
    color: "#6b7280",
    bg: "#f9fafb",
    border: "#e5e7eb",
    dot: "#9ca3af",
    label: status,
  };

  const showModal = () => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  };
  const handleCancel = () => setIsModalOpen(false);

  const handleStatusChange = async () => {
    if (!selectedStatus) return;
    setIsChanging(true);
    try {
      await API.patch(api_endpoint, {
        id,
        status: selectedStatus,
      });
      message.success("Status changed successfully!");
      setIsModalOpen(false);
      refetch?.();
      queryClientTable
        ? queryClient.invalidateQueries([queryClientTable])
        : null;
    } catch (error) {
      CatchError(error, "Failed to change status");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 0 3px ${config.border}; }
          50% { box-shadow: 0 0 0 6px ${config.border}80; }
        }
        .status-select-option { display: flex; align-items: center; gap: 8px; }
      `}</style>

      <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        {/* Pill Badge */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "5px 12px 5px 8px",
            borderRadius: 100,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.3px",
            color: config.color,
            background: config.bg,
            border: `1.5px solid ${config.border}`,
            lineHeight: 1,
          }}
        >
          {/* Animated dot */}
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: config.dot,
              flexShrink: 0,
              animation: config.pulse ? "statusPulse 2s infinite" : "none",
              boxShadow: `0 0 0 3px ${config.border}`,
            }}
          />
          {config.label}
        </span>

        {/* Edit Button */}
        {isEditable && (
          <button
            onClick={showModal}
            onMouseEnter={() => setEditHover(true)}
            onMouseLeave={() => setEditHover(false)}
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              border: `1.5px solid ${editHover ? "#d1d5db" : "#e5e7eb"}`,
              background: editHover ? "#f3f4f6" : "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: editHover ? "#374151" : "#9ca3af",
              transition: "all 0.15s ease",
              transform: editHover ? "scale(1.08)" : "scale(1)",
              outline: "none",
              flexShrink: 0,
            }}
          >
            <EditIcon />
          </button>
        )}
      </div>

      {/* Modal */}
      <Modal
        title={
          <span style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>
            Change Status
          </span>
        }
        open={isModalOpen}
        onOk={handleStatusChange}
        onCancel={handleCancel}
        confirmLoading={isChanging}
        okText="Update"
        okButtonProps={{
          style: { borderRadius: 8, fontWeight: 600, height: 36 },
        }}
        cancelButtonProps={{
          style: { borderRadius: 8, height: 36 },
        }}
        styles={{ body: { paddingTop: 16 } }}
      >
        <Select
          style={{ width: "100%", borderRadius: 10 }}
          value={selectedStatus}
          onChange={setSelectedStatus}
          size="large"
          optionLabelProp="label"
        >
          {statusOptions.map((opt) => {
            const c = statusConfig[opt] || {};
            return (
              <Option key={opt} value={opt} label={c.label || opt}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: c.dot || "#9ca3af",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{ color: c.color || "#374151", fontWeight: 500 }}
                  >
                    {c.label || opt}
                  </span>
                </div>
              </Option>
            );
          })}
        </Select>
      </Modal>
    </>
  );
}
