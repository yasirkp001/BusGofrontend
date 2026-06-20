import { FiTrash2, FiShield } from 'react-icons/fi';
import { formatDate } from '../../utils/format.js';

// props: users[], onChangeRole(id, role), onDelete(user), currentUserId
const UserTable = ({ users = [], onChangeRole, onDelete, currentUserId }) => {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="admin-th">User</th>
              <th className="admin-th">Phone</th>
              <th className="admin-th">Joined</th>
              <th className="admin-th">Bookings</th>
              <th className="admin-th">Role</th>
              <th className="admin-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.id} className="transition-colors hover:bg-slate-50">
                <td className="admin-td">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-semibold text-white">
                      {u.name?.charAt(0)?.toUpperCase()}
                    </span>
                    <div>
                      <p className="flex items-center gap-1.5 font-medium text-slate-800">
                        {u.name}
                        {u.id === currentUserId && <span className="badge bg-brand-50 text-brand-600">You</span>}
                      </p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="admin-td">{u.phone || '—'}</td>
                <td className="admin-td">{formatDate(u.createdAt?.slice(0, 10))}</td>
                <td className="admin-td">
                  <span className="badge bg-slate-100 text-slate-600">{u.bookingsCount ?? 0}</span>
                </td>
                <td className="admin-td">
                  <div className="relative inline-flex items-center">
                    {u.role === 'admin' && <FiShield className="pointer-events-none absolute left-2 text-brand-500" size={13} />}
                    <select
                      value={u.role}
                      disabled={u.id === currentUserId}
                      onChange={(e) => onChangeRole?.(u.id, e.target.value)}
                      className={`rounded-lg border border-slate-300 py-1.5 pr-2 text-sm capitalize disabled:opacity-50 ${
                        u.role === 'admin' ? 'pl-7 text-brand-700' : 'pl-2'
                      }`}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                </td>
                <td className="admin-td">
                  <div className="flex justify-end">
                    <button
                      onClick={() => onDelete?.(u)}
                      disabled={u.id === currentUserId}
                      className="icon-btn-danger"
                      title={u.id === currentUserId ? 'You cannot delete yourself' : 'Delete user'}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
