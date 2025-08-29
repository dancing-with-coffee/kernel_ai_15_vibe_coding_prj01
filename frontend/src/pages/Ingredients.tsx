import React, { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Ingredient } from '../types';

const Ingredients: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    unit: '',
    expiryDate: '',
    category: 'other' as Ingredient['category'],
  });

  const categories = [
    { value: 'vegetable', label: '채소', emoji: '🥬' },
    { value: 'meat', label: '육류', emoji: '🥩' },
    { value: 'dairy', label: '유제품', emoji: '🥛' },
    { value: 'grain', label: '곡물', emoji: '🌾' },
    { value: 'spice', label: '조미료', emoji: '🧂' },
    { value: 'other', label: '기타', emoji: '🍽️' },
  ];

  const units = ['개', '팩', '봉', 'kg', 'g', 'ml', 'L', '컵', '큰술', '작은술'];

  // Mock data - will be replaced with API calls
  useEffect(() => {
    setTimeout(() => {
      setIngredients([
        {
          id: '1',
          name: '우유',
          quantity: 1,
          unit: '팩',
          expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          category: 'dairy',
          userId: 'user1',
        },
        {
          id: '2',
          name: '계란',
          quantity: 6,
          unit: '개',
          expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          category: 'dairy',
          userId: 'user1',
        },
        {
          id: '3',
          name: '김치',
          quantity: 1,
          unit: '봉',
          expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          category: 'vegetable',
          userId: 'user1',
        },
        {
          id: '4',
          name: '돼지고기',
          quantity: 500,
          unit: 'g',
          expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          category: 'meat',
          userId: 'user1',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      quantity: 1,
      unit: '',
      expiryDate: '',
      category: 'other',
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Edit existing ingredient
      setIngredients(prev =>
        prev.map(ing =>
          ing.id === editingId
            ? {
                ...ing,
                ...formData,
                expiryDate: new Date(formData.expiryDate),
              }
            : ing
        )
      );
    } else {
      // Add new ingredient
      const newIngredient: Ingredient = {
        id: Date.now().toString(),
        ...formData,
        expiryDate: new Date(formData.expiryDate),
        userId: 'user1', // Will come from auth context
      };
      setIngredients(prev => [...prev, newIngredient]);
    }
    
    resetForm();
    setShowAddForm(false);
  };

  const handleEdit = (ingredient: Ingredient) => {
    setFormData({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      expiryDate: ingredient.expiryDate.toISOString().split('T')[0],
      category: ingredient.category,
    });
    setEditingId(ingredient.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setIngredients(prev => prev.filter(ing => ing.id !== id));
    }
  };

  const getDaysUntilExpiry = (expiryDate: Date) => {
    const days = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getExpiryStatus = (days: number) => {
    if (days < 0) return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    if (days <= 2) return { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    if (days <= 7) return { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
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
          <h1 className="text-2xl font-bold text-gray-900">냉장고 재료</h1>
          <p className="text-gray-600">집에 있는 재료를 관리하고 유통기한을 확인하세요</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowAddForm(true);
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>재료 추가</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? '재료 수정' : '새 재료 추가'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  재료명 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder="예: 우유, 계란, 김치"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Ingredient['category'] }))}
                  className="input-field"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.emoji} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  수량 *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.1"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseFloat(e.target.value) }))}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  단위
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                  className="input-field"
                >
                  <option value="">단위 선택</option>
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  유통기한 *
                </label>
                <input
                  type="date"
                  required
                  value={formData.expiryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="input-field"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowAddForm(false);
                }}
                className="btn-secondary"
              >
                취소
              </button>
              <button type="submit" className="btn-primary">
                {editingId ? '수정' : '추가'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ingredients List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            재료 목록 ({ingredients.length}개)
          </h3>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">정렬:</span>
            <select className="input-field text-sm py-1">
              <option value="name">이름순</option>
              <option value="expiry">유통기한순</option>
              <option value="category">카테고리순</option>
            </select>
          </div>
        </div>
        
        {ingredients.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">재료가 없습니다</h3>
            <p className="text-sm text-gray-500 mb-4">
              첫 번째 재료를 추가해보세요
            </p>
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="btn-primary"
            >
              재료 추가하기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ingredients.map((ingredient) => {
              const daysUntilExpiry = getDaysUntilExpiry(ingredient.expiryDate);
              const expiryStatus = getExpiryStatus(daysUntilExpiry);
              const categoryInfo = categories.find(cat => cat.value === ingredient.category);
              
              return (
                <div
                  key={ingredient.id}
                  className={`p-4 rounded-lg border ${expiryStatus.border} ${expiryStatus.bg}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{categoryInfo?.emoji}</span>
                      <h4 className="font-medium text-gray-900">{ingredient.name}</h4>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEdit(ingredient)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ingredient.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">수량:</span>
                      <span className="font-medium">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">카테고리:</span>
                      <span className="font-medium">{categoryInfo?.label}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">유통기한:</span>
                      <span className={`font-medium ${expiryStatus.color}`}>
                        {daysUntilExpiry < 0 ? (
                          <span className="flex items-center">
                            <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                            만료됨
                          </span>
                        ) : daysUntilExpiry === 0 ? (
                          '오늘'
                        ) : (
                          `${daysUntilExpiry}일 남음`
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ingredients;
