import { useState, useMemo } from "react";
import { Utensils, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/food/RestaurantCard";
import FilterTabs from "@/components/food/FilterTabs";
import { categories, filterRestaurants } from "@/data/restaurants";

const FoodGuide = () => {
  const [activeCategory, setActiveCategory] = useState("All Restaurants");

  const filteredRestaurants = useMemo(() => {
    return filterRestaurants(activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Warm food colors */}
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 py-16 md:py-20">
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
          
          <div className="container relative">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <Utensils className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Food & Dining
              </h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl">
              Discover the best eats near UW campus. From quick bites between classes to weekend brunch spots.
            </p>
          </div>
        </section>

        {/* Quick stats */}
        <section className="py-4 sm:py-6 bg-card border-b border-border">
          <div className="container">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl">🍜</span>
                <span className="text-muted-foreground">15+ restaurants</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl">💰</span>
                <span className="text-muted-foreground">Budget-friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl">🎓</span>
                <span className="text-muted-foreground">Student discounts</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Results */}
        <section className="py-8 sm:py-10 md:py-16 bg-background">
          <div className="container">
            {/* Filter Tabs */}
            <div className="mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
              <FilterTabs
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredRestaurants.length}</span> restaurants
              </p>
              {activeCategory === "Student Favorites" && (
                <div className="flex items-center gap-1.5 text-sm text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span>Top picks from UW students</span>
                </div>
              )}
            </div>

            {/* Restaurant Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  name={restaurant.name}
                  cuisine={restaurant.cuisine}
                  priceRange={restaurant.priceRange}
                  distance={restaurant.distance}
                  distanceType={restaurant.distanceType}
                  description={restaurant.description}
                  image={restaurant.image}
                  hasStudentDiscount={restaurant.hasStudentDiscount}
                  delay={0.05 + index * 0.05}
                />
              ))}
            </div>

            {/* Empty state */}
            {filteredRestaurants.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No restaurants found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-12 bg-gold-light">
          <div className="container">
            <h2 className="text-xl font-semibold mb-6 text-center">Pro Tips for Eating Near Campus</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card rounded-xl p-5 shadow-sm">
                <span className="text-2xl mb-3 block">💳</span>
                <h3 className="font-medium mb-2">Use Your Husky Card</h3>
                <p className="text-sm text-muted-foreground">Many U-District restaurants offer 10-15% student discounts. Always ask!</p>
              </div>
              <div className="bg-card rounded-xl p-5 shadow-sm">
                <span className="text-2xl mb-3 block">⏰</span>
                <h3 className="font-medium mb-2">Avoid Peak Hours</h3>
                <p className="text-sm text-muted-foreground">Popular spots get crowded 12-1pm. Eat early or late for shorter waits.</p>
              </div>
              <div className="bg-card rounded-xl p-5 shadow-sm">
                <span className="text-2xl mb-3 block">📱</span>
                <h3 className="font-medium mb-2">Check Apps</h3>
                <p className="text-sm text-muted-foreground">Use DoorDash, Uber Eats, or Snackpass for student deals and free delivery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-muted">
          <div className="container">
            <p className="text-center text-sm text-muted-foreground max-w-3xl mx-auto">
              <strong>Note:</strong> Prices, hours, and offerings may change. Some restaurants may be temporarily closed. 
              We recommend checking Google Maps or calling ahead before visiting.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FoodGuide;
