import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import api from '../api/api';

export default function BecomeMentor() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [existing, setExisting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');

  const [form, setForm] = useState({
    bio: '',
    skills: [],
    skillsInput: '',
    hourlyRate: '',
    available: true,
  });

  useEffect(() => {
    if (!user) return;
    api
      .get('/api/mentors/me')
      .then((res) => {
        setExisting(res.data);
        setForm({
          bio: res.data.bio || '',
          skills: res.data.skills || [],
          skillsInput: '',
          hourlyRate: res.data.hourlyRate != null ? String(res.data.hourlyRate) : '',
          available: res.data.available != null ? res.data.available : true,
        });
      })
      .catch(() => {
        setExisting(null);
      })
      .finally(() => setLoading(false));
  }, [user?.id]);

  const addSkill = () => {
    const s = form.skillsInput.trim();
    if (s && !form.skills.includes(s)) {
      setForm({ ...form, skills: [...form.skills, s], skillsInput: '' });
    }
  };
  const removeSkill = (s) => setForm({ ...form, skills: form.skills.filter((x) => x !== s) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr('');
    setMsg('');
    try {
      const payload = {
        bio: form.bio,
        skills: form.skills,
        hourlyRate: form.hourlyRate ? Number(form.hourlyRate) : undefined,
        available: form.available,
      };
      if (existing) {
        const { data } = await api.put('/api/mentors', payload);
        setExisting(data);
      } else {
        const { data } = await api.post('/api/mentors', payload);
        setExisting(data);
      }
      setMsg('Mentor profile saved! You are now visible in the mentor directory.');
    } catch {
      setErr('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold">{existing ? 'Manage Your Mentor Profile' : 'Become a Mentor'}</h1>
        <p className="text-blue-100 mt-2">
          {existing
            ? 'Update your mentor details to help mentees find you.'
            : 'Set up your mentor profile to start connecting with mentees and sharing your expertise.'}
        </p>
      </div>

      {msg && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">{msg}</div>}
      {err && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">{err}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={4}
            required
            placeholder="Tell mentees about your expertise, experience, and how you can help them..."
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {form.skills.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-100">
                {s}
                <button type="button" onClick={() => removeSkill(s)} className="text-blue-400 hover:text-red-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={form.skillsInput}
              onChange={(e) => setForm({ ...form, skillsInput: e.target.value })}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
              placeholder="Add a skill and press Enter... (e.g. React, Node.js, UX Design)"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <button type="button" onClick={addSkill} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition font-medium text-sm">Add</button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Tip: These skills also appear on the profile's Skills attribute you set.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Hourly Rate ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                min="0"
                step="5"
                value={form.hourlyRate}
                onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
                required
                placeholder="50"
                className="w-full border border-gray-300 rounded-xl pl-8 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Availability</label>
            <button
              type="button"
              onClick={() => setForm({ ...form, available: !form.available })}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border-2 transition ${form.available ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
            >
              <span className={`font-medium ${form.available ? 'text-green-700' : 'text-gray-500'}`}>
                {form.available ? 'Available for sessions' : 'Unavailable'}
              </span>
              <div className={`w-11 h-6 rounded-full transition relative ${form.available ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow ${form.available ? 'left-5' : 'left-0.5'}`}></div>
              </div>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button type="button" onClick={() => navigate('/dashboard')} className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-200 transition font-medium">
            Back to Dashboard
          </button>
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-8 py-2.5 rounded-xl hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? 'Saving...' : existing ? 'Update Profile' : 'Publish as Mentor'}
          </button>
        </div>
      </form>
    </div>
  );
}
