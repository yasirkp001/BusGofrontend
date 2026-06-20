import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { userService } from '../../services/index.js';
import { selectUser, setUser } from '../../redux/slices/authSlice.js';
import Button from '../../components/common/Button.jsx';
import { formatDate } from '../../utils/format.js';

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [pwd, setPwd] = useState({ password: '', confirm: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const data = await userService.updateProfile({ name: form.name, phone: form.phone });
      dispatch(setUser(data.user));
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (pwd.password.length < 6) return toast.error('Password must be at least 6 characters');
    if (pwd.password !== pwd.confirm) return toast.error('Passwords do not match');
    setSavingPwd(true);
    try {
      await userService.updateProfile({ password: pwd.password });
      setPwd({ password: '', confirm: '' });
      toast.success('Password changed');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingPwd(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-xl font-bold text-slate-800">My profile</h1>

      <div className="mt-6 flex items-center gap-4 card p-5">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-2xl font-bold text-brand-700">
          {user?.name?.charAt(0)?.toUpperCase()}
        </span>
        <div>
          <p className="text-lg font-semibold text-slate-800">{user?.name}</p>
          <p className="text-sm text-slate-500">{user?.email}</p>
          <p className="mt-1 text-xs text-slate-400">
            {user?.role === 'admin' ? 'Administrator' : 'Member'} • Joined {formatDate(user?.createdAt?.slice(0, 10))}
          </p>
        </div>
      </div>

      <form onSubmit={saveProfile} className="card mt-5 p-5">
        <h2 className="mb-4 text-base font-semibold text-slate-800">Account details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Full name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input bg-slate-50" value={user?.email ?? ''} disabled />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit" loading={savingProfile}>
            Save changes
          </Button>
        </div>
      </form>

      <form onSubmit={savePassword} className="card mt-5 p-5">
        <h2 className="mb-4 text-base font-semibold text-slate-800">Change password</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">New password</label>
            <input type="password" className="input" placeholder="••••••••" value={pwd.password} onChange={(e) => setPwd({ ...pwd, password: e.target.value })} />
          </div>
          <div>
            <label className="label">Confirm password</label>
            <input type="password" className="input" placeholder="••••••••" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit" variant="secondary" loading={savingPwd}>
            Update password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
