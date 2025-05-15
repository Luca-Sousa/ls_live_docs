import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

const Document = () => {
  return (
    <div>
      <Header>
        <div className="flex w-fit items-center justify-between gap-2">
          <p className="line-clamp-1 border-dark-400 text-base font-semibold leading-[24px] sm:pl-0 sm:text-xl">
            Compartilhar
          </p>
        </div>

        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>

      <Editor />
    </div>
  );
};

export default Document;
