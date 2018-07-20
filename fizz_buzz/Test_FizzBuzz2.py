# test_fizzbuzz2.py

def fizzbuzz(n: int):
	if n % 3 == 0 and n % 5 == 0:
		return 'fizzbuzz'
	elif n % 3 == 0: 
		return 'Fizz'
	elif n % 5 == 0: 
		return 'Buzz'
	else:
		return n:
				