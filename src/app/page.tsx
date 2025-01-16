import { Button } from "@/components/ui/button";
import { signOut } from "../../auth";

export default function Home() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <h1>Hello World</h1>
      <Button type="submit">Logout</Button>
    </form>
  );
}
