"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface socialProvider {
  socialIcon: Function;
  provider: "google" | "github";
}

const socialProviders: socialProvider[] = [
  {
    socialIcon: FcGoogle,
    provider: "google",
  },
  {
    socialIcon: FaGithub,
    provider: "github",
  },
];

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex item-center w-full justify-center gap-x-2">
      {socialProviders.map((social) => {
        const provider = social.provider;
        const socialIcon = social.socialIcon({className:"h-5 w-5"});
        return (
          <Button
            key={provider}
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() => onClick(provider)}
          >
            { socialIcon }
          </Button>
        );
      })}
    </div>
  );
};
