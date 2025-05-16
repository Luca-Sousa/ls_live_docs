"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React, { useEffect, useRef, useState } from "react";
import Header from "./header";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import { Editor } from "./editor/Editor";
import ActiveCollaborators from "./active-collaborators";
import { Input } from "./ui/input";
import Image from "next/image";
import { updateDocument } from "@/lib/actions/room.actions";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  currentUserType,
  users
}: CollaborativeRoomProps) => {
  const [documentTitle, setDocumentTitle] = useState<string>(
    roomMetadata.title
  );
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setLoading(true);

      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);

          if (updatedDocument) {
            setLoading(false);
            setEditing(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [documentTitle, roomId]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId} initialPresence={roomId}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="flex size-full max-h-screen flex-1 flex-col items-center overflow-hidden">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-between gap-2"
            >
              {editing && !loading ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Informe o título"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  className="min-w-[78px] flex-1 border-none bg-transparent px-0 text-left text-base font-semibold leading-[24px] focus-visible:ring-0 focus-visible:ring-offset-0 disabled:text-black sm:!text-xl md:!text-center"
                />
              ) : (
                <>
                  <p className="line-clamp-1 border-dark-400 text-base font-semibold leading-[24px] sm:pl-0 sm:text-xl">
                    {documentTitle}
                  </p>
                </>
              )}

              {currentUserType === "editor" && !editing && (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="ícone de edição"
                  width={24}
                  height={24}
                  onClick={() => setEditing(true)}
                  className="cursor-pointer"
                />
              )}

              {currentUserType !== "editor" && !editing && (
                <p className="rounded-md bg-dark-400/50 px-2 py-0.5 text-xs text-blue-100/50">
                  Somente visualizar
                </p>
              )}

              {loading && <p className="text-sm text-gray-400">Salvando...</p>}
            </div>

            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />

              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>

          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
