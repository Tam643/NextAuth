import { LoginButton } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-full bg-sky-600 flex-col items-center justify-center p-24">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold font-white drop-shadow-md">
          Auth 🔐
        </h1>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg" className="item-center">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
