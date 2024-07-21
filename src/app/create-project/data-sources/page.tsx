import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const list = [
  {
    name: "Sitemap",
    path: "/create-project/data-sources/sitemap",
  },
];

export default function DataSourcesPage() {
  return (
    <Card className="max-w-3xl mx-auto">
      <form>
        <CardHeader>
          <CardTitle>Data Sources</CardTitle>
          <CardDescription>
            Where to get sources for your chatbot.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {list.map((l) => {
            return (
              <Link
                href={l.path}
                key={l.name}
                className="size-24 border rounded-xl flex justify-center items-center hover:border-primary transition-colors"
              >
                {l.name}
              </Link>
            );
          })}
        </CardContent>
      </form>
    </Card>
  );
}
