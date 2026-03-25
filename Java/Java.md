## CH 01
- C and C++ was dominant at that time, so Sun constructed a team lead by James Gosling to produce new programming language which is portable and platform-independent.
- **platform-independent** : doesn't depend on hardware specifications to run a software program.
- **portable** : can use the output of compilation and run it on any CPU and get the same result. (no need to recompile the output again to match compilations based on CPU types).
- The evolution of Internet at that time helped Java's growth too much.
- OOP features that was existed in C and C++ is the same features and concepts in Java but with some modifications to solve the problems developers faced.
- Java was to internet programming what C was to system programming.
- Java impact on internet
	- Applet : embedded Java code in HTML which makes some interactions (was really interesting at that time)
	- Security : no need to run the application on your machine
	- Portability : really great to use same compiled application on different machines/servers.
- **Bytecode** : Java's magic 
	- intermediate code
	- once you have (JVM) on your machine you can run the Bytecode
	- If you don't want to use bytecode (intermediate code) and you want to make the process faster by generating compiled code for specific operating system, it is OK.
- Java Buzzwords
	- Architecture neutral : "write once; Run anywhere" (Bytecode solution).
	- Simple : really near to other programming languages.
	- Secure : "Applet" solved this problem and made Java code more secure.
	- Portable
	- Object-Oriented
	- Robust : Java is a strictly programming languages 
	- Multithreaded 


## CH 02
- Process-oriented model : 
	- code acting on data
	- procedural languages such as C
	- the problems appear when data comes too large, the program will be too complex
- Object-oriented programming model :
	- focus around the data, refer it as objects, models , .... 
- Principles :
	- Encapsulation
	- Inheritance
	- Polymorphism 
	- Abstraction

- Comments
	- `// single commment`
	- `/* multi line comment */`
	- `/** class documentation */` : once JDK finds this comment, it convert it to HTML. So, you can generate class documentation easily.
### Ch 03
- Data types, variables, arrays

- widening
	- `char -> byte -> short -> int -> long -> float -> double`
	- smaller -> larger
	- safe
	- implicit
- narrowing
	- `double -> float -> long -> int -> short -> byte`
	- larger -> smaller
	- not safe at all
	- explicit

- `System.currentTimeMillis()`
	- if it takes too much time (minutes/seconds) , it will be perfect
	- example : reading data from large files
- `Syste.nanoTime()`
	- to compute time of operations that takes nano seconds
	- such as finding min value in array

### Ch 05
- packages, interfaces

- outer class can be : public , no modifier (package-private)
- inner class : public, private, package private, protected

```java
public class OuterClass {
    private String secret = "Top Secret Data";

    // Valid: Private Inner Class
    private class InnerHelper {
        void showSecret() {
            // Inner classes can access private members of the outer class
            System.out.println("Accessing: " + secret);
        }
    }

    // Method to use the private inner class within the outer class
    public void useHelper() {
        InnerHelper helper = new InnerHelper();
        helper.showSecret();
    }
}

class Main {
    public static void main(String[] args) {
        OuterClass outer = new OuterClass();
        outer.useHelper(); // This works!

        // ERROR: OuterClass.InnerHelper has private access in OuterClass
        // OuterClass.InnerHelper helper = outer.new InnerHelper(); 
    }
}
```


- interface
	- specify what should you do, not how to do
	- any method in interface is `abstract` implicitly
	- any variable in interface is `final public static` constant, so it must be initialized
	- interface can have many default methods
	- interface can have static methods
	- interface can have private methods also


### CH 07
- Error : 
	- irrecoverable conditions , such as memory leak , stack overflow.
	- Programmer doesn't have control , we should not try to handle it.
- Exception : 
	- can be caught and handled by the program

	- Runtime Exception : 
		- Improper use of an API - `IllegalArgumentException`
		- Null pointer access (missing the initialization of a variable) - `NullPointerException`
		- Out-of-bounds array access - `ArrayIndexOutOfBoundsException`
		- Dividing a number by 0 - `ArithmeticException`
		- You can think about it in this way. "If it is a runtime exception, it is your fault".
		- The `NullPointerException` would not have occurred if you had checked whether the variable was initialized or not before using it.
		-  An `ArrayIndexOutOfBoundsException` would not have occurred if you tested the array index against the array bounds.

- checked exception
	- checked at compile time
	- such as , IO Exception, SQL exception
- unchecked exception
	- happens at runtime
	- extend `RuntimeException`
	- such as : `NullPointerException`

- **Checked** → Compiler forces you to handle or declare them
- **Unchecked** → Compiler does **not** force you (but you should still handle them)

- **If exceptions are thrown from both the try block and the try-with-resources statement, ==exception from the try block is thrown== and ==exception from the try-with-resources statement is suppressed==.**


### CH 09 : Collections
- it is illegal to remove if it wasn't preceded by `next` call, if you try , it will throw `IllegalStateException`


### CH 10 : Stream
- Creating Streams ways : 
	1- Stream.of(collection_object) `Stream empStreamArr = Stream.of(empArr)`
	2- `Stream empStreamFromList = empList.stream()`
	3- `Stream.Builder<Employee> s_builder = Stream.builder()`
	
```java
Stream.Builder<Employee> s_builder = Stream.builder();
s_builder.accept(emp[0]);
s_builder.accept(emp[1]);
s_builder.accept(emp[2]);

Stream<Employee> empStream = s_builder.build();
```


