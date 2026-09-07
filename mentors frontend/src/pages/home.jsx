import { Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: 'Expert Mentors',
    description: 'Connect with industry professionals who have years of real-world experience.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: 'Skill Development',
    description: 'Get personalized guidance to develop the skills that matter most to your career.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: 'Flexible Scheduling',
    description: 'Book sessions that fit your schedule. Meet online from anywhere in the world.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: 'Achieve Goals',
    description: 'Set clear objectives and track your progress with actionable mentorship plans.',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    text: 'MentorHub connected me with a mentor who completely transformed my career trajectory. The guidance I received was invaluable.',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'James Rodriguez',
    role: 'Product Manager at Meta',
    text: 'I went from being unsure about my career path to landing my dream job in just 6 months. My mentor made all the difference.',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Aisha Patel',
    role: 'UX Designer at Figma',
    text: 'The quality of mentors on this platform is outstanding. I learned more in 3 sessions than I did in months of self-study.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

const stats = [
  { value: '500+', label: 'Expert Mentors' },
  { value: '10K+', label: 'Sessions Completed' },
  { value: '95%', label: 'Satisfaction Rate' },
  { value: '50+', label: 'Skills Covered' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="overflow-hidden">
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Trusted by 10,000+ learners
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Unlock Your Potential with
                <span className="text-blue-600 block mt-2">Expert Mentorship</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Connect with experienced professionals who can guide you through your career journey. Get personalized advice, learn new skills, and achieve your goals faster.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Link to="/dashboard" className="bg-blue-600 text-white px-8 py-3.5 rounded-xl hover:bg-blue-700 transition font-semibold text-lg shadow-lg shadow-blue-200">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="bg-blue-600 text-white px-8 py-3.5 rounded-xl hover:bg-blue-700 transition font-semibold text-lg shadow-lg shadow-blue-200">
                      Start Learning Free
                    </Link>
                    <Link to="/login" className="border-2 border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl hover:border-blue-600 hover:text-blue-600 transition font-semibold text-lg">
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-2xl shadow-blue-200">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" alt="Mentorship collaboration" className="rounded-2xl w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-bounce-slow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Session Booked!</p>
                  <p className="text-xs text-gray-500">With Dr. Emily Watson</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl animate-pulse-slow">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img src="https://i.pravatar.cc/40?img=11" alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/40?img=12" alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/40?img=13" alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">1.2K Active Now</p>
                    <div className="w-2 h-2 bg-green-500 rounded-full inline-block ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything You Need to Succeed</h2>
            <p className="mt-4 text-lg text-gray-600">Our platform provides all the tools and resources for effective mentorship.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition group border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Get started in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Create Your Profile', desc: 'Sign up and tell us about your goals, interests, and what you want to learn.' },
              { step: '02', title: 'Find Your Mentor', desc: 'Browse our curated list of mentors and find the perfect match for your needs.' },
              { step: '03', title: 'Start Learning', desc: 'Book sessions, get personalized guidance, and start achieving your goals.' },
            ].map((s) => (
              <div key={s.step} className="text-center relative">
                <div className="text-6xl font-extrabold text-blue-100 mb-4">{s.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600">Join thousands of satisfied learners and mentors.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join our community of learners and mentors today. Your future self will thank you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Link to="/dashboard" className="bg-white text-blue-600 px-8 py-3.5 rounded-xl hover:bg-blue-50 transition font-semibold text-lg shadow-lg">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="bg-white text-blue-600 px-8 py-3.5 rounded-xl hover:bg-blue-50 transition font-semibold text-lg shadow-lg">
                  Get Started Free
                </Link>
                <Link to="/login" className="border-2 border-white/50 text-white px-8 py-3.5 rounded-xl hover:bg-white/10 transition font-semibold text-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
