import MentorList from './mentorlist';
import MenteeList from './menteelist';
import { useAuth } from '../context/authcontext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [mentorProfile, setMentorProfile] = useState(null);
  const [checkedProfile, setCheckedProfile] = useState(false);

  useEffect(() => {
    if (user?.role === 'mentor') {
      api
        .get('/api/mentors/me')
        .then((res) => setMentorProfile(res.data))
        .catch(() => setMentorProfile(null))
        .finally(() => setCheckedProfile(true));
    } else {
      setCheckedProfile(true);
    }
  }, [user?.id]);

  const needsMentorSetup = user?.role === 'mentor' && checkedProfile && !mentorProfile;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name || 'there'}!</h1>
            <p className="text-blue-100 mt-1">
              {user?.role === 'mentor' ? 'Connect with mentees eager to learn and grow.' : 'Find the perfect mentor to guide your journey.'}
            </p>
          </div>
          <div className="sm:ml-auto flex gap-3">
            <Link to="/profile" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              My Profile
            </Link>
            {user?.role === 'mentor' && (
              <Link to="/become-mentor" className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
                Mentor Setup
              </Link>
            )}
          </div>
        </div>
      </div>

      {needsMentorSetup && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-amber-800">Complete your mentor profile</h3>
            <p className="text-sm text-amber-700 mt-1">You&apos;re registered as a mentor but haven&apos;t set up your mentor profile yet. Add your bio, skills, and hourly rate to appear in the mentor directory.</p>
          </div>
          <Link to="/become-mentor" className="bg-amber-600 text-white px-5 py-2.5 rounded-xl hover:bg-amber-700 transition font-medium text-sm whitespace-nowrap">
            Set Up Now
          </Link>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {user?.role === 'mentor' ? 'Browse Mentees' : 'Browse Mentors'}
        </h2>
        <p className="text-gray-500 text-sm">
          {user?.role === 'mentor'
            ? 'Discover mentees looking for guidance across various fields.'
            : 'Discover experienced mentors across various fields.'}
        </p>
      </div>

      {user?.role === 'mentor' ? <MenteeList /> : <MentorList />}
    </div>
  );
}
