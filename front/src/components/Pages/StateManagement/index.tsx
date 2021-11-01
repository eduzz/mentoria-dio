import styled, { IStyledProp, breakpoints } from '@eduzz/houston-ui/styles/styled';

import ContextApiExample from './ContextApi';
import ReduxExample from './Redux';
import RxJsExample from './RxJs';

import Toolbar from '@/components/Layout/Toolbar';

const StateManagementPage: React.FC<IStyledProp> = ({ className }) => {
  return (
    <div className={className}>
      <Toolbar title='Gerenciamento de Estado' />

      <div className='card'>
        <ReduxExample />
      </div>

      <div className='card'>
        <ContextApiExample />
      </div>

      <div className='card'>
        <RxJsExample />
      </div>
    </div>
  );
};

export default styled(StateManagementPage)`
  background-color: white;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: ${({ theme }) => theme.variables.contentPadding}px;

  ${breakpoints.up('sm')} {
    padding: ${({ theme }) => theme.variables.contentPaddingUpSm}px;
  }

  & .card {
    border: ${({ theme }) => theme.colors.grey[200]} 1px solid;
    border-radius: ${({ theme }) => theme.radius(1)}px;
    margin-bottom: ${({ theme }) => theme.spacing(8)};
  }
`;
