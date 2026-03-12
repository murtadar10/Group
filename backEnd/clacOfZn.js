// num = الاعداد او الثوابت
// pow = قوى العدد
// heipow = قوى القوس
// res = ناتج القوس
// resnum =  ناتج العدد المرفوع الى اس
// mod = مود الجمع 



function calculate() {
  let mod = parseInt(document.getElementById("modOfCalc").value)|| NaN ;
if (isNaN(mod)) {
    alert("الرجاء إدخال المعيار (الرقم اسفل عملية الجمع) أولاً");
    return; // هذه الكلمة تمنع تنفيذ باقي الكود بالأسفل
  }
 function Inverse(a) {
  
    return (mod - (a % mod)) % mod;
  } 
   function Power(a, b) {
    resultPower = (a * b) % mod
    if (b < 0){
      resultPower = Inverse(resultPower)
    }
// =================================================================================================================================================
    
    return resultPower;
  }

 
  removeEmptyInputs()
  
  let num1 = parseInt(document.getElementById("num1").value) || 0;
  let num2 = parseInt(document.getElementById("num2").value) || 0;
  let num3 = parseInt(document.getElementById("num3").value) || 0;
  let num4 = parseInt(document.getElementById("num4").value) || 0;
  let pow1 = parseInt(document.getElementById("pow1").value) || 1;
  let pow2 = parseInt(document.getElementById("pow2").value) || 1;
  let pow3 = parseInt(document.getElementById("pow3").value) || 1;
  let pow4 = parseInt(document.getElementById("pow4").value) || 1;
  let heipow1 = parseInt(document.getElementById("heipow1").value) || 1;
  let heipow2 = parseInt(document.getElementById("heipow2").value) || 1;

  let resnum1 = Power(num1, pow1);
  if (pow1 < 0) resnum1 = Inverse(Power(num1, Math.abs(pow1)));

  let resnum2 = Power(num2, pow2);
  if (pow2 < 0) resnum2 = Inverse(Power(num2, Math.abs(pow2)));

  let resnum3 = Power(num3, pow3);
  if (pow3 < 0) resnum3 = Inverse(Power(num3, Math.abs(pow3)));

  let resnum4 = Power(num4, pow4);
  if (pow4 < 0) resnum4 = Inverse(Power(num4, Math.abs(pow4)));

  let res1 = Power(resnum1 + resnum2, heipow1);
  if (heipow1 < 0) res1 = Inverse(Power(resnum1 + resnum2, Math.abs(heipow1)));

  let res2 = Power(resnum3 + resnum4, heipow2);
  if (heipow2 < 0) res2 = Inverse(Power(resnum3 + resnum4, Math.abs(heipow2)));

  let result = (res1 + res2) % mod;

  if ( document.getElementById('resOfThis')) {
    document.getElementById('resOfThis').remove()
  }


  let showBox = document.getElementById("showBox");
  let resultElement = document.createElement("p");
  resultElement.id = "resOfThis";
  resultElement.textContent = `= ${result}`;
  
  showBox.appendChild(resultElement);


}

let currentInput = null;

document.addEventListener("DOMContentLoaded", () => {
  // تعيين التركيز على num1 عند تحميل الصفحة
  currentInput = document.getElementById("num1");
  if (currentInput) {
    currentInput.focus();
    document.getElementById("num1").style.display="inline-block"
  }
});

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("focus", () => (currentInput = input));
});

document.querySelectorAll(".num-btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentInput) {
      currentInput.value += button.innerText;
    }
  });
});

let ad = document.querySelectorAll(".ad");
let prodect = document.querySelectorAll(".prodect");

