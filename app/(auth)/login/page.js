"use client";
import { Button, Card, Form, Input, Typography, Divider } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const onFinish = () => {
    localStorage.setItem("authed", "true");
    router.push("/dashboard");
  };

  const onGoogle = () => {
    localStorage.setItem("authed", "true");
    router.push("/dashboard");
  };

  return (
    <main className="flex items-center justify-center min-h-screen w-full px-4 sm:px-6">
      <Card className="w-full max-w-md p-6 rounded-sm!">
        <Typography.Title level={4} className="text-center mb-2 font-bold!">
          Welcome back
        </Typography.Title>
        <Typography.Paragraph className="text-center mb-6">
          Sign in to your LinkedIn Bot
        </Typography.Paragraph>
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
              size="large"
              placeholder="you@example.com"
              autoComplete="email"
              className="rounded-sm!"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Min 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="••••••••"
              autoComplete="current-password"
              className="rounded-sm!"
            />
          </Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full h-10 bg-black! text-white! border-none! hover:bg-neutral-800! rounded-sm!"
          >
            Sign In
          </Button>
        </Form>
        <Divider>or</Divider>
        <Button
          size="large"
          onClick={onGoogle}
          className="w-full h-10 border-black! text-black! hover:bg-neutral-100! rounded-sm!"
        >
          Sign in with Google
        </Button>
        <div className="mt-6 text-center">
          <span className="text-sm">No account? </span>
          <Link className="text-sm text-blue-600 font-bold" href="/register">
            Create one
          </Link>
        </div>
      </Card>
    </main>
  );
}
