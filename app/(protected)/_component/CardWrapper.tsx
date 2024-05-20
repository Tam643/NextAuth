"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/app/(protected)/_component/Header";

interface CardWrapperProps {
  children: React.ReactNode;
  image?: string;
}

export const CardWrapper = ({ children, image }: CardWrapperProps) => {
  const headerLabel = "Profile";

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>{/* <Header label={headerLabel} /> */}</CardHeader>
      <CardContent>
        <Avatar className="h-20 w-20">
          { image !== null ?? <AvatarImage src={image} />}
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>

        {children}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
