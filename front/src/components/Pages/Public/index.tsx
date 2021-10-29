import { Route, Switch } from 'react-router-dom';

import styled, { breakpoints, IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import LoginPage from './Login';
import NewPasswordPage from './NewPassword';

import logo from '@/assets/images/logo.svg';
import splashImage from '@/assets/images/splash.png';

const PublicPage: React.FC<IStyledProp> = ({ className }) => {
  return (
    <div className={className}>
      <div className='splash' />
      <div className='container'>
        <img src={logo} className='logo' />
        <div className='content'>
          <div>
            <Switch>
              <Route path='/nova-senha' exact component={NewPasswordPage} />
              <Route path='/login' exact component={LoginPage} />
            </Switch>
          </div>
        </div>
        <div className='footer'>
          <Typography size='x-small'>Eduzz@{new Date().getFullYear()}</Typography>
        </div>
      </div>
    </div>
  );
};

export default styled(PublicPage)`
  min-height: 100vh;
  min-width: 100vw;
  position: relative;
  display: flex;
  justify-content: flex-end;

  & > .splash {
    background: url(${splashImage}) no-repeat center;
    background-size: cover;
    flex: 1;
  }

  & > .container {
    padding: ${({ theme }) => theme.spacing(8)};
    height: 100vh;
    width: 500px;
    min-width: 50vw;
    max-width: 100vw;
    background-color: white;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${breakpoints.down('sm')} {
      padding: ${({ theme }) => theme.spacing(4)};
    }

    & > .logo {
      margin-bottom: 20px;
      width: 90px;
      max-width: 100%;
      max-height: 120px;
      align-self: flex-start;
    }

    & > .content {
      flex: 1;
      justify-content: center;
      align-items: center;
      display: flex;
      min-width: 400px;
      margin-top: -100px;

      ${breakpoints.down('sm')} {
        align-items: flex-start;
        min-width: 0;
        margin-top: 0;
      }

      & > div {
        width: 100%;
      }

      .title {
        margin-bottom: ${({ theme }) => theme.spacing(8)};

        ${breakpoints.down('sm')} {
          margin-bottom: ${({ theme }) => theme.spacing(4)};
        }
      }

      .subtitle {
        margin-bottom: ${({ theme }) => theme.spacing(4)};
      }

      .link {
        cursor: pointer;
        margin-top: ${({ theme }) => theme.spacing(6)};

        & > span {
          color: ${({ theme }) => theme.colors.primary.main};
        }
      }
    }

    & > .footer {
      align-self: flex-start;
    }
  }
`;
