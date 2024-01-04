import { useRef, useEffect, useState } from 'react';

import { PropTypes } from 'prop-types';

import { DialogContext } from './DialogContext';

/**
 * Component representing a dialog.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.buttonText - The text displayed on the button that triggers the dialog.
 * @param {JSX.Element} props.element - The content to be displayed within the dialog.
 * @param {Function} props.onOpen - The callback function triggered when the dialog is opened.
 * @returns {JSX.Element} - The rendered DialogComponent component.
 */
export default function DialogComponent({ buttonText, element, onOpen }) {
  const [dialogState, setDialogState] = useState(false);
  const value = { dialogState, setDialogState };
  const dialogRef = useRef(null);

  function openDialog() {
    setDialogState(true);
    onOpen();
  }

  function closeDialog() {
    setDialogState(false);
  }

  useEffect(() => {
    const handleClickOutside = event => {
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
        <button onClick={openDialog}>{buttonText}</button>
        <dialog open={dialogState} ref={dialogRef}>
          <>{element}</>
        </dialog>
      </DialogContext.Provider>
    </>
  );
}

DialogComponent.propTypes = {
  buttonText: PropTypes.string.isRequired,
  element: PropTypes.element.isRequired,
  onOpen: PropTypes.func.isRequired
};
