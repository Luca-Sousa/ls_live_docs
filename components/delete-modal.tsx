"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { deleteDocument } from "@/lib/actions/room.actions";

const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);

    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (error) {
      console.log("Error notif:", error);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="min-w-9 rounded-xl bg-transparent p-2 transition-all">
          <Image
            src="/assets/icons/delete.svg"
            alt="Deletar um documento"
            width={20}
            height={20}
            className="mt-1"
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="shad-dialog">
        <DialogHeader>
          <Image
            src="/assets/icons/delete-modal.svg"
            alt="delete"
            width={48}
            height={48}
            className="mb-4"
          />
          <DialogTitle>Excluir documento</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este documento? Esta ação não pode
            ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-5">
          <DialogClose asChild className="w-full bg-dark-400 text-white">
            Cancelar
          </DialogClose>

          <Button
            variant="destructive"
            onClick={deleteDocumentHandler}
            className="gradient-red w-full"
          >
            {loading ? "Deletando..." : "Deletar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
