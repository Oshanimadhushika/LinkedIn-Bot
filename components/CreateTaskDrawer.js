"use client";
import React, { useState, useEffect } from "react";
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
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { CloseOutlined } from "@ant-design/icons";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CreateTaskDrawer({ open, onClose, onCreate }) {
  const [form] = Form.useForm();
  const [humanApproval, setHumanApproval] = useState(false);

  const weekdaysSelected = Form.useWatch("weekdays", form) || [];
  const slotsPerDay = Form.useWatch("slotsPerDay", form) || 1;
  const slots = Form.useWatch("slots", form) || [];

  useEffect(() => {
    if (weekdaysSelected.length === 0) {
      form.setFieldsValue({ slots: [] });
      return;
    }

    let updated = [...slots];

    if (updated.length < slotsPerDay) {
      for (let i = updated.length; i < slotsPerDay; i++) {
        updated.push(null);
      }
    } else if (updated.length > slotsPerDay) {
      updated = updated.slice(0, slotsPerDay);
    }

    form.setFieldsValue({ slots: updated });
  }, [slotsPerDay, weekdaysSelected]);

  const submit = async () => {
    const values = await form.validateFields();

    const task = {
      id: crypto.randomUUID(),
      name: values.name,
      weekdays: values.weekdays,
      slotsPerDay: values.slotsPerDay,
      slots: values.slots.map((t) => t && dayjs(t).format("HH:mm")),
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
      title={
        <div className="flex items-center w-full justify-between">
          <span className="text-black font-medium text-lg">Create Task</span>
          <CloseOutlined
            className="text-black text-lg cursor-pointer"
            onClick={onClose}
          />
        </div>
      }
      open={open}
      onClose={onClose}
      width={520}
      closable={false}
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

        <Form.Item label="Posts per day" name="slotsPerDay" initialValue={1}>
          <InputNumber
            className="w-full"
            min={1}
            max={5}
            disabled={weekdaysSelected.length === 0}
          />
        </Form.Item>

        {weekdaysSelected.length > 0 && (
          <Form.List name="slots">
            {(fields) => (
              <>
                <Typography.Text className="font-medium">
                  Posting Times
                </Typography.Text>
                <div className="grid gap-2 mt-2">
                  {fields.map(({ key, name }, index) => (
                    <Form.Item
                      key={key}
                      name={name}
                      rules={[
                        {
                          required: true,
                          message: `Select time for slot ${index + 1}`,
                        },
                      ]}
                    >
                      <TimePicker
                        format="hh:mm A"
                        use12Hours
                        className="w-full"
                        placeholder={`Time for post #${index + 1}`}
                      />
                    </Form.Item>
                  ))}
                </div>
              </>
            )}
          </Form.List>
        )}

        <Form.Item label="Platform" name="platform" initialValue="LinkedIn">
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
            rules={[{ required: true }]}
          >
            <Slider min={1} max={10} marks={{ 1: "1", 10: "10" }} />
          </Form.Item>
        )}

        <Form.Item label="Main instructions" name="instructions">
          <Input.TextArea rows={5} />
        </Form.Item>

        <Button
          size="large"
          type="primary"
          className="w-full h-10 bg-black! text-white! border-none! hover:bg-neutral-800!"
          onClick={submit}
        >
          Create
        </Button>
      </Form>
    </Drawer>
  );
}
