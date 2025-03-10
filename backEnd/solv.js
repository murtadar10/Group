// function addSubgroupSolv() {
//     const container = document.getElementById('normalSubgroupsSolv');
//     const newSubgroup = document.createElement('div');
//     newSubgroup.className = 'jorden-input-group';
//     newSubgroup.innerHTML = `
//         <button class="jorden-remove-btn" onclick="removeSubgroupSolv(this)">x</button>
//         <input type="number" placeholder="Subgroup order" min="1" />
//     `;
//     container.appendChild(newSubgroup);
//     updateSeparatorsSolv();
// }

// function removeSubgroupSolv(button) {
//     const container = document.getElementById('normalSubgroupsSolv');
//     container.removeChild(button.parentElement);
//     updateSeparatorsSolv();
// }

// function updateSeparatorsSolv() {
//     const container = document.getElementById('normalSubgroupsSolv');
//     const items = container.querySelectorAll('.jorden-input-group');
//     items.forEach((item, index) => {
//         // Remove existing separators
//         const existingSeparator = item.querySelector('.jorden-separator');
//         if (existingSeparator) {
//             item.removeChild(existingSeparator);
//         }
        
//         // Add new separator
//         if (index < items.length - 1) {
//             let separator = document.createElement('span');
//             separator.className = 'jorden-separator';
//             separator.innerText = '⊃';
//             item.appendChild(separator);
//         }
//     });
// }

// function checkSolvabilitySolv() {
//     const groupOrder = parseInt(document.getElementById('groupOrderSolv').value.trim());
//     if (isNaN(groupOrder) || groupOrder <= 0) {
//         document.getElementById('resultSolv').innerText = 'Please enter a valid order for the group.';
//         document.getElementById('stepsSolv').innerText = '';
//         return;
//     }

//     const inputs = document.querySelectorAll('#normalSubgroupsSolv input');
//     const subgroupOrders = Array.from(inputs).map(input => parseInt(input.value.trim()));
    
//     if (subgroupOrders.some(isNaN) || subgroupOrders.some(g => g <= 0)) {
//         document.getElementById('resultSolv').innerText = 'Please enter valid orders for the subgroups.';
//         document.getElementById('stepsSolv').innerText = '';
//         return;
//     }

//     let steps = '';
//     let isSolvable = true;
//     let previousOrder = groupOrder;

//     for (let i = 0; i < subgroupOrders.length; i++) {
//         const currentOrder = subgroupOrders[i];
        
//         if (previousOrder % currentOrder !== 0) {
//             isSolvable = false;
//             steps += `Order of previous subgroup ${previousOrder} / Order of current subgroup ${currentOrder} is not an integer.\n`;
//             steps += `The subgroup is not normal relative to the previous subgroup.\n`;
//             break;
//         }

//         steps += `Order of previous subgroup ${previousOrder} / Order of current subgroup ${currentOrder} = ${previousOrder / currentOrder}\n`;
//         previousOrder = currentOrder;
//     }

//     if (isSolvable) {
//         document.getElementById('resultSolv').innerText = 'The group is solvable.';
//     } else {
//         document.getElementById('resultSolv').innerText = 'The group is not solvable.';
//     }

//     document.getElementById('stepsSolv').innerText = steps;
// }