document.getElementById("Znoperation").addEventListener("click", () => {
  if (currentInput) {
    switch (currentInput.id) {
      case "num1":
        currentInput = document.getElementById("num2");
        ad[0].style.display = "inline-block";
        document.getElementById("num2").style.display="inline-block"
        break;
      case "num2":
        document.getElementById("num3").style.display="inline-block"
        currentInput = document.getElementById("num3");
        ad[1].style.display = "inline-block";
        prodect[0].style.display = "inline-block";
        prodect[1].style.display = "inline-block";

        break;
      case "num3":
        currentInput = document.getElementById("num4");
        prodect[2].style.display = "inline-block";
        prodect[3].style.display = "inline-block";
        ad[2].style.display = "inline-block";
        document.getElementById("num4").style.display="inline-block"

        break;
      case "num4":
        break;
      case "pow1":
        currentInput = document.getElementById("num2");
        ad[0].style.display = "inline-block";
        
        document.getElementById("num2").style.display="inline-block"

        break;
      case "pow2":
        currentInput = document.getElementById("num3");
        ad[1].style.display = "inline-block";
        prodect[0].style.display = "inline-block";
        prodect[1].style.display = "inline-block";
        document.getElementById("num3").style.display="inline-block"

        break;
      case "heipow1":
        currentInput = document.getElementById("num3");
        ad[1].style.display = "inline-block";
        document.getElementById("num3").style.display="inline-block"

        break;
      case "pow3":
        currentInput = document.getElementById("num4");
        prodect[2].style.display = "inline-block";
        prodect[3].style.display = "inline-block";
        ad[2].style.display = "inline-block";
        document.getElementById("num4").style.display="inline-block"

        break;
      case "pow4":
        currentInput = document.getElementById("heipow2");
        break;
      case "heipow2":
        ad[1].style.display = "inline-block";
        break;
      default:
        // كلشي ميصير 
        break;
    }
    if (currentInput) {
      currentInput.focus();
    }
  }
});

document.getElementById("power").addEventListener("click", () => {
  if (currentInput) {
    switch (currentInput.id) {
      case "num1":
        currentInput = document.getElementById("pow1");
        document.getElementById("pow1").style.display="inline-block"
        break;
      case "num2":
        currentInput = document.getElementById("pow2");
        document.getElementById("pow2").style.display="inline-block"
        break;
      case "num3":
        currentInput = document.getElementById("pow3");
        document.getElementById("pow3").style.display="inline-block"
        break;
      case "num4":
        currentInput = document.getElementById("pow4");
        document.getElementById("pow4").style.display="inline-block"
        break;
      case "pow1":
                // كلشي ميصير 
        break;
      case "pow2":
        currentInput = document.getElementById("heipow1");
        document.getElementById("heipow1").style.display="inline-block"
        prodect[0].style.display = "inline-block";
        prodect[1].style.display = "inline-block";
        break;
      case "heipow1":
                // كلشي ميصير 
        break;
      case "pow3":
        // كلشي ميصير 
        break;
      case "pow4":
        currentInput = document.getElementById("heipow2");
        document.getElementById("heipow2").style.display="inline-block"
        prodect[2].style.display = "inline-block";
        prodect[3].style.display = "inline-block";
        break;
      case "heipow2":
        // كلشي ميصير 
        break;
      default:
       
        break;
    }
    if (currentInput && currentInput.id !== "heipow1") {
      currentInput.focus();
    }
  }
});

document.getElementById("backspace").addEventListener("click", () => {
  if (currentInput) {
    currentInput.value = currentInput.value.slice(0, -1);
  }
});
document.getElementById("minus").addEventListener("click", () => {
  if (currentInput) {
    
    currentInput.value += "-";
  }
});

document.getElementById("clear").addEventListener("click", () => {
 
  document
    .getElementById("showBox")
    .querySelectorAll("input")
    .forEach((input) => (input.value = ""));
  ad.forEach((input) => (input.style.display = "none"));
  prodect.forEach((input) => (input.style.display = "none"));
  if ( document.getElementById('resOfThis')) {
    document.getElementById('resOfThis').remove()
  }

  currentInput = document.getElementById("num1");
  if (currentInput) {
    currentInput.focus();
  }
});
function removeEmptyInputs() {
  let powinputs = document.querySelectorAll(".powersOfCalcZn");

  powinputs.forEach((powinput) => {
      let value = parseFloat(powinput.value);
      if (value === 1) {
        powinput.style.display = "none"; 
      }
  });

  let numinputs = document.querySelectorAll(".numbersOfCalcZn");

  numinputs.forEach((numinput) => {
      if (parseFloat(numinput.value) === 0) {
        powinput.style.display = "none"; 
      }
  });
}
