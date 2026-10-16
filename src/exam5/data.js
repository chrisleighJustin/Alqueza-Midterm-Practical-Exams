export const CATEGORIES = ['Books', 'Electronics', 'Games', 'Home', 'Sports'];

// 600 generated records (requirement: at least 500)
export const PRODUCTS = Array.from({ length: 600 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: CATEGORIES[i % CATEGORIES.length],
  price: 5 + ((i * 37) % 495),
}));