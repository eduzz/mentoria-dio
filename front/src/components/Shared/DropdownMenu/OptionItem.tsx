import { memo, SyntheticEvent, useCallback, useContext } from 'react';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
// eslint-disable-next-line no-restricted-imports
import { MdiReactIconComponentType } from 'mdi-react';

import { IconWebBase } from '@eduzz/houston-icons/interfaces';
import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';

import DropdownMenuContext from './context';

interface IProps {
  text: string;
  icon?: MdiReactIconComponentType | React.NamedExoticComponent<IconWebBase>;
  handler: () => void;
}

const useStyle = createUseStyles({
  text: {
    paddingLeft: '0 !important'
  }
});

const OptionItem = memo((props: IProps) => {
  const context = useContext(DropdownMenuContext);
  const classes = useStyle(props);

  const onClick = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      event.stopPropagation();
      context(props.handler);
    },
    [context, props.handler]
  );

  return (
    <MenuItem onClick={onClick}>
      {!!props.icon && (
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
      )}
      <ListItemText inset={!!props.icon} primary={props.text} className={props.icon ? classes.text : null} />
    </MenuItem>
  );
});

export default OptionItem;
