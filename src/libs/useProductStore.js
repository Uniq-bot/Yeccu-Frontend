import axios from "axios";
import { create } from "zustand";
import instance from "./axios";

const products = [
  {
    id: 1,
    name: "Spalding NBA Official Game Ball",
    price: 169.99,
    image:
      "https://plus.unsplash.com/premium_photo-1668767725891-58f5cd788105?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Official NBA game basketball with premium leather",
    category: "Basketballs",
  },
  {
    id: 2,
    name: "Nike Air Jordan 1 Retro High",
    price: 189.99,

    image:
      "https://images.unsplash.com/photo-1635770997779-8ec3396088a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Iconic basketball sneakers with classic design",
    category: "Footwear",
  },
  {
    id: 3,
    name: "Wilson Evolution Indoor Basketball",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1758745369561-e963bc5202fe?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Premium indoor basketball with cushion core technology",
    category: "Basketballs",
  },
  {
    id: 4,
    name: "Nike Dri-FIT Basketball Jersey",
    price: 45.99,
    image: "https://plus.unsplash.com/premium_photo-1682125393584-3fa283698143?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Moisture-wicking basketball jersey for optimal performance",
    category: "Apparel",
  },
  {
    id: 5,
    name: "Under Armour Curry 11 Shoes",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1575028051753-6d03def582c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Stephen Curry signature basketball shoes",
    category: "Footwear",
  },
  {
    id: 6,
    name: "Basketball Knee Compression Sleeves",
    price: 24.99,
    image: "https://plus.unsplash.com/premium_photo-1691377220850-b15e9c9db615?q=80&w=977&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Protective knee sleeves for support and compression",
    category: "Accessories",
  },
  {
    id: 7,
    name: "SKLZ Dribble Training Goggles",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1575066342352-2d2e8ad9787f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Ball handling training goggles for better court vision",
    category: "Training Equipment",
  },
  {
    id: 8,
    name: "Adidas Pro Bounce Basketball Shorts",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1603306293643-519d2f3b141e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Lightweight basketball shorts with moisture management",
    category: "Apparel",
  },
  {
    id: 9,
    name: "Portable Basketball Hoop System",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1694579419561-b97e025be926?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhaW5pbmdlcXVpcG1lbnRzfGVufDB8fDB8fHww",
    description: "Adjustable height portable basketball hoop for home use",
    category: "Training Equipment",
  },
  {
    id: 10,
    name: "Nike Elite Basketball Crew Socks",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1718699083699-d3c6c559f792?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlrZSUyMGJhc2tldGJhbGx8ZW58MHx8MHx8fDA%3D",
    description: "Cushioned basketball socks with arch support",
    category: "Accessories",
  },
  {
    id: 11,
    name: "Molten FIBA Approved Basketball",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1585475686930-8fcb2728eb6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyYWluaW5nZXF1aXBtZW50c3xlbnwwfHwwfHx8MA%3D%3D",
    description: "FIBA approved official match basketball",
    category: "Basketballs",
  },
  {
    id: 12,
    name: "Basketball Arm Sleeve with Padding",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1752619121909-b1d1cc81f159?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhaW5pbmdlcXVpcG1lbnRzfGVufDB8fDB8fHww",
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
  fetchPosts: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call delay
      const res= await instance.get("/api/v1/posts");
      const reg= await instance.post("/api/v1/auth/signin",{
          username:"Bigyaan",
          password:"password123"
      });
      console.log(reg)
      console.log("Fetched posts:", res.data);
      // Here you can process and set the fetched data as needed
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  setFilteredProducts: (filteredProducts) => set({ filteredProducts }),
  setCurrentCategory: (category) => {
    set({ currentCategory: category });
    const filtered =
      category === "All"
        ? products
        : products.filter((product) => product.category === category);
    set({ filteredProducts: filtered });
  },
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  filterProductsByCategory: () => {
    const { currentCategory } = get();
    const filtered =
      currentCategory === "All"
        ? products
        : products.filter((product) => product.category === currentCategory);
    set({ filteredProducts: filtered });
    return filtered;
  },
}));
