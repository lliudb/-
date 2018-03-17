### Go笔记

### 程序结构

#### 基本结构
* 包声明
* 引入包
* 函数
* 变量
* 语句 & 表达式
* 注释

```go
package main

import "fmt"

/* 存在该函数时优先该函数执行 */
func init() {

}

/* 一般来说为程序的入口 */
func main () {
	fmt.Println("hello world")   //输出到控制台,字符串必输双引号，character用单引号
}

```


#### 标识符
> 标识符用来命名变量、类型等程序实体。一个标识符实际上就是一个或是多个字母(A~Z和a~z)数字(0~9)、下划线_组成的序列，但是第一个字符必须是字母或下划线而不能是数字。

#### 关键字
##### 25 个`关键字`或`保留字`
* `package`
* `import`
* `func`
* `interface`
* `for`,`range`
* `select`,`switch`,`case`,`default`
* `defer`
* `go`
* `map`
* `type`,`struct`:结构类型,`type vname struct { }`
* `chan`:channel类型
* `if`,`else`
* `fallthrough`
* `continue`,`break`,`goto`
* `const`,`var`: 声明变量
* `return`
##### 36 个`预定义标识符`
* append
* `bool`,`true`,`false`:布尔型的值只可以是常量`true`或者`false`, `var b bool = true`
* `byte`:类似 uint8
* cap
* close
* copy	
* `float32`,`float64`:浮点型
* `complex`,`complex64`,`complex128`:实数和虚数
* `int`,`int8`,`int16`,`int32`,`int64`:有符号整型
* `uint`,`uint8`,`uint16`,`uint32`,`uint64`:无符号整型
* imag	
* `iota`:特殊常量，可以认为是一个可以被编译器修改的常量
* len	
* make	
* new
* nil
* panic
* print	
* println	
* real	
* recover
* `rune`: 类似 int32
* `string`: 字符串类型，基本类型，使用双引号
* `uintptr`:无符号整型，用于存放一个指针

##### 派生类型
* 指针类型（`Pointer`）
* 数组类型
* 结构化类型(`struct`)
* `Channel` 类型
* 函数类型
* 切片类型
* 接口类型（`interface`）
* `Map` 类型

##### `符号`
* `.`
* `,`
* `;`
* `:`
* `…`

#### 变量 `var identifier type`
```
 var v1 int32 //声明变量，但不赋值，声明后若不赋值，使用默认值
 v2 int64 //错误的声明方式
 v3 = 2.42 //直接赋值，可以忽略声明类型
 v3_1 float32 = 2.24 //这样是对的
 v4 := 121 //`:=`左侧变量不能为声明过的
 var v5_1, v5_2, v5_3 unit //声明多个同类型变量
 var v6_1, v6_2, v6_3 = 1, 3, 4 //自动推断类型
 v7_1, v7_2, v7_3 := 1, 3, 4 //自动推断类型
 var ( // 这种因式分解关键字的写法一般用于声明全局变量
    v8_1 int32
    v8_2 int64
 )
```
##### 注意事项:
* 像`int`、`float`、`bool`和`string`这些基本类型都属于值类型，使用这些类型的变量直接指向存在内存中的值
* 你可以通过`&i` 来获取变量`i`的内存地址，例如：0xf840000040（每次的地址都可能不一样）。值类型的变量的值存储在栈中
* 同一个引用类型的指针指向的多个字可以是在连续的内存地址中（内存布局是连续的），这也是计算效率最高的一种存储形式；也可以将这些字分散存放在内存中，每个字都指示了下一个字所在的内存地址。当使用赋值语句`r2 = r1`时，只有引用（地址）被复制。如果 r1 的值被改变了，那么这个值的所有引用都会指向被修改后的内容，在这个例子中，r2 也会受到影响。
* 单纯地给`a`赋值也是不够的，这个值必须被使用，但是全局变量是允许声明但不使用。 同一类型的多个变量可以声明在同一行
* 并行赋值也被用于当一个函数返回多个返回值时，比如这里的 val 和错误 err 是通过调用 Func1 函数同时得到：`val, err = Func1(var1)`

