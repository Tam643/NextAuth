"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) : React.ReactNode => {
   const router = useRouter();
  const handleClick = () => {
    router.push("/auth/login");
  };
  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};
