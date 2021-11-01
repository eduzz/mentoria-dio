import { memo, ReactNode } from 'react';

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import CoreToolbar from '@mui/material/Toolbar';

import styled, { IStyledProp, breakpoints } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import UserMenu from './UserMenu';

import logo from '@/assets/images/logo.svg';

interface IProps extends IStyledProp {
  title?: string;
  children?: ReactNode;
}

const Toolbar: React.FC<IProps> = ({ title, children, className }) => {
  return (
    <div className={className}>
      <AppBar className='app-bar' color='default' elevation={1}>
        <CoreToolbar>
          {children}
          {!children && (
            <Grid container alignItems='center'>
              <Grid item xs={true} className='left'>
                <img src={logo} className='logo' />

                {!!title && <Typography size='medium'>{title}</Typography>}
              </Grid>
              <Grid item xs={false}>
                <UserMenu />
              </Grid>
            </Grid>
          )}
        </CoreToolbar>
      </AppBar>
    </div>
  );
};

export default styled(memo(Toolbar))`
  height: ${({ theme }) => theme.variables.headerHeight}px;
  margin-top: ${({ theme }) => theme.variables.contentPadding * -1}px;
  margin-bottom: ${({ theme }) => theme.variables.contentPadding}px;

  ${breakpoints.up('sm')} {
    margin-top: ${({ theme }) => theme.variables.contentPaddingUpSm * -1}px;
    margin-bottom: ${({ theme }) => theme.variables.contentPaddingUpSm}px;
  }

  & .app-bar {
    background-color: white;
    width: 100%;
    box-shadow: none;
    border-bottom: ${({ theme }) => theme.colors.grey[300]} 1px solid;
  }

  & .left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & .logo {
    max-height: 35px;
    float: left;
    margin-right: ${({ theme }) => theme.spacing(4)};
  }
`;