#### 常量 `const identifier [type] = value`
```
const b string = "abc"
const b = "abc"
const c_name1, c_name2 = 123, "123"

const (
    a = "abc"
    b = len(a)
    c = unsafe.Sizeof(a)
)
const (
    a = iota
    b = iota
    c = iota
)
const ( //结果同上，a=0, b=1, c=2
    a = iota
    b
    c
)
```
##### 注意事项
* 常量可以用`len()`,`cap()`,`unsafe.Sizeof()`函数计算表达式的值。常量表达式中，函数必须是内置函数，否则编译不过
* `iota`，特殊常量，可以认为是一个可以被编译器修改的常量，在每一个const关键字出现时，被重置为0，然后再下一个const出现之前，每出现一次iota，其所代表的数字会自动
增加1

#### 内置的运算符有：

* 算术运算符
 - `+`: 相加`A + B`输出结果 30
 - `-`: 相减`A - B`输出结果 -10
 - `*`:	相乘`A * B`输出结果 200
 - `/`: 相除`B / A`输出结果 2
 - `%`:	求余`B % A`输出结果 0
 - `++`:自增`A++`输出结果 11
 - `--`:自减`A--`输出结果 9
* 关系运算符
 - `==`:检查两个值是否相等，`(A == B)`为False
 - `!=`:检查两个值是否不相等，`(A != B)`为 True
 - `>`:检查左边值是否大于右边值，`(A > B)`为 False
 - `<`:检查左边值是否小于右边值，`(A < B)`为 True
 - `>=`:检查左边值是否大于等于右边值，`(A >= B)`为 False
 - `<=`:检查左边值是否小于等于右边值，`(A <= B)`为 True
* 逻辑运算符 
 - `&&`:逻辑 AND 运算符，`(A && B)`为 False
 - `||`:逻辑 OR 运算符，`(A || B)`为 True
 - `!`: 逻辑 NOT 运算符，`!(A && B)` 为 True
* 位运算符
 - `&`:按位与运算符"&"是双目运算符。`(A & B)`结果为 12
 - `|`:按位或运算符"|"是双目运算符。`(A | B)`结果为 61
 - `^`:按位异或运算符"^"是双目运算符。 `(A ^ B)`结果为 49
 - `<<`:左移运算符"<<"是双目运算符。`A << 2` 结果为 240
 - `>>`:右移运算符">>"是双目运算符。右移n位就是除以2的n次方。 其功能是把">>"左边的运算数的各二进位全部右移若干位，">>"右边的数指定移动的位数。
 
> 下表列出了位运算符 &, |, 和 ^ 的计算：
|p|q|p & q|p / q|p ^ q|
|:-:|:-:|:-:|:-:|:-:|:-:|
|0|	0|	0|	0|	0|
|0|	1|	0|	1|	1|
|1|	1|	1|	1|	0|
|1|	0|	0|	1|	1|

* 赋值运算符
```
=	简单的赋值运算符，将一个表达式的值赋给一个左值	C = A + B 将 A + B 表达式结果赋值给 C
+=	相加后再赋值	C += A 等于 C = C + A
-=	相减后再赋值	C -= A 等于 C = C - A
*=	相乘后再赋值	C *= A 等于 C = C * A
/=	相除后再赋值	C /= A 等于 C = C / A
%=	求余后再赋值	C %= A 等于 C = C % A
<<=	左移后赋值	C <<= 2 等于 C = C << 2
>>=	右移后赋值	C >>= 2 等于 C = C >> 2
&=	按位与后赋值	C &= 2 等于 C = C & 2
^=	按位异或后赋值	C ^= 2 等于 C = C ^ 2
|=	按位或后赋值	C |= 2 等于 C = C | 2
```
* 其他运算符
 - `&`: 返回变量存储地址,`&a`将给出变量的实际地址。
 - `*`:	指针变量, `*a`是一个指针变量
 
