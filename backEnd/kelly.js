document.getElementById("ShowResultOfZn").addEventListener("click", (e) => {
    document.getElementById("resultsOfZn").style.display = "block";
    calculateZn();
});

function calculateZn() {
    let mod = parseInt(document.getElementById("modulo").value);
    let table = document.getElementById("kleinTable");
    table.innerHTML = ""; // تفريغ الجدول إذا كان هناك محتوى قديم

    // إنشاء رأس الجدول
    let headerRow = document.createElement("tr");
    let emptyCell = document.createElement("th");
    headerRow.appendChild(emptyCell);

    for (let i = 0; i < mod; i++) {
        let th = document.createElement("th");
        th.textContent = i;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // إنشاء محتوى الجدول
    for (let i = 0; i < mod; i++) {
        let row = document.createElement("tr");
        let rowHeader = document.createElement("th");
        rowHeader.textContent = i;
        row.appendChild(rowHeader);

        for (let j = 0; j < mod; j++) {
            let cell = document.createElement("td");
            cell.textContent = (i + j) % mod; // حساب العملية المعيارية
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}
