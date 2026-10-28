// 24×24 stroke icons (several follow Feather Icons, MIT), reused from the first site.
export const ICONS: Record<string, string> = {
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'arrow-left': '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  phone:
    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M22 6l-10 7L2 6"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/>',
  globe:
    '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.5 2.7 3.8 6 3.8 9.5s-1.3 6.8-3.8 9.5c-2.5-2.7-3.8-6-3.8-9.5s1.3-6.8 3.8-9.5z"/>',
  whatsapp:
    '<path d="M3.5 20.5l1.3-4.3A8.6 8.6 0 1 1 8 19.4z"/><path d="M9 8.2c-.3 2.6 2.4 6 5.4 6.6.6.1 1.2-.4 1.5-1l-1.9-1.1-.9.8c-1-.4-2-1.4-2.4-2.4l.8-.9-1.1-1.9c-.6.3-1.2.9-1.4 1.9z"/>',
  wechat:
    '<path d="M16.3 9.1C15.6 6.2 12.6 4 9 4 5.1 4 2 6.6 2 9.8c0 1.8 1 3.4 2.6 4.5L4 16.5l2.6-1.3c.8.2 1.6.4 2.4.4"/><path d="M15.6 9.6c3.5 0 6.4 2.3 6.4 5.2 0 1.6-.9 3-2.3 4l.5 1.9-2.2-1.1c-.8.2-1.5.3-2.4.3-3.5 0-6.4-2.3-6.4-5.1s2.9-5.2 6.4-5.2z"/><circle cx="6.6" cy="8.6" r=".6" fill="currentColor"/><circle cx="11.2" cy="8.6" r=".6" fill="currentColor"/><circle cx="13.6" cy="14" r=".55" fill="currentColor"/><circle cx="17.6" cy="14" r=".55" fill="currentColor"/>',
  facebook: '<path d="M17.5 2.5h-3a5 5 0 0 0-5 5v3h-3v4h3v7h4v-7h3l1-4h-4v-3a1 1 0 0 1 1-1h3z"/>',
  tiktok: '<path d="M14.5 3v11.6a3.6 3.6 0 1 1-3.6-3.6"/><path d="M14.5 3c.4 2.7 2.3 4.6 5 4.9"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/>',
  file: '<path d="M14 2.5H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-11z"/><path d="M14 2.5v6h6M8 13h8M8 17h5"/>',
  play: '<circle cx="12" cy="12" r="10"/><path d="M10 8.5l6 3.5-6 3.5z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>',
  users:
    '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="17" rx="2"/><path d="M16 2.5v4M8 2.5v4M3 10h18"/>',
  // Service & category marks
  compass: '<circle cx="12" cy="12" r="9.5"/><path d="M15.8 8.2l-2.3 5.3-5.3 2.3 2.3-5.3z"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2"/>',
  document:
    '<path d="M14 2.5H6.5a1.5 1.5 0 0 0-1.5 1.5v16a1.5 1.5 0 0 0 1.5 1.5H11"/><path d="M14 2.5l5 5v4M14 2.5v5h5M8 9.5h4M8 13h6"/><circle cx="16.5" cy="16.5" r="3"/><path d="M15 19.2l-.6 2.8 2.1-1 2.1 1-.6-2.8"/>',
  translate:
    '<path d="M2.5 4h11v8H8l-3.5 3v-3h-2z"/><path d="M5.5 10l2.5-4.5 2.5 4.5M6.4 8.4h3.2"/><path d="M15.5 9.5h6v8h-2v3l-3.5-3H10.5v-3"/><path d="M14.5 12.5h4.5M16.8 11.5v1M18.5 12.5c-.5 1.8-1.8 3-3.6 3.6M15.6 13.6c.6 1 1.6 1.8 2.9 2.2"/>',
  mountain: '<path d="M1.5 20l6.5-11 4 6 2.5-3.5L22.5 20z"/><circle cx="17.5" cy="5.5" r="2"/><path d="M6.5 13.5l1.5-1.5 1.5 1.5"/>',
  truck: '<path d="M1.5 5.5h13v11h-13z"/><path d="M14.5 9.5h4l3 3.5v3.5h-7"/><circle cx="5.5" cy="18" r="1.8"/><circle cx="18" cy="18" r="1.8"/><path d="M5 8.5v5M8 8.5v5M11 8.5v5"/>',
  box: '<path d="M12 2.5l8.5 4.5v10L12 21.5 3.5 17V7z"/><path d="M3.5 7L12 11.5 20.5 7M12 11.5v10M7.8 4.8l8.5 4.5"/>',
  jar: '<path d="M8.5 2.5h7v3h-7z"/><path d="M8 5.5h8l1.5 3V19a2.5 2.5 0 0 1-2.5 2.5H9A2.5 2.5 0 0 1 6.5 19V8.5z"/><path d="M9 14c1.6-1.6 4.4-1.6 6 0-1.6 1.6-4.4 1.6-6 0zM15 14l1.6-1.1v2.2z"/>',
  briefcase: '<rect x="2.5" y="7" width="19" height="13.5" rx="1.5"/><path d="M8.5 7V4.5h7V7M2.5 12.5h19M10.5 12.5v2h3v-2"/>',
  building: '<path d="M3.5 21.5h17M5.5 21.5V5.5l7-3v19M12.5 8.5l6 2.5v10.5"/><path d="M8 8h2M8 11.5h2M8 15h2M15 13h1.5M15 16.5h1.5"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-7"/><path d="M16 7h4v4"/>',
  media: '<rect x="2.5" y="4.5" width="19" height="13" rx="1.5"/><path d="M10 8.5l4.5 2.5-4.5 2.5zM8 21.5h8"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9.5 9.5h5v5h-5zM9 2.5v3.5M15 2.5v3.5M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
  news: '<path d="M4 4.5h13v15a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2z"/><path d="M17 8.5h3v11a2 2 0 0 1-2 2M7.5 8.5h6M7.5 12h6M7.5 15.5h4"/>',
  user: '<circle cx="12" cy="8" r="4.5"/><path d="M3.5 21.5c.8-4.3 4.2-7 8.5-7s7.7 2.7 8.5 7"/>',
  elephant:
    '<path d="M3.5 19.5v-6.8C3.5 9 6.1 6.5 9.6 6.5h3.1"/><path d="M12.7 6.5c.9-1.5 2.4-2.2 4.1-2 2.6.3 4.3 2.6 3.9 5.4l-.6 5.6c-.1 1.3.9 2.1 1.9 1.4"/><path d="M12.7 6.5c-1.4 1.5-1.5 4.3.4 5.8 1 .8 2.3.9 3.4.5"/><path d="M3.5 15.5h3v4h2.6v-3.4h5.2v3.4h2.6v-5.6"/><path d="M17.8 15.6c-.8.5-1.8.5-2.6 0"/><circle cx="17.6" cy="8.4" r=".7" fill="currentColor" stroke="none"/>',
  train: '<rect x="5" y="2.5" width="14" height="14" rx="3"/><path d="M5 10h14M9 16.5l-3 5M15 16.5l3 5M7.5 19.5h9"/><circle cx="8.5" cy="13.2" r=".6" fill="currentColor"/><circle cx="15.5" cy="13.2" r=".6" fill="currentColor"/>',
  bed: '<path d="M2.5 19.5v-14M2.5 15h19v4.5M21.5 15v-3a3 3 0 0 0-3-3H10.5v6"/><circle cx="6.5" cy="11.2" r="2"/>',
  route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18h6.5a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/>',
};
