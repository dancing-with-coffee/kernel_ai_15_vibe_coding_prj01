import React, { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  UserIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { Recipe } from '../types';

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const categories = [
    { value: 'all', label: '전체', emoji: '🍽️' },
    { value: 'breakfast', label: '아침', emoji: '🌅' },
    { value: 'lunch', label: '점심', emoji: '☀️' },
    { value: 'dinner', label: '저녁', emoji: '🌙' },
    { value: 'snack', label: '간식', emoji: '🍿' },
  ];

  const difficulties = [
    { value: 'all', label: '전체' },
    { value: 'easy', label: '쉬움' },
    { value: 'medium', label: '보통' },
    { value: 'hard', label: '어려움' },
  ];

  // Mock data - will be replaced with API calls
  useEffect(() => {
    setTimeout(() => {
      const mockRecipes: Recipe[] = [
        {
          id: '1',
          name: '계란볶음밥',
          description: '간단하고 맛있는 계란볶음밥입니다. 남은 밥과 계란만 있으면 만들 수 있어요.',
          ingredients: [
            { ingredientName: '밥', quantity: 1, unit: '공기' },
            { ingredientName: '계란', quantity: 2, unit: '개' },
            { ingredientName: '대파', quantity: 1, unit: '대' },
            { ingredientName: '간장', quantity: 1, unit: '큰술' },
          ],
          instructions: [
            '대파를 잘게 썰어주세요',
            '계란을 풀어주세요',
            '팬에 기름을 두르고 계란을 스크램블해주세요',
            '밥을 넣고 간장을 넣어 볶아주세요',
            '대파를 넣고 마무리해주세요',
          ],
          cookingTime: 15,
          difficulty: 'easy',
          servings: 1,
          category: 'breakfast',
          isPremium: false,
        },
        {
          id: '2',
          name: '김치찌개',
          description: '매콤달콤한 김치찌개입니다. 김치와 돼지고기만 있으면 맛있게 만들 수 있어요.',
          ingredients: [
            { ingredientName: '김치', quantity: 200, unit: 'g' },
            { ingredientName: '돼지고기', quantity: 150, unit: 'g' },
            { ingredientName: '두부', quantity: 1, unit: '모' },
            { ingredientName: '대파', quantity: 1, unit: '대' },
          ],
          instructions: [
            '김치를 적당한 크기로 썰어주세요',
            '돼지고기를 썰어주세요',
            '냄비에 기름을 두르고 돼지고기를 볶아주세요',
            '김치를 넣고 볶아주세요',
            '물을 넣고 끓여주세요',
            '두부와 대파를 넣고 마무리해주세요',
          ],
          cookingTime: 30,
          difficulty: 'medium',
          servings: 2,
          category: 'dinner',
          isPremium: false,
        },
        {
          id: '3',
          name: '닭가슴살 샐러드',
          description: '건강하고 맛있는 닭가슴살 샐러드입니다. 다이어트 중에도 맛있게 먹을 수 있어요.',
          ingredients: [
            { ingredientName: '닭가슴살', quantity: 200, unit: 'g' },
            { ingredientName: '상추', quantity: 100, unit: 'g' },
            { ingredientName: '토마토', quantity: 1, unit: '개' },
            { ingredientName: '올리브오일', quantity: 1, unit: '큰술' },
          ],
          instructions: [
            '닭가슴살을 소금, 후추로 밑간해주세요',
            '팬에 올리브오일을 두르고 닭가슴살을 굽아주세요',
            '상추와 토마토를 썰어주세요',
            '굽은 닭가슴살을 썰어주세요',
            '모든 재료를 섞어주세요',
            '올리브오일과 소금으로 간해주세요',
          ],
          cookingTime: 20,
          difficulty: 'easy',
          servings: 1,
          category: 'lunch',
          isPremium: true,
        },
        {
          id: '4',
          name: '스파게티 카르보나라',
          description: '크림치즈와 베이컨으로 만드는 이탈리안 스파게티입니다.',
          ingredients: [
            { ingredientName: '스파게티', quantity: 200, unit: 'g' },
            { ingredientName: '베이컨', quantity: 100, unit: 'g' },
            { ingredientName: '계란 노른자', quantity: 2, unit: '개' },
            { ingredientName: '파마산 치즈', quantity: 50, unit: 'g' },
          ],
          instructions: [
            '스파게티를 삶아주세요',
            '베이컨을 굽아주세요',
            '계란 노른자와 파마산 치즈를 섞어주세요',
            '스파게티와 베이컨을 섞어주세요',
            '계란 노른자 소스를 넣고 섞어주세요',
          ],
          cookingTime: 35,
          difficulty: 'hard',
          servings: 2,
          category: 'dinner',
          isPremium: true,
        },
      ];

      setRecipes(mockRecipes);
      setFilteredRecipes(mockRecipes);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter recipes based on search and filters
  useEffect(() => {
    let filtered = recipes;

    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(recipe => recipe.difficulty === selectedDifficulty);
    }

    if (showPremiumOnly) {
      filtered = filtered.filter(recipe => recipe.isPremium);
    }

    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, selectedCategory, selectedDifficulty, showPremiumOnly]);

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
          <h1 className="text-2xl font-bold text-gray-900">레시피</h1>
          <p className="text-gray-600">다양한 레시피를 찾아보고 요리해보세요</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowPremiumOnly(!showPremiumOnly)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              showPremiumOnly
                ? 'bg-primary-100 border-primary-300 text-primary-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <StarIcon className="h-5 w-5 inline mr-2" />
            프리미엄만
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              레시피 검색
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="레시피명이나 재료를 검색하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              카테고리
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              난이도
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="input-field"
            >
              {difficulties.map(diff => (
                <option key={diff.value} value={diff.value}>
                  {diff.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          총 <span className="font-semibold">{filteredRecipes.length}</span>개의 레시피를 찾았습니다
        </p>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FunnelIcon className="h-4 w-4" />
          <span>필터 적용됨</span>
        </div>
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">레시피를 찾을 수 없습니다</h3>
          <p className="text-sm text-gray-500">
            검색어나 필터를 변경해보세요
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="card hover:shadow-lg transition-shadow">
              {/* Recipe Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getCategoryIcon(recipe.category)}</span>
                  <h3 className="font-semibold text-gray-900">{recipe.name}</h3>
                </div>
                {recipe.isPremium && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <StarIcon className="h-3 w-3 mr-1" />
                    프리미엄
                  </span>
                )}
              </div>

              {/* Recipe Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {recipe.description}
              </p>

              {/* Recipe Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {recipe.cookingTime}분
                </span>
                <span className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-1" />
                  {recipe.servings}인분
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                    recipe.difficulty
                  )}`}
                >
                  {recipe.difficulty === 'easy' ? '쉬움' : 
                   recipe.difficulty === 'medium' ? '보통' : '어려움'}
                </span>
              </div>

              {/* Ingredients Preview */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">필요 재료</h4>
                <div className="flex flex-wrap gap-1">
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                    >
                      {ingredient.ingredientName}
                    </span>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                      +{recipe.ingredients.length - 3}개 더
                    </span>
                  )}
                </div>
              </div>

              {/* Recipe Actions */}
              <div className="flex space-x-2">
                <button className="btn-primary flex-1">
                  레시피 보기
                </button>
                <button className="btn-secondary">
                  저장
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Premium Upgrade CTA */}
      {!showPremiumOnly && (
        <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <div className="text-center">
            <StarIcon className="mx-auto h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              프리미엄 레시피를 더 많이 보려면?
            </h3>
            <p className="text-gray-600 mb-4">
              AI 챗봇 추천, 영양 분석, 광고 없는 환경을 경험해보세요
            </p>
            <button className="btn-primary">
              프리미엄으로 업그레이드
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
