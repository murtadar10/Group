document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.JordenHolder-menu-item');
    const description = document.getElementById('description');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // إزالة الكلاس النشط من جميع العناصر
            menuItems.forEach(el => el.classList.remove('active'));

            // إضافة الكلاس النشط للعنصر المحدد
            item.classList.add('active');

            // الحل هنا: نتحقق أولاً مما إذا كان صندوق الوصف موجوداً!
            if (description) {
                description.textContent = item.getAttribute('data-description');
                description.style.display = 'block';
            }
        });
    });
});
// التعامل مع التنقل بين الأقسام في JordenHolder
// =========================================================
// كود التنقل بين واجهات جوردن هولدر (مدمج ومحصن ضد الأخطاء)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.JordenHolder-menu-item');
    const sections = document.querySelectorAll('.JordenHolder-section');
    const description = document.getElementById('description');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            
            // 1. تلوين الزر الذي تم النقر عليه وإلغاء البقية
            menuItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');

            // 2. تحديث صندوق الوصف (فقط في حال كان موجوداً في الـ HTML)
            if (description) {
                description.textContent = item.getAttribute('data-description');
                description.style.display = 'block';
            }

            // 3. إخفاء جميع الواجهات الأربع
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // 4. قراءة اسم الواجهة المطلوبة وإظهارها فقط
            const targetId = item.getAttribute('data-target');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}); 
// التعامل مع التنقل بين الأقسام في JordenHolder (كود مبسط ومحصن ضد الأخطاء)


document.querySelectorAll('.JordenHolder-menu-item').forEach(item => {
    item.addEventListener('click', () => {
        // الحصول على الـ target من data-target
        const target = item.getAttribute('data-target');

        // إزالة كلاس active من جميع الـ sections
        document.querySelectorAll('.JordenHolder-section').forEach(section => {
            section.classList.remove('active');
        });

        // إضافة كلاس active للـ section المرتبط بالعنصر المختار
        document.querySelector(target).classList.add('active');
        
        // إضافة كلاس active للعنصر في القائمة لتحديد العنصر النشط
        document.querySelectorAll('.JordenHolder-menu-item').forEach(menuItem => {
            menuItem.classList.remove('active');
        });
        item.classList.add('active');
    });
});



// Placeholder for each program's script
// Include the relevant script for each section here

// Composition Series Script start

function addSubgroupCompJord() {
    const container = document.getElementById('Jorden-subgroups');
    const newSubgroup = document.createElement('div');
    newSubgroup.className = 'jorden-sups';
    newSubgroup.innerHTML = `
        <button class="jorden-remove-btn" onclick="removeSubgroupComp(this)">x</button>
        <input type="number" class="JordenHolderinput" min="1" />
    `;
    container.appendChild(newSubgroup);
    updateSeparatorsCompJord();
}

function removeSubgroupComp(button) {
    const container = document.getElementById('Jorden-subgroups');
    container.removeChild(button.parentElement);
    updateSeparatorsCompJord();
}

function updateSeparatorsCompJord() {
    const container = document.getElementById('Jorden-subgroups');
    const items = container.querySelectorAll('.jorden-sups');
    items.forEach((item, index) => {
        // Remove existing separators
        const existingSeparator = item.querySelector('.jorden-separator');
        if (existingSeparator) {
            item.removeChild(existingSeparator);
        }
        
        // Add new separator
        if (index < items.length -1) {
            let separator = document.createElement('span');
            separator.className = 'jorden-separator';
            separator.innerText = '⊃';
            item.appendChild(separator);
        }
    });
}

function calculateSubgroupElements(order, generator) {
    const elements = [];
    for (let i = 0; i < order; i++) {
        elements.push((generator * i) % order);
    }
    return [...new Set(elements)]; // Return unique elements
}

