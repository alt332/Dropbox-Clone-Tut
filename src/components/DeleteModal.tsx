"use client";

import { GlobalContext } from "@/app/Providers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useContext } from "react";
import { db, storage } from "../firebase";
import { GlobalContextType } from "../types";
import { useToast } from "./ui/use-toast";

export default function DialogCloseButton() {
  const { fileId, isDeleteModalOpen, setIsDeleteModalOpen } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const { user } = useUser();
  const { toast } = useToast();

  const deleteFile = async () => {
    if (!user || !fileId) return;

    toast({ description: "Deleting..." });

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      await deleteObject(fileRef);
      await deleteDoc(doc(db, "users", user.id, "files", fileId));

      toast({
        description: "Deleted succssfully!",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    }

    setIsDeleteModalOpen(false);
  };

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <div className="flex space-x-2 py-3">
            <Button
              size="sm"
              className="px-3 flex-1"
              variant={"ghost"}
              onClick={() => setIsDeleteModalOpen(false)}
            >
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              size="sm"
              variant={"destructive"}
              className="px-3 flex-1"
              onClick={deleteFile}
            >
              <span className="sr-only">Delete</span>
              <span>Delete</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
