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
  },
];

export default function CreateProjectPage() {
  return (
    <Card className="w-[600px]">
      <form>
        <CardHeader>
          <CardTitle>Data Sources</CardTitle>
          <CardDescription>Used to identify your project.</CardDescription>
        </CardHeader>
        <CardContent>
          {list.map((l) => {
            return (
              <Link
                href="#"
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
