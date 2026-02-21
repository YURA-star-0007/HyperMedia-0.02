
import React, { useState } from 'react';
import { Search, Mic, SlidersHorizontal, Star, ShoppingCart } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

interface MarketplaceProps {
  onVoiceSearch: () => void;
}

const VendorBadge: React.FC<{ vendor: Product['vendor'] }> = ({ vendor }) => {
  const colors = {
    'Amazon': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    'Flipkart': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    'AliExpress': 'bg-red-500/20 text-red-400 border-red-500/50',
  };

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors[vendor]}`}>
      {vendor}
    </span>
  );
};

const Marketplace: React.FC<MarketplaceProps> = ({ onVoiceSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState<string[]>(['Amazon', 'Flipkart', 'AliExpress']);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const toggleVendor = (vendor: string) => {
    if (selectedVendors.includes(vendor)) {
      setSelectedVendors(selectedVendors.filter(v => v !== vendor));
    } else {
      setSelectedVendors([...selectedVendors, vendor]);
    }
  };

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVendor = selectedVendors.includes(p.vendor);
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    
    return matchesSearch && matchesVendor && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 pt-4">
      {/* Marketplace Header */}
      <div className="sticky top-0 z-30 bg-zinc-950/95 backdrop-blur-md px-4 py-3 border-b border-zinc-800 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search Amazon, Flipkart, AliExpress..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={onVoiceSearch}
            className="p-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-100 transition-colors"
          >
            <Mic size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight">Marketplace</h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${showFilters ? 'bg-blue-600 border-blue-600 text-white' : 'bg-zinc-900 border-zinc-700 text-zinc-300'}`}
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-4 animate-in slide-in-from-top-2">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Vendors</p>
              <div className="flex flex-wrap gap-2">
                {['Amazon', 'Flipkart', 'AliExpress'].map(vendor => (
                  <button
                    key={vendor}
                    onClick={() => toggleVendor(vendor)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      selectedVendors.includes(vendor) 
                        ? 'bg-blue-600/20 border-blue-600 text-blue-400' 
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                    }`}
                  >
                    {vendor}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col hover:border-zinc-700 transition-colors">
              <div className="relative aspect-square bg-zinc-800">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    SALE
                  </div>
                )}
              </div>
              
              <div className="p-3 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-1">
                  <VendorBadge vendor={product.vendor} />
                  <div className="flex items-center text-yellow-400 text-[10px] font-bold">
                    <Star size={10} fill="currentColor" className="mr-0.5" />
                    {product.rating}
                  </div>
                </div>
                
                <h3 className="text-sm font-medium text-white leading-tight mb-1 line-clamp-2">{product.title}</h3>
                <p className="text-xs text-zinc-500 mb-2">{product.brand}</p>
                
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <span className="text-lg font-bold text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-zinc-500 line-through ml-2">${product.originalPrice}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => alert(`Redirecting to ${product.vendor} to buy ${product.title}`)}
                    className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-10 text-center text-zinc-500">
            <p>No products found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
