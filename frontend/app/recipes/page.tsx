import { Clock, Users, ChefHat, Flame, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const recipes = [
  {
    id: '1',
    title: 'Moroccan Spiced Chicken',
    description: 'Tender chicken with aromatic spices and preserved lemon',
    image: '/recipes/moroccan-chicken.jpg',
    category: 'Main Course',
    difficulty: 'Medium',
    time: '45 min',
    servings: 4,
    featured: true,
    ingredients: ['Chicken', 'Cumin', 'Coriander', 'Turmeric', 'Cinnamon', 'Preserved Lemon'],
  },
  {
    id: '2',
    title: 'Honey Almond Granola',
    description: 'Crunchy homemade granola with honey and toasted almonds',
    image: '/recipes/granola.jpg',
    category: 'Breakfast',
    difficulty: 'Easy',
    time: '30 min',
    servings: 8,
    featured: true,
    ingredients: ['Oats', 'Almonds', 'Honey', 'Cinnamon', 'Vanilla Extract'],
  },
  {
    id: '3',
    title: 'Saffron Risotto',
    description: 'Creamy Italian risotto infused with precious saffron',
    image: '/recipes/saffron-risotto.jpg',
    category: 'Main Course',
    difficulty: 'Hard',
    time: '35 min',
    servings: 4,
    featured: true,
    ingredients: ['Arborio Rice', 'Saffron Threads', 'Parmesan', 'White Wine', 'Butter'],
  },
  {
    id: '4',
    title: 'Spiced Hot Chocolate',
    description: 'Rich hot chocolate with warming spices',
    image: '/recipes/hot-chocolate.jpg',
    category: 'Dessert',
    difficulty: 'Easy',
    time: '15 min',
    servings: 2,
    featured: false,
    ingredients: ['Dark Chocolate', 'Milk', 'Cinnamon', 'Cardamom', 'Vanilla'],
  },
  {
    id: '5',
    title: 'Mediterranean Roasted Vegetables',
    description: 'Colorful vegetables with za\'atar and olive oil',
    image: '/recipes/roasted-vegetables.jpg',
    category: 'Side Dish',
    difficulty: 'Easy',
    time: '40 min',
    servings: 6,
    featured: false,
    ingredients: ['Mixed Vegetables', 'Za\'atar', 'Olive Oil', 'Garlic', 'Lemon'],
  },
  {
    id: '6',
    title: 'Pistachio Baklava',
    description: 'Layers of phyllo with honey and pistachios',
    image: '/recipes/baklava.jpg',
    category: 'Dessert',
    difficulty: 'Hard',
    time: '90 min',
    servings: 12,
    featured: true,
    ingredients: ['Phyllo Dough', 'Pistachios', 'Honey', 'Butter', 'Cinnamon'],
  },
  {
    id: '7',
    title: 'Turmeric Latte',
    description: 'Golden milk with warming spices',
    image: '/recipes/turmeric-latte.jpg',
    category: 'Beverage',
    difficulty: 'Easy',
    time: '10 min',
    servings: 1,
    featured: false,
    ingredients: ['Turmeric', 'Milk', 'Ginger', 'Cinnamon', 'Honey', 'Black Pepper'],
  },
  {
    id: '8',
    title: 'Cardamom Coffee Cake',
    description: 'Moist cake with cardamom and streusel topping',
    image: '/recipes/coffee-cake.jpg',
    category: 'Dessert',
    difficulty: 'Medium',
    time: '60 min',
    servings: 8,
    featured: false,
    ingredients: ['Flour', 'Cardamom', 'Butter', 'Sugar', 'Eggs', 'Sour Cream'],
  },
];

export default function RecipesPage() {
  const featuredRecipes = recipes.filter(r => r.featured);
  const categories = [...new Set(recipes.map(r => r.category))];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-brand/5 via-white to-brand/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 rounded-full mb-6">
              <ChefHat className="w-5 h-5 text-brand" />
              <span className="text-sm font-medium text-brand">Chef-Curated Recipes</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Culinary Inspiration
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Discover delicious recipes that showcase our premium spices, nuts, and ingredients. From everyday meals to special occasions.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-gray-200 sticky top-16 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <button className="px-6 py-2 bg-brand text-white rounded-full font-medium whitespace-nowrap">
              All Recipes
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Recipes
            </h2>
            <p className="text-lg text-gray-600">
              Staff picks and customer favorites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-brand">
                    {recipe.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-brand text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    Featured
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{recipe.description}</p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>

                  {/* Ingredients Preview */}
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <span className="px-3 py-1 bg-brand/10 text-brand text-xs rounded-full font-medium">
                        +{recipe.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Recipes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Recipes
            </h2>
            <p className="text-lg text-gray-600">
              Browse our complete collection of recipes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand transition-colors line-clamp-1">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Recipe CTA */}
      <section className="py-16 bg-brand text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ChefHat className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Share Your Recipe
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Have a great recipe using our products? We'd love to feature it on our site!
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-white text-brand rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Submit Recipe
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
