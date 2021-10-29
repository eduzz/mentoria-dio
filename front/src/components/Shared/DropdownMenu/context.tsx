import React from 'react';

export interface IDropdownMenuContext {
  (handler: () => void): void;
}

const DropdownMenuContext = React.createContext<IDropdownMenuContext>(() => null);

export default DropdownMenuContext;
