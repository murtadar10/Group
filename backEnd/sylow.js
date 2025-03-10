// function checkSylowPSubgroups() {
//     const groupOrder = parseInt(document.getElementById('groupOrderSylow').value.trim());

//     if (isNaN(groupOrder) || groupOrder <= 0) {
//         document.getElementById('resultSylow').innerText = 'Please enter a valid group order.';
//         return;
//     }

//     const primeFactors = getPrimeFactors(groupOrder);
//     let results = [];

//     primeFactors.forEach(primeFactor => {
//         const pPower = getHighestPowerOfPrime(primeFactor, groupOrder);
//         const pPowerValue = Math.pow(primeFactor, pPower);
//         const isSylow = (pPowerValue > 0 && groupOrder % pPowerValue === 0);

//         results.push(`\nOrder of ${primeFactor}-Sylow subgroup:`);
//         results.push(`Order ${pPowerValue} ${isSylow ? 'is' : 'is not'} Sylow ${primeFactor}-subgroup`);
        
//         if (isSylow) {
//             results.push(`Sylow ${primeFactor}-subgroups:`);
//             const subgroups = getSylowSubgroups(primeFactor, groupOrder);
//             results.push(`The ${primeFactor}-subgroup of (Z${groupOrder}, +${groupOrder}) is { ${subgroups.join(', ')} }`);
//         }
//     });

//     document.getElementById('resultSylow').innerText = results.join('\n');
// }

// function getPrimeFactors(n) {
//     let factors = [];
//     for (let i = 2; i <= n; i++) {
//         if (n % i === 0) {
//             let isPrime = true;
//             for (let j = 2; j <= Math.sqrt(i); j++) {
//                 if (i % j === 0) {
//                     isPrime = false;
//                     break;
//                 }
//             }
//             if (isPrime && !factors.includes(i)) {
//                 factors.push(i);
//             }
//         }
//     }
//     return factors;
// }

// function getHighestPowerOfPrime(prime, number) {
//     let power = 0;
//     while (number % prime === 0) {
//         number /= prime;
//         power++;
//     }
//     return power;
// }

// function getSylowSubgroups(prime, order) {
//     let subgroups = [];
//     for (let i = 1; i < order; i++) {
//         if (order % i === 0 && gcdSylow(order, i) === i) {
//             const subgroupOrder = order / gcdSylow(order, i);
//             const pPower = getHighestPowerOfPrime(prime, subgroupOrder);
//             if (Math.pow(prime, pPower) === subgroupOrder) {
//                 subgroups.push(`<${i}>`);
//             }
//         }
//     }
//     return subgroups.length > 0 ? subgroups : ['None'];
// }

// function gcdSylow(a, b) {
//     while (b !== 0) {
//         [a, b] = [b, a % b];
//     }
//     return a;
// }
