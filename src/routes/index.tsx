import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../components/typhography/title/title";
import { Text } from "../components/typhography/text/text";
import { Layout } from "../components/layout";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <Layout title="Home">
      <div>
        <Title>Hello!</Title>
        <Text>this my application for the DOT Hiring Challenge</Text>
      </div>
    </Layout>
  );
}
