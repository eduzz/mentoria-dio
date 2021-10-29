import { memo, useCallback, useMemo } from 'react';

import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

import useBoolean from '@eduzz/houston-hooks/useBoolean';
import ChevronDown from '@eduzz/houston-icons/ChevronDown';
import Exit from '@eduzz/houston-icons/Exit';
import LockedSolid from '@eduzz/houston-icons/LockedSolid';
import Avatar from '@eduzz/houston-ui/Avatar';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import ChangePasswordDialog from './ChangePassword';

import DropdownMenu from '@/components/Shared/DropdownMenu';
import OptionItem from '@/components/Shared/DropdownMenu/OptionItem';
import authService from '@/services/auth';
import { selectorUser } from '@/store/selectors';

const UserMenu: React.FC<IStyledProp> = ({ className }) => {
  const [changePassword, , showChangePassword, hideChangePassword] = useBoolean(false);

  const user = useSelector(selectorUser);
  const avatarLetters = useMemo(() => `${user?.name?.substr(0, 1) ?? ''}`.trim() || 'U', [user]);
  const handleLogout = useCallback(() => authService.logout(), []);

  if (!user) {
    return null;
  }

  return (
    <div className={className}>
      <ChangePasswordDialog opened={changePassword} onComplete={hideChangePassword} />

      <DropdownMenu anchorOrigin={{ vertical: 35, horizontal: 'right' }}>
        <div className='wrapper'>
          <Avatar size='small' filled>
            {avatarLetters}
          </Avatar>
          <Button color='inherit' className='button'>
            <Typography className='name'>{user.name}</Typography>
            <ChevronDown />
          </Button>
        </div>
        <OptionItem text='Trocar senha' icon={LockedSolid} handler={showChangePassword} />
        <OptionItem text='Sair' icon={Exit} handler={handleLogout} />
      </DropdownMenu>
    </div>
  );
};

export default styled(memo(UserMenu))`
  .name {
    margin: ${({ theme }) => `0 ${theme.spacing(2)}`};
  }

  .wrapper {
    display: flex;
    justify-content: center;
  }

  .button {
    margin-left: ${({ theme }) => theme.spacing(1)};
    padding-left: ${({ theme }) => theme.spacing(1)};
    padding-right: ${({ theme }) => theme.spacing(2)};
  }
`;
