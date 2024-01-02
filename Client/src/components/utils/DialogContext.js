import { createContext } from 'react';

/**
 * Context for managing the state of a dialog component.
 *
 * @type {React.Context}
 * @property {boolean} dialogState - The state of the dialog.
 * @property {Function} setDialogState - A function to set the dialog state.
 */
export const DialogContext = createContext({
  dialogState: false,
  setDialogState: () => {}
});
