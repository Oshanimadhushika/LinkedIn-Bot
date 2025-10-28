"use client";
import React, { useState } from "react";
import { Button, List, Tabs, Tag, Typography, Empty } from "antd";

export default function PostManagement() {
  const [pending, setPending] = useState([
    {
      id: "p1",
      title: "Draft: Why consistency beats motivation",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [approved, setApproved] = useState([]);

  const approve = (id) => {
    const item = pending.find((p) => p.id === id);
    if (!item) return;
    setPending(pending.filter((p) => p.id !== id));
    setApproved([{ ...item, id: crypto.randomUUID() }, ...approved]);
  };

  const reject = (id) => setPending(pending.filter((p) => p.id !== id));

  const renderList = (data, kind) => (
    <List
      dataSource={data}
      locale={{ emptyText: <Empty description={`No ${kind} posts`} /> }}
      renderItem={(item) => (
        <List.Item
          actions={
            kind === "pending"
              ? [
                  <Button
                    size="large"
                    key="approve"
                    type="primary"
                    onClick={() => approve(item.id)}
                    className="bg-blue-600! text-white!"
                  >
                    Approve
                  </Button>,
                  <Button
                    size="large"
                    key="reject"
                    danger
                    onClick={() => reject(item.id)}
                  >
                    Reject
                  </Button>,
                ]
              : [
                  <Tag key="approved" color="green">
                    Approved
                  </Tag>,
                ]
          }
        >
          <List.Item.Meta
            title={<Typography.Text>{item.title}</Typography.Text>}
            description={new Date(item.createdAt).toLocaleString()}
          />
        </List.Item>
      )}
    />
  );

  return (
    <Tabs
      defaultActiveKey="pending"
      items={[
        {
          key: "pending",
          label: "Pending Approval",
          children: renderList(pending, "pending"),
        },
        {
          key: "approved",
          label: "Approved Posts",
          children: renderList(approved, "approved"),
        },
      ]}
    />
  );
}
