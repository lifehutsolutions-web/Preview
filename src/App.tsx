import React, { useState, useEffect } from 'react';
import { ProductTemplate, DeviceType, ZoomLevel } from './types';
import { sampleTemplates } from './data/templates';
import { Header } from './components/Header';
import { ControlBar } from './components/ControlBar';
import { PreviewCanvas } from './components/PreviewCanvas';
import { Sidebar } from './components/Sidebar';
import { FooterCTA } from './components/FooterCTA';
import { FullscreenModal } from './components/FullscreenModal';

export default function App() {
  const [templates, setTemplates] = useState<ProductTemplate[]>(sampleTemplates);
  const [currentTemplate, setCurrentTemplate] = useState<ProductTemplate>(sampleTemplates[0]);
  const [activeHtml, setActiveHtml] = useState<string>(sampleTemplates[0].htmlContent);
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [zoom, setZoom] = useState<ZoomLevel>(100);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(true);

  // Fetch backend templates from /api/templates (or fallback to static templates)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const targetId = searchParams.get('template') || searchParams.get('id');

    // Instantly check URL matching on static templates (Cloudflare Pages support)
    if (targetId && sampleTemplates.length > 0) {
      const matched = sampleTemplates.find(
        (t) => t.id.toLowerCase() === targetId.toLowerCase()
      );
      if (matched) {
        setCurrentTemplate(matched);
        setActiveHtml(matched.htmlContent);
      }
    }

    async function loadBackendTemplates() {
      try {
        const response = await fetch('/api/templates');
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data: ProductTemplate[] = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              setTemplates(data);

              const matched = data.find(
                (t) => t.id.toLowerCase() === targetId?.toLowerCase()
              );

              const initial = matched || data[0];
              setCurrentTemplate(initial);
              setActiveHtml(initial.htmlContent);
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch backend templates, using static presets:', err);
      } finally {
        setIsLoadingTemplates(false);
      }
    }

    loadBackendTemplates();
  }, []);

  // Sync active HTML when switching template
  const handleSelectTemplate = (template: ProductTemplate) => {
    setCurrentTemplate(template);
    setActiveHtml(template.htmlContent);
    setRefreshKey((prev) => prev + 1);

    // Update URL query parameter
    const url = new URL(window.location.href);
    url.searchParams.set('template', template.id);
    window.history.pushState({}, '', url.toString());
  };

  // Toggle Dark Theme class on <html> element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle Refresh Action
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Handle Open New Tab with Blob Preview
  const handleOpenNewTab = () => {
    const blob = new Blob([activeHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  // Handle Copy HTML Code
  const handleCopyHtml = () => {
    navigator.clipboard.writeText(activeHtml);
  };

  // Handle Download HTML file
  const handleDownloadHtml = () => {
    const blob = new Blob([activeHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentTemplate.downloadFilename || 'lifehut-preview-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500 selection:text-white transition-colors">
      
      {/* 1. Fixed Top Header Banner (Lifehut Studio | Product Title ... Controls & Actions) */}
      <Header
        currentTemplate={currentTemplate}
        device={device}
        onChangeDevice={setDevice}
        zoom={zoom}
        onChangeZoom={setZoom}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onRefresh={handleRefresh}
        onOpenNewTab={handleOpenNewTab}
        onToggleFullscreen={() => setIsFullscreen(true)}
      />

      {/* 2. Main Work Area: Preview Canvas on Left/Center, Featured Products Sidebar on Right */}
      <div className="flex-1 pt-16 pb-16 flex overflow-hidden relative">
        
        {/* Preview Area Stage */}
        <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:mr-80' : 'mr-0'}`}>
          <PreviewCanvas
            htmlContent={activeHtml}
            device={device}
            zoom={zoom}
            refreshKey={refreshKey}
          />
        </main>

        {/* Featured Products Right Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          templates={templates}
          currentTemplate={currentTemplate}
          onSelectTemplate={(tmpl) => {
            handleSelectTemplate(tmpl);
          }}
        />

      </div>

      {/* 3. Fixed Bottom CTA Bar (Centered Download Button) */}
      <FooterCTA
        currentTemplate={currentTemplate}
        onCopyHtml={handleCopyHtml}
        onDownloadHtml={handleDownloadHtml}
      />

      {/* 4. Fullscreen Modal */}
      <FullscreenModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        htmlContent={activeHtml}
        device={device}
        onChangeDevice={setDevice}
        refreshKey={refreshKey}
        onRefresh={handleRefresh}
      />

    </div>
  );
}
