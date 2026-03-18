
function checkGroupProperties() {
    const expression = document.getElementById('operation').value;
    const group = document.getElementById('range').value;
    const range = getRange(group);
    
    let results = '';

    if (checkClosure(range, expression, group)) {
        results += '<p>1)\n العملية تحقق خاصية الإغلاق.</p>';
    } else {
        results += '<p>1)العملية لا تحقق خاصية الإغلاق.</p>';
    }

    const identity = findIdentity(range, expression);
    if ((identity !== null)&&(checkClosure(range, expression, group))) {

        const finalExpression = expression.replace(/b/g, identity);

        results += `<p>2)\n العنصر المحايد هو${identity}.  =>  ${finalExpression} = a</p>`;
        
    } else {
        results += '<p>2) لا يوجد عنصر محايد.</p>';
    }

    if (checkInverses(range, expression)) {
        results += '<p>3) كل عنصر له نظير.</p>';
    } else {
        results += '<p>3)ليس لكل عنصر نظير.</p>';
    }

    if (checkAssociativity(range, expression)) {
        results += '<p>4) العملية تحقق خاصية التجميع.</p>';
    } else {
        results += '<p>4) العملية لا تحقق خاصية التجميع.</p>';
    }

    document.getElementById('resultsIsGroup').innerHTML = results;
}

// تحديد النطاق للمجموعة
function getRange(group) {
    if (group === 'integers') {
        return { start: -20, end: 25 };
    } else if (group === 'naturals') {
        return { start: 1, end: 40 };
    }
}

// دالة التحقق من الإغلاق
function checkClosure(range, expression, group) {
    for (let a = range.start; a <= range.end; a++) {
        for (let b = range.start; b <= range.end; b++) {
            const result = math.evaluate(expression, { a, b });

            if (group === 'naturals' && result <= 0) {
                return false;
            }

            if (group === 'integers' && !Number.isInteger(result)) {
                return false;
            }
        }
    }
    return true;
}

// دالة العثور على العنصر المحايد
function findIdentity(range, expression) {
    for (let e = range.start; e <= range.end; e++) {
        let isIdentity = true;

        for (let a = range.start; a <= range.end; a++) {
            const resultLeft = math.evaluate(expression, { a, b: e });
            const resultRight = math.evaluate(expression, { a: e, b: a });

            if (resultLeft !== a || resultRight !== a) {
                isIdentity = false;
                break;
            }
        }

        if (isIdentity) {
           
            return e;
        }
    }
    return null;
}

// دالة التحقق من النظير
function checkInverses(range, expression) {
    const identity = findIdentity(range, expression);
    if (identity === null) {
        document.getElementById('resultsIsGroup').innerHTML += '<p>لا يمكن التحقق من النظير لأنه لا يوجد عنصر محايد.</p>';
        return false;
    }

    for (let a = range.start+5; a <= 15; a++) {
        let hasInverse = false;
        for (let b = range.start; b <= range.end; b++) {
            // تقييم العملية الثنائية
            const result = math.evaluate(expression, { a, b });
            
            // التحقق مما إذا كان الناتج هو الهوية
            if (result === identity) {
                hasInverse = true;
                break;
            }
        }
        if (!hasInverse) {
            // إذا لم يتم العثور على النظير، فالشرط لا يتحقق
            return false;
        }
    }
    return true;
}

// دالة التحقق من التجميع
function checkAssociativity(range, expression) {
    for (let a = range.start; a <= range.end; a++) {
        for (let b = range.start; b <= range.end; b++) {
            for (let c = range.start; c <= range.end; c++) {
                const resultLeft = math.evaluate(expression, { a, b: math.evaluate(expression, { a: b, b: c }) });
                const resultRight = math.evaluate(expression, { a: math.evaluate(expression, { a, b: b }), b: c });
                if (resultLeft !== resultRight) {
                    return false;
                }
            }
        }
    }
    return true;
}

// ==========================================
// Infinite Groups Reference Script
// ==========================================

