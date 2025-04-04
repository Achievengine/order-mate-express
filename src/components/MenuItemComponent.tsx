
import React from 'react';
import { MenuItem } from '@/types';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ItemDetailDialog } from '@/components/ItemDetailDialog';
import { Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

interface MenuItemComponentProps {
  item: MenuItem;
}

export const MenuItemComponent: React.FC<MenuItemComponentProps> = ({ item }) => {
  const { addItem } = useCart();
  const { theme } = useTheme();
  
  // Function to generate a different image for each item based on its ID
  const getRandomFoodImage = (id: string) => {
    const foodImages = [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", // Pizza
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", // Burger
      "https://images.unsplash.com/photo-1562967914-608f82629710", // Chicken
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d", // Fries
      "/lovable-uploads/e66c6a9e-63eb-4bd4-a5d0-61c8a2bce69b.png", // Dal
      "/lovable-uploads/6f5e2fa0-aae5-4b1d-b109-d17950f3202f.png", // Pasta
      "https://images.unsplash.com/photo-1551024506-0bccd828d307", // Dessert
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87"  // Drink
    ];
    
    // Use the item's ID to consistently pick the same image for the same item
    const hashCode = id.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    return foodImages[hashCode % foodImages.length];
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(item, 1);
    toast.success(`Added ${item.name} to cart`);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg ${
          theme === 'dark' ? 'bg-gray-800 shadow-emerald-500/10' : 'bg-white shadow-sm'
        }`}>
          {item.featured && (
            <span className="absolute top-2 right-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs px-2 py-0.5 rounded-full z-10">
              Featured
            </span>
          )}
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={item.image || getRandomFoodImage(item.id)} 
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{item.name}</h3>
                <p className={`text-xs my-0.5 line-clamp-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{item.description}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xs font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>${item.price.toFixed(2)}</span>
                <button 
                  className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center text-white ${
                    theme === 'dark' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-500 hover:bg-emerald-600'
                  } transition-colors`}
                  aria-label="Add to cart"
                  onClick={handleAddToCart}
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <ItemDetailDialog item={item} />
      </DialogContent>
    </Dialog>
  );
};
