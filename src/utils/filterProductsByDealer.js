
export default function filterProductsByDealer(dealer, allProducts) {
  if (!dealer) return [];

  const allowedCategories = ['Generic'];

  if (dealer.Type === 'WLD' && dealer['WLD Category']) {
    allowedCategories.push(dealer['WLD Category']);
  }

  return allProducts.filter(p => allowedCategories.includes(p.category));
}
