export interface User {
  id: string;
  email: string;
  name?: string;
  isPremium: boolean;
  createdAt: Date;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: Date;
  category: 'vegetable' | 'meat' | 'dairy' | 'grain' | 'spice' | 'other';
  userId: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  cookingTime: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  imageUrl?: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  isPremium: boolean;
}

export interface RecipeIngredient {
  ingredientName: string;
  quantity: number;
  unit: string;
}

export interface WeeklyMealPlan {
  id: string;
  userId: string;
  weekStartDate: Date;
  meals: {
    monday: Recipe[];
    tuesday: Recipe[];
    wednesday: Recipe[];
    thursday: Recipe[];
    friday: Recipe[];
    saturday: Recipe[];
    sunday: Recipe[];
  };
  shoppingList: ShoppingItem[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  isCompleted: boolean;
  category: 'vegetable' | 'meat' | 'dairy' | 'grain' | 'spice' | 'other';
}

export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}
