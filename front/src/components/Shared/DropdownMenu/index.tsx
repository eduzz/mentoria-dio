import React, { memo, useCallback, useMemo, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import DotsHorizontalIcon from 'mdi-react/DotsHorizontalIcon';

import PermissionHide from '../PermissionHide';
import DropdownMenuContext from './context';
import OptionItem from './OptionItem';

export interface IOption {
  text: string;
  icon?: typeof DotsHorizontalIcon;
  handler: () => void;
}

const DropdownMenu = memo((props: Partial<MenuProps>) => {
  const [targetElem, setTargetElem] = useState<HTMLElement>();

  const [options, content] = useMemo(() => {
    const options: React.ReactChild[] = [];
    const content: React.ReactChild[] = [];

    React.Children.toArray(props.children).forEach((child: any) => {
      if (child.type === OptionItem || child.type === PermissionHide) {
        options.push(child);
        return;
      }

      content.push(child);
    });

    return [options, content.length ? content : null];
  }, [props.children]);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setTargetElem(event.currentTarget);
  }, []);

  const handleClose = useCallback((event?: React.MouseEvent<HTMLElement>) => {
    event && event.stopPropagation();
    setTargetElem(null);
  }, []);

  const handleClick = useCallback(
    (handler: () => void) => {
      handleClose();
      handler();
    },
    [handleClose]
  );

  return (
    <div>
      {!!content && <span onClick={handleOpen}>{content}</span>}

      {!content && (
        <IconButton onClick={handleOpen} color='inherit'>
          <DotsHorizontalIcon />
        </IconButton>
      )}

      <Menu {...props} anchorEl={targetElem} open={!!targetElem} onClose={handleClose}>
        <DropdownMenuContext.Provider value={handleClick}>{options}</DropdownMenuContext.Provider>
      </Menu>
    </div>
  );
});

export default DropdownMenu;