#### 条件语句
```
if a < 20 {
    /* 如果条件为 true 则执行以下语句 */
    fmt.Printf("a 小于 20\n" )
} else if a < 40 {
   /* 如果条件为 false 则执行以下语句 */
   fmt.Printf("a 不小于 40\n" );
} else {
   /* 如果条件为 false 则执行以下语句 */
   fmt.Printf("a 大于 40\n" );
}


/* 定义局部变量 */
var grade string = "B"
var marks int = 90

switch marks {
   case 90: grade = "A"
   case 80: grade = "B"
   case 50,60,70 : grade = "C"
   default: grade = "D"  
}

switch {
   case grade == "A" :
      fmt.Printf("优秀!\n" )     
   case grade == "B", grade == "C" :
      fmt.Printf("良好\n" )      
   case grade == "D" :
      fmt.Printf("及格\n" )      
   case grade == "F":
      fmt.Printf("不及格\n" )
   default:
      fmt.Printf("差\n" );
}
fmt.Printf("你的等级是 %s\n", grade );      

/*  Type Switch 
switch 语句还可以被用于 type-switch 来判断某个 interface 变量中实际存储的变量类型。
switch x.(type){
    case type:
       statement(s);      
    case type:
       statement(s); 
    // 你可以定义任意个数的case
    default: // 可选
       statement(s);
}
*/
//实例
var x interface{}
switch i := x.(type) {
   case nil:      
      fmt.Printf(" x 的类型 :%T",i)                
   case int:      
      fmt.Printf("x 是 int 型")                       
   case float64:
      fmt.Printf("x 是 float64 型")           
   case func(int) float64:
      fmt.Printf("x 是 func(int) 型")                      
   case bool, string:
      fmt.Printf("x 是 bool 或 string 型" )       
   default:
      fmt.Printf("未知型")     
}  //结果 <nil>
```
##### 注意事项
* switch 变量`var1`可以是任何类型，而`val1`和 `val2`则可以是同类型的任意值。类型不被局限于常量或整数，但必须是相同的类型；或者最终结果为相同类型的表达式
* 您可以同时测试多个可能符合条件的值，使用逗号分割它们，例如：`case val1, val2, val3`。

#### `SELECT`语句
> select是Go中的一个控制结构，类似于用于通信的switch语句。每个case必须是一个通信操作，要么是发送要么是接收。
select随机执行一个可运行的case。如果没有case可运行，它将阻塞，直到有case可运行。一个默认的子句应该总是可运行的。

```
select {
    case communication clause  :
       statement(s);      
    case communication clause  :
       statement(s); 
    /* 你可以定义任意数量的 case */
    default : /* 可选 */
       statement(s);
}

//实例
func main() {
   var c1, c2, c3 chan int
   var i1, i2 int
   select {
      case i1 = <-c1:
         fmt.Printf("received ", i1, " from c1\n")
      case c2 <- i2:
         fmt.Printf("sent ", i2, " to c2\n")
      case i3, ok := (<-c3):  // same as: i3, ok := <-c3
         if ok {
            fmt.Printf("received ", i3, " from c3\n")
         } else {
            fmt.Printf("c3 is closed\n")
         }
      default:
         fmt.Printf("no communication\n")
   }    
}
```

##### 以下描述了`select`语句的语法：
* 每个case都必须是一个通信
* 所有channel表达式都会被求值
* 所有被发送的表达式都会被求值
* 如果任意某个通信可以进行，它就执行；其他被忽略。
* 如果有多个case都可以运行，Select会随机公平地选出一个执行。其他不会执行。否则：
 - 如果有default子句，则执行该语句。
 - 如果没有default字句，select将阻塞，直到某个通信可以运行；Go不会重新对channel或值进行求值。

#### 循环`for`,`break`,`continue`,`goto`
```
/*
 for init; condition; post { } //和 C 语言的 for 一样
 for condition { } //和 C 的 while 一样
 for { } //和 C 的 for(;;) 一样
*/
   var b int = 15
   var a int

   numbers := [6]int{1, 2, 3, 5} 

   /* for 循环 */
   for a := 0; a < 10; a++ {
      fmt.Printf("a 的值为: %d\n", a)
   }

   for a < b {
      a++
      fmt.Printf("a 的值为: %d\n", a)
   }

   for i,x:= range numbers {
      fmt.Printf("第 %d 位 x 的值 = %d\n", i,x)
   }  


   /* 循环 */
   LOOP: for a < 20 {
      if a == 15 {
         /* 跳过迭代 */
         a = a + 1
         goto LOOP
      }
      fmt.Printf("a的值为 : %d\n", a)
      a++     
   }  
```

#### 函数

> 函数是基本的代码块，用于执行一个任务。
Go 语言最少有个 main() 函数。
你可以通过函数来划分不同功能，逻辑上每个函数执行的是指定的任务。
函数声明告诉了编译器函数的名称，返回类型，和参数。
Go 语言标准库提供了多种可动用的内置的函数。例如，len() 函数可以接受不同类型参数并返回该类型的长度。如果我们传入的是字符串则返回字符串的长度，如果传入的是数组，则返回数组中包含的元素个数。

