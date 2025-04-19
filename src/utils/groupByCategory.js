
export default function groupByCategory(products) {
  const grouped = {};
  products.forEach((item) => {
    const category = item.category || "Uncategorized";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(item);
  });
  return grouped;
}
