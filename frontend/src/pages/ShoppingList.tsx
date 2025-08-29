import React, { useState, useEffect } from 'react';
import {
  PlusIcon,
  CheckIcon,
  TrashIcon,
  ShoppingCartIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { ShoppingItem } from '../types';

const ShoppingList: React.FC = () => {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    unit: '',
    category: 'other' as ShoppingItem['category'],
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
      setShoppingItems([
        {
          id: '1',
          name: '양파',
          quantity: 2,
          unit: '개',
          isCompleted: false,
          category: 'vegetable',
        },
        {
          id: '2',
          name: '당근',
          quantity: 3,
          unit: '개',
          isCompleted: false,
          category: 'vegetable',
        },
        {
          id: '3',
          name: '닭가슴살',
          quantity: 500,
          unit: 'g',
          isCompleted: true,
          category: 'meat',
        },
        {
          id: '4',
          name: '우유',
          quantity: 2,
          unit: '팩',
          isCompleted: false,
          category: 'dairy',
        },
        {
          id: '5',
          name: '계란',
          quantity: 10,
          unit: '개',
          isCompleted: false,
          category: 'dairy',
        },
        {
          id: '6',
          name: '김치',
          quantity: 1,
          unit: '봉',
          isCompleted: true,
          category: 'vegetable',
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
      category: 'other',
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Edit existing item
      setShoppingItems(prev =>
        prev.map(item =>
          item.id === editingId
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );
    } else {
      // Add new item
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        ...formData,
        isCompleted: false,
      };
      setShoppingItems(prev => [...prev, newItem]);
    }
    
    resetForm();
    setShowAddForm(false);
  };

  const handleEdit = (item: ShoppingItem) => {
    setFormData({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      category: item.category,
    });
    setEditingId(item.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setShoppingItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const toggleComplete = (id: string) => {
    setShoppingItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
  };

  const clearCompleted = () => {
    if (window.confirm('완료된 항목을 모두 삭제하시겠습니까?')) {
      setShoppingItems(prev => prev.filter(item => !item.isCompleted));
    }
  };

  const generateShoppingList = () => {
    // This would typically call an API to generate a shopping list
    // based on weekly meal plan and current ingredients
    alert('주간 식단을 기반으로 장보기 목록이 생성되었습니다!');
  };

  const filteredItems = shoppingItems.filter(item => {
    if (filter === 'pending') return !item.isCompleted;
    if (filter === 'completed') return item.isCompleted;
    return true;
  });

  const completedCount = shoppingItems.filter(item => item.isCompleted).length;
  const totalCount = shoppingItems.length;
  const pendingCount = totalCount - completedCount;

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
          <h1 className="text-2xl font-bold text-gray-900">장보기 목록</h1>
          <p className="text-gray-600">필요한 재료를 체크하고 효율적으로 장보기를 하세요</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={generateShoppingList}
            className="btn-secondary flex items-center space-x-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>목록 생성</span>
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowAddForm(true);
            }}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>항목 추가</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">전체 항목</p>
              <p className="text-2xl font-bold text-blue-900">{totalCount}</p>
            </div>
            <ShoppingCartIcon className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">구매 대기</p>
              <p className="text-2xl font-bold text-yellow-900">{pendingCount}</p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">구매 완료</p>
              <p className="text-2xl font-bold text-green-900">{completedCount}</p>
            </div>
            <CheckIcon className="h-8 w-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? '항목 수정' : '새 항목 추가'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상품명 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder="예: 양파, 닭가슴살"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as ShoppingItem['category'] }))}
                  className="input-field"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.emoji} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
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

      {/* Filters and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">필터:</span>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            전체 ({totalCount})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            대기 ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            완료 ({completedCount})
          </button>
        </div>
        
        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            완료된 항목 정리
          </button>
        )}
      </div>

      {/* Shopping List */}
      <div className="card">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ShoppingCartIcon className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              {filter === 'all' ? '장보기 항목이 없습니다' : 
               filter === 'pending' ? '구매 대기 항목이 없습니다' : '구매 완료 항목이 없습니다'}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {filter === 'all' ? '첫 번째 항목을 추가해보세요' : 
               filter === 'pending' ? '모든 항목을 구매 완료했습니다!' : '아직 구매한 항목이 없습니다'}
            </p>
            {filter === 'all' && (
              <button
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                className="btn-primary"
              >
                항목 추가하기
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const categoryInfo = categories.find(cat => cat.value === item.category);
              
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    item.isCompleted
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() => toggleComplete(item.id)}
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-colors ${
                        item.isCompleted
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {item.isCompleted && (
                        <CheckIcon className="w-full h-full text-white" />
                      )}
                    </button>
                    
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="text-lg">{categoryInfo?.emoji}</span>
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          item.isCompleted ? 'text-green-800 line-through' : 'text-gray-900'
                        }`}>
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {item.quantity} {item.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">장보기 팁</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 주간 식단을 먼저 계획하고 필요한 재료를 정리하세요</li>
              <li>• 유통기한이 짧은 재료부터 구매하세요</li>
              <li>• 비슷한 카테고리의 재료를 함께 구매하면 효율적입니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
