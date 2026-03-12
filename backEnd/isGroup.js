
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

