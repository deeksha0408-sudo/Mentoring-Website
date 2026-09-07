import MenteeCard from './menteecard';
import { useEffect, useState } from 'react';
import api from '../api/api';

export default function MenteeList() {
  const [mentees, setMentees] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    api
      .get('/api/mentors/mentees')
      .then((res) => setMentees(res.data))
      .catch(() => setError('Failed to load mentees'));
  }, []);

  const allSkills = [...new Set(mentees.flatMap((m) => m.skills || []))].sort();

  const filtered = mentees.filter((m) => {
    const name = m.name?.toLowerCase() || '';
    const bio = m.bio?.toLowerCase() || '';
    const q = search.toLowerCase();
    const matchesSearch = name.includes(q) || bio.includes(q);
    const matchesSkill = !skillFilter || (m.skills || []).includes(skillFilter);
    return matchesSearch && matchesSkill;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search mentees by name or bio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition bg-white"
          />
        </div>
        <select
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition bg-white text-gray-700 min-w-[200px]"
        >
          <option value="">All Skills</option>
          {allSkills.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>
      )}

      {!error && !filtered.length && (
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <p className="text-gray-500 text-lg font-medium">No mentees found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters.</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <MenteeCard key={m._id} mentee={m} />
        ))}
      </div>
    </div>
  );
}