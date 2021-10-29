import { HoustonIcon } from '@eduzz/houston-icons/interfaces';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

interface IProps extends IStyledProp {
  title: string;
  value: string;
  loading?: boolean;
  colored?: boolean;
  icon: HoustonIcon;
}

const Card: React.FC<IProps> = ({ className, title, value, icon }) => {
  const Icon = icon;

  return (
    <div className={className}>
      <Typography size='x-small' fontWeight='bold' className='title'>
        {title}
      </Typography>
      <Typography size='large' className='value'>
        {value}
      </Typography>
      <Icon className='icon' size={40} />
    </div>
  );
};

export default styled(Card)`
  padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius(1)}px;
  background: ${({ theme, colored }) => (colored ? theme.colors.secondary.main : 'white')};
  border: ${({ theme }) => theme.colors.grey[300]} 1px solid;
  display: flex;
  flex-direction: column;
  position: relative;

  & .title {
    color: ${({ theme }) => theme.colors.primary.main};
    text-transform: uppercase;
  }

  & .value {
    color: ${({ theme, colored }) => (colored ? theme.colors.secondary.contrastText : theme.colors.text.primary)};
  }

  & .icon {
    color: ${({ theme }) => theme.colors.primary.main};
    position: absolute;
    bottom: ${({ theme }) => theme.spacing(2)};
    right: ${({ theme }) => theme.spacing(2)};
  }
`;
