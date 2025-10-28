"use client";
import React, { useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Switch,
  InputNumber,
  Checkbox,
  Typography,
  Slider,
} from "antd";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CreateTaskDrawer({ open, onClose, onCreate }) {
  const [form] = Form.useForm();
  const [humanApproval, setHumanApproval] = useState(false);

  const submit = async () => {
    const values = await form.validateFields();
    const task = {
      id: crypto.randomUUID(),
      name: values.name,
      weekdays: values.weekdays,
      slotsPerDay: values.slotsPerDay,
      platform: "LinkedIn",
      humanApproval: values.humanApproval,
      queueSize: values.humanApproval ? values.queueSize : undefined,
      instructions: values.instructions,
      createdAt: new Date().toISOString(),
    };
    onCreate(task);
    form.resetFields();
    setHumanApproval(false);
    onClose();
  };

  return (
    <Drawer
      title="Create Task"
      open={open}
      onClose={onClose}
      width={520}
      closable={true}
      closeIcon={
        <CloseOutlined className="text-black text-lg absolute right-4 top-4 cursor-pointer" />
      }
      //   extra={
      //     <Button
      //       size="large"
      //       type="primary"
      //       onClick={submit}
      //       className="w-full h-10 bg-black! text-white! border-none! hover:bg-neutral-800!"
      //     >
      //       Create
      //     </Button>
      //   }
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label="Task Name"
          name="name"
          rules={[
            { required: true, message: "Task Name is required" },
            { min: 3, message: "Min 3 characters" },
          ]}
        >
          <Input placeholder="e.g., Morning LinkedIn posts" />
        </Form.Item>
        <Form.Item
          label="Weekdays"
          name="weekdays"
          rules={[{ required: true, message: "Pick at least one day" }]}
        >
          <Checkbox.Group className="w-full">
            <div className="grid grid-cols-7 gap-2">
              {WEEKDAYS.map((d) => (
                <Checkbox key={d} value={d}>
                  {d}
                </Checkbox>
              ))}
            </div>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="Slots per day" name="slotsPerDay" initialValue={1}>
          <InputNumber
            className="w-full"
            min={1}
            max={24}
            placeholder="e.g., 3"
          />
        </Form.Item>
        <Form.Item label="Platform" name="platform" initialValue={"LinkedIn"}>
          <Select
            options={[{ label: "LinkedIn", value: "LinkedIn" }]}
            disabled
          />
        </Form.Item>
        <Form.Item
          label="Human Approval"
          name="humanApproval"
          valuePropName="checked"
          initialValue={false}
        >
          <Switch onChange={(v) => setHumanApproval(v)} />
        </Form.Item>
        {humanApproval && (
          <Form.Item
            label={<Typography.Text>Queue size (1–10)</Typography.Text>}
            name="queueSize"
          >
            <Slider min={1} max={10} marks={{ 1: "1", 10: "10" }} />
          </Form.Item>
        )}
        <Form.Item label="Main instructions" name="instructions">
          <Input.TextArea
            rows={5}
            placeholder="Write the main posting instructions, tone, hashtags, etc."
          />
        </Form.Item>
        <div className="flex justify-end w-full">
          <Button
            size="large"
            type="primary"
            onClick={submit}
            className="w-full h-10 bg-black! text-white! border-none! hover:bg-neutral-800!"
          >
            Create
          </Button>
        </div>
      </Form>
    </Drawer>
  );
}
