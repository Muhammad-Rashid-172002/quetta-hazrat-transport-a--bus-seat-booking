import React, { useState, useEffect } from 'react';
import { PageRoute } from './types/logistics';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoNoticeBanner } from './components/DemoNoticeBanner';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { QuotePage } from './pages/QuotePage';
import { TrackPage } from './pages/TrackPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDemoPage } from './pages/AdminDemoPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedTrackingId, setSelectedTrackingId] = useState<string | undefined>('TRK-2026-001');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);

  // Parse initial route from URL hash or path
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      const path = window.location.pathname.replace('/', '').trim();

      const candidate = hash || path;

      if (candidate === 'admin-demo') {
        setCurrentRoute('admin-demo');
      } else if (candidate === 'services') {
        setCurrentRoute('services');
      } else if (candidate === 'about') {
        setCurrentRoute('about');
      } else if (candidate === 'quote') {
        setCurrentRoute('quote');
      } else if (candidate === 'track') {
        setCurrentRoute('track');
      } else if (candidate === 'contact') {
        setCurrentRoute('contact');
      } else {
        setCurrentRoute('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = route === 'home' ? '' : route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTrackingId = (trackingId: string) => {
    setSelectedTrackingId(trackingId);
    handleNavigate('track');
  };

  const handleSelectServiceForQuote = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    handleNavigate('quote');
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 flex flex-col font-sans">
      {/* If route is admin-demo, show TMS layout; otherwise standard consumer site layout */}
      {currentRoute === 'admin-demo' ? (
        <AdminDemoPage onNavigate={handleNavigate} />
      ) : (
        <>
          <DemoNoticeBanner onNavigate={handleNavigate} currentRoute={currentRoute} />
          <Navbar currentRoute={currentRoute} onNavigate={handleNavigate} />
          <main className="flex-1">
            {currentRoute === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onSelectTrackingId={handleSelectTrackingId}
                onSelectServiceForQuote={handleSelectServiceForQuote}
              />
            )}
            {currentRoute === 'services' && (
              <ServicesPage
                onNavigate={handleNavigate}
                onSelectServiceForQuote={handleSelectServiceForQuote}
              />
            )}
            {currentRoute === 'about' && <AboutPage onNavigate={handleNavigate} />}
            {currentRoute === 'quote' && (
              <QuotePage
                onNavigate={handleNavigate}
                preselectedServiceId={preselectedServiceId}
              />
            )}
            {currentRoute === 'track' && (
              <TrackPage
                onNavigate={handleNavigate}
                initialTrackingId={selectedTrackingId}
              />
            )}
            {currentRoute === 'contact' && <ContactPage onNavigate={handleNavigate} />}
          </main>
          <Footer onNavigate={handleNavigate} />
        </>
      )}
    </div>
  );
}
