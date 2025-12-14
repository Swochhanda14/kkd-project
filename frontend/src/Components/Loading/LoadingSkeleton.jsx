import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft border border-gray-100 animate-pulse">
      <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300"></div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="flex gap-3 items-baseline">
          <div className="h-6 bg-orange-200 rounded w-20"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full max-w-7xl">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const TableRowSkeleton = () => {
  return (
    <tr className="bg-white animate-pulse">
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-8"></div>
      </td>
      <td className="p-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
        </div>
      </td>
    </tr>
  );
};

export const ButtonSkeleton = () => {
  return (
    <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl animate-pulse bg-[length:200%_100%] animate-shimmer"></div>
  );
};

