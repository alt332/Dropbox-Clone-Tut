"use client";

import { GlobalContext } from "@/app/Providers";
import { useUser } from "@clerk/nextjs";
import { useContext, useState } from "react";
import { GlobalContextType } from "../types";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const { fileId, fileName, setIsRenameModalOpen, isRenameModalOpen } =
    useContext(GlobalContext) as GlobalContextType;

  const renameFile = async () => {
    if (!user || !fileId) return;

    try {
      await updateDoc(doc(db, "users", user.id, "files", fileId), {
        fileName: input,
      });
    } catch (error) {
      console.log(error);
    }

    setInput("");

    setIsRenameModalOpen(false);
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename the File</DialogTitle>
          <Input
            id="link"
            defaultValue={fileName}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") renameFile();
            }}
          />
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <div className="flex space-x-2 py-3">
            <Button
              size="sm"
              className="px-3 flex-1"
              variant={"ghost"}
              onClick={() => setIsRenameModalOpen(false)}
            >
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              size="sm"
              className="px-3 flex-1"
              onClick={renameFile}
            >
              <span className="sr-only">Rename</span>
              <span>Rename</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
