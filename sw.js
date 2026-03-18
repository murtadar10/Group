const CACHE_NAME = 'algebra-realms-v1';

// قائمة بجميع ملفات مشروعك المأخوذة من مخططك الدقيق
const urlsToCache = [
  // الملفات الأساسية
  '/',
  '/index.html',
  '/compos.html',
  '/realm_Z.html',
  '/realm_R.html',
  '/realm_R2.html',
  '/realm_C.html',
  '/realm_GLn.html',
  '/grand_arena.html',
  '/homo.html',
  '/infinite_world.html',
  '/manifest.json',

  // ملفات الجافاسكربت (backEnd)
  '/backEnd/main.js',
  '/backEnd/zngroup.js',
  '/backEnd/clacOfZn.js',
  '/backEnd/Un.js',
  '/backEnd/permutition.js',
  '/backEnd/symmetryGroupD4.js',
  '/backEnd/Quotient.js',
  '/backEnd/jordenHolder.js',
  '/backEnd/isGroup.js',
  '/backEnd/sylow.js',
  '/backEnd/kelly.js',
  '/backEnd/infinite_logic.js',
  '/backEnd/solv.js',

  // ملفات التصميم (frontEnd)
  '/frontEnd/main.css',
  '/frontEnd/zn.css',
  '/frontEnd/calcOfZn.css',
  '/frontEnd/Un.css',
  '/frontEnd/permutition.css',
  '/frontEnd/symmetryGroupD4.css',
  '/frontEnd/Quotien.css',
  '/frontEnd/Jorden.css',
  '/frontEnd/isGroup.css',
  '/frontEnd/kelly.css',
  '/frontEnd/infinite_style.css',

  // ملفات الصور (photos)
  '/photos/icon.png',
  '/photos/front.jpg',
  '/photos/image.png',
  '/photos/interface.jpg',
  '/photos/interface1.jpg',
  '/photos/interfac1e.jpg',
  '/photos/lp.jpg',
  '/photos/momo.JPG',
  '/photos/myDad.png',
  '/photos/tele.png',
  '/photos/Untitled-1.png',
  '/photos/Untitled-3.png'
  // ملاحظة: أضف أسماء صور الـ png-clipart الثلاثة هنا بشكلها الدقيق مثل:
  // '/photos/png-clipart-1.png',
  // '/photos/png-clipart-2.png',
  // '/photos/png-clipart-3.png'
];

// 1. تثبيت التطبيق وحفظ الملفات في الذاكرة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم فتح الذاكرة وجاري حفظ الملفات...');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. تفعيل التطبيق وتنظيف أي نسخ قديمة
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. جلب الملفات من الذاكرة عند انقطاع الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إرجاع الملف من الذاكرة إذا كان موجوداً
        if (response) {
          return response;
        }
        // جلبه من الإنترنت إذا لم يكن في الذاكرة
        return fetch(event.request);
      })
  );
});