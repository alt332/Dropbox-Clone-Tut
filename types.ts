export type FileType = {
  id: string;
  fileName: string;
  fullName: string;
  timestamp: Date;
  downloadUrl: string;
  type: string;
  size: number;
};

export type GlobalContextType = {
  fileId: string | null;
  setFileId: (fileId: string | null) => void;
  fileName: string;
  setFileName: (fileName: string) => void;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
  isRenameModalOpen: boolean;
  setIsRenameModalOpen: (open: boolean) => void;
};
