#FizzBuzz unit test
#
#run FizzBuzz.py
#
#how many 3's of 100
#how many 5's of 100
#how many 3's and 5's of 100
#sum of 3s equals sum of "Fizz"
#sum of 5s equals sum of "Buzz"
#sum of 3s+5s equals sum of "FizzBuzz"
#

for x in range (1, 101):
	if x % 3 == 0 and x % 5 == 0:
		print "FizzBuzz"
	elif x % 3 == 0:
		print "Fizz"	
	elif x % 5 == 0:
		print "Buzz"
	else:
		print x
