import React, { useState } from 'react';
import { DeviceType, ZoomLevel } from '../types';
import { Monitor, Smartphone, Tablet, Maximize2, RotateCw, ExternalLink, ZoomIn, LayoutGrid } from 'lucide-react';

interface ControlBarProps {
  device: DeviceType;
  onChangeDevice: (device: DeviceType) => void;
  zoom: ZoomLevel;
  onChangeZoom: (zoom: ZoomLevel) => void;
  onRefresh: () => void;
  onOpenNewTab: () => void;
  onToggleFullscreen: () => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  device,
  onChangeDevice,
  zoom,
  onChangeZoom,
  onRefresh,
  onOpenNewTab,
  onToggleFullscreen,
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const devices: { id: DeviceType; label: string; icon: React.ReactNode }[] = [
    { id: 'desktop', label: 'Desktop', icon: <Monitor className="w-3.5 h-3.5" /> },
    { id: 'tablet', label: 'Tablet', icon: <Tablet className="w-3.5 h-3.5" /> },
    { id: 'mobile', label: 'Mobile', icon: <Smartphone className="w-3.5 h-3.5" /> },
  ];

  const [isCustomZoom, setIsCustomZoom] = useState<boolean>(false);
  const [customInputValue, setCustomInputValue] = useState<string>(
    typeof zoom === 'number' ? String(zoom) : '100'
  );

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

  // Determine standard dropdown value
  const selectValue = isCustomZoom
    ? 'custom'
    : zoom === 'fit'
    ? 'fit'
    : [50, 75, 100, 125].includes(zoom as number)
    ? String(zoom)
    : 'custom';

  return (
    <div className="fixed top-14 left-0 right-0 z-30 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Device Switcher (Desktop, Tablet, Mobile) */}
        <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          {devices.map((d) => {
            const isActive = device === d.id;
            return (
              <button
                key={d.id}
                onClick={() => onChangeDevice(d.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                }`}
              >
                {d.icon}
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Zoom Dropdown & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Zoom Small Dropdown */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <ZoomIn className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Zoom:</span>
            
            <select
              value={selectValue}
              onChange={handleSelectZoomChange}
              className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 outline-none cursor-pointer py-0.5"
            >
              <option value="50" className="bg-white dark:bg-slate-900">50%</option>
              <option value="75" className="bg-white dark:bg-slate-900">75%</option>
              <option value="100" className="bg-white dark:bg-slate-900">100%</option>
              <option value="125" className="bg-white dark:bg-slate-900">125%</option>
              <option value="fit" className="bg-white dark:bg-slate-900">Fit Screen</option>
              <option value="custom" className="bg-white dark:bg-slate-900">Custom %</option>
            </select>

            {/* Custom Number Entry if Selected or Custom Value set */}
            {(selectValue === 'custom' || isCustomZoom) && (
              <div className="flex items-center gap-1 ml-1 pl-1 border-l border-slate-200 dark:border-slate-700">
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
                  className="w-12 px-1.5 py-0.5 text-xs font-extrabold bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md text-slate-900 dark:text-white outline-none text-center"
                />
                <span className="text-[10px] font-bold text-slate-400">%</span>
              </div>
            )}
          </div>

          {/* Featured Templates Toggle */}
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                isSidebarOpen
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Templates</span>
            </button>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <button
              onClick={onRefresh}
              title="Reload Preview Frame"
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenNewTab}
              title="Open Preview in New Window Tab"
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition flex items-center gap-1 font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden md:inline">Open New Tab</span>
            </button>

            <button
              onClick={onToggleFullscreen}
              title="Fullscreen Preview"
              className="px-2.5 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 font-bold rounded-lg transition flex items-center gap-1.5 border border-blue-200 dark:border-blue-800"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fullscreen</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

