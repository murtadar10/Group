document.addEventListener('DOMContentLoaded', function() {
    let resultsDiv = document.getElementById('resultsQ');
    let stepsDiv = document.getElementById('stepsQ');

    // ==========================================
    // 1. Calculate Zn group cosets (الزمرة المعيارية)
    // ==========================================
    document.getElementById('submitButton').addEventListener('click', function() {
        let orderGroup = parseInt(document.getElementById('orderGroup').value);
        let subgroupOrder = parseInt(document.getElementById('subgroup').value);

        if (isNaN(orderGroup) || isNaN(subgroupOrder) || orderGroup <= 0 || subgroupOrder <= 0 || orderGroup % subgroupOrder !== 0) {
            alert('Please enter valid values where the order of the group is a multiple of the order of the subgroup.');
            return;
        }

        let subgroupElements = [];
        for (let i = 0; i < orderGroup; i++) {
            if (i % subgroupOrder === 0) {
                subgroupElements.push(i);
            }
        }

        let leftCosets = [];
        let rightCosets = [];
        let seenLeftCosets = new Set();
        let seenRightCosets = new Set();

        for (let i = 0; i < orderGroup; i++) {
            let cosetLeft = subgroupElements.map(h => (i + h) % orderGroup).sort((a,b)=>a-b).join(',');
            let cosetRight = subgroupElements.map(h => (h + i) % orderGroup).sort((a,b)=>a-b).join(',');

            if (!seenLeftCosets.has(cosetLeft)) {
                leftCosets.push(subgroupElements.map(h => (i + h) % orderGroup).sort((a,b)=>a-b));
                seenLeftCosets.add(cosetLeft);
            }
            if (!seenRightCosets.has(cosetRight)) {
                rightCosets.push(subgroupElements.map(h => (h + i) % orderGroup).sort((a,b)=>a-b));
                seenRightCosets.add(cosetRight);
            }
        }

        let isNormal = leftCosets.length === rightCosets.length &&
                        leftCosets.every((coset, index) => 
                            coset.join(',') === rightCosets[index].join(','));

        // تنسيق المصاحبات بالـ LaTeX
        let formatCosets = (cosets) => {
            return `\\{ ${cosets.map(coset => `\\{ ${coset.join(', ')} \\}`).join(' , ')} \\}`;
        };

        resultsDiv.innerHTML = `
            <h2>$Z_n$ Group</h2>
            <p><strong>Group $G$:</strong> $Z_{${orderGroup}} = \\{ ${Array.from({ length: orderGroup }, (_, i) => i).join(', ')} \\}$</p>
            <p><strong>Subgroup :</strong> $H = \\langle ${subgroupOrder} \\rangle = \\{ ${subgroupElements.join(', ')} \\}$</p>
            <p><strong>Quotient Group:</strong> $$\\frac{Z_{${orderGroup}}}{H} = \\{ ${Array.from({ length: orderGroup / subgroupOrder }, (_, i) => `${i} + H`).join(', ')} \\}$$</p>
            <p>$$= ${formatCosets(rightCosets)}$$</p>
        `;

        stepsDiv.innerHTML = `
            <p><strong>Right Cosets:</strong> $$${formatCosets(rightCosets)}$$</p>
            <p><strong>Left Cosets:</strong> $$${formatCosets(leftCosets)}$$</p>
            <p>${isNormal ? '<strong>Since Left Cosets = Right Cosets, $H$ is a Normal Subgroup $\\triangleleft Z_n$.</strong>' : '<strong>The subgroup is NOT Normal.</strong>'}</p>
        `;
    
        // رسم جدول كيلي
        generateKellyTable(leftCosets, orderGroup);
        
        // تفعيل MathJax لتحويل المعادلات فوراً
        triggerMathJax();
    });

    // ==========================================
    // 2. Calculate Cyclic group cosets (الزمرة الدوارة)
    // ==========================================
    document.getElementById('submitCyclicButton').addEventListener('click', function() {
        let orderCyclicGroup = parseInt(document.getElementById('orderCyclicGroup').value);
        let subgroupOrder = parseInt(document.getElementById('subgroupCyclic').value);

        if (isNaN(orderCyclicGroup) || isNaN(subgroupOrder) || orderCyclicGroup <= 0 || subgroupOrder <= 0 || orderCyclicGroup % subgroupOrder !== 0) {
            alert('Please enter valid values where the order of the group is a multiple of the order of the subgroup.');
            return;
        }

        let subgroupElements = [];
        for (let i = 0; i < orderCyclicGroup; i++) {
            if (i % subgroupOrder === 0) {
                subgroupElements.push(i); // نكتفي بتخزين الأسس فقط لتسهيل المعالجة
            }
        }

        let leftCyclicCosets = [];
        let rightCyclicCosets = [];
        let seenLeftCyclicCosets = new Set();
        let seenRightCyclicCosets = new Set();

        for (let i = 0; i < orderCyclicGroup; i++) {
            let cosetLeft = subgroupElements.map(h => (i + h) % orderCyclicGroup).sort((a,b)=>a-b).join(',');
            let cosetRight = subgroupElements.map(h => (h + i) % orderCyclicGroup).sort((a,b)=>a-b).join(',');

            if (!seenLeftCyclicCosets.has(cosetLeft)) {
                leftCyclicCosets.push(subgroupElements.map(h => (i + h) % orderCyclicGroup).sort((a,b)=>a-b));
                seenLeftCyclicCosets.add(cosetLeft);
            }
            if (!seenRightCyclicCosets.has(cosetRight)) {
                rightCyclicCosets.push(subgroupElements.map(h => (h + i) % orderCyclicGroup).sort((a,b)=>a-b));
                seenRightCyclicCosets.add(cosetRight);
            }
        }

        let isNormalCyclic = leftCyclicCosets.length === rightCyclicCosets.length &&
                             leftCyclicCosets.every((coset, index) => coset.join(',') === rightCyclicCosets[index].join(','));
        
        // تنسيق المصاحبات الدوارة لتصبح a^x بالـ LaTeX
        let formatCyclicCosets = (cosets) => {
            return `\\{ ${cosets.map(coset => `\\{ ${coset.map(pow => `a^{${pow}}`).join(', ')} \\}`).join(' , ')} \\}`;
        };

        resultsDiv.innerHTML = `
            <h2>Cyclic Group</h2>
            <p><strong>Group $G$:</strong> $G = \\langle a \\rangle = \\{ ${Array.from({ length: orderCyclicGroup }, (_, i) => `a^{${i}}`).join(', ')} \\}$</p>
            <p><strong>Subgroup:</strong> $H = \\langle a^{${subgroupOrder}} \\rangle = \\{ ${subgroupElements.map(pow => `a^{${pow}}`).join(', ')} \\}$</p>
            <p><strong>Quotient Group:</strong> $$\\frac{G}{H} = \\{ ${Array.from({ length: orderCyclicGroup / subgroupOrder }, (_, i) => `a^{${i}}*H`).join(', ')} \\}$$</p>
            <p>$$= ${formatCyclicCosets(rightCyclicCosets)}$$</p>
        `;
        
        stepsDiv.innerHTML = `
            <p><strong>Right Cosets:</strong> $$${formatCyclicCosets(rightCyclicCosets)}$$</p>
            <p><strong>Left Cosets:</strong> $$${formatCyclicCosets(leftCyclicCosets)}$$</p>
            <p>${isNormalCyclic ? '<strong>Since $G$ is Abelian/Cyclic, $H$ is always a Normal Subgroup $\\triangleleft G$.</strong>' : '<strong>The subgroup is not Normal.</strong>'}</p>
        `;
    
        generateKellyTableCyclc(leftCyclicCosets, orderCyclicGroup);
        
        // تفعيل MathJax
        triggerMathJax();
    });

    // Toggle between Zn and Cyclic groups
    document.getElementById('toggleButton').addEventListener('click', function() {
        let ZnGroupDiv = document.getElementById('quotietnZn');
        let CyclicGroupDiv = document.getElementById('quotientCyclic');

        if (ZnGroupDiv.classList.contains('hidden')) {
            ZnGroupDiv.classList.remove('hidden');
            CyclicGroupDiv.classList.add('hidden');
            this.textContent = 'Switch to Cyclic Group';
        } else {
            ZnGroupDiv.classList.add('hidden');
            CyclicGroupDiv.classList.remove('hidden');
            this.textContent = 'Switch to Zn Group';
        }
    });

    // ==========================================
    // 3. الدوال المساعدة لرسم الجداول وتفعيل الـ LaTeX
    // ==========================================

    // جدول كيلي لزمرة Zn
    function generateKellyTable(cosets, orderGroup) {
        let tableHtml = '<table class="cayley-table">';
        tableHtml += '<tr><th>Coset</th>';
        for (let i = 0; i < cosets.length; i++) {
            tableHtml += `<th>$${i} + H$</th>`;
        }
        tableHtml += '</tr>';
        
        for (let i = 0; i < cosets.length; i++) {
            tableHtml += `<tr><th>$${i} + H$</th>`;
            for (let j = 0; j < cosets.length; j++) {
                tableHtml += `<td>$${(i + j) % cosets.length} + H$</td>`;
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';
        document.getElementById('kelly-table').innerHTML = tableHtml;
    }

    // جدول كيلي للزمرة الدوارة
    function generateKellyTableCyclc(cosets, orderGroup) {
        let tableHtml = '<table class="cayley-table">';
        tableHtml += '<tr><th>Coset</th>';
        for (let i = 0; i < cosets.length; i++) {
            tableHtml += `<th>$a^{${i}}*H$</th>`;
        }
        tableHtml += '</tr>';
        
        for (let i = 0; i < cosets.length; i++) {
            tableHtml += `<tr><th>$a^{${i}}H$</th>`;
            for (let j = 0; j < cosets.length; j++) {
                tableHtml += `<td>$a^{${(i + j) % cosets.length}}*H$</td>`;
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';
        document.getElementById('kelly-table').innerHTML = tableHtml;
    }

    // دالة لاستدعاء MathJax بشكل آمن وتحديث جميع النتائج
    function triggerMathJax() {
        if (window.MathJax) {
            let resultsDiv = document.getElementById('resultsQ');
            let stepsDiv = document.getElementById('stepsQ');
            let kellyTable = document.getElementById('kelly-table');
            MathJax.typesetPromise([resultsDiv, stepsDiv, kellyTable]).catch((err) => console.log(err.message));
        }
    }
});