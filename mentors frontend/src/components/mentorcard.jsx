export default function MentorCard({ mentor }) {
  const name = mentor.user?.name ?? 'Unknown';
  const email = mentor.user?.email ?? '';
  const headline = mentor.user?.headline ?? '';
  const location = mentor.user?.location ?? '';
  const userSkills = mentor.user?.skills ?? [];
  const education = mentor.user?.education ?? [];
  const topEdu = education[0];
  const skills = [...new Set([...(mentor.skills || []), ...userSkills])].slice(0, 5);
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  const colors = ['bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-purple-100 text-purple-700', 'bg-orange-100 text-orange-700', 'bg-pink-100 text-pink-700'];
  const colorIdx = name.charCodeAt(0) % colors.length;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={`https://i.pravatar.cc/80?u=${email || name}`}
          alt={name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
        <div className={`w-14 h-14 rounded-full items-center justify-center font-bold text-lg hidden ${colors[colorIdx]}`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
          {headline && <p className="text-sm text-blue-600 font-medium truncate">{headline}</p>}
          <p className="text-xs text-gray-400 truncate mt-0.5">{email}</p>
        </div>
        <div className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          Available
        </div>
      </div>

      {mentor.bio && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{mentor.bio}</p>
      )}

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.map((s) => (
            <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium border border-blue-100">
              {s}
            </span>
          ))}
          {(mentor.skills?.length + userSkills.length) > 5 && (
            <span className="text-xs text-gray-400 px-2 py-1">+{(mentor.skills?.length || 0) + userSkills.length - 5} more</span>
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

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">{mentor.rating ?? '5.0'}</span>
          <span className="text-xs text-gray-400 ml-1">({Math.floor(Math.random() * 50) + 5} reviews)</span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-gray-900">${mentor.hourlyRate ?? '—'}</span>
          <span className="text-sm text-gray-400">/hr</span>
        </div>
      </div>
    </div>
  );
}
