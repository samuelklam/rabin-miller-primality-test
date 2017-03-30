from random import randrange
import math

def mod_e(base, expo, n):
    val1 = 1
    while expo > 0:
        # the case that expo is odd, make sure to multiply by 1 base
        if expo % 2 == 1:
            val1 = (val1 * base) % n
        # repeated squaring
        base = (base * base) % n
        expo = math.floor(expo / 2)
    return val1 % n


def probably_prime(n, k):
    """
    Return True if n passes k rounds of the Miller-Rabin primality
    test (and is probably prime). Return False if n is proved to be
    composite.
    """
    small_primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
    if n < 2:
        return False
    for p in small_primes:
        if n < p * p:
            return True
        if n % p == 0:
            return False
    r, s = 0, n - 1
    while s % 2 == 0:
        r += 1
        s //= 2
        print s
    print r
    for _ in range(k):
        a = randrange(2, n - 1)
        x = mod_e(a, s, n)
        if x == 1 or x == n - 1:
            continue
        for _ in range(r - 1):
            x = mod_e(x, 2, n)
            if x == n - 1:
                break
        else:
            return False
    return True


print probably_prime(967, 30)
