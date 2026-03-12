


const elements = ["I", "R90", "R180", "R270", "V", "H", "D1", "D2"];
function Inverse(element) {
  // نبحث عن العنصر الذي يحقق الشرط: element * inverse = I
  for (let inverse in composition[element]) {
    if (composition[element][inverse] === "I") {
      return inverse;
    }
  }
}

function generateSubgroups() {
  return [
    "Subgroup { I }",
    "Subgroup { I, R90, R180, R270 }",
    "Subgroup { I, V }",
    "Subgroup { I, H }",
    "Subgroup { I, D1 }",
    "Subgroup { I, D2 }",
    "Subgroup { I, V, H, D1, D2 }",
  ];
}

// Define the elements of D4
const composition = {
  I: {
    I: "I",
    R90: "R90",
    R180: "R180",
    R270: "R270",
    V: "V",
    H: "H",
    D1: "D1",
    D2: "D2",
  },
  R90: {
    I: "R90",
    R90: "R180",
    R180: "R270",
    R270: "I",
    V: "D1",
    H: "D2",
    D1: "V",
    D2: "H",
  },
  R180: {
    I: "R180",
    R90: "R270",
    R180: "I",
    R270: "R90",
    V: "H",
    H: "V",
    D1: "D2",
    D2: "D1",
  },
  R270: {
    I: "R270",
    R90: "I",
    R180: "R90",
    R270: "R180",
    V: "D2",
    H: "D1",
    D1: "V",
    D2: "H",
  },
  V: {
    I: "V",
    R90: "D2",
    R180: "H",
    R270: "D1",
    V: "I",
    H: "R180",
    D1: "R270",
    D2: "R90",
  },
  H: {
    I: "H",
    R90: "D1",
    R180: "V",
    R270: "D2",
    V: "R180",
    H: "I",
    D1: "R90",
    D2: "R270",
  },
  D1: {
    I: "D1",
    R90: "V",
    R180: "D2",
    R270: "H",
    V: "R90",
    H: "R270",
    D1: "I",
    D2: "R180",
  },
  D2: {
    I: "D2",
    R90: "H",
    R180: "D1",
    R270: "V",
    V: "R270",
    H: "R90",
    D1: "R180",
    D2: "I",
  },
};
// Calculate the order of each element
function calculateOrder(element) {
  switch (element) {
    case "I":
      return 1;
    case "R90":
    case "R270":
      return 4;
    case "R180":
    case "V":
    case "H":
    case "D1":
    case "D2":
      return 2;
    default:
      return "Unknown";
  }
}

// Apply power to element
function applyPower(element, power) {
  const order = calculateOrder(element);
  let abspower = Math.abs(power);
  const reducedPower = abspower % order;
  if (reducedPower === 0) {
    return "I";
  }

  let result = element;
  for (let i = 1; i < reducedPower; i++) {
    result = composition[result][element];
  }
  return power > 0 ? result : Inverse(result);
}

function toCaptal(e) {
  return e.toUpperCase();
}

// Calculate order of each element

function calculateOrder(element) {
  e = toCaptal(element);

  switch (e) {
    case "I":
    case "R360":
      return 1;
    case "R90":
    case "R270":
      return 4;
    case "R180":
    case "V":
    case "H":
    case "D1":
    case "D2":
      return 2;
    default:
      return "Unknown";
  }
}

// Perform composition of elements with powers
function compose() {
  const element1 = document.getElementById("element1").value.toUpperCase() || "I";
  const D4pow1 = parseInt(document.getElementById("D4pow1").value) || 1;
  const element2 = document.getElementById("element2").value.toUpperCase() || "I";
  const D4pow2 = parseInt(document.getElementById("D4pow2").value) || 1;
  const element3 = document.getElementById("element3").value.toUpperCase() || "I";
  const D4pow3 = parseInt(document.getElementById("D4pow3").value) || 1;
  const element4 = document.getElementById("element4").value.toUpperCase() || "I";
  const D4pow4 = parseInt(document.getElementById("D4pow4").value) || 1;
  
  if (element1 && element2 && element3 && element4) {
    const e1 = applyPower(element1, D4pow1);
    const e2 = applyPower(element2, D4pow2);
    const e3 = applyPower(element3, D4pow3);
    const e4 = applyPower(element4, D4pow4);

    const result = composition[e1][e2];
    const resultAfterThird = composition[result][e3];
    const finalResult = composition[resultAfterThird][e4];
   if ( document.getElementById('D4resOfThis')) {
     document.getElementById('D4resOfThis').remove()
   }
  
    document.getElementById(
      "composition"
    ).textContent = ` = ${finalResult}.`;
    let showBox = document.getElementById("D4ShowBox");
  let resultElement = document.createElement("p");
  resultElement.id = "D4resOfThis";
  resultElement.textContent = `= ${finalResult}`;
  showBox.appendChild(resultElement);
  }
}
// function appendToDisplay(value) {
//   document.getElementById('display').value += value;
// }
// ==========================================================


// تأكد من أن العناصر موجودة في DOM قبل محاولة الوصول إليها


let D4currentInput = null;

