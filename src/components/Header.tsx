import React, { useState } from 'react';
import { ProductTemplate, DeviceType, ZoomLevel } from '../types';
import { Layers, Monitor, Tablet, Smartphone, ZoomIn, LayoutGrid, RotateCw, ExternalLink, Maximize2 } from 'lucide-react';

interface HeaderProps {
  currentTemplate: ProductTemplate;
  device: DeviceType;
  onChangeDevice: (device: DeviceType) => void;
  zoom: ZoomLevel;
  onChangeZoom: (zoom: ZoomLevel) => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onRefresh?: () => void;
  onOpenNewTab?: () => void;
  onToggleFullscreen?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTemplate,
  device,
  onChangeDevice,
  zoom,
  onChangeZoom,
  isSidebarOpen,
  onToggleSidebar,
  onRefresh,
  onOpenNewTab,
  onToggleFullscreen,
}) => {
  const [isCustomZoom, setIsCustomZoom] = useState<boolean>(false);
  const [customInputValue, setCustomInputValue] = useState<string>(
    typeof zoom === 'number' ? String(zoom) : '100'
  );

  const devices: { id: DeviceType; label: string; icon: React.ReactNode }[] = [
    { id: 'desktop', label: 'Desktop', icon: <Monitor className="w-3.5 h-3.5" /> },
    { id: 'tablet', label: 'Tablet', icon: <Tablet className="w-3.5 h-3.5" /> },
    { id: 'mobile', label: 'Mobile', icon: <Smartphone className="w-3.5 h-3.5" /> },
  ];

  const handleSelectZoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'fit') {
      setIsCustomZoom(false);
      onChangeZoom('fit');
    } else if (val === 'custom') {
      setIsCustomZoom(true);
    } else {
      setIsCustomZoom(false);
      const num = parseInt(val, 10);
      if (!isNaN(num)) {
        onChangeZoom(num);
        setCustomInputValue(String(num));
      }
    }
  };

  const handleCustomInputCommit = () => {
    const parsed = parseInt(customInputValue, 10);
    if (!isNaN(parsed) && parsed > 10 && parsed <= 300) {
      onChangeZoom(parsed);
    } else {
      setCustomInputValue('100');
      onChangeZoom(100);
    }
  };

  const selectValue = isCustomZoom
    ? 'custom'
    : zoom === 'fit'
    ? 'fit'
    : [50, 75, 100, 125].includes(zoom as number)
    ? String(zoom)
    : 'custom';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors h-16">
      <div className="max-w-full mx-auto px-4 py-2.5 flex items-center justify-between gap-3 h-full">
        
        {/* Left Section: Lifehut Studio Brand & Product Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Lifehut Studio Logo Badge */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-sm flex-shrink-0">
              <Layers className="w-4 h-4" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1">
                  Lifehut <span className="text-blue-600 dark:text-blue-400">Studio</span>
                </span>
                <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {currentTemplate.badge || 'PREVIEW'}
                </span>
              </div>
              
              {/* Product Title */}
              <h1 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 truncate max-w-xs sm:max-w-sm md:max-w-md">
                {currentTemplate.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Right Section: Zoom | Device Switcher | Refresh | New Tab | Fullscreen | Products */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Zoom Control Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            <ZoomIn className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline text-[11px] font-extrabold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Zoom:</span>
            
            <select
              value={selectValue}
              onChange={handleSelectZoomChange}
              className="bg-transparent text-xs font-extrabold text-slate-800 dark:text-slate-200 outline-none cursor-pointer py-0.5"
            >
              <option value="50" className="bg-white dark:bg-slate-900">50%</option>
              <option value="75" className="bg-white dark:bg-slate-900">75%</option>
              <option value="100" className="bg-white dark:bg-slate-900">100%</option>
              <option value="125" className="bg-white dark:bg-slate-900">125%</option>
              <option value="fit" className="bg-white dark:bg-slate-900">Fit Screen</option>
              <option value="custom" className="bg-white dark:bg-slate-900">Custom %</option>
            </select>

            {(selectValue === 'custom' || isCustomZoom) && (
              <div className="flex items-center gap-1 ml-1 pl-1 border-l border-slate-300 dark:border-slate-700">
                <input
                  type="number"
                  min="20"
                  max="250"
                  value={customInputValue}
                  onChange={(e) => setCustomInputValue(e.target.value)}
                  onBlur={handleCustomInputCommit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCustomInputCommit();
                  }}
                  className="w-11 px-1 py-0.5 text-xs font-black bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white outline-none text-center"
                />
                <span className="text-[10px] font-bold text-slate-400">%</span>
              </div>
            )}
          </div>

          {/* Desktop | Tablet | Mobile Device Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
            {devices.map((d) => {
              const isActive = device === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => onChangeDevice(d.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/60'
                  }`}
                  title={`View in ${d.label} mode`}
                >
                  {d.icon}
                  <span className="hidden md:inline">{d.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Icons: Refresh | Open New Tab | Full Screen */}
          <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-2">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                title="Reload Preview"
              >
                <RotateCw className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>
            )}

            {onOpenNewTab && (
              <button
                onClick={onOpenNewTab}
                className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 border border-blue-500 transition shadow-2xs cursor-pointer"
                title="Open preview in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}

            {onToggleFullscreen && (
              <button
                onClick={onToggleFullscreen}
                className="p-1.5 rounded-lg bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-900 dark:hover:bg-white border border-slate-700 dark:border-slate-200 transition shadow-2xs cursor-pointer"
                title="View Full Screen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Toggle Featured Products Sidebar Button */}
          <button
            onClick={onToggleSidebar}
            title="Toggle Featured Products Sidebar"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
              isSidebarOpen
                ? 'bg-blue-50 text-blue-600 border-blue-300 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden lg:inline">Products</span>
          </button>

        </div>

      </div>
    </header>
  );
};


