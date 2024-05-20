"use client";
import { logout } from "@/action/logout";
import { useCurrentUser } from "@/hook/useCurrentUser";
import { CardWrapper } from "@/app/(protected)/_component/CardWrapper";

export default function Page() {
  const user = useCurrentUser();
  console.log(user)
  const onClick = () => {
    logout();
  };
  return (
    <>
      <CardWrapper
        image={user?.image}
      >
      <button onClick={onClick} type="submit">Sign Out</button>
      </CardWrapper>
    </>
  );
}