function checkSeriesCompJord() {
    const originalInput = document.getElementById('originalGroup');
    const originalOrder = parseInt(originalInput.value.trim());
    const resultBox = document.getElementById('resultComp');
    const stepsBox = document.getElementById('stepsComp');
    const inputs = document.querySelectorAll('#Jorden-subgroups input');

    // تنظيف الألوان
    originalInput.classList.remove('jorden-error-input');
    inputs.forEach(input => input.classList.remove('jorden-error-input'));

    if (isNaN(originalOrder) || originalOrder <= 0) {
        resultBox.innerHTML = 'Please enter a valid order for the original group.';
        stepsBox.innerHTML = '';
        originalInput.classList.add('jorden-error-input');
        return;
    }

    const generators = Array.from(inputs).map(input => parseInt(input.value.trim()));
    
    let hasEmptyGenerator = false;
    inputs.forEach(input => {
        let val = parseInt(input.value.trim());
        if (isNaN(val) || val <= 0) {
            input.classList.add('jorden-error-input');
            hasEmptyGenerator = true;
        }
    });

    if (hasEmptyGenerator) {
        resultBox.innerHTML = 'Please enter valid generators for the subgroups.';
        stepsBox.innerHTML = '';
        return;
    }

    // بداية كتابة الخطوات بالـ LaTeX
    let stepsComp = `<strong>Original Group $G$, $\\quad |G| = ${originalOrder}$</strong><br><br>`;
    let isCompositionSeries = true;
    let previousSubgroupOrder = originalOrder;
    let previousGenStr = "G";

    for (let i = 0; i < generators.length; i++) {
        const generator = generators[i];
        const currentSubgroup = calculateSubgroupElements(originalOrder, generator);
        const currentSubgroupOrder = currentSubgroup.length;
        
        // رمز الزمرة المتولدة < x >
        const currentGenStr = `\\langle ${generator} \\rangle`;
        
        stepsComp += `Subgroup $${currentGenStr} = \\{ ${currentSubgroup.join(', ')} \\}$, $\\quad |${currentGenStr}| = ${currentSubgroupOrder}$<br>`;

        if (i > 0) {
            const prevGenerator = generators[i - 1];
            const prevSubgroupOrder = calculateSubgroupElements(originalOrder, prevGenerator).length;
            const quotient = previousSubgroupOrder / currentSubgroupOrder;
            previousGenStr = `\\langle ${prevGenerator} \\rangle`;
            
            if (previousSubgroupOrder % currentSubgroupOrder !== 0) {
                isCompositionSeries = false;
                stepsComp += `<br><span style="color:#ff4d4d;">Error:</span> $$\\frac{|${previousGenStr}|}{|${currentGenStr}|} = \\frac{${previousSubgroupOrder}}{${currentSubgroupOrder}}$$ is not an integer.<br>`;
                stepsComp += `Thus, $${currentGenStr}$ is not maximal in $${previousGenStr}$.<br>`;
                inputs[i].classList.add('jorden-error-input');
                break;
            }
            
            stepsComp += `Index: $$\\left[ ${previousGenStr} : ${currentGenStr} \\right] = \\frac{|${previousGenStr}|}{|${currentGenStr}|} = \\frac{${previousSubgroupOrder}}{${currentSubgroupOrder}} = ${quotient}$$`;

            if (quotient !== 1) {
                stepsComp += `$${currentGenStr}$ is maximal relative to $${previousGenStr}$.<br><br>`;
            }
        } else {
            // فحص أول زمرة مع الزمرة الأصلية G
            if (originalOrder % currentSubgroupOrder !== 0) {
                isCompositionSeries = false;
                stepsComp += `<br><span style="color:#ff4d4d;">Error:</span> $$\\frac{|G|}{|${currentGenStr}|} = \\frac{${originalOrder}}{${currentSubgroupOrder}}$$ is not an integer.<br>`;
                inputs[i].classList.add('jorden-error-input');
                break;
            } else {
                stepsComp += `Index: $$\\left[ G : ${currentGenStr} \\right] = \\frac{|G|}{|${currentGenStr}|} = \\frac{${originalOrder}}{${currentSubgroupOrder}} = ${originalOrder / currentSubgroupOrder}$$<br><br>`;
            }
        }

        previousSubgroupOrder = currentSubgroupOrder;
    }

    if (isCompositionSeries) {
        resultBox.style.color = "#00ff88"; 
        resultBox.innerHTML = 'The series is a valid <strong>Composition Series</strong>.';
    } else {
        resultBox.style.color = "#ff4d4d"; 
        resultBox.innerHTML = 'The series is <strong>NOT</strong> a valid composition series.';
    }

    stepsBox.innerHTML = stepsComp;

    // السطر السحري لتحويل الرموز إلى رياضيات
    if (window.MathJax) {
        MathJax.typesetPromise([resultBox, stepsBox]).catch((err) => console.log(err.message));
    }
}
// Composition Series Script end


