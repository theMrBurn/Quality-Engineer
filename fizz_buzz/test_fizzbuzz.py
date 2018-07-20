#FizzBuzz unit test
#

#
#how many 3's of 100
#how many 5's of 100
#how many 3's and 5's of 100
#sum of 3s equals sum of "Fizz"
#sum of 5s equals sum of "Buzz"
#sum of 3s+5s equals sum of "FizzBuzz"
#

import unittest
import fizzbuzz

class Test_FizzBuzz():

	def test_fizzbuzz_01_100(self):
		# run FizzBuzz.py
		result = fizzbuzz(1, 101)
		# check for expected output
	
