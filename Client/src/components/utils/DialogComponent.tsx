import React from 'react';
import { useRef, useEffect, useState } from 'react';

import { DialogContext } from './DialogContext';

interface DialogComponentProps {
  buttonText: string;
  cmpnt: JSX.Element;
}

function DialogComponent(props: DialogComponentProps) {
  const [dialogState, setDialogState] = useState(false);
  const value = { dialogState, setDialogState };
  const dialogRef = useRef<any>(null);

  function openDialog() {
    setDialogState(true);
    props.onOpen();
  }

  function closeDialog() {
    setDialogState(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        closeDialog();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <DialogContext.Provider value={value}>
        <button onClick={openDialog}>{props.buttonText}</button>
        <dialog open={dialogState} ref={dialogRef}>
          {props.cmpnt}
        </dialog>
      </DialogContext.Provider>
    </>
  );
}

export default DialogComponent;
