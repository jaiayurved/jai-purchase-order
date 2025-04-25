import React from 'react';

export default function Navigation({ tab, setTab, cartCount }) {
  const tabStyle = (isActive) =>
    `px-6 py-3 rounded-xl text-sm sm:text-base font-semibold shadow-sm transition-all
    ${
      isActive
        ? 'bg-blue-500 text-white shadow-md'
        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    }`;

  return (
    <div className="flex justify-center gap-3 sm:gap-6 my-6 flex-wrap">
      <button className={tabStyle(tab === 'categories')} onClick={() => setTab('categories')}>
        🗂️ Categories
      </button>

      <button className={tabStyle(tab === 'favorites')} onClick={() => setTab('favorites')}>
        ⭐ Favorites
      </button>

	<button
  className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md m-2"
  onClick={() => setCurrentView('pending')}
>
  Pending Orders
</button>
	



    </div>
  );
}
