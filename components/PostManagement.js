"use client";
import React, { useState } from "react";
import { Button, List, Tabs, Tag, Typography, Empty, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

export default function PostManagement() {
  const [pending, setPending] = useState([
    {
      id: "p1",
      title: "Draft: Why consistency beats motivation",
      content: "Full content about why consistency is better...",
      createdAt: new Date().toISOString(),
      author: "AI Bot",
      hashtags: ["#motivation", "#success", "#consistency"],
    },
  ]);

  const [approved, setApproved] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const openView = (post) => setSelectedPost(post);

  const handleApprove = () => {
    if (!selectedPost) return;
    setPending(pending.filter((p) => p.id !== selectedPost.id));
    setApproved([{ ...selectedPost }, ...approved]);
    setSelectedPost(null);
  };

  const handleReject = () => {
    if (!selectedPost) return;
    setPending(pending.filter((p) => p.id !== selectedPost.id));
    setSelectedPost(null);
  };

  const renderList = (data, kind) => (
    <List
      dataSource={data}
      locale={{ emptyText: <Empty description={`No ${kind} posts`} /> }}
      renderItem={(item) => (
        <List.Item
          actions={[
            kind === "pending" ? (
              <EyeOutlined
                key="view"
                style={{ fontSize: 22, cursor: "pointer" }}
                onClick={() => openView(item)}
              />
            ) : (
              <Tag key="approved" color="green">
                Approved
              </Tag>
            ),
          ]}
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
    <>
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

      <Modal
        title="Review Post"
        open={!!selectedPost}
        onCancel={() => setSelectedPost(null)}
        footer={[
          <Button
            size="large"
            key="reject"
            danger
            onClick={handleReject}
            className="rounded-sm!"
          >
            Reject
          </Button>,
          <Button
            size="large"
            key="approve"
            type="primary"
            onClick={handleApprove}
            className="rounded-sm!"
          >
            Approve
          </Button>,
        ]}
      >
        {selectedPost && (
          <div className="space-y-3">
            <Typography.Title level={4}>{selectedPost.title}</Typography.Title>

            <Typography.Paragraph>{selectedPost.content}</Typography.Paragraph>

            <Typography.Text type="secondary">
              Posted on:
              {new Date(selectedPost.createdAt).toLocaleString()}
            </Typography.Text>
            <br />

            <Typography.Text>Author: {selectedPost.author}</Typography.Text>
            <br />

            <div className="flex gap-2 mt-2">
              {selectedPost.hashtags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
