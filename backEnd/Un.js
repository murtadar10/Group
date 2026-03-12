function gcd(a, b) {
    while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

function calculateUn() {
    const n = parseInt(document.getElementById('inputN').value);
    if (!n || n <= 0) return alert('Please enter a valid positive integer.');

    let elements = [];
    let orders = [];

    // حساب عناصر U_n
    for (let i = 1; i < n; i++) {
        if (gcd(i, n) === 1) {
            elements.push(i);
        }
    }

    // حساب الأوامر وما يولده كل عنصر
    elements.forEach(element => {
        let order = 1;
        let generated = [element];
        let value = element;
        while (true) {
            value = (value * element) % n;
            if (value === element) break;
            generated.push(value);
            order++;
        }
        orders.push({ element, order, generated });
    });

    // عرض النتائج
    document.getElementById('resultContainer').style.display = 'block';

    document.getElementById('elements').textContent = `U${n} = { ${elements.join(', ')} }`;
    orders.forEach(o => {
       let p = document.createElement("p")
       let span = document.createElement("span")
       span.style.color="red"
       span.appendChild(document.createTextNode(` ${o.order} `))
   p.className = "newP" 
   
p.appendChild(document.createTextNode(`${o.element} = {${o.generated.join(', ')}}    ; |${o.element}|= `))
p.appendChild(span)
document.getElementById('order').appendChild(p)

    });
   

    // رسم جدول كيلي
    let table = '<table><thead><tr><th>*</th>';
    elements.forEach(e => table += `<th>${e}</th>`);
    table += '</tr></thead><tbody>';

    elements.forEach(row => {
        table += `<tr><th>${row}</th>`;
        elements.forEach(col => {
            table += `<td>${(row * col) % n}</td>`;
        });
        table += '</tr>';
    });
    table += '</tbody></table>';

    document.getElementById('tableContainer').innerHTML = table;
}

document.getElementById("UnCalcBtn").addEventListener("click", (r => {
    document.getElementById("order").innerText="";
    calculateUn()
}))