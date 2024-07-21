import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SitemapForm } from "./_components/sitemap-form";

export default function SitemapPage() {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Find sources from your sitemap</CardTitle>
        <CardDescription>
          Where to get sources for your chatbot.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SitemapForm />
      </CardContent>
    </Card>
  );
}