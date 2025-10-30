"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import TaskLogTable from "@/components/TaskLogTable";
import PostManagement from "@/components/PostManagement";
import CreateTaskDrawer from "@/components/CreateTaskDrawer";

export default function DashboardPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setMounted(true);
    setLogs([
      {
        id: "l1",
        time: new Date().toLocaleString(),
        task: "Morning LinkedIn Post",
        platform: "LinkedIn",
        status: "published",
      },
      {
        id: "l2",
        time: new Date().toLocaleString(),
        task: "Evening Engagement Boost",
        platform: "LinkedIn",
        status: "queued",
      },
      {
        id: "l3",
        time: new Date().toLocaleString(),
        task: "Weekly Update Article",
        platform: "LinkedIn",
        status: "failed",
      },
    ]);
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("authed") !== "true"
    ) {
      router.replace("/");
    }
  }, [router]);

  if (!mounted) return null;

  const createTask = (t) => {
    setTasks([t, ...tasks]);
    setLogs([
      {
        id: crypto.randomUUID(),
        time: new Date().toLocaleString(),
        task: t.name,
        platform: t.platform,
        status: t.humanApproval ? "queued" : "published",
      },
      ...logs,
    ]);
    message.success("Task created");
  };

  return (
    <main className="container mx-auto w-full px-4 sm:px-5 lg:px-4 py-8 space-y-8 flex flex-col items-center">
      <section className="w-full max-w-7xl p-6 rounded-xl shadow-2xl bg-white/90 ">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <Typography.Title level={3} className="mb-1!">
              Welcome 👋
            </Typography.Title>
            <Typography.Text type="secondary">
              Plan and manage your LinkedIn content.
            </Typography.Text>
          </div>
          <Button
            type="primary"
            size="large"
            onClick={() => setOpen(true)}
            className="h-10 bg-black! text-white! border-none! hover:bg-neutral-800!"
          >
            Create a Task
          </Button>
        </div>
      </section>

      <section className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <Card className="p-4 w-full">
          <Typography.Title level={4}>Task Log</Typography.Title>
          <Typography.Paragraph type="secondary">
            Single log for each publish
          </Typography.Paragraph>
          <TaskLogTable logs={logs} />
        </Card>

        <Card className="p-4 w-full">
          <Typography.Title level={4}>Post Management</Typography.Title>
          <Typography.Paragraph type="secondary">
            Pending Approval & Approved
          </Typography.Paragraph>
          <PostManagement />
        </Card>
      </section>

      <CreateTaskDrawer
        open={open}
        onClose={() => setOpen(false)}
        onCreate={createTask}
      />
    </main>
  );
}
