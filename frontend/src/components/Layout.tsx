import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  CubeIcon,
  BookOpenIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const Layout: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: '대시보드', href: '/', icon: HomeIcon },
    { name: '냉장고 재료', href: '/ingredients', icon: CubeIcon },
    { name: '레시피', href: '/recipes', icon: BookOpenIcon },
    { name: '장보기 목록', href: '/shopping-list', icon: ShoppingCartIcon },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <nav className="flex justify-around py-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-primary-600">주간 레시피</h1>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          {/* User Profile */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserIcon className="h-8 w-8 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {user?.email}
                </p>
                <button
                  onClick={handleSignOut}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
