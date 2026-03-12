//شلعن كلبي
const modulusInput = document.getElementById("modulus");
const modulus = parseInt(modulusInput.value);

let Arryofsubgps = [];

// دالة للتحقق مما إذا كان العدد أوليًا
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// دالة لحساب القاسم المشترك الأكبر
function gcd(a, b) {
  while (b !== 0) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// دالة لحساب الأوردر
function Order(elemen, modulus) {
  let order = modulus / gcd(elemen, modulus);
  return order;
}

// دالة لحساب الزمر الجزئية في الزمرة المعيارية
function calculateSubgroups(modulus) {
  let subgroups = [];
  for (let i = 2; i < modulus; i++) {
    if (modulus % i === 0) {
      subgroups.push(i);
    }
  }
  if (isPrime(modulus)) {
    subgroups.push("haven't subgroups because it is a prime group");
  }
  return subgroups;
}

// دالة لحساب المولدات في الزمرة المعيارية
function calculateGenerators(modulus) {
  let generators = [];
  for (let i = 1; i < modulus; i++) {
    if (gcd(modulus, i) === 1) {
      generators.push(i);
    }
  }
  if (generators.length === 0) {
    generators.push("haven't generators");
  }
  return generators;
}

// دالة لحساب جميع الزمر الجزئية
function calculateAllSubgroups(modulus) {
  let AllSubgroups = [];
  for (let i = 2; i < modulus; i++) {
    if (gcd(modulus, i) === 1) {
      continue;
    } else {
      AllSubgroups.push(i);
    }
  }
  if (AllSubgroups.length === 0) {
    AllSubgroups.push("haven't subgroups");
  }
  return AllSubgroups;
}

// دالة لحساب (a^b) % c
function modExp(a, b, c) {
  let result = 1;
  a = a % c;
  while (b > 0) {
    if (b % 2 === 1) {
      result = (result * a) % c;
    }
    b = Math.floor(b / 2);
    a = (a * a) % c;
  }
  return result;
}
function calculateUn(n) {
  let Un = [];
  for (let i = 1; i < n; i++) {
    if (gcd(i, n) === 1) {
      Un.push(i);
    }
  }

  return Un;
}

// دالة لتنفيذ الحسابات وعرض النتائج
function calculateZn() {
  let elems = document.getElementById("AllElement");

  elems.style.display = "none";

  const modulusInput = document.getElementById("modulus");
  const modulus = parseInt(modulusInput.value);
  let groupelements = [];
  for (let i = 0; i < modulus; i++) {
    groupelements.push(i);
  }

  if (isNaN(modulus) || modulus <= 1) {
    alert("يرجى إدخال قيمة صحيحة أكبر من 1.");
    return;
  }

  const subgroups = calculateSubgroups(modulus);
  const generators = calculateGenerators(modulus);
  const AllSubgroups = calculateAllSubgroups(modulus);

  document.getElementById("groupElements").innerHTML =
    `<span class="label">Z${modulus} =</span> { ${groupelements.join(", ")} }`;
  document.getElementById("subgroups").innerHTML =
    `<span class="label">Proper subgroups =</span> { ${subgroups.map((item) => `<${item}>`).join(", ")} }`;

  document.getElementById("AllSubgroups").innerHTML =
    `<span class="label">All subgroups =</span> { ${AllSubgroups.map((item) => `<${item}>`).join(", ")} }`;
  document.getElementById("generators").innerHTML =
    `<span class="label">Generators =</span> { ${generators.map((item) => `<${item}>`).join(", ")} }`;
}

// دالة لتوليد العناصر المولدة
function gener(ele, mod) {
  const generatedSet = [0];

  let current = ele;
  for (let i = 1; i < mod; i++) {
    generatedSet[i] = current;
    current = (current + ele) % mod;
    if (current === 0) break; // إذا وصلنا إلى العنصر المحايد
  }

  let returned = new Set(generatedSet);

  return Array.from(returned).sort((a, b) => a - b);
}






// دالة لحساب الأوردرات لجميع العناصر وعرض التفاصيل

// دالة لحساب الأوردرات لجميع العناصر وعرض التفاصيل
let detailsVisible = false; // متغير لتتبع حالة التفاصيل

function allOrders() {
  const modulusInput = document.getElementById("modulus");
  const modulus = parseInt(modulusInput.value);
  
  // حماية إضافية: إذا كان الحقل فارغاً لا تفعل شيئاً
  if (isNaN(modulus) || modulus <= 1) return;

  let groupelements = [];
  for (let i = 0; i < modulus; i++) {
    groupelements.push(i);
  }

  let Arryoforders = [];
  let Arryofsubgps = [];

  // حساب الأوردرات بالـ LaTeX
  for (let i = 0; i < groupelements.length; i++) {
    Arryoforders.push(
      `Order of $${i}$ : $$|${i}| = \\frac{${modulus}}{\\gcd(${i}, ${modulus})} = \\frac{${modulus}}{${gcd(i, modulus)}} = ${modulus / gcd(i, modulus)}$$`
    );
  }

  // حساب الزمر الجزئية (المولدات) بالـ LaTeX لتبدو احترافية
  for (let i = 0; i < modulus; i++) {
    // استخدمنا join لترتيب الأرقام بفواصل بشكل أنيق
    Arryofsubgps.push(`Subgroup: $$\\langle ${i} \\rangle = \\{ ${gener(i, modulus).join(', ')} \\}$$`);
  }

  let can = document.createElement("div");
  let can2 = document.createElement("div");
  can.classList.add("can");
  can2.classList.add("can2");

  // إضافة قانون الأوردر كمعادلة أنيقة
  let ordrLaw = document.createElement("p");
  ordrLaw.innerHTML = "<strong>Order Law:</strong> $$|a| = \\frac{n}{\\gcd(a,n)}$$";
  can.appendChild(ordrLaw);

  // إنشاء العناصر للأوامر (استخدام innerHTML هو السر!)
  Arryoforders.forEach((item) => {
    let p = document.createElement("p");
    p.classList.add("order");
    p.innerHTML = item; // تم التعديل هنا
    can.appendChild(p);
  });

  // إنشاء العناصر للزمر الجزئية
  Arryofsubgps.forEach((item) => {
    let p2 = document.createElement("p");
    p2.classList.add("subgroups");
    p2.innerHTML = item; // تم التعديل هنا
    can2.appendChild(p2);
  });

  // حذف أي محتوى سابق
  const allElementContainer = document.getElementById("AllElement");

  if (!detailsVisible) {
    // عرض التفاصيل
    allElementContainer.innerHTML = ""; // مسح المحتوى السابق

    allElementContainer.appendChild(can);
    
    // فاصل أنيق بين الأوردرات والزمر
    let divider = document.createElement("p");
    divider.innerHTML = "<br><strong>Generated Subgroups ==================</strong><br>";
    allElementContainer.appendChild(divider);
    
    allElementContainer.appendChild(can2);
  }

  detailsVisible = !detailsVisible; // تغيير حالة التفاصيل

  // السطر السحري: إجبار المتصفح على رسم المعادلات فوراً بعد إضافتها للشاشة
  if (window.MathJax) {
    MathJax.typesetPromise([allElementContainer]).catch((err) => console.log(err.message));
  }
}
document.getElementById("allElements").addEventListener("click", (e) => {
  let elems = document.getElementById("AllElement");
  if (elems.style.display === "block") {
    elems.style.display = "none";
    document.getElementById("allElements").textContent = "show More";
  } else {
    elems.style.display = "block";
    document.getElementById("allElements").textContent = "show less";
  }
});
document.getElementById("ShowResultOfZn").addEventListener("click", (e) => {
  document.getElementById("resultsOfZn").style.display = "block";
  calculateZn();
});

document.getElementById("kellyTableZn").addEventListener("click", () => {
  let table = document.getElementById("kleinTable");
  if (table.style.display === "block") {
    table.style.display = "none";
    document.getElementById("kellyTableZn").textContent = "show table";
  } else {
    table.style.display = "block";
    document.getElementById("kellyTableZn").textContent = "hiden table";
  }
  kellyTableZn(); // استدعاء الدالة الصحيحة
});

function kellyTableZn() {
  let mods = parseInt(document.getElementById("modulus").value);
  let table = document.getElementById("kleinTable");
  table.innerHTML = ""; // تفريغ الجدول إذا كان هناك محتوى قديم

  // إنشاء رأس الجدول
  let headerRow = document.createElement("tr");
  let emptyCell = document.createElement("th");
  headerRow.appendChild(emptyCell);

  for (let i = 0; i < mods; i++) {
    let th = document.createElement("th");
    th.textContent = i;
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  // إنشاء محتوى الجدول
  for (let i = 0; i < mods; i++) {
    let row = document.createElement("tr");
    let rowHeader = document.createElement("th");
    rowHeader.textContent = i;
    row.appendChild(rowHeader);

    for (let j = 0; j < mods; j++) {
      let cell = document.createElement("td");
      cell.textContent = (i + j) % mods; // حساب العملية المعيارية
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  console.log();
}