```
/*Go 语言函数定义格式如下：
func function_name( [parameter list] ) [return_types] {
   函数体
}
func：函数由 func 开始声明
function_name：函数名称，函数名和参数列表一起构成了函数签名。
parameter list：参数列表，参数就像一个占位符，当函数被调用时，你可以将值传递给参数，这个值被称为实际参数。参数列表指定的是参数类型、顺序、及参数个数。参数是可选的，也就是说函数也可以不包含参数。
return_types：返回类型，函数返回一列值。return_types 是该列值的数据类型。有些功能不需要返回值，这种情况下 return_types 不是必须的。
函数体：函数定义的代码集合。
*/


/* 函数返回两个数的最大值 */
func max(num1, num2 int) int {
   /* 声明局部变量 */
   var result int

   if (num1 > num2) {
      result = num1
   } else {
      result = num2
   }
   return result
}
func swap(x, y string) (string, string) {
   return y, x
}

/*
闭包，Go 语言支持匿名函数，可作为闭包。匿名函数是一个"内联"语句或表达式。匿名函数的优越性在于可以直接使用函数内的变量，不必申明。
*/
func getSequence() func() int {
   i:=0
   return func() int {
      i+=1
     return i  
   }
}

func main(){
   /* nextNumber 为一个函数，函数 i 为 0 */
   nextNumber := getSequence()  

   /* 调用 nextNumber 函数，i 变量自增 1 并返回 */
   fmt.Println(nextNumber())
   fmt.Println(nextNumber())
   fmt.Println(nextNumber())
   
   /* 创建新的函数 nextNumber1，并查看结果 */
   nextNumber1 := getSequence()  
   fmt.Println(nextNumber1())
   fmt.Println(nextNumber1())
} //结果 1 2 3 1 2


/*Go 语言可以很灵活的创建函数，并作为值使用。以下实例中我们在定义的函数中初始化一个变量，该函数仅仅是为了使用内置函数 math.sqrt() 
*/
import (
   "fmt"
   "math"
)
func main(){
   /* 声明函数变量 */
   getSquareRoot := func(x float64) float64 {
      return math.Sqrt(x)
   }

   /* 使用函数 */
   fmt.Println(getSquareRoot(9))
} //结果 3

/*
Go 语言中同时有函数和方法。一个方法就是一个包含了接受者的函数，接受者可以是命名类型或者结构体类型的一个值或者是一个指针。所有给定类型的方法属于该类型的方法集。
func (variable_name variable_data_type) function_name() [return_type]{
   /* 函数体*/
}
package main

import "fmt"

/* 定义结构体 */
type Circle struct {
  radius float64
}

func main() {
  var c1 Circle
  c1.radius = 10.00
  fmt.Println("Area of Circle(c1) = ", c1.getArea())
}

//该 method 属于 Circle 类型对象中的方法
func (c Circle) getArea() float64 {
  //c.radius 即为 Circle 类型对象中的属性
  return 3.14 * c.radius * c.radius
}
*/
```

#### 数组
> Go 语言提供了数组类型的数据结构。
数组是具有相同唯一类型的一组已编号且长度固定的数据项序列，这种类型可以是任意的原始类型例如整形、字符串或者自定义类型。
相对于去声明number0, number1, ..., and number99的变量，使用数组形式numbers[0], numbers[1] ..., numbers[99]更加方便且易于扩展。
数组元素可以通过索引（位置）来读取（或者修改），索引从0开始，第一个元素索引为 0，第二个索引为 1，以此类推。

```
/* var variable_name [SIZE] variable_type */
var balance [10] float32
var balance = [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
/*初始化数组中 {} 中的元素个数不能大于 [] 中的数字。
如果忽略 [] 中的数字不设置数组大小，Go 语言会根据元素的个数来设置数组的大小：*/
var balance = [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}

/* 多维数组： var variable_name [SIZE1][SIZE2]...[SIZEN] variable_type */
var threedim [5][10][4]int
a := [3][4]int{  
 {0, 1, 2, 3} ,   /*  第一行索引为 0 */
 {4, 5, 6, 7} ,   /*  第二行索引为 1 */
 {8, 9, 10, 11}   /*  第三行索引为 2 */
}

/*如果你想向函数传递数组参数，你需要在函数定义时，声明形参为数组，我们可以通过以下两种方式来声明：
void myFunction(param [10]int){ //设置的数组大小
...
}
void myFunction(param []int) { //不设置大小
...
}
*/
func getAverage(arr []int, size int) float32
{
   var i int
   var avg, sum float32  

   for i = 0; i < size; ++i {
      sum += arr[i]
   }

   avg = sum / size

   return avg;
}
```

