import { createContext } from "react";

type DialogContextType = {
  dialogState: boolean;
  setDialogState: (b: boolean) => void;
};

export const DialogContext = createContext<DialogContextType>({
  dialogState: false,
  setDialogState: () => {},
});
