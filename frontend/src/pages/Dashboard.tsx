import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Recipe, Ingredient } from '../types';

const Dashboard: React.FC = () => {
  const [weeklyPlan, setWeeklyPlan] = useState<any>(null);
  const [expiringIngredients, setExpiringIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for now - will be replaced with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWeeklyPlan({
        weekStartDate: new Date(),
        meals: {
          monday: [
            {
              id: '1',
              name: '계란볶음밥',
              cookingTime: 15,
              difficulty: 'easy',
              category: 'breakfast',
            },
            {
              id: '2',
              name: '김치찌개',
              cookingTime: 30,
              difficulty: 'medium',
              category: 'dinner',
            },
          ],
          tuesday: [
            {
              id: '3',
              name: '토스트 & 스크램블에그',
              cookingTime: 10,
              difficulty: 'easy',
              category: 'breakfast',
            },
          ],
          wednesday: [
            {
              id: '4',
              name: '된장찌개',
              cookingTime: 25,
              difficulty: 'medium',
              category: 'dinner',
            },
          ],
          thursday: [
            {
              id: '5',
              name: '닭가슴살 샐러드',
              cookingTime: 20,
              difficulty: 'easy',
              category: 'lunch',
            },
          ],
          friday: [
            {
              id: '6',
              name: '스파게티 카르보나라',
              cookingTime: 35,
              difficulty: 'hard',
              category: 'dinner',
            },
          ],
          saturday: [
            {
              id: '7',
              name: '팬케이크',
              cookingTime: 20,
              difficulty: 'medium',
              category: 'breakfast',
            },
          ],
          sunday: [
            {
              id: '8',
              name: '삼겹살 구이',
              cookingTime: 40,
              difficulty: 'medium',
              category: 'dinner',
            },
          ],
        },
      });

      setExpiringIngredients([
        {
          id: '1',
          name: '우유',
          quantity: 1,
          unit: '팩',
          expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
          category: 'dairy',
          userId: 'user1',
        },
        {
          id: '2',
          name: '계란',
          quantity: 6,
          unit: '개',
          expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
          category: 'dairy',
          userId: 'user1',
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getDayName = (day: string) => {
    const dayNames: { [key: string]: string } = {
      monday: '월요일',
      tuesday: '화요일',
      wednesday: '수요일',
      thursday: '목요일',
      friday: '금요일',
      saturday: '토요일',
      sunday: '일요일',
    };
    return dayNames[day] || day;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      breakfast: '🌅',
      lunch: '☀️',
      dinner: '🌙',
      snack: '🍿',
    };
    return icons[category] || '🍽️';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">이번 주 식단</h1>
          <p className="text-gray-600">
            {weeklyPlan?.weekStartDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} ~
          </p>
        </div>
        <Link
          to="/recipes"
          className="btn-primary flex items-center space-x-2"
        >
          <CalendarIcon className="h-5 w-5" />
          <span>레시피 보기</span>
        </Link>
      </div>

      {/* Weekly Meal Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {Object.entries(weeklyPlan?.meals || {}).map(([day, meals]: [string, any]) => (
          <div key={day} className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{getDayName(day)}</h3>
              <span className="text-sm text-gray-500">
                {meals.length}개 메뉴
              </span>
            </div>
            
            <div className="space-y-2">
              {meals.map((meal: Recipe) => (
                <div
                  key={meal.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span>{getCategoryIcon(meal.category)}</span>
                        <h4 className="font-medium text-sm text-gray-900">
                          {meal.name}
                        </h4>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          {meal.cookingTime}분
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                            meal.difficulty
                          )}`}
                        >
                          {meal.difficulty === 'easy' ? '쉬움' : 
                           meal.difficulty === 'medium' ? '보통' : '어려움'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expiring Ingredients Alert */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">유통기한 임박</h3>
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
          </div>
          
          {expiringIngredients.length > 0 ? (
            <div className="space-y-3">
              {expiringIngredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">{ingredient.name}</p>
                    <p className="text-sm text-gray-600">
                      {ingredient.quantity} {ingredient.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-yellow-800">
                      {Math.ceil((ingredient.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}일 남음
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              유통기한이 임박한 재료가 없습니다.
            </p>
          )}
          
          <div className="mt-4">
            <Link
              to="/ingredients"
              className="btn-secondary w-full text-center"
            >
              재료 관리하기
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">이번 주 요약</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">총 메뉴</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {Object.values(weeklyPlan?.meals || {}).reduce((total: number, meals: any) => total + meals.length, 0)}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <ClockIcon className="h-6 w-6 text-green-600" />
                <span className="text-gray-700">평균 조리시간</span>
              </div>
              <span className="text-2xl font-bold text-green-600">
                {Math.round(
                  Object.values(weeklyPlan?.meals || {})
                    .flat()
                    .reduce((total: number, meal: any) => total + meal.cookingTime, 0) /
                  Object.values(weeklyPlan?.meals || {})
                    .flat()
                    .length
                )}분
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <UserIcon className="h-6 w-6 text-purple-600" />
                <span className="text-gray-700">프리미엄</span>
              </div>
              <span className="text-2xl font-bold text-purple-600">
                <Link to="/premium" className="text-purple-600 hover:text-purple-700">
                  업그레이드
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
