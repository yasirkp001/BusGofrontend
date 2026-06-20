import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiUsers } from 'react-icons/fi';
import { userService } from '../../services/index.js';
import { selectUser } from '../../redux/slices/authSlice.js';
import UserTable from '../../components/admin/UserTable.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { TableSkeleton } from '../../components/common/Skeleton.jsx';
import PageHeader from '../../components/admin/PageHeader.jsx';

const Users = () => {
  const currentUser = useSelector(selectUser);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    userService.list().then((d) => setUsers(d.users)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const changeRole = async (id, role) => {
    try {
      const data = await userService.updateRole(id, role);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: data.user.role } : u)));
      toast.success(`Role updated to ${role}`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const remove = async (user) => {
    if (!window.confirm(`Delete user "${user.name}"?`)) return;
    try {
      await userService.remove(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      toast.success('User deleted');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div>
      <PageHeader title="Users" subtitle={loading ? 'Manage accounts and roles.' : `${users.length} registered accounts.`} />

      {loading ? (
        <TableSkeleton cols={6} />
      ) : users.length === 0 ? (
        <EmptyState icon={FiUsers} title="No users yet" subtitle="Registered customers will show up here." />
      ) : (
        <UserTable users={users} onChangeRole={changeRole} onDelete={remove} currentUserId={currentUser?.id} />
      )}
    </div>
  );
};

export default Users;
