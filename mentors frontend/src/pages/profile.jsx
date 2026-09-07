import { useState, useEffect } from 'react';
import { useAuth } from '../context/authcontext';
import { Link } from 'react-router-dom';
import api from '../api/api';

export default function Profile() {
  const { user, updateUser, refreshUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const [form, setForm] = useState({
    name: '', headline: '', bio: '', location: '',
    skills: [], skillsInput: '',
    education: [], experiencedPreset: [], linkedin: '', github: '', website: '',
  });
  const [edu, setEdu] = useState({ degree: '', institution: '', field: '', startYear: '', endYear: '' });
  const [exp, setExp] = useState({ company: '', role: '', startYear: '', endYear: '', description: '' });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '', headline: user.headline || '', bio: user.bio || '', location: user.location || '',
        skills: user.skills || [], skillsInput: '',
        education: user.education || [], experiencedPreset: user.experience || [],
        linkedin: user.linkedin || '', github: user.github || '', website: user.website || '',
      });
    }
  }, [user?.id, editing]);

  const addSkill = () => {
    const s = form.skillsInput.trim();
    if (s && !form.skills.includes(s)) {
      setForm({ ...form, skills: [...form.skills, s], skillsInput: '' });
    }
  };
  const removeSkill = (s) => setForm({ ...form, skills: form.skills.filter((x) => x !== s) });

  const addEducation = () => {
    if (edu.degree.trim() && edu.institution.trim()) {
      setForm({ ...form, education: [...form.education, { ...edu, startYear: edu.startYear ? Number(edu.startYear) : undefined, endYear: edu.endYear ? Number(edu.endYear) : undefined }] });
      setEdu({ degree: '', institution: '', field: '', startYear: '', endYear: '' });
    }
  };
  const removeEducation = (i) => setForm({ ...form, education: form.education.filter((_, idx) => idx !== i) });

  const addExperience = () => {
    if (exp.company.trim() && exp.role.trim()) {
      setForm({ ...form, experiencedPreset: [...form.experiencedPreset, { ...exp, startYear: exp.startYear ? Number(exp.startYear) : undefined, endYear: exp.endYear ? Number(exp.endYear) : undefined }] });
      setExp({ company: '', role: '', startYear: '', endYear: '', description: '' });
    }
  };
  const removeExperience = (i) => setForm({ ...form, experiencedPreset: form.experiencedPreset.filter((_, idx) => idx !== i) });

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    setErr('');
    try {
      const payload = {
        name: form.name, headline: form.headline, bio: form.bio, location: form.location,
        skills: form.skills, education: form.education, experience: form.experiencedPreset,
        linkedin: form.linkedin, github: form.github, website: form.website,
      };
      const { data } = await api.put('/api/profile', payload);
      updateUser(data.user);
      setMsg('Profile saved successfully!');
      setEditing(false);
    } catch {
      setErr('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 relative">
        <button
          onClick={() => { setEditing(!editing); setMsg(''); setErr(''); }}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition text-sm font-medium"
        >
          {editing ? 'Cancel' : 'Edit Profile'}
        </button>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold ring-4 ring-white/30">
            {initials}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            {user?.headline && <p className="text-blue-100 mt-1">{user.headline}</p>}
            <p className="text-blue-100/80 text-sm mt-1">{user?.email}</p>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                {user?.role === 'mentor' ? 'Mentor' : 'Mentee'}
              </span>
              {user?.location && (
                <span className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {user.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {msg && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm">{msg}</div>}
      {err && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">{err}</div>}

      {!editing ? (
        <div className="space-y-6">
          {user?.bio && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-gray-600 leading-relaxed">{user.bio}</p>
            </div>
          )}

          {user?.skills?.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((s) => (
                  <span key={s} className="text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium border border-blue-100">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {user?.education?.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Education</h3>
                </div>
                <div className="space-y-4">
                  {user.education.map((e, i) => (
                    <div key={i} className="border-l-2 border-purple-200 pl-4">
                      <p className="font-medium text-gray-900">{e.degree}{e.field ? ` in ${e.field}` : ''}</p>
                      <p className="text-sm text-gray-500">{e.institution}</p>
                      {(e.startYear || e.endYear) && (
                        <p className="text-xs text-gray-400 mt-0.5">{e.startYear || '?'} - {e.endYear || 'Present'}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {user?.experience?.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Experience</h3>
                </div>
                <div className="space-y-4">
                  {user.experience.map((x, i) => (
                    <div key={i} className="border-l-2 border-blue-200 pl-4">
                      <p className="font-medium text-gray-900">{x.role}</p>
                      <p className="text-sm text-gray-500">{x.company}</p>
                      {(x.startYear || x.endYear) && (
                        <p className="text-xs text-gray-400 mt-0.5">{x.startYear || '?'} - {x.endYear || 'Present'}</p>
                      )}
                      {x.description && <p className="text-xs text-gray-500 mt-1">{x.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {(user?.linkedin || user?.github || user?.website) && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">Links</h3>
              <div className="flex flex-wrap gap-3">
                {user.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm">
                    <span>LinkedIn</span>
                  </a>
                )}
                {user.github && (
                  <a href={user.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gray-700 hover:underline text-sm">
                    <span>GitHub</span>
                  </a>
                )}
                {user.website && (
                  <a href={user.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-green-600 hover:underline text-sm">
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <Link to="/dashboard" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Headline / Title</label>
              <input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} placeholder="e.g. Senior Software Engineer" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. San Francisco, CA" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} placeholder="Tell people about yourself, your expertise, and what you can help with..." className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none" />
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
                placeholder="Add a skill and press Enter..."
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              <button type="button" onClick={addSkill} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition font-medium text-sm">Add</button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Education</h4>
            <div className="space-y-3 mb-4">
              {form.education.map((e, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{e.degree}{e.field ? ` in ${e.field}` : ''}</p>
                    <p className="text-xs text-gray-500">{e.institution}</p>
                  </div>
                  <button type="button" onClick={() => removeEducation(i)} className="text-gray-400 hover:text-red-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input value={edu.degree} onChange={(e) => setEdu({ ...edu, degree: e.target.value })} placeholder="Degree (e.g. B.Sc. Computer Science)" className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              <input value={edu.institution} onChange={(e) => setEdu({ ...edu, institution: e.target.value })} placeholder="Institution" className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              <input value={edu.field} onChange={(e) => setEdu({ ...edu, field: e.target.value })} placeholder="Field of study (optional)" className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              <div className="flex gap-2">
                <input value={edu.startYear} onChange={(e) => setEdu({ ...edu, startYear: e.target.value })} placeholder="Start Year" className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                <input value={edu.endYear} onChange={(e) => setEdu({ ...edu, endYear: e.target.value })} placeholder="End Year" className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              </div>
            </div>
            <button type="button" onClick={addEducation} className="mt-3 bg-purple-50 text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-xl transition font-medium text-sm inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Add Education
            </button>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Experience</h4>
            <div className="space-y-3 mb-4">
              {form.experiencedPreset.map((x, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                  <div>
                    <p className="font-medium text-sm text-gray-900">{x.role}</p>
                    <p className="text-xs text-gray-500">{x.company}</p>
                  </div>
                  <button type="button" onClick={() => removeExperience(i)} className="text-gray-400 hover:text-red-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input value={exp.company} onChange={(e) => setExp({ ...exp, company: e.target.value })} placeholder="Company" className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              <input value={exp.role} onChange={(e) => setExp({ ...exp, role: e.target.value })} placeholder="Role (e.g. Full Stack Developer)" className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              <div className="flex gap-2">
                <input value={exp.startYear} onChange={(e) => setExp({ ...exp, startYear: e.target.value })} placeholder="Start Year" className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                <input value={exp.endYear} onChange={(e) => setExp({ ...exp, endYear: e.target.value })} placeholder="End Year" className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              </div>
              <input value={exp.description} onChange={(e) => setExp({ ...exp, description: e.target.value })} placeholder="Brief description (optional)" className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>
            <button type="button" onClick={addExperience} className="mt-3 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-xl transition font-medium text-sm inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Add Experience
            </button>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Links & Social</h4>
            <div className="grid sm:grid-cols-3 gap-3">
              <input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} placeholder="LinkedIn URL" className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              <input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} placeholder="GitHub URL" className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="Personal Website" className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => { setEditing(false); setMsg(''); setErr(''); }} className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-200 transition font-medium">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
