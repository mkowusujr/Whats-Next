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

/** */
const DialogOverlay = () => {
  const { isOpen, setIsOpen } = useContext(DialogContext);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-y-hidden');
      window.scrollTo(0, 0);
    } else document.body.classList.remove('overflow-y-hidden');
  }, [isOpen]);

  return (
    <div
      id="dialog-overlay"
      className={clsx('absolute inset-0 z-40', {
        'pointer-events-none animate-fade-out': !isOpen,
        'overscro pointer-events-auto animate-fade-in cursor-pointer bg-black/80':
          isOpen
      })}
      onClick={() => setIsOpen(false)}
    ></div>
  );
};

/** */
const DialogContent = ({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isOpen } = useContext(DialogContext);
  return (
    <>
      <DialogOverlay />
      <div
        id="dialog-content"
        className={clsx(
          'absolute left-0 right-0 top-1/2 z-40 mx-auto h-fit w-fit sm:top-1/3',
          className,
          { hidden: !isOpen }
        )}
      >
        {children}
      </div>
    </>
  );
};

/** */
const DialogTrigger = ({ children }: { children: ReactNode }) => (
  <DialogContext.Consumer>
    {({ setIsOpen }) => (
      <div
        id="dialog-trigger"
        className="w-fit"
        onClick={() => setIsOpen(true)}
      >
        {children}
      </div>
    )}
  </DialogContext.Consumer>
);

export { Dialog, DialogContent, DialogTrigger };
