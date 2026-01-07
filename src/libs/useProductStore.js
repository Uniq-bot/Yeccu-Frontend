import { create } from "zustand";

const products = [
  {
    id: 1,
    name: "Spalding NBA Official Game Ball",
    price: 169.99,
    image: "https://via.placeholder.com/300x300?text=NBA+Basketball",
    description: "Official NBA game basketball with premium leather",
    category: "Basketballs",
  },
  {
    id: 2,
    name: "Nike Air Jordan 1 Retro High",
    price: 189.99,
    image: "https://via.placeholder.com/300x300?text=Jordan+1",
    description: "Iconic basketball sneakers with classic design",
    category: "Footwear",
  },
  {
    id: 3,
    name: "Wilson Evolution Indoor Basketball",
    price: 69.99,
    image: "https://via.placeholder.com/300x300?text=Wilson+Ball",
    description: "Premium indoor basketball with cushion core technology",
    category: "Basketballs",
  },
  {
    id: 4,
    name: "Nike Dri-FIT Basketball Jersey",
    price: 45.99,
    image: "https://via.placeholder.com/300x300?text=Basketball+Jersey",
    description: "Moisture-wicking basketball jersey for optimal performance",
    category: "Apparel",
  },
  {
    id: 5,
    name: "Under Armour Curry 11 Shoes",
    price: 159.99,
    image: "https://via.placeholder.com/300x300?text=Curry+11",
    description: "Stephen Curry signature basketball shoes",
    category: "Footwear",
  },
  {
    id: 6,
    name: "Basketball Knee Compression Sleeves",
    price: 24.99,
    image: "https://via.placeholder.com/300x300?text=Knee+Sleeves",
    description: "Protective knee sleeves for support and compression",
    category: "Accessories",
  },
  {
    id: 7,
    name: "SKLZ Dribble Training Goggles",
    price: 19.99,
    image: "https://via.placeholder.com/300x300?text=Dribble+Goggles",
    description: "Ball handling training goggles for better court vision",
    category: "Training Equipment",
  },
  {
    id: 8,
    name: "Adidas Pro Bounce Basketball Shorts",
    price: 39.99,
    image: "https://via.placeholder.com/300x300?text=Basketball+Shorts",
    description: "Lightweight basketball shorts with moisture management",
    category: "Apparel",
  },
  {
    id: 9,
    name: "Portable Basketball Hoop System",
    price: 349.99,
    image: "https://via.placeholder.com/300x300?text=Basketball+Hoop",
    description: "Adjustable height portable basketball hoop for home use",
    category: "Training Equipment",
  },
  {
    id: 10,
    name: "Nike Elite Basketball Crew Socks",
    price: 18.99,
    image: "https://via.placeholder.com/300x300?text=Basketball+Socks",
    description: "Cushioned basketball socks with arch support",
    category: "Accessories",
  },
  {
    id: 11,
    name: "Molten FIBA Approved Basketball",
    price: 129.99,
    image: "https://via.placeholder.com/300x300?text=Molten+Ball",
    description: "FIBA approved official match basketball",
    category: "Basketballs",
  },
  {
    id: 12,
    name: "Basketball Arm Sleeve with Padding",
    price: 29.99,
    image: "https://via.placeholder.com/300x300?text=Arm+Sleeve",
    description: "Padded arm sleeve for protection and compression",
    category: "Accessories",
  },
];
const categories = [
  "All",
  "Basketballs",
  "Footwear",
  "Apparel",
  "Accessories",
  "Training Equipment",
];

export const useProductStore = create((set, get) => ({
  initialCategory: "All",
  currentCategory: "All",
  categories: categories,
  products: products,
  filteredProducts: products,
  setFilteredProducts: (filteredProducts) => set({ filteredProducts }),
  setCurrentCategory: (category) => {
    set({ currentCategory: category });
    const filtered = category === "All" 
      ? products 
      : products.filter((product) => product.category === category);
    set({ filteredProducts: filtered });
  },
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  filterProductsByCategory: () => {
    const { currentCategory } = get();
    const filtered = currentCategory === "All" 
      ? products 
      : products.filter((product) => product.category === currentCategory);
    set({ filteredProducts: filtered });
    return filtered;
  }
}));
