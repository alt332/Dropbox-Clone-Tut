"use client";
import { createContext, useState } from "react";
import { GlobalContextType } from "../../types";

export const GlobalContext = createContext<GlobalContextType | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [fileId, setFileId] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        fileId,
        setFileId,
        fileName,
        setFileName,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        isRenameModalOpen,
        setIsRenameModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
