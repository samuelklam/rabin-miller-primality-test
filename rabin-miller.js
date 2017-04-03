/*
 * Function for modular exponentiation (ensures against integer overflow),
 * computes (base^expo) mod n
 * @param base : used as base
 * @param expo : used as expo
 * @param n : used to mod
 * @return result : result = ((base^expo) mod n)
 */
function modularExponentiation(base, expo, n) {
    let val = 1;
    while (expo > 0) {
        // the case that expo is odd, make sure to multiply by one base
        if (expo % 2 === 1) {
            val = (val * base) % n;
        }
        // repeated squaring
        base = (base * base) % n;
        expo = Math.floor(expo / 2);
    }
    return val;
}

 /*
  * Function implements Rabin Miller Primality Test
  * @param n : number to test for primality
  * @param u : denotes u in the equation (n-1 = (2^t)u)
  * @return bool : if prime True else False
  */
 function RabinMillerTest(n, u) {
    // pick random integer 2 <= a < n
    let a = Math.floor(Math.random() * (n-2)) + 2;
    let expo = u;
    let val;

    while (expo !== n-1) {
        val = modularExponentiation(a, expo, n);
        if (val !== 1 && val !== n-1) {
            console.log(a, u, expo);
            return false;
        }
        expo *= 2;
    }
    val = modularExponentiation(a, expo, n);
    if (val !== 1) {
        console.log(a, u, expo);
        return false;
    }
    return true;
 }

/*
 * Function checks whether a # is prime using Rabin Miller Primality Test
 * @param n : number to test for primality
 * @param numTrials : # of times to run probabilistic Rabin Miller test
 * @return bool : if prime True else False
 */
function isPrime(n, numTrials) {
    if (n < 2) return false;
    else if (n !== 2 && n % 2 === 0) return false;

    // compute u, s.t. n-1 = (2^t)u
    let u = n - 1;
    while (u % 2 === 0) {
        u = Math.floor(u / 2);
    }

    // run trials
    for (let i = 0; i < numTrials; i++) {
        if (!RabinMillerTest(n, u)) {
            return false;
        }
    }
    return true;
}

let n = 294409;
let numTrials = 100;
isPrime(n, numTrials);
