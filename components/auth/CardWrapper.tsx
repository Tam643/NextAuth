"use client";

import { Children } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "./hedaer";
import { Social } from "./Social";
import { BackButton } from "./BackButton";

interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial?: boolean
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocial
} : CardWrapperProps) =>{
    
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
            <BackButton
                backButtonHref={backButtonHref}
                backButtonLabel={backButtonLabel}
             />
            </CardFooter>
        </Card>
    );
}