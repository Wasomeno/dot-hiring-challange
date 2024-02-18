import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSession } from "../contexts/sessionContext";
import React, { useState } from "react";
import { Title } from "../components/typhography/title/title";
import { Button } from "../components/ui/button/button";
import { Input } from "../components/ui/input/input";
import { Layout } from "../components/layout";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { session, setSession } = useSession();

  function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      credentials?.username !== import.meta.env.VITE_USERNAME &&
      credentials?.password !== import.meta.env.VITE_PASSWORD
    ) {
      return;
    }

    setSession({ username: credentials?.username as string });

    navigate({ to: "/" });
  }

  if (session.username !== "") navigate({ to: "/" });

  return (
    <Layout title="Login">
      <div style={{ width: "320px" }}>
        <Title style={{ marginBottom: "24px" }}>Sign In</Title>
        <form onSubmit={signIn} style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <label
              htmlFor="input__username"
              style={{ fontFamily: "monospace", fontSize: "16px" }}
            >
              Username
            </label>
            <Input
              id="input__username"
              type="text"
              placeholder="Username"
              onChange={(event) =>
                setCredentials((current) => ({
                  ...current,
                  username: event.target.value,
                }))
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <label
              htmlFor="input__password"
              style={{ fontFamily: "monospace", fontSize: "16px" }}
            >
              Password
            </label>
            <Input
              id="input__password"
              type="password"
              placeholder="Password"
              onChange={(event) =>
                setCredentials((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
            />
          </div>
          <Button style={{ width: "100%" }}>Sign in</Button>
        </form>
      </div>
    </Layout>
  );
}