document.addEventListener("DOMContentLoaded", () => {
  // تعيين التركيز على element1 عند تحميل الصفحة
  D4currentInput = document.getElementById("element1");
  document.getElementById("element1").style.display="inline-block"

  if (D4currentInput) {
    D4currentInput.focus();
  }
});



// تحديث D4currentInput عند التركيز على أي input
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", () => {
    D4currentInput = input;
  });
});

// إضافة القيمة من الأزرار الرقمية إلى D4currentInput
document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    if (D4currentInput) {
      D4currentInput.value += button.innerText;
    }
  });
});

// دالة لإضافة الأكشن إلى D4currentInput
function appendToDisplay(action) {
  if (D4currentInput) {
    D4currentInput.value = action;
  }
}


let D4op = document.querySelectorAll(".D4op");
let bracket = document.querySelectorAll(".bracket");

document.getElementById("D4operation").addEventListener("click", () => {
  if (D4currentInput) {
    switch (D4currentInput.id) {
      case "element1":
        document.getElementById("element2").style.display="inline-block"
        D4currentInput = document.getElementById("element2");
        D4op[0].style.display = "inline-block";
        break;
      case "element2":
        D4currentInput = document.getElementById("element3");
        document.getElementById("element3").style.display="inline-block"
        D4op[1].style.display = "inline-block";
        break;
      case "element3":
        D4currentInput = document.getElementById("element4");
        document.getElementById("element4").style.display="inline-block"
        D4op[2].style.display = "inline-block";
        break;
      case "element4":
        break;
      case "D4pow1":
        document.getElementById("element2").style.display="inline-block"
        D4currentInput = document.getElementById("element2");
        D4op[0].style.display = "inline-block";
        break;
      case "D4pow2":
        D4currentInput = document.getElementById("element3");
        document.getElementById("element3").style.display="inline-block"
        D4op[1].style.display = "inline-block";
        break;
      case "D4heipow1":
        D4currentInput = document.getElementById("element3");
        document.getElementById("element3").style.display="inline-block"
        D4op[1].style.display = "inline-block";
        break;
      case "D4pow3":
        D4currentInput = document.getElementById("element4");
        document.getElementById("element4").style.display="inline-block"
        D4op[2].style.display = "inline-block";
        break;
      case "D4pow4":
        D4currentInput = document.getElementById("D4heipow2");
        document.getElementById("D4heipow2").style.display="inline-block"
        break;
      case "D4heipow2":
        D4op[1].style.display = "inline-block";
        break;
      default:
        // إذا لم يكن في أحد الحقول المحددة، لا يحدث شيء
        break;
    }
    if (D4currentInput) {
      D4currentInput.focus();
    }
  }
});

document.getElementById("D4power").addEventListener("click", () => {
  if (D4currentInput) {
    switch (D4currentInput.id) {
      case "element1":
        D4currentInput = document.getElementById("D4pow1");
        document.getElementById("D4pow1").style.display="inline-block"
        break;
      case "element2":
        D4currentInput = document.getElementById("D4pow2");
        document.getElementById("D4pow2").style.display="inline-block"
        break;
      case "element3":
        D4currentInput = document.getElementById("D4pow3");
        document.getElementById("D4pow3").style.display="inline-block"
        break;
      case "element4":
        D4currentInput = document.getElementById("D4pow4");
        document.getElementById("D4pow4").style.display="inline-block"
        break;
      case "D4pow1":
        
        break;
      case "D4pow2":
        D4currentInput = document.getElementById("D4heipow1");
        document.getElementById("D4heipow1").style.display="inline-block"
        bracket[0].style.display = "inline-block";
        bracket[1].style.display = "inline-block";
        break;
      case "D4heipow1":
        break;
      case "D4pow3":
        break;
      case "D4pow4":
        D4currentInput = document.getElementById("D4heipow2");
        document.getElementById("D4heipow2").style.display="inline-block"
        bracket[2].style.display = "inline-block";
        bracket[3].style.display = "inline-block";
        break;
      case "D4heipow2":
        // توقف الزر بعد الانتقال إلى آخر حقلD4heipow2
        break;
      default:
        // إذا لم يكن في أحد الحقول المحددة، لا يحدث شيء
        break;
    }
    if (D4currentInput && D4currentInput.id !== "D4heipow1") {
      D4currentInput.focus();
    }
  }
});

document.getElementById("D4backspace").addEventListener("click", () => {
  if (D4currentInput) {
    D4currentInput.value ='';
  }
});
document.getElementById("D4minus").addEventListener("click", () => {
  if (D4currentInput) {
    // إدخال السالب في النص الحالي
    D4currentInput.value += "-";
  }
});

document.getElementById("D4Clear").addEventListener("click", () => {
  // مسح جميع المدخلات
  document
    .getElementById("D4ShowBox")
    .querySelectorAll("input")
    .forEach((input) => (input.value = ""));
  D4op.forEach((input) => (input.style.display = "none"));
  bracket.forEach((input) => (input.style.display = "none"));
  if ( document.getElementById('D4resOfThis')) {
    document.getElementById('D4resOfThis').remove()
  }

  // تعيين التركيز على element1 بعد مسح المدخلات
  D4currentInput = document.getElementById("element1");
  if (D4currentInput) {
    D4currentInput.focus();
  }
});
