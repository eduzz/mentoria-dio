import { memo, useCallback, useState } from 'react';

import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';

import Table from '@eduzz/houston-ui/Table';
import Toast from '@eduzz/houston-ui/Toast';

import Alert from '@/components/Globals/Alert';
import IUser from '@/interfaces/models/user';
import userService from '@/services/user';

interface IProps {
  user: IUser;
  index: number;
  onEdit: (user: IUser) => void;
  onDeleteComplete: () => void;
}

const ListItem = memo((props: IProps) => {
  const { user, onEdit, onDeleteComplete, index } = props;

  const [deleted, setDeleted] = useState(false);

  const handleEdit = useCallback(() => {
    onEdit(user);
  }, [onEdit, user]);

  const handleDelete = useCallback(async () => {
    const confirm = await Alert.confirm(`Deseja excluir o usuário ${user.name}?`);
    if (!confirm) return;

    setDeleted(true);

    try {
      await userService.delete(user.id);
      onDeleteComplete();
    } catch (err) {
      Toast.error(`Não foi possível excluir o usuário ${user.name}?`);
      setDeleted(false);
    }
  }, [onDeleteComplete, user.name, user.id]);

  if (deleted) {
    return null;
  }

  return (
    <Table.Row data={user} index={index}>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Action icon={<EditIcon />} onClick={handleEdit}>
        Editar
      </Table.Action>
      <Table.Action icon={<DeleteIcon />} onClick={handleDelete}>
        Excluir
      </Table.Action>
    </Table.Row>
  );
});

export default ListItem;
