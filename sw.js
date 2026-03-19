const CACHE_NAME = 'algebra-realms-v1';

// قائمة بجميع ملفات مشروعك المأخوذة من مخططك الدقيق
const urlsToCache = [
  // الملفات الأساسية
  '/Group/',
  '/Group/index.html',
  '/Group/compos.html',
  '/Group/realm_Z.html',
  '/Group/realm_R.html',
  '/Group/realm_R2.html',
  '/Group/realm_C.html',
  '/Group/realm_GLn.html',
  '/Group/grand_arena.html',
  '/Group/homo.html',
  '/Group/infinite_world.html',
  '/Group/manifest.json',

  // ملفات الجافاسكربت (backEnd)
  '/Group/backEnd/main.js',
  '/Group/backEnd/zngroup.js',
  '/Group/backEnd/clacOfZn.js',
  '/Group/backEnd/Un.js',
  '/Group/backEnd/permutition.js',
  '/Group/backEnd/symmetryGroupD4.js',
  '/Group/backEnd/Quotient.js',
  '/Group/backEnd/jordenHolder.js',
  '/Group/backEnd/isGroup.js',
  '/Group/backEnd/sylow.js',
  '/Group/backEnd/kelly.js',
  '/Group/backEnd/infinite_logic.js',
  '/Group/backEnd/solv.js',

  // ملفات التصميم (frontEnd)
  '/Group/frontEnd/main.css',
  '/Group/frontEnd/zn.css',
  '/Group/frontEnd/calcOfZn.css',
  '/Group/frontEnd/Un.css',
  '/Group/frontEnd/permutition.css',
  '/Group/frontEnd/symmetryGroupD4.css',
  '/Group/frontEnd/Quotien.css',
  '/Group/frontEnd/Jorden.css',
  '/Group/frontEnd/isGroup.css',
  '/Group/frontEnd/kelly.css',
  '/Group/frontEnd/infinite_style.css',

  // ملفات الصور (photos)
  '/Group/photos/icon.png',
  '/Group/photos/front.jpg',
  '/Group/photos/image.png',
  '/Group/photos/interface.jpg',
  '/Group/photos/interface1.jpg',
  '/Group/photos/interfac1e.jpg',
  '/Group/photos/lp.jpg',
  '/Group/photos/momo.JPG',
  '/Group/photos/myDad.png',
  '/Group/photos/tele.png',
  '/Group/photos/Untitled-1.png',
  '/Group/photos/Untitled-3.png'
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