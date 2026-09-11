// Service worker placeholder to satisfy browser PWA checks cleanly
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
