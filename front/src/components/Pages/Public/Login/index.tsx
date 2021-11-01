import { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import styled, { breakpoints, IStyledProp } from '@eduzz/houston-ui/styles/styled';

import CreateForm from './Create';
import LoginForm from './Form';
import LoginRecoveryAccess from './RecoveryAcces';

import { selectorIsAuthenticated } from '@/store/selectors';

const LoginPage: React.FC<IStyledProp> = ({ className }) => {
  const [currentView, setCurrentView] = useState(0);

  const isAuthenticated = useSelector(selectorIsAuthenticated);

  const onLogin = useCallback(() => setCurrentView(0), []);
  const onRecoveryAccess = useCallback(() => setCurrentView(2), []);
  const onCreate = useCallback(() => setCurrentView(1), []);

  if (isAuthenticated) return <Redirect to='/' />;

  return (
    <div className={className}>
      <SwipeableViews index={currentView} height='100%'>
        <div className='step'>
          <LoginForm onRecoveryAccess={onRecoveryAccess} onCreate={onCreate} />
        </div>
        <div className='step'>
          <CreateForm onCancel={onLogin} />
        </div>
        <div className='step'>
          <LoginRecoveryAccess onCancel={onLogin} onComplete={onLogin} />
        </div>
      </SwipeableViews>
    </div>
  );
};

export default styled(LoginPage)`
  margin: calc(${({ theme }) => theme.spacing(8)} * -1);

  ${breakpoints.down('sm')} {
    margin: calc(${({ theme }) => theme.spacing(4)} * -1);
  }

  & .step {
    padding: ${({ theme }) => theme.spacing(8)};
    max-width: 450px;
    margin: auto;

    ${breakpoints.down('sm')} {
      padding: ${({ theme }) => theme.spacing(4)};
    }
  }
`;
