document.addEventListener('DOMContentLoaded', function() {
  // 1. إنشاء شريط علوي (Header) وزر القائمة برمجياً للموبايل
  const header = document.createElement('div');
  header.className = 'mobile-header';
  header.innerHTML = `
    <button class="app-header" id="menu-btn">☰ عرض الزمر </button>
    <div class="header-title">Group Theory</div>
    <button id="floating-home-btn" onclick="goToHome()">الرئيسية</button>

    
  `;
  document.body.insertBefore(header, document.body.firstChild);

  // 2. إنشاء طبقة تظليل خلف القائمة (Overlay)
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  overlay.id = 'menu-overlay';
  document.body.appendChild(overlay);

  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menu-btn');

  // دوال فتح وإغلاق القائمة
  function openMenu() {
    sidebar.classList.add('expanded');
    overlay.classList.add('active');
  }

  function closeMenu() {
    sidebar.classList.remove('expanded');
    overlay.classList.remove('active');
  }

  // ربط الأزرار بالدوال
  menuBtn.addEventListener('click', openMenu);
  overlay.addEventListener('click', closeMenu);

  // إغلاق القائمة تلقائياً بمجرد النقر على أي رابط داخلها
  const menuLinks = sidebar.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});

// إيقاف لوحة المفاتيح الافتراضية للحقول التي تستخدم أزرار مخصصة داخل التطبيق
const classes = ['D4pow-secondary', 'D4pow', 'element', 'numbersOfCalcZn', 'powersOfCalcZn'];
classes.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(function(inputElement) {
        inputElement.addEventListener('focus', function(e) {
            e.target.blur(); // إلغاء التركيز لإخفاء كيبورد الموبايل
        });
    });
});

// دالة إظهار الأقسام
function showSection(sectionId) {
  const sections = document.querySelectorAll("main#main-content > section");
  sections.forEach((section) => {
    if (section.id === sectionId) {
      section.classList.remove("hidden");
      const front = document.getElementById('front');
      if (front) front.classList.add("hidden");
    } else {
      section.classList.add("hidden");
    }
  });
}

// دالة اختبار الزمرة
function toggleCustomOperation() {
  const operation = document.getElementById("operation").value;
  const customOperationGroup = document.getElementById("custom-operation-group");
  if (operation === "custom") {
    customOperationGroup.style.display = "block";
  } else {
    customOperationGroup.style.display = "none";
  }
}

// أزرار الآلة الحاسبة وزمرة Un
document.getElementById("showCalc").addEventListener("click", () => {
  let calcBack = document.getElementById("calcOfZnoverly");
  let znBack = document.getElementById("znContainer");
  if (calcBack.style.display === "none" || calcBack.style.display === "") {
    calcBack.style.display = "block";
    znBack.style.display = "none";
    UnBack.style.display = "none";
    document.getElementById('UnModeBtn').style.display = "none";
    document.getElementById("showCalc").textContent = "Hide Calculator";
    document.getElementById("showCalc").style.backgroundColor = "red";
  } else {
    calcBack.style.display = "none";
    znBack.style.display = "block";
    document.getElementById("showCalc").style.backgroundColor = "#009eff";
    document.getElementById('UnModeBtn').style.display = "inline-block";
    document.getElementById("showCalc").textContent = "Show Calculator";
  }
});

let UnBack = document.getElementById("Un");
document.getElementById("UnModeBtn").addEventListener("click", () => {
  let znBack = document.getElementById("znContainer");
  if (UnBack.style.display === "none" || UnBack.style.display === "") {
    UnBack.style.display = "block";
    znBack.style.display = "none";
    document.getElementById("UnModeBtn").textContent = "Zn Mode";
    document.getElementById("UnModeBtn").style.backgroundColor = "#000";
  } else {
    UnBack.style.display = "none";
    znBack.style.display = "block";
    document.getElementById("UnModeBtn").style.backgroundColor = "#009eff";
    document.getElementById("UnModeBtn").textContent = "Un Mode";
  }
});

function goToHome() {
    // هذه الدالة تعيدك للرئيسية وتصفر جميع الحاسبات لتبدأ من جديد
    window.location.reload(); 

}

