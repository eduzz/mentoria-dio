import { useCallback, useRef } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import styled, { breakpoints, IStyledProp } from '@eduzz/houston-ui/styles/styled';

import CampaignsPage from './Campaigns';
import { ScrollTopContext } from './scrollTopContext';

interface IProps extends IStyledProp {}

const AdminPage: React.FC<IProps> = ({ className }) => {
  const mainContent = useRef<HTMLDivElement>();

  const scrollTop = useCallback(() => setTimeout(() => mainContent.current.scrollTo(0, 0), 100), []);
  const renderRedirect = useCallback(() => <Redirect to='/' />, []);

  return (
    <div className={className}>
      <ScrollTopContext.Provider value={scrollTop}>
        <main ref={mainContent} className='main-content'>
          <Switch>
            <Route path='/' component={CampaignsPage} />
            <Route render={renderRedirect} />
          </Switch>
        </main>
      </ScrollTopContext.Provider>
    </div>
  );
};

export default styled(AdminPage)`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;

  & .main-content {
    background-color: white;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    padding: ${({ theme }) => theme.variables.contentPadding}px;

    ${breakpoints.up('sm')} {
      padding: ${({ theme }) => theme.variables.contentPaddingUpSm}px;
    }
  }
`;
