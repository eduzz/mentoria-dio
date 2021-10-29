import { memo, useMemo, ReactNode } from 'react';

import { useSelector } from 'react-redux';

import { enRoles } from '@/interfaces/models/user';
import { selectorCanAccess } from '@/store/selectors';

interface IProps {
  role?: enRoles | enRoles[];
  inverse?: boolean;
  children?: ReactNode;
}

const PermissionHide = memo<IProps>(({ role, inverse, children }) => {
  const roles = useMemo(() => (Array.isArray(role) ? role : role ? [role] : []), [role]);
  const canAccess = useSelector(state => selectorCanAccess(state, roles));

  const shouldRender = inverse ? !canAccess : canAccess;

  return <>{shouldRender && children}</>;
});

export default PermissionHide;
