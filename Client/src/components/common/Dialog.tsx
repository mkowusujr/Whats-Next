import { cn } from '@/lib/utils/styles';
import clsx from 'clsx';
import React, { useContext, useEffect } from 'react';
import { ReactNode, createContext, useState } from 'react';

type DialogContextProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultDialogContext: DialogContextProps = {
  isOpen: false,
  setIsOpen: () => {}
};

const DialogContext = createContext<DialogContextProps>(defaultDialogContext);

/** */
const Dialog = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogOverlay = () => {
  const { isOpen, setIsOpen } = useContext(DialogContext);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-y-hidden');
    } else document.body.classList.remove('overflow-y-hidden');
  }, [isOpen]);

  return (
    <div
      id="dialog-overlay"
      className={clsx('fixed inset-0 z-40', {
        'pointer-events-none animate-fade-out': !isOpen,
        'pointer-events-auto animate-fade-in cursor-pointer bg-black/80': isOpen
      })}
      onClick={() => setIsOpen(false)}
    ></div>
  );
};

const DialogContent = ({
  children,
  className
}: {
  children?: ReactNode;
  createChildren?: any;
  className?: string;
}) => {
  const { isOpen, setIsOpen } = useContext(DialogContext);

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
  }, []);

  return (
    <>
      <DialogOverlay />
      <div
        id="dialog-content"
        className={cn(
          'fixed bottom-0 left-0 right-0 top-0 z-50 m-auto h-fit max-h-[440px] w-fit overflow-y-auto overscroll-none rounded-md',
          { hidden: !isOpen },
          className
        )}
      >
        {isOpen && children}
      </div>
    </>
  );
};

type DialogTriggerProps = {
  children: ReactNode;
  onClick?: () => void;
};

const DialogTrigger = ({ children, onClick }: DialogTriggerProps) => {
  const { setIsOpen } = useContext(DialogContext);

  return (
    <div
      id="dialog-trigger"
      className=" h-min min-w-fit cursor-pointer"
      onClick={() => {
        if (onClick) onClick();
        setIsOpen(true);
      }}
    >
      {children}
    </div>
  );
};

type DialogCloseProps = {
  children: ReactNode;
  className: string;
  onClose: (e: React.FormEvent) => void;
};

const DialogClose = ({ children, className, onClose }: DialogCloseProps) => {
  const { setIsOpen } = useContext(DialogContext);
  const handleClose = (e: React.FormEvent) => {
    onClose(e);
    setIsOpen(false);
  };

  return (
    <button className={cn(className)} onClick={handleClose}>
      {children}
    </button>
  );
};

export { Dialog, DialogContent, DialogTrigger, DialogClose };
