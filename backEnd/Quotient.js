document.addEventListener('DOMContentLoaded', function() {
    let resultsDiv = document.getElementById('resultsQ');
    let stepsDiv = document.getElementById('stepsQ');

    // Calculate Zn group cosets
    document.getElementById('submitButton').addEventListener('click', function() {
        let orderGroup = parseInt(document.getElementById('orderGroup').value);
        let subgroupOrder = parseInt(document.getElementById('subgroup').value);

        if (isNaN(orderGroup) || isNaN(subgroupOrder) || orderGroup <= 0 || subgroupOrder <= 0 || orderGroup % subgroupOrder !== 0) {
            alert('Please enter valid values where the order of the group is greater than or equal to the order of the subgroup.');
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
            let cosetLeft = subgroupElements.map(h => (i + h) % orderGroup).sort().join(',');
            let cosetRight = subgroupElements.map(h => (h + i) % orderGroup).sort().join(',');

            if (!seenLeftCosets.has(cosetLeft)) {
                leftCosets.push(subgroupElements.map(h => (i + h) % orderGroup));
                seenLeftCosets.add(cosetLeft);
            }
            if (!seenRightCosets.has(cosetRight)) {
                rightCosets.push(subgroupElements.map(h => (h + i) % orderGroup));
                seenRightCosets.add(cosetRight);
            }
        }

        let isNormal = leftCosets.length === rightCosets.length &&
                        leftCosets.every((coset, index) => 
                            coset.join(',') === rightCosets[index].join(','));

        let formatCosets = (cosets) => {
            return `{ ${cosets.map(coset => `{ ${coset.join(', ')} }`).join(' ; ')} }`;
        };
        resultsDiv.innerHTML = `
            <h2>Zn Group</h2>
            <p><strong>Group:</strong> Z${orderGroup} = { ${Array.from({ length: orderGroup }, (_, i) => i).join(', ')} }</p>
            <p><strong>Subgroup:</strong> <${subgroupOrder}> = { ${subgroupElements.join(', ')} }</p>
            <p><strong>Cosets:</strong> Z${orderGroup} / <${subgroupOrder}> = { ${Array.from({ length: orderGroup / subgroupOrder }, (_, i) => i +"+H").join(', ')} }</p>
            <p>                     = ${formatCosets(rightCosets)}</p>
        `;

        

        stepsDiv.innerHTML = `
            <p><strong>Right Cosets:</strong> ${formatCosets(rightCosets)}</p>
            <p><strong>Left Cosets:</strong> ${formatCosets(leftCosets)}</p>
            <p>${isNormal ? '<strong>The group is Normal.</strong>' : '<strong>The group is not Normal.</strong>'}</p>
        `;
    
        // استدعاء الدالة بعد حساب المصاحبات للزمرة Z_n
generateKellyTable(leftCosets, orderGroup);

// استدعاء الدالة بعد حساب المصاحبات للزمرة الدوارة

    
    });

    // Calculate Cyclic group cosets
    document.getElementById('submitCyclicButton').addEventListener('click', function() {
        let orderCyclicGroup = parseInt(document.getElementById('orderCyclicGroup').value);
        let subgroupOrder = parseInt(document.getElementById('subgroupCyclic').value);

        if (isNaN(orderCyclicGroup) || isNaN(subgroupOrder) || orderCyclicGroup <= 0 || subgroupOrder <= 0 || orderCyclicGroup % subgroupOrder !== 0) {
            alert('Please enter valid values where the order of the group is greater than or equal to the order of the subgroup.');
            return;
        }

        let subgroupElements = [];
        for (let i = 0; i < orderCyclicGroup; i++) {
            if (i % subgroupOrder === 0) {
                subgroupElements.push(`a^${i}`);
            }
        }

        let leftCyclicCosets = [];
        let rightCyclicCosets = [];
        let seenLeftCyclicCosets = new Set();
        let seenRightCyclicCosets = new Set();

        for (let i = 0; i < orderCyclicGroup; i++) {
            let cosetLeft = subgroupElements.map(h => `a^${(i + parseInt(h.substring(2))) % orderCyclicGroup}`).sort().join(',');
            let cosetRight = subgroupElements.map(h => `a^${(parseInt(h.substring(2)) + i) % orderCyclicGroup}`).sort().join(',');

            if (!seenLeftCyclicCosets.has(cosetLeft)) {
                leftCyclicCosets.push(subgroupElements.map(h => `a^${(i + parseInt(h.substring(2))) % orderCyclicGroup}`));
                seenLeftCyclicCosets.add(cosetLeft);
            }
            if (!seenRightCyclicCosets.has(cosetRight)) {
                rightCyclicCosets.push(subgroupElements.map(h => `a^${(parseInt(h.substring(2)) + i) % orderCyclicGroup}`));
                seenRightCyclicCosets.add(cosetRight);
            }
        }

        let isNormalCyclic = leftCyclicCosets.length === rightCyclicCosets.length &&
        leftCyclicCosets.every((coset, index) => 
        coset.join(',') === rightCyclicCosets[index].join(','));
        let formatCyclicCosets = (cosets) => {
            return `{ ${cosets.map(coset => `{ ${coset.join(', ')} }`).join(' ; ')} }`;
        };
        resultsDiv.innerHTML = `
            <h2>Cyclic Group</h2>
            <p><strong>Group:</strong> G = { ${Array.from({ length: orderCyclicGroup }, (_, i) => `a^${i}`).join(', ')} }</p>
            <p><strong>Subgroup:</strong> <${subgroupOrder}> = { ${subgroupElements.join(', ')} }</p>
            <p><strong>Cosets:</strong> G / <${subgroupOrder}> = { ${Array.from({ length: orderCyclicGroup / subgroupOrder }, (_, i) => "a^"+( i )+"+H").join(', ')} }</p>
            <p> = ${formatCyclicCosets(rightCyclicCosets)}</p>
            `;
        
        
        
        stepsDiv.innerHTML += `
            <p><strong>Right Cosets:</strong> ${formatCyclicCosets(rightCyclicCosets)}</p>
            <p><strong>Left Cosets:</strong> ${formatCyclicCosets(leftCyclicCosets)}</p>
            <p>${isNormalCyclic ? '<strong>The group is Normal.</strong>' : '<strong>The group is not Normal.</strong>'}</p>
        `;
    
        generateKellyTableCyclc(leftCyclicCosets, orderCyclicGroup);

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
});
// Function to create Kelly table for normal group
function generateKellyTable(cosets, orderGroup) {
    let tableHtml = '<table>';
    
    // إنشاء الصف العلوي (رؤوس الأعمدة)
    tableHtml += '<tr><th>Coset</th>';
    for (let i = 0; i < cosets.length; i++) {
        tableHtml += `<th>${i+"+H"}</th>`;
        
    }
    tableHtml += '</tr>';
    
    // إنشاء الصفوف التالية (الأعمدة والصفوف)
    for (let i = 0; i < cosets.length; i++) {
        tableHtml += `<tr><th>${i+"+H"}</th>`;
        for (let j = 0; j < cosets.length; j++) {
            let product = cosets[i].map(x => cosets[j].map(y => (x + y) % orderGroup)).flat();
            tableHtml += `<td>${(i+j)%cosets.length+"+H"}</td>`;
        }
        tableHtml += '</tr>';
    }
    
    tableHtml += '</table>';
    
    document.getElementById('kelly-table').innerHTML = tableHtml;
}
    // وضع الدوارة 
    function generateKellyTableCyclc(cosets, orderGroup) {
        let tableHtml = '<table>';
        
        // إنشاء الصف العلوي (رؤوس الأعمدة)
        tableHtml += '<tr><th>Coset</th>';
        for (let i = 0; i < cosets.length; i++) {
            tableHtml += `<th>${"a^"+i+"+H"}</th>`;
            
        }
        tableHtml += '</tr>';
        
        // إنشاء الصفوف التالية (الأعمدة والصفوف)
        for (let i = 0; i < cosets.length; i++) {
            tableHtml += `<tr><th>${"a^"+i+"+H"}</th>`;
            for (let j = 0; j < cosets.length; j++) {
                let product = cosets[i].map(x => cosets[j].map(y => (x + y) % orderGroup)).flat();
                tableHtml += `<td>${"a^"+ ((+i+j)%cosets.length)+"+H"}</td>`;
            }
            tableHtml += '</tr>';
        }
        
        tableHtml += '</table>';
        
        document.getElementById('kelly-table').innerHTML = tableHtml;
    }