function showInfiniteGroupDetails() {
    const selectedGroup = document.getElementById('infiniteGroupSelect').value;
    const resultBox = document.getElementById('infiniteResultBox');
    
    if (selectedGroup === "none") {
        resultBox.style.display = "none";
        return;
    }

    resultBox.style.display = "block";
    let content = "";

    switch (selectedGroup) {
        case "Z_plus":
            content += `<h2 style="color: #00ff88; text-align: center;">$(\\mathbb{Z}, +)$</h2>`;
            content += `<strong>Definition:</strong> The set of integers $\\{..., -2, -1, 0, 1, 2, ...\\}$ under standard addition. It is the fundamental building block of group theory.<br><br>`;
            content += `<strong>1. Structural Properties:</strong><ul>`;
            content += `<li><strong>Abelian & Cyclic:</strong> It is the <em>only</em> infinite cyclic group (up to isomorphism).</li>`;
            content += `<li><strong>Generators:</strong> $\\mathbb{Z} = \\langle 1 \\rangle = \\langle -1 \\rangle$.</li>`;
            content += `<li><strong>Free Group:</strong> It is the free group on exactly one generator.</li>`;
            content += `<li><strong>Torsion-Free:</strong> The only element with finite order is the identity $0$ (since $n \\cdot a = 0 \\implies a = 0$).</li>`;
            content += `</ul>`;
            content += `<strong>2. Subgroups & Quotients:</strong><ul>`;
            content += `<li>Every subgroup is of the form $n\\mathbb{Z} = \\langle n \\rangle$.</li>`;
            content += `<li>Because $\\mathbb{Z}$ is Abelian, every subgroup $n\\mathbb{Z}$ is Normal ($n\\mathbb{Z} \\triangleleft \\mathbb{Z}$).</li>`;
            content += `<li><strong>Quotient Group:</strong> The quotient $\\frac{\\mathbb{Z}}{n\\mathbb{Z}}$ is isomorphic to the finite cyclic group $\\mathbb{Z}_n$.</li>`;
            content += `</ul>`;
            content += `<strong>3. Homomorphisms:</strong><ul>`;
            content += `<li>Any homomorphism $\\phi: \\mathbb{Z} \\to G$ is completely determined by where it sends the generator $1$. If $\\phi(1) = g$, then $\\phi(n) = g^n$.</li>`;
            content += `<li>Automorphism Group: $Aut(\\mathbb{Z}) \\cong \\mathbb{Z}_2 \\cong \\{1, -1\\}$.</li>`;
            content += `</ul>`;
            break;

        case "R_plus":
            content += `<h2 style="color: #00ff88; text-align: center;">$(\\mathbb{R}, +)$</h2>`;
            content += `<strong>Definition:</strong> The uncountably infinite set of real numbers under addition.<br><br>`;
            content += `<strong>1. Structural Properties:</strong><ul>`;
            content += `<li><strong>Abelian:</strong> Yes, it is a commutative continuous group (a Lie group).</li>`;
            content += `<li><strong>Not Cyclic:</strong> No single element or finite set of elements can generate $\\mathbb{R}$.</li>`;
            content += `<li><strong>Divisible Group:</strong> For any $x \\in \\mathbb{R}$ and any integer $n > 0$, there exists a $y \\in \\mathbb{R}$ such that $n \\cdot y = x$ (namely $y = x/n$).</li>`;
            content += `<li><strong>Torsion-Free:</strong> No non-zero element has finite order.</li>`;
            content += `</ul>`;
            content += `<strong>2. Subgroups & Quotients:</strong><ul>`;
            content += `<li><strong>Discrete Subgroups:</strong> Such as $\\mathbb{Z}$ or $a\\mathbb{Z}$.</li>`;
            content += `<li><strong>Dense Subgroups:</strong> Such as the Rationals $\\mathbb{Q}$ or $\\mathbb{Z}[\\sqrt{2}]$.</li>`;
            content += `<li><strong>Quotient Group (The Circle Group):</strong> The quotient $\\frac{\\mathbb{R}}{\\mathbb{Z}}$ is isomorphic to the Circle Group $\\mathbb{S}^1$ (the group of complex numbers of absolute value 1 under multiplication).</li>`;
            content += `</ul>`;
            break;

        case "R_star":
            content += `<h2 style="color: #00ff88; text-align: center;">$(\\mathbb{R}^*, \\cdot)$</h2>`;
            content += `<strong>Definition:</strong> The set of all non-zero real numbers under multiplication.<br><br>`;
            content += `<strong>1. Structural Properties:</strong><ul>`;
            content += `<li><strong>Abelian:</strong> Yes ($a \\cdot b = b \\cdot a$).</li>`;
            content += `<li><strong>Torsion Subgroup:</strong> The set of elements of finite order is exactly $\\{1, -1\\}$.</li>`;
            content += `<li><strong>Direct Product:</strong> $\\mathbb{R}^*$ is structurally the direct product of its sign and magnitude: $$\\mathbb{R}^* \\cong \\mathbb{Z}_2 \\times \\mathbb{R}^+$$ where $\\mathbb{R}^+$ is the group of positive reals under multiplication.</li>`;
            content += `</ul>`;
            content += `<strong>2. Subgroups & Isomorphisms:</strong><ul>`;
            content += `<li><strong>Important Isomorphism:</strong> The exponential function $e^x$ gives an isomorphism between $(\\mathbb{R}, +)$ and $(\\mathbb{R}^+, \\cdot)$. Thus, $\\mathbb{R}^* \\cong \\mathbb{Z}_2 \\times \\mathbb{R}$.</li>`;
            content += `<li>$\\mathbb{Q}^*$ (non-zero rationals) is a proper subgroup.</li>`;
            content += `</ul>`;
            break;

        case "GLn":
            content += `<h2 style="color: #00ff88; text-align: center;">$GL_n(\\mathbb{R})$</h2>`;
            content += `<strong>Definition:</strong> The General Linear Group of degree $n$. The set of all $n \\times n$ matrices with a non-zero determinant.<br><br>`;
            content += `<strong>1. Structural Properties:</strong><ul>`;
            content += `<li><strong>Non-Abelian:</strong> Matrix multiplication is strictly non-commutative for $n \\ge 2$.</li>`;
            content += `<li><strong>Center $Z(G)$:</strong> The center (elements that commute with all matrices) consists only of scalar matrices $cI_n$ where $c \\neq 0$.</li>`;
            content += `<li><strong>Lie Group:</strong> It is a manifold and a group simultaneously, meaning matrix multiplication is continuous.</li>`;
            content += `</ul>`;
            content += `<strong>2. Subgroups & Quotients:</strong><ul>`;
            content += `<li><strong>$SL_n(\\mathbb{R})$ (Special Linear Group):</strong> Matrices with $\\det(A) = 1$. It is the kernel of the determinant homomorphism, hence it is a Normal Subgroup ($SL_n \\triangleleft GL_n$).</li>`;
            content += `<li><strong>Quotient by SL:</strong> By the First Isomorphism Theorem, $\\frac{GL_n(\\mathbb{R})}{SL_n(\\mathbb{R})} \\cong \\mathbb{R}^*$.</li>`;
            content += `<li><strong>$O(n)$ (Orthogonal Group):</strong> Matrices where $A^T A = I$. Represents rotations and reflections.</li>`;
            content += `</ul>`;
            break;

        case "R2":
            content += `<h2 style="color: #00ff88; text-align: center;">$(\\mathbb{R}^2, +)$</h2>`;
            content += `<strong>Definition:</strong> The Cartesian plane $\\mathbb{R} \\times \\mathbb{R}$ under component-wise addition $(x_1, y_1) + (x_2, y_2) = (x_1+x_2, y_1+y_2)$.<br><br>`;
            content += `<strong>1. Structural Properties:</strong><ul>`;
            content += `<li><strong>Abelian:</strong> Yes, inherited from $\\mathbb{R}$.</li>`;
            content += `<li><strong>Direct Sum:</strong> $\\mathbb{R}^2 \\cong \\mathbb{R} \\oplus \\mathbb{R}$.</li>`;
            content += `<li><strong>Isomorphism:</strong> Structurally isomorphic to the Complex Numbers under addition $(\\mathbb{C}, +)$.</li>`;
            content += `</ul>`;
            content += `<strong>2. Subgroups & Quotients:</strong><ul>`;
            content += `<li><strong>Subgroups (Geometric view):</strong> The closed subgroups are the origin $\\{(0,0)\\}$, any straight line through the origin $y=mx$, and the entire plane $\\mathbb{R}^2$.</li>`;
            content += `<li><strong>Quotient $\\frac{\\mathbb{R}^2}{\\mathbb{Z}^2}$:</strong> This quotient group forms a "Torus" (a donut shape, geometrically), isomorphic to $\\mathbb{S}^1 \\times \\mathbb{S}^1$.</li>`;
            content += `</ul>`;
            break;
    }

    resultBox.innerHTML = content;

    if (window.MathJax) {
        MathJax.typesetPromise([resultBox]).catch((err) => console.log(err.message));
    }
}