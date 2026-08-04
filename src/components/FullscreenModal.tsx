import React from 'react';
import { DeviceType } from '../types';
import { Minimize2, RotateCw, Monitor, Smartphone, Tablet } from 'lucide-react';
import { preparePreviewHtml } from '../utils/preparePreviewHtml';

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
  device: DeviceType;
  onChangeDevice: (device: DeviceType) => void;
  refreshKey: number;
  onRefresh: () => void;
}

export const FullscreenModal: React.FC<FullscreenModalProps> = ({
  isOpen,
  onClose,
  htmlContent,
  device,
  onChangeDevice,
  refreshKey,
  onRefresh,
}) => {
  if (!isOpen) return null;

  const safeHtml = preparePreviewHtml(htmlContent);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-in fade-in">
      
      {/* Floating Control Toolbar */}
      <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider bg-blue-600 px-2.5 py-0.5 rounded-full">
            FULLSCREEN PREVIEW
          </span>
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => onChangeDevice('desktop')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 ${
                device === 'desktop' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              onClick={() => onChangeDevice('tablet')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 ${
                device === 'tablet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" /> Tablet
            </button>
            <button
              onClick={() => onChangeDevice('mobile')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 ${
                device === 'mobile' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
            title="Reload Frame"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5 shadow-md"
          >
            <Minimize2 className="w-4 h-4" />
            <span>Exit Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Main Full Viewport Frame */}
      <div className="flex-1 w-full h-full bg-white relative overflow-hidden">
        <iframe
          key={`fullscreen-${refreshKey}`}
          srcDoc={safeHtml}
          title="Fullscreen Live Preview"
          className="w-full h-full border-0 bg-white"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>

    </div>
  );
};
