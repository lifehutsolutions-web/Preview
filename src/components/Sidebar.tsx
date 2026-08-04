import React, { useState } from 'react';
import { ProductTemplate } from '../types';
import { X, Search, Sparkles, Star, Check, ShieldCheck, Eye, ExternalLink } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  templates: ProductTemplate[];
  currentTemplate: ProductTemplate;
  onSelectTemplate: (template: ProductTemplate) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  templates,
  currentTemplate,
  onSelectTemplate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter((t) => {
    return (
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Helper to get visually distinct rectangular thumbnail card themes
  const getCardThumbnailStyle = (t: ProductTemplate) => {
    const titleLower = t.title.toLowerCase();
    const idLower = t.id.toLowerCase();

    if (idLower.includes('restuarant') || titleLower.includes('restuarant') || titleLower.includes('restaurant')) {
      return {
        bg: 'from-amber-950 via-slate-900 to-emerald-950',
        badgeColor: 'bg-amber-500 text-slate-950',
        icon: '🍷',
        tag: 'Culinary & Bistro',
        subtitle: 'Verdant Table Organic Fine Dining',
      };
    }
    if (idLower.includes('education') || titleLower.includes('education')) {
      return {
        bg: 'from-blue-900 via-indigo-950 to-slate-900',
        badgeColor: 'bg-blue-500 text-white',
        icon: '🎓',
        tag: 'Academy & Courses',
        subtitle: 'Modern LMS & Learning Portal',
      };
    }
    if (idLower.includes('trade') || titleLower.includes('trade')) {
      return {
        bg: 'from-slate-900 via-cyan-950 to-blue-950',
        badgeColor: 'bg-cyan-500 text-slate-950',
        icon: '🚢',
        tag: 'Logistics & Trade',
        subtitle: 'Global Cargo & Customs Portal',
      };
    }
    return {
      bg: 'from-emerald-950 via-slate-900 to-teal-950',
      badgeColor: 'bg-emerald-500 text-slate-950',
      icon: '📑',
      tag: 'Business Application',
      subtitle: 'Smart Digital Quotation Suite',
    };
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
      />

      {/* Right Sidebar Panel Drawer */}
      <aside className="fixed top-16 bottom-16 right-0 z-30 w-80 sm:w-88 bg-white dark:bg-slate-900 border-l-2 border-slate-200 dark:border-slate-800 shadow-xl flex flex-col transition-all duration-300">
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              FEATURED &amp; RELATED PRODUCTS
            </span>
            <h2 className="text-sm font-black text-slate-900 dark:text-white mt-1">
              Select Template
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
            title="Close Sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-slate-100 dark:border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search related products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Rectangular Product Cards List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {filteredTemplates.map((template) => {
            const isSelected = template.id === currentTemplate.id;
            const style = getCardThumbnailStyle(template);

            return (
              <div
                key={template.id}
                className={`rounded-2xl border overflow-hidden transition-all bg-white dark:bg-slate-800/80 ${
                  isSelected
                    ? 'border-blue-500 shadow-md ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 hover:shadow-md'
                }`}
              >
                {/* Rectangular Clickable Image Preview Thumbnail */}
                <div
                  onClick={() => onSelectTemplate(template)}
                  className={`relative w-full h-32 bg-gradient-to-br ${style.bg} p-3.5 flex flex-col justify-between cursor-pointer group select-none overflow-hidden`}
                >
                  {/* Custom Thumbnail Image Background if provided */}
                  {template.thumbnailUrl && (
                    <img
                      src={template.thumbnailUrl}
                      alt={template.title}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  )}
                  {/* Subtle Overlay */}
                  <div className={`absolute inset-0 ${template.thumbnailUrl ? 'bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/40' : 'bg-[radial-gradient(#fff_1px,transparent_1px)] opacity-10 [background-size:12px_12px]'} pointer-events-none z-0`} />

                  {/* Top Bar inside Thumbnail */}
                  <div className="flex items-center justify-between z-10">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs ${style.badgeColor}`}>
                      {template.badge || 'POPULAR'}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        <Check className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  {/* Center Graphic Icon & Title inside Thumbnail */}
                  <div className="z-10 flex items-center gap-2.5 my-auto">
                    {!template.thumbnailUrl && (
                      <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl shadow-inner shrink-0">
                        {style.icon}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold truncate">
                        {template.tag || style.tag}
                      </p>
                      <h4 className="text-xs font-black text-white leading-tight truncate">
                        {template.title}
                      </h4>
                    </div>
                  </div>

                  {/* Hover Live Preview Indicator overlay */}
                  <div className="absolute inset-0 bg-blue-600/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5 z-20">
                    <Eye className="w-4 h-4 animate-bounce" />
                    <span>Click to Load Live Preview</span>
                  </div>
                </div>

                {/* Card Details below Rectangular Image */}
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {template.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-slate-700 dark:text-slate-300">{template.rating || 4.9}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      {template.originalPrice && (
                        <span className="line-through text-slate-400 text-[10px]">
                          {template.originalPrice}
                        </span>
                      )}
                      <span className="font-black text-blue-600 dark:text-blue-400 text-sm">
                        {template.price}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectTemplate(template)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {isSelected ? 'Viewing Now' : 'Select Preview'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Pure Static • Instant Delivery</span>
          </div>
        </div>

      </aside>
    </>
  );
};

