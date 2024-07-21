import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MoveRight } from "lucide-react";

export default function CreateProjectPage() {
  return (
    <Card className="w-[600px]">
      <form>
        <CardHeader>
          <CardTitle>Project Name</CardTitle>
          <CardDescription>Used to identify your project.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="My cool SaaS app" name="project-name" />
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button className="group" type="submit">
            Next
            <MoveRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
