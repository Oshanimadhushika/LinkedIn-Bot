"use client";
import React, { useState } from "react";
import { Table, Tag, Modal, Typography, Space, Button, Divider } from "antd";
import { EyeOutlined } from "@ant-design/icons";

export default function TaskLogTable({ logs }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setOpen] = useState(false);

  const handleView = (record) => {
    setSelectedTask(record);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTask(null);
    setOpen(false);
  };

  const columns = [
    { title: "Time", dataIndex: "time", key: "time", width: 200 },
    { title: "Task", dataIndex: "task", key: "task" },
    { title: "Platform", dataIndex: "platform", key: "platform", width: 140 },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (s) => {
        const color =
          s === "published" ? "green" : s === "queued" ? "blue" : "volcano";
        return <Tag color={color}>{s}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined className="text-blue-600" />}
          onClick={() => handleView(record)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-auto w-full">
        <div className="min-w-[650px]">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={logs}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>

      <Modal
        title="Task Log Details"
        open={open}
        onCancel={handleClose}
        footer={null}
      >
        <Divider className="my-5" />

        {selectedTask ? (
          <div className="space-y-2">
            <p>
              <strong>Task Name:</strong> {selectedTask.task}
            </p>
            <p>
              <strong>Platform:</strong> {selectedTask.platform}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Tag
                color={
                  selectedTask.status === "published"
                    ? "green"
                    : selectedTask.status === "queued"
                    ? "blue"
                    : "volcano"
                }
              >
                {selectedTask.status}
              </Tag>
            </p>
            <p>
              <strong>Time:</strong> {selectedTask.time}
            </p>
          </div>
        ) : (
          <Typography.Text type="secondary">
            No details available
          </Typography.Text>
        )}
      </Modal>
    </>
  );
}