// Solvable Groups Script start
function checkAdvancedSolvability() {
    const type = document.getElementById('groupTypeSolv').value;
    const nInput = document.getElementById('groupNSolv');
    const n = parseInt(nInput.value.trim());
    const resultBox = document.getElementById('resultSolv');
    const stepsBox = document.getElementById('stepsSolv');

    nInput.classList.remove('jorden-error-input');

    if (isNaN(n) || n < 1) {
        nInput.classList.add('jorden-error-input');
        resultBox.style.color = "#ff4d4d";
        resultBox.innerHTML = "Please enter a valid positive number for 'n'.";
        stepsBox.innerHTML = "";
        return;
    }

    let steps = "";
    let isSolvable = false;

    if (type === "Zn") {
        steps += `<strong>Group: $Z_{${n}}$ (Standard Group)</strong><br><br>`;
        steps += `1. $Z_{${n}}$ is a cyclic group.<br>`;
        steps += `2. Every cyclic group is an Abelian group.<br>`;
        steps += `3. Every Abelian group is solvable.<br><br>`;
        steps += `Normal series: $$Z_{${n}} \\triangleright \\{e\\}$$<br>`;
        steps += `Quotient: $$\\frac{Z_{${n}}}{\\{e\\}} \\cong Z_{${n}}$$ which is Abelian.<br>`;
        isSolvable = true;

    } else if (type === "Sn") {
        steps += `<strong>Group: $S_{${n}}$ (Symmetric Group)</strong><br><br>`;
        if (n <= 4) {
            isSolvable = true;
            if (n === 1 || n === 2) {
                steps += `$S_{${n}}$ is an Abelian group, hence solvable.<br>`;
            } else if (n === 3) {
                steps += `Normal series: $$S_3 \\triangleright A_3 \\triangleright \\{e\\}$$<br>`;
                steps += `Quotient Groups:<br>`;
                steps += `- $$\\frac{S_3}{A_3} \\cong Z_2$$ (Abelian)<br>`;
                steps += `- $$\\frac{A_3}{\\{e\\}} \\cong Z_3$$ (Abelian)<br><br>`;
                steps += `Since all quotient groups are Abelian, $S_3$ is solvable.<br>`;
            } else if (n === 4) {
                steps += `Normal series: $$S_4 \\triangleright A_4 \\triangleright V_4 \\triangleright \\{e\\}$$<br>`;
                steps += `Quotient Groups:<br>`;
                steps += `- $$\\frac{S_4}{A_4} \\cong Z_2$$ (Abelian)<br>`;
                steps += `- $$\\frac{A_4}{V_4} \\cong Z_3$$ (Abelian)<br>`;
                steps += `- $$\\frac{V_4}{\\{e\\}} \\cong V_4$$ (Abelian)<br><br>`;
                steps += `Since all quotient groups are Abelian, $S_4$ is solvable.<br>`;
            }
        } else {
            isSolvable = false;
            steps += `For $n \\ge 5$, $S_{${n}}$ is <strong>NOT</strong> solvable.<br><br>`;
            steps += `Reason:<br>`;
            steps += `1. The alternating group $A_{${n}}$ is a normal subgroup of $S_{${n}}$.<br>`;
            steps += `2. However, $A_{${n}}$ is a Simple non-Abelian group for $n \\ge 5$.<br>`;
            steps += `3. Thus, the composition series $S_{${n}} \\triangleright A_{${n}} \\triangleright \\{e\\}$ has a quotient $$\\frac{A_{${n}}}{\\{e\\}} \\cong A_{${n}}$$ which is NOT Abelian.<br>`;
        }

    } else if (type === "Dn") {
        steps += `<strong>Group: $D_{${n}}$ (Dihedral Group, Order ${2 * n})</strong><br><br>`;
        if (n === 4) {
            steps += `(Symmetries of a Square)<br>`;
            steps += `Order of $D_4$ is $8 = 2^3$.<br>`;
            steps += `1. $D_4$ is a $p$-group (where $p=2$).<br>`;
            steps += `2. Every finite $p$-group is nilpotent, and every nilpotent group is solvable.<br><br>`;
            steps += `Normal series: $$D_4 \\triangleright \\langle R_{90} \\rangle \\triangleright \\{e\\}$$<br>`;
            steps += `Quotient Groups:<br>`;
            steps += `- $$\\frac{D_4}{\\langle R_{90} \\rangle} \\cong Z_2$$ (Abelian)<br>`;
            steps += `- $$\\frac{\\langle R_{90} \\rangle}{\\{e\\}} \\cong Z_4$$ (Abelian)<br>`;
            isSolvable = true;
        } else {
            steps += `Normal series: $$D_{${n}} \\triangleright \\langle R \\rangle \\triangleright \\{e\\}$$<br>`;
            steps += `(where $\\langle R \\rangle$ is the cyclic subgroup of rotations).<br><br>`;
            steps += `Quotient Groups:<br>`;
            steps += `- $$\\frac{D_{${n}}}{\\langle R \\rangle} \\cong Z_2$$ (Abelian)<br>`;
            steps += `- $$\\frac{\\langle R \\rangle}{\\{e\\}} \\cong Z_{${n}}$$ (Abelian)<br><br>`;
            steps += `Since all quotient groups are Abelian, $D_{${n}}$ is ALWAYS solvable.<br>`;
            isSolvable = true;
        }
    }

    if (isSolvable) {
        resultBox.style.color = "#00ff88"; 
        resultBox.innerHTML = `The group $${type}_{${n}}$ is <strong>Solvable</strong>.`;
    } else {
        resultBox.style.color = "#ff4d4d"; 
        resultBox.innerHTML = `The group $${type}_{${n}}$ is <strong>NOT Solvable</strong>.`;
    }
    
    stepsBox.innerHTML = steps;

    // السطر السحري: إجبار مكتبة MathJax على معالجة الرموز الرياضية وتحويلها لمعادلات
    if (window.MathJax) {
        MathJax.typesetPromise([resultBox, stepsBox]).catch((err) => console.log(err.message));
    }
}// ==========================================
// Solvable Groups Script End
// ==========================================
// Solvable Groups Script end


