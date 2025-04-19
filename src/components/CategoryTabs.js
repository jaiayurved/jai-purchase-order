const categories = [ "चूर्ण " ,  "तैल", "वटी गुटिका", "अवलेह", "पाक" ,"Gugglu", "Patent" ];

export default function CategoryTabs({ currentCategory, onSelect }) {
  return (
    <div className="sticky top-0 z-20 bg-gray-50 py-3 shadow-sm">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-6 py-3 rounded-2xl text-lg font-semibold transition-all duration-200 shadow-md ${
              cat === currentCategory
                ? "bg-blue-500 text-white scale-105"
                : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
