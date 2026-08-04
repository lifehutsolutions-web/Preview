import React from 'react';
import { DeviceType, ZoomLevel } from '../types';
import { preparePreviewHtml } from '../utils/preparePreviewHtml';

interface PreviewCanvasProps {
  htmlContent: string;
  device: DeviceType;
  zoom: ZoomLevel;
  refreshKey: number;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  htmlContent,
  device,
  zoom,
  refreshKey,
}) => {
  const safeHtml = preparePreviewHtml(htmlContent);

  // Compute scale multiplier based on zoom level
  const getScaleMultiplier = () => {
    if (zoom === 'fit') return 1;
    return zoom / 100;
  };

  const scale = getScaleMultiplier();

  return (
    <div className="flex-1 w-full h-full flex flex-col items-center justify-start p-2 sm:p-4 overflow-hidden bg-slate-200/50 dark:bg-slate-950/80 relative select-none">
      
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Main Responsive Viewport Container */}
      <div
        className="transition-transform duration-300 ease-out flex items-center justify-center w-full max-w-full flex-1 min-h-0 overflow-hidden my-auto z-10"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center top',
        }}
      >
        {/* DESKTOP MODE */}
        {device === 'desktop' && (
          <div className="w-full max-w-7xl h-full max-h-[calc(100vh-140px)] min-h-[480px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="flex-1 w-full h-full bg-white relative overflow-hidden">
              <iframe
                key={`desktop-${refreshKey}`}
                srcDoc={safeHtml}
                title="Desktop Preview"
                className="w-full h-full border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          </div>
        )}

        {/* TABLET MODE */}
        {device === 'tablet' && (
          <div className="w-[720px] max-w-full h-full max-h-[calc(100vh-140px)] flex flex-col items-center">
            <div className="w-full h-full bg-slate-900 dark:bg-slate-950 p-4 sm:p-5 rounded-[32px] border-2 border-slate-700/80 shadow-2xl relative flex flex-col">
              <div className="w-3 h-3 bg-slate-800 rounded-full mx-auto mb-2 shrink-0" />
              <div className="w-full flex-1 bg-white rounded-2xl overflow-hidden shadow-inner relative">
                <iframe
                  key={`tablet-${refreshKey}`}
                  srcDoc={safeHtml}
                  title="Tablet Preview"
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
              <div className="w-4 h-4 border-2 border-slate-700 rounded-full mx-auto mt-2 shrink-0" />
            </div>
          </div>
        )}

        {/* MOBILE MODE */}
        {device === 'mobile' && (
          <div className="w-[340px] max-w-full h-full max-h-[calc(100vh-140px)] flex flex-col items-center">
            <div className="w-full h-full bg-slate-900 dark:bg-slate-950 p-4 rounded-[40px] border-2 border-slate-700/80 shadow-2xl relative flex flex-col">
              <div className="w-28 h-4 bg-slate-950 rounded-full mx-auto mb-2 flex items-center justify-center gap-2 border border-slate-800 shrink-0">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900" />
              </div>
              <div className="w-full flex-1 bg-white rounded-[26px] overflow-hidden shadow-inner relative">
                <iframe
                  key={`mobile-only-${refreshKey}`}
                  srcDoc={safeHtml}
                  title="Mobile Preview"
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>
              <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-2 shrink-0" />
            </div>
          </div>
        )}

      </div>

    </div>
  );
};


