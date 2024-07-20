import { Button } from "@/components/ui/button";
import { login } from "./actions";

export default function LoginPage() {
  return (
    <div>
      <form>
        <Button formAction={login}>Log in with Google</Button>
      </form>
    </div>
  );
}
