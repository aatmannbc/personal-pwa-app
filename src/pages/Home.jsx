import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import FirebaseTest from '../components/FirebaseTest';

export default function Home() {
  const authenticated = isAuthenticated();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Personal PWA App
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your personal productivity workspace - accessible anywhere, anytime
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid gap-6 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-4xl mb-6">📊</div>
            <h3 className="text-2xl font-semibold mb-4">Dashboard</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Monitor your progress and get insights into your productivity
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-4xl mb-6">📝</div>
            <h3 className="text-2xl font-semibold mb-4">Journal</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Keep track of your thoughts, ideas, and daily reflections
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-4xl mb-6">🔒</div>
            <h3 className="text-2xl font-semibold mb-4">Secure</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Your data is protected with secure authentication
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-20">
          {authenticated ? (
            <div>
              <h2 className="text-3xl font-semibold mb-8 text-gray-800">
                Welcome back! 👋
              </h2>
              <div className="space-y-4">
                <Link 
                  to="/dashboard"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl text-xl font-semibold transition-colors block w-full"
                >
                  Go to Dashboard
                </Link>
                <Link 
                  to="/journal"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl text-xl font-semibold transition-colors block w-full"
                >
                  Open Journal
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-semibold mb-8 text-gray-800">
                Ready to get started?
              </h2>
              <Link 
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-6 rounded-2xl text-xl font-semibold transition-colors block w-full"
              >
                Login to Continue
              </Link>
              <p className="mt-6 text-lg text-gray-500">
                Demo credentials: admin / admin
              </p>
            </div>
          )}
        </div>

        {/* PWA Features */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">PWA Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📱</div>
              <div>
                <h3 className="font-semibold">Mobile Friendly</h3>
                <p className="text-gray-600 text-sm">Works seamlessly on all devices</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🚀</div>
              <div>
                <h3 className="font-semibold">Fast Loading</h3>
                <p className="text-gray-600 text-sm">Optimized for quick access</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📴</div>
              <div>
                <h3 className="font-semibold">Offline Ready</h3>
                <p className="text-gray-600 text-sm">Works even without internet</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🏠</div>
              <div>
                <h3 className="font-semibold">Installable</h3>
                <p className="text-gray-600 text-sm">Add to home screen like a native app</p>
              </div>
            </div>
          </div>
        </div>

        {/* Firebase Test Component */}
        <FirebaseTest />

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500">
          <p>&copy; 2025 Personal PWA App. Built with React & Vite.</p>
        </footer>
      </div>
    </div>
  );
}