// p-Group Script start
function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function checkPGroup() {
    const groupOrder = parseInt(document.getElementById('groupOrderToPgroup').value.trim());
    const primeNumber = parseInt(document.getElementById('primeNumber').value.trim());

    const resultElement = document.getElementById('result-P');

    if (isNaN(groupOrder) || groupOrder <= 0 || isNaN(primeNumber) || primeNumber <= 1) {
        resultElement.innerText = 'Please enter valid positive numbers.';
        return;
    }

    if (!isPrime(primeNumber)) {
        resultElement.innerText = `${primeNumber} is not a prime number.`;
        return;
    }

    const power = Math.log(groupOrder) / Math.log(primeNumber);
    const isPGroup = power % 1 === 0;

    if (isPGroup) {
        resultElement.innerText = `The group of order ${groupOrder} is a ${primeNumber}-group (since ${groupOrderToPgroup} = ${primeNumber}^${power.toFixed(0)}).`;
    } else {
        resultElement.innerText = `The group of order ${groupOrder} is not a ${primeNumber}-group.`;
    }
}

// p-Group Script  end



// Sylow p-Subgroup Script start
function checkSylowPSubgroups() {
    const groupOrder = parseInt(document.getElementById('groupOrderSylow').value.trim());

    if (isNaN(groupOrder) || groupOrder <= 0) {
        document.getElementById('resultSylow').innerText = 'Please enter a valid group order.';
        return;
    }

    const primeFactors = getPrimeFactors(groupOrder);
    let results = [];

    primeFactors.forEach(primeFactor => {
        const pPower = getHighestPowerOfPrime(primeFactor, groupOrder);
        const pPowerValue = Math.pow(primeFactor, pPower);
        const isSylow = (pPowerValue > 0 && groupOrder % pPowerValue === 0);

        results.push(`\nOrder of ${primeFactor}-Sylow subgroup:`);
        results.push(`Order ${pPowerValue} ${isSylow ? 'is' : 'is not'} Sylow ${primeFactor}-subgroup`);
        
        if (isSylow) {
            results.push(`Sylow ${primeFactor}-subgroups:`);
            const subgroups = getSylowSubgroups(primeFactor, groupOrder);
            results.push(`The ${primeFactor}-subgroup of (Z${groupOrder}, +${groupOrder}) is { ${subgroups.join(', ')} }`);
        }
    });

    document.getElementById('resultSylow').innerText = results.join('\n');
}

function getPrimeFactors(n) {
    let factors = [];
    for (let i = 2; i <= n; i++) {
        if (n % i === 0) {
            let isPrime = true;
            for (let j = 2; j <= Math.sqrt(i); j++) {
                if (i % j === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime && !factors.includes(i)) {
                factors.push(i);
            }
        }
    }
    return factors;
}

function getHighestPowerOfPrime(prime, number) {
    let power = 0;
    while (number % prime === 0) {
        number /= prime;
        power++;
    }
    return power;
}

function getSylowSubgroups(prime, order) {
    let subgroups = [];
    for (let i = 1; i < order; i++) {
        if (order % i === 0 && gcdSylow(order, i) === i) {
            const subgroupOrder = order / gcdSylow(order, i);
            const pPower = getHighestPowerOfPrime(prime, subgroupOrder);
            if (Math.pow(prime, pPower) === subgroupOrder) {
                subgroups.push(`<${i}>`);
            }
        }
    }
    return subgroups.length > 0 ? subgroups : ['None'];
}

function gcdSylow(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Sylow p-Subgroup Script end



