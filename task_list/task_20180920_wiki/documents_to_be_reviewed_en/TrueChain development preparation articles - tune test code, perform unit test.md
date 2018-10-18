[Original link](https://github.com/truechain/wiki/blob/master/developer/1.8.truechain_execute_tests.md)

TrueChain development environment, currently supports Windows, MacOS, Linux.
This section describes how to perform unit tests.
___

### Run `go test -v` to run the test code
___
#### 1. Introduction

Execute the following command, it will automatically check the test module and code in the current directory, and automatically load the execution. It is also the main command we use to test the code and perform unit tests.

```
go test
```

#### 2. Running unit test
In the tests directory of TrueChain's truechain-engineering-code project, there are mainly the following test files:

 - block_test.go
 - block_test_util.go
 - difficulty_test.go
 - difficulty_test_util.go
 - init_test.go
 - rlp_test.go
 - rlp_test_util.go
 - state_test.go
 - state_test_util.go
 - transaction_test.go
 - transaction_test_util.go
 - vm_test.go
 - vm_test_util.go

Beginners can enter the project as soon as possible by learning the test code.

**Specific implementation steps**

Run the following command and switch to the tests directory:

```
cd tests
```

And then run the following command:

```
go test -v
```

**Running result**
The results of the full pass test are as follows:

```
--- PASS: TestTransaction (0.00s)
--- PASS: TestBlockchain (0.00s)
--- PASS: TestRLP (0.00s)
--- PASS: TestVM (0.00s)
--- PASS: TestState (0.00s)
--- PASS: TestDifficulty (0.00s)
PASS
ok      github.com/truechain/truechain-engineering-code/tests   0.107s
```
It indicates that all five test modules passed the test.

**Common problems and processing method**

 1. If you find that some of the pacakge is not complete, you can run the `go get [pacakage]` command to get the specified pacakge.
 2. If you find an error gcc compiler error problem, "Window environment to build," according to the documentation section check for correct installation MinGW.
 3. If you find that you can't find the file error, like "can't find test files in testdata\TransactionTests, did you clone the tests submodule?", you can follow the error prompt, first create the testdata directory in the tests directory, then in the testdata directory. The problem can be solved by creating the corresponding TransactionTests directory. Run go test -v again. Check the results of the run until all passes the test.

### Supplement
In view of the different development environment and configuration of each person, you may encounter other problems that cannot pass the `go test`. It is recommended that you use the search more and try to solve it yourself. If you still have problems, you can mention the issue.
