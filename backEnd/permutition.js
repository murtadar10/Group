/* =========================================================
   محرك زمرة التباديل الذكي (Smart Permutation Engine)
   تم حل مشكلة قراءة الأرقام المتصلة (مثل 12) والمسافات
========================================================= */

function openPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    if (page.classList.contains("active")) {
      page.classList.remove("active");
      page.classList.add("hidden");
    }
  });

  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.classList.remove("hidden");
    selectedPage.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  openPage("page1");
});

// ==========================================
// 1. القارئ الذكي والمحرك الرياضي (Smart Parser & Engine)
// ==========================================

function parsePermutation(input) {
  if (!input) return [];
  let str = String(input).trim();
  
  // إذا نسي المستخدم الأقواس، قم بإضافتها برمجياً
  if (!str.includes("(")) {
      str = `(${str})`;
  }
  
  const cycles = str.match(/\(([^)]+)\)/g);
  return cycles ? cycles.map(parseCycle).filter(c => c.length > 0) : [];
}

function parseCycle(cycleStr) {
  if (typeof cycleStr !== "string") return [];
  let inner = cycleStr.replace(/[()]/g, "").trim();
  
  if (inner === "I" || inner === "1" || inner === "") return [];
  
  let nums;
  // إذا وضع المستخدم مسافة أو فاصلة (مثال: 1 2 3 أو 1,2,3)
  if (inner.includes(" ") || inner.includes(",")) {
    nums = inner.match(/\d+/g);
  } else {
    // إذا كتب الأرقام متصلة (مثال: 123) نفصلها حرفاً حرفاً
    nums = inner.split("").filter(c => /\d/.test(c));
  }
  return nums ? nums.map(Number) : [];
}

function invertPermutation(permCycles) {
  return permCycles.map(cycle => [...cycle].reverse());
}

function applyCyclesToArray(cycles, arr) {
  return arr.map(val => {
    let result = val;
    for (let i = cycles.length - 1; i >= 0; i--) {
      let cycle = cycles[i];
      let idx = cycle.indexOf(result);
      if (idx !== -1) {
        result = cycle[(idx + 1) % cycle.length];
      }
    }
    return result;
  });
}

function convertToCycles(arr) {
  const cycles = [];
  const visited = Array(arr.length).fill(false);
  for (let i = 0; i < arr.length; i++) {
    if (!visited[i]) {
      let cycle = [];
      let x = i;
      while (!visited[x]) {
        visited[x] = true;
        cycle.push(x + 1);
        x = arr[x] - 1;
      }
      if (cycle.length > 1) {
        cycles.push(`(${cycle.join(" ")})`);
      }
    }
  }
  return cycles.length > 0 ? cycles.join("") : "(1)";
}

function lcm(a, b) { return !b ? a : Math.abs(a * b) / gcd(a, b); }
function gcd(a, b) { return !b ? a : gcd(b, a % b); }
function lcmOfArray(arr) { return arr.length > 0 ? arr.reduce((acc, val) => lcm(acc, val), 1) : 1; }

// ==========================================
// 2. تفاصيل الزمرة (Page 1)
// ==========================================
function generatePermutations() {
  const n = parseInt(document.getElementById("groupOrder").value);
  if (isNaN(n) || n < 1) return;
  
  let OrderGroup = 1;
  for (let i = 2; i <= n; i++) OrderGroup *= i;
  
  const baseArray = Array.from({ length: n }, (_, i) => i + 1);
  const permutations = getAllPermutations(baseArray);
  const container = document.getElementById("permutations");
  const groupInfo = document.getElementById("groupInfo");
  container.innerHTML = "";
  
  groupInfo.innerHTML = `<p><strong>Order Of Group |S${n}| = </strong> ${OrderGroup} </p> <strong> S${n} = </strong> { ${permutations.map(p => convertToCycles(p)).join(" , ")} }`;

  permutations.forEach((permArray) => {
    const cyclesStr = convertToCycles(permArray);
    let orderCycs = parsePermutation(cyclesStr);
    let arr4Order = orderCycs.map(c => c.length);
    let OrderCycle = lcmOfArray(arr4Order);
    
    const generatedCycles = ["(1)"];
    let currentArr = [...baseArray];
    for (let i = 1; i < OrderCycle; i++) {
      currentArr = currentArr.map(val => permArray[val - 1]);
      let c = convertToCycles(currentArr);
      if (c !== "(1)") generatedCycles.push(c);
    }
    
    const permutationInfo = document.createElement("div");
    permutationInfo.className = "permutation-info";
    permutationInfo.innerHTML = ` ${cyclesStr} = { ${generatedCycles.join(" , ")} } => order of <strong>|${cyclesStr}| = </strong> ${OrderCycle} `;
    container.appendChild(permutationInfo);
  });
}

function getAllPermutations(arr) {
  if (arr.length === 0) return [[]];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const permutations = getAllPermutations(rest);
    for (const perm of permutations) result.push([arr[i], ...perm]);
  }
  return result;
}

