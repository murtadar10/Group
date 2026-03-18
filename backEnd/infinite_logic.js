// ==========================================
// Infinite Universe Logic & Data
// ==========================================

// قاعدة بيانات الزمر (مجرة كاملة)
const groupsDatabase = [
    {
        id: "Z_plus",
        title: "$\\mathbb{Z}$",
        name: "Realm of Integers",
        desc: "الأساسيات والمولدات، بداية الرحلة اللانهائية.",
        locked: false // الباب الأول مفتوح
    },
    {
        id: "R_plus",
        title: "$\\mathbb{R}$",
        name: "The Continuous Plane",
        desc: "عالم الأعداد الحقيقية الكثيفة.",
        locked: false
    },
    {
        id: "R2",
        title: "$\\mathbb{R}^2$",
        name: "The Vector Plane",
        desc: "المتجهات والجمع الهندسي.",
        locked: false
    },
    {
        id: "GLn",
        title: "$GL_n(\\mathbb{R})$",
        name: "The Matrix Dimension",
        desc: "عالم المصفوفات غير الإبدالية.",
        locked: false
    },
        {
        id: "C_star",
        title: "$\\mathbb{C}^*$",
        name: "Complex Circle",
        desc: "الأعداد المركبة وجذور الوحدة.",
        locked: false
    }
];

// دالة لرسم الأبواب السحرية في واجهة الهاتف
function renderCosmicMap() {
    const container = document.getElementById('doorsContainer');
    container.innerHTML = ""; // تنظيف الحاوية

    groupsDatabase.forEach(group => {
        // إنشاء البطاقة
        const door = document.createElement('div');
        door.className = `magic-door ${group.locked ? 'locked' : ''}`;
        
        // عند لمس البطاقة
        door.onclick = () => {
            if (group.locked) {
                alert("هذا العالم مقفل! أكمل العوالم السابقة أولاً لفك القفل.");
            } else {
                enterRealm(group.id);
            }
        };

        // محتوى البطاقة
        let badgeHtml = group.locked ? `<div class="locked-badge">LOCKED</div>` : '';
        door.innerHTML = `
            ${badgeHtml}
            <div class="door-title">${group.title}</div>
            <div class="door-desc">
                <strong>${group.name}</strong><br><br>
                ${group.desc}
            </div>
        `;

        container.appendChild(door);
    });

    // تفعيل MathJax لرسم المعادلات في العناوين
    if (window.MathJax) {
        MathJax.typesetPromise([container]).catch((err) => console.log(err.message));
    }
}

// دالة الدخول للعالم المحدد
function enterRealm(realmId) {
    if (realmId === "Z_plus") {
        // سيتم تحويل المستخدم إلى صفحة عالم Z
         window.location.href = "realm_Z.html";
    }
        else if (realmId === "R_plus") {
         window.location.href = "realm_R.html";
        
    }
        else if (realmId === "R2") {
         window.location.href = "realm_R2.html";
    }
        else if (realmId === "GLn") {
         window.location.href = "realm_GLn.html";
    }
        else if (realmId === "C_star") {
         window.location.href = "realm_C_star.html";
    }


}

// تشغيل دالة الرسم بمجرد تحميل الصفحة
document.addEventListener("DOMContentLoaded", renderCosmicMap);