#### 指针(参考C,省略)

#### 结构体（参考C,省略）

#### 切片（Slice"动态数组")
>Go 语言切片是对数组的抽象。
Go 数组的长度不可改变，在特定场景中这样的集合就不太适用，Go中提供了一种灵活，功能强悍的内置类型切片("动态数组"),与数组相比切片的长度是不固定的，可以追加元素，在追加时可能使切片的容量增大。

```
/* 
var identifier []type 

切片不需要说明长度。
或使用make()函数来创建切片:
var slice1 []type = make([]type, len)
也可以简写为,也可以指定容量，其中capacity为可选参数
slice1 := make([]type, len [,capacity])
*/
s :=[] int {1,2,3 } //直接初始化切片，[]表示是切片类型，{1,2,3}初始化值依次是1,2,3.其cap=len=3
/* s := arr[startIndex:endIndex] */ 
s := arr[:] //初始化切片s,是数组arr的引用


/*
切片是可索引的，并且可以由 len() 方法获取长度。
切片提供了计算容量的方法 cap() 可以测量切片最长可以达到多少。
以下为具体实例：
*/
package main

import "fmt"

func main() {
   var numbers = make([]int,3,5)

   printSlice(numbers)
}

func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
} //结果 len=3 cap=5 slice=[0 0 0]


/*
append() 和 copy() 函数
如果想增加切片的容量，我们必须创建一个新的更大的切片并把原分片的内容都拷贝过来。
下面的代码描述了从拷贝切片的 copy 方法和向切片追加新元素的 append 方法。
*/
func main() {
   var numbers []int
   printSlice(numbers)

   /* 允许追加空切片 */
   numbers = append(numbers, 0)
   printSlice(numbers)

   /* 向切片添加一个元素 */
   numbers = append(numbers, 1)
   printSlice(numbers)

   /* 同时添加多个元素 */
   numbers = append(numbers, 2,3,4)
   printSlice(numbers)

   /* 创建切片 numbers1 是之前切片的两倍容量*/
   numbers1 := make([]int, len(numbers), (cap(numbers))*2)

   /* 拷贝 numbers 的内容到 numbers1 */
   copy(numbers1,numbers)
   printSlice(numbers1)   
}

func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
} 
/* 结果 
len=0 cap=0 slice=[]
len=1 cap=1 slice=[0]
len=2 cap=2 slice=[0 1]
len=5 cap=6 slice=[0 1 2 3 4]
len=5 cap=12 slice=[0 1 2 3 4]
*/
```

#### 遍历（Range）
>Go 语言中 range 关键字用于for循环中迭代数组(array)、切片(slice)、通道(channel)或集合(map)的元素。在数组和切片中它返回元素的索引值，在集合中返回 key-value 对的 key 值。
```
package main
import "fmt"
func main() {
    //这是我们使用range去求一个slice的和。使用数组跟这个很类似
    nums := []int{2, 3, 4}
    sum := 0
    for _, num := range nums {
        sum += num
    }
    fmt.Println("sum:", sum)
    //在数组上使用range将传入index和值两个变量。上面那个例子我们不需要使用该元素的序号，所以我们使用空白符"_"省略了。有时侯我们确实需要知道它的索引。
    for i, num := range nums {
        if num == 3 {
            fmt.Println("index:", i)
        }
    }
    //range也可以用在map的键值对上。
    kvs := map[string]string{"a": "apple", "b": "banana"}
    for k, v := range kvs {
        fmt.Printf("%s -> %s\n", k, v)
    }
    //range也可以用来枚举Unicode字符串。第一个参数是字符的索引，第二个是字符（Unicode的值）本身。
    for i, c := range "go" {
        fmt.Println(i, c)
    }
}
```