// ==========================================
// 3. تحليل التبديل (Page 2)
// ==========================================
function calculateOrderInverse() {
  let input = document.getElementById("permutation-input").value.trim();
  if (!input) return;

  let permCycles = parsePermutation(input);
  if (permCycles.length === 0) {
    document.getElementById("res4OrInv").innerHTML = `<p>Identity Permutation (1)</p>`;
    return;
  }

  const n = permCycles.reduce((max, cycle) => Math.max(max, ...cycle), 0);
  let baseArray = Array.from({ length: n }, (_, i) => i + 1);
  
  let resultArray = applyCyclesToArray(permCycles, baseArray);
  let disjointStr = convertToCycles(resultArray);
  
  let disjointCycles = parsePermutation(disjointStr);
  let order = disjointCycles.length > 0 ? lcmOfArray(disjointCycles.map(c => c.length)) : 1;
  let inverseCycles = invertPermutation(disjointCycles);
  let inverseStr = inverseCycles.length > 0 ? inverseCycles.map(c => `(${c.join(" ")})`).join("") : "(1)";
  
  let transpositions = 0;
  disjointCycles.forEach(cycle => { transpositions += (cycle.length - 1); });
  let parity = (transpositions % 2 === 0) ? "Even" : "Odd";

  document.getElementById("res4OrInv").innerHTML = `
    <p><strong>Disjoint Cycles:</strong> ${disjointStr}</p>
    <p><strong>Order:</strong> ${order}</p>
    <p><strong>Inverse:</strong> ${inverseStr}</p>
    <p><strong>Parity:</strong> <span style="color:${parity==='Even'?'#00ff88':'#ff4d4d'}">${parity} Permutation</span></p>
  `;
}

// ==========================================
// 4. القوى (Page 3)
// ==========================================
function calculatePowerPerm() {
  const input = document.getElementById("input4Pow").value.trim();
  let powerStr = document.getElementById("input4Pow2").value.trim();
  const power = powerStr === "" ? 1 : parseInt(powerStr);
  
  if (!input || isNaN(power)) {
    document.getElementById("res4Pow").innerText = "Invalid input.";
    return;
  }
  
  let result = calculatePowerForCycles(input, power);
  document.getElementById("res4Pow").innerHTML = `<p>Result: <strong>${result}</strong></p>`;
}

function calculatePowerForCycles(input, power, sizeOverride = 0) {
  let cycles = parsePermutation(input);
  if (cycles.length === 0 || isNaN(power)) return "(1)";
  
  let n = sizeOverride || cycles.reduce((max, cycle) => Math.max(max, ...cycle), 0);
  if (n === 0) return "(1)";

  let effectiveCycles = power < 0 ? invertPermutation(cycles) : cycles;
  let absPower = Math.abs(power);
  
  let arr = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = 0; i < absPower; i++) {
    arr = applyCyclesToArray(effectiveCycles, arr);
  }
  
  return convertToCycles(arr);
}

// ==========================================
// 5. التركيب (Page 4) - خالي من الأخطاء
// ==========================================
function isValidOrder(cycles, permutationOrder) {
  // التحقق من أن الرقم لا يتجاوز حجم الزمرة، وأنه ليس صفراً
  return cycles.every(cycle => cycle.every(num => num <= permutationOrder && num >= 1));
}

function calcCompoWithPow() {
  let permutationOrder = parseFloat(document.getElementById("permutationOrder").value);
  if (isNaN(permutationOrder)) {
    alert("الرجاء إدخال رقم الزمرة (Order) أولاً");
    return;
  }

  let p1 = document.getElementById("permutation1").value.trim();
  let p2 = document.getElementById("permutation2").value.trim();
  let p3 = document.getElementById("permutation3").value.trim();
  let p4 = document.getElementById("permutation4").value.trim();
  
  let getPow = (id) => {
      let val = document.getElementById(id).value.trim();
      return val === "" ? 1 : parseFloat(val);
  };
  
  let pow1 = getPow("power1");
  let pow2 = getPow("power2");
  let pow3 = getPow("power3");
  let pow4 = getPow("power4");

  let allCycles = [...parsePermutation(p1), ...parsePermutation(p2), ...parsePermutation(p3), ...parsePermutation(p4)];
  
  if (allCycles.length > 0 && !isValidOrder(allCycles, permutationOrder)) {
    alert("أحد الأرقام المدخلة خاطئ (إما أكبر من S" + permutationOrder + " أو يساوي 0)");
    document.getElementById("resOfPow").innerHTML = ""; // مسح النتيجة القديمة حتى لا يظنها المستخدم النتيجة الحالية
    return;
  }

  let res1 = calculatePowerForCycles(p1, pow1, permutationOrder);
  let res2 = calculatePowerForCycles(p2, pow2, permutationOrder);
  let res3 = calculatePowerForCycles(p3, pow3, permutationOrder);
  let res4 = calculatePowerForCycles(p4, pow4, permutationOrder);

  function composeTwo(str1, str2, size) {
    let arr = Array.from({ length: size }, (_, i) => i + 1);
    let c1 = parsePermutation(str1);
    let c2 = parsePermutation(str2);
    arr = applyCyclesToArray(c2, arr);
    arr = applyCyclesToArray(c1, arr);
    return convertToCycles(arr);
  }

  let firstBracket = composeTwo(res1, res2, permutationOrder);
  let secondBracket = composeTwo(res3, res4, permutationOrder);
  let finalResult = composeTwo(firstBracket, secondBracket, permutationOrder);

  document.getElementById("resOfPow").innerHTML = `
    <p> ${firstBracket} o ${secondBracket} </p> 
    <p> = <strong style="color: #00ff88;">${finalResult}</strong></p>
  `;
}