/*
 * Function for modular exponentiation, computes (base^expo) mod n
 * Ensures against integer overflow
 */
function modularExponentiation(base, expo, n) {
    let val = 1;
    while (expo > 0) {
        // the case that expo is odd, make sure to multiply by 1 base
        if (expo % 2 === 1) {
            val = (val * base) % n;
        }
        // repeated squaring
        base = (base * base) % n;
        expo /= 2;
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
    // pick random integer 2 <= a < p
    let a = Math.floor(Math.random() * (n-1)) + 2;

    let result = modularExponentiation(a, u, n);

    if (result === 1 || result === n-1) return true;

    while (u !== n-1) {
        result = (result * result) % n;
        u *= 2;
        if (result === 1) {
            console.log('A value:', a, 'Expo value:', u);
            return false;
        }
        if (result === n-1) {
            return true;
        }
    }
    console.log('A value:', a, ', Expo value:', u);
    return false;
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
        u /= 2;
    }

    // run trials
    for (let i = 0; i < numTrials; i++) {
        if (!RabinMillerTest(n, u)) {
            return false;
        }
    }
    return true;
}

isPrime(636127, 10);