#### 集合Map
> Map 是一种无序的键值对的集合。Map 最重要的一点是通过 key 来快速检索数据，key 类似于索引，指向数据的值。
Map 是一种集合，所以我们可以像迭代数组和切片那样迭代它。不过，Map 是无序的，我们无法决定它的返回顺序，这是因为 Map 是使用 hash 表来实现的。

```
/*
声明变量，默认 map 是 nil
var map_variable map[key_data_type]value_data_type
使用 make 函数 
map_variable := make(map[key_data_type]value_data_type)
如果不初始化 map，那么就会创建一个 nil map。nil map 不能用来存放键值对
*/

package main

import "fmt"

func main() {
   var countryCapitalMap map[string]string
   /* 创建集合 */
   countryCapitalMap = make(map[string]string)
   
   /* map 插入 key-value 对，各个国家对应的首都 */
   countryCapitalMap["France"] = "Paris"
   countryCapitalMap["Italy"] = "Rome"
   countryCapitalMap["Japan"] = "Tokyo"
   countryCapitalMap["India"] = "New Delhi"
   
   /* 使用 key 输出 map 值 */
   for country := range countryCapitalMap {
      fmt.Println("Capital of",country,"is",countryCapitalMap[country])
   }
   
   /* 查看元素在集合中是否存在 */
   captial, ok := countryCapitalMap["United States"]
   /* 如果 ok 是 true, 则存在，否则不存在 */
   if(ok){
      fmt.Println("Capital of United States is", captial)  
   }else {
      fmt.Println("Capital of United States is not present") 
   }
}

/* 删除元素 */
delete(countryCapitalMap,"France");
```

#### 强制转换 `type_name(expression)`

#### 接口（interface)
>Go 语言提供了另外一种数据类型即接口，它把所有的具有共性的方法定义在一起，任何其他类型只要实现了这些方法就是实现了这个接口。
```
/* 定义接口 */
type interface_name interface {
   method_name1 [return_type]
   method_name2 [return_type]
   method_name3 [return_type]
   ...
   method_namen [return_type]
}

/* 定义结构体 */
type struct_name struct {
   /* variables */
}

/* 实现接口方法 */
func (struct_name_variable struct_name) method_name1() [return_type] {
   /* 方法实现 */
}
...
func (struct_name_variable struct_name) method_namen() [return_type] {
   /* 方法实现*/
}


//实例
package main

import (
    "fmt"
)

type Phone interface {
    call()
}

type NokiaPhone struct {
}

func (nokiaPhone NokiaPhone) call() {
    fmt.Println("I am Nokia, I can call you!")
}

type IPhone struct {
}

func (iPhone IPhone) call() {
    fmt.Println("I am iPhone, I can call you!")
}

func main() {
    var phone Phone

    phone = new(NokiaPhone)
    phone.call()

    phone = new(IPhone)
    phone.call()

}
```


#### 错误处理
> Go 语言通过内置的错误接口提供了非常简单的错误处理机制。
error类型是一个接口类型

```
/*
type error interface {
    Error() string
}
我们可以在编码中通过实现 error 接口类型来生成错误信息。
函数通常在最后的返回值中返回错误信息。使用errors.New 可返回一个错误信息：
*/
package main

import (
    "fmt"
)

// 定义一个 DivideError 结构
type DivideError struct {
    dividee int
    divider int
}

// 实现     `error` 接口
func (de *DivideError) Error() string {
    strFormat := `
    Cannot proceed, the divider is zero.
    dividee: %d
    divider: 0
`
    return fmt.Sprintf(strFormat, de.dividee)
}

// 定义 `int` 类型除法运算的函数
func Divide(varDividee int, varDivider int) (result int, errorMsg string) {
    if varDivider == 0 {
        dData := DivideError{
            dividee: varDividee,
            divider: varDivider,
        }
        errorMsg = dData.Error()
        return
    } else {
        return varDividee / varDivider, ""
    }

}

func main() {

    // 正常情况
    if result, errorMsg := Divide(100, 10); errorMsg == "" {
        fmt.Println("100/10 = ", result)
    }
    // 当被除数为零的时候会返回错误信息
    if _, errorMsg := Divide(100, 0); errorMsg != "" {
        fmt.Println("errorMsg is: ", errorMsg)
    }

}
```

### command 

* `go run hello.go`


