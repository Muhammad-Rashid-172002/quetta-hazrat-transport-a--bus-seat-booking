import React, { useState } from 'react';
import { Info, X, ExternalLink } from 'lucide-react';
import { PageRoute } from '../types/logistics';

interface DemoNoticeBannerProps {
  onNavigate: (route: PageRoute) => void;
  currentRoute: PageRoute;
}

export const DemoNoticeBanner: React.FC<DemoNoticeBannerProps> = ({ onNavigate, currentRoute }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || currentRoute === 'admin-demo') return null;

  return (
    <div className="bg-[#091524] border-b border-amber-500/20 text-xs text-slate-300 px-4 py-2">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-medium text-slate-200">Client Presentation Prototype</span>
          <span className="text-slate-500 hidden md:inline">·</span>
          <span className="text-slate-400 hidden md:inline">
            Interactive demo with sample fleet data &amp; client-side simulation.
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => onNavigate('admin-demo')}
            className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 transition-colors"
          >
            <span>Explore TMS Admin Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-slate-400 hover:text-slate-200 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
