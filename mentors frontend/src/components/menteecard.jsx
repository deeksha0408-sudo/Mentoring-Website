export default function MenteeCard({ mentee }) {
  const name = mentee.name ?? 'Unknown';
  const email = mentee.email ?? '';
  const headline = mentee.headline ?? '';
  const location = mentee.location ?? '';
  const skills = mentee.skills ?? [];
  const education = mentee.education ?? [];
  const topEdu = education[0];
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  const colors = ['bg-purple-100 text-purple-700', 'bg-indigo-100 text-indigo-700', 'bg-teal-100 text-teal-700', 'bg-rose-100 text-rose-700', 'bg-cyan-100 text-cyan-700'];
  const colorIdx = name.charCodeAt(0) % colors.length;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={`https://i.pravatar.cc/80?u=${email || name}`}
          alt={name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-purple-200 transition"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
        <div className={`w-14 h-14 rounded-full items-center justify-center font-bold text-lg hidden ${colors[colorIdx]}`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
          {headline && <p className="text-sm text-purple-600 font-medium truncate">{headline}</p>}
          <p className="text-xs text-gray-400 truncate mt-0.5">{email}</p>
        </div>
        <div className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
          </svg>
          Mentee
        </div>
      </div>

      {mentee.bio && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{mentee.bio}</p>
      )}

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.slice(0, 5).map((s) => (
            <span key={s} className="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full font-medium border border-purple-100">
              {s}
            </span>
          ))}
          {skills.length > 5 && (
            <span className="text-xs text-gray-400 px-2 py-1">+{skills.length - 5} more</span>
          )}
        </div>
      )}

      {(location || topEdu) && (
        <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-500">
          {location && (
            <span className="inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {location}
            </span>
          )}
          {topEdu && (
            <span className="inline-flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
              {topEdu.institution || topEdu.degree}
            </span>
          )}
        </div>
      )}

      {mentee.bio || skills.length > 0 ? (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">Looking for mentorship</span>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition text-sm font-medium">
            Connect
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">Member since {new Date(mentee.createdAt).getFullYear()}</span>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition text-sm font-medium">
            Connect
          </button>
        </div>
      )}
    </div>
  );
}
