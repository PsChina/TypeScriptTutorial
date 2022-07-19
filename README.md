# TypeScript Tutorial

1. [为什么说TypeScript的火爆是必然](#为什么说typescript的火爆是必然)

1. [TypeScript类型编程为什么被叫做类型体操](#typescript类型编程为什么被叫做类型体操)

## 为什么说TypeScript的火爆是必然

在编程开发的过程中我们会接触不同的变量类型、在js中就是指 number、boolean、string 等基础类型和 Object、Function 等复合类型。


__不同类型变量占据的内存大小不同__：boolean 类型的变量会分配 4 个字节的内存，而 number 类型的变量则会分配 8 个字节的内存，给变量声明了不同的类型就代表了会占据不同的内存空间。


__不同类型变量可做的操作不同__：number 类型可以做加减乘除等运算，boolean 就不可以，复合类型中不同类型的对象可用的方法不同，比如 Date 和 RegExp，变量的类型不同代表可以对该变量做的操作就不同。


js 是一个弱类型语言，采用的是动态类型检测，常常会出现类型不安全的操作，比如  “null is not an object”、“undefined is not a function”。


__如果能保证对某种类型只做该类型允许的操作，这就叫做类型安全__。


确保类型安全的方法就是做`类型检查`


类型检查可以在运行时做，也可以运行之前的编译期做。这是两种不同的类型，前者叫做动态类型检查，后者叫做静态类型检查。


JavaScript 本来是为了浏览器的表单验证而设计的，所以就设计成了动态类型的，写代码比较简单。

但 JavaScript 也没想到它后来会被用来开发各种项目，比如 PC 和移动端的网页、React Native 跨端 App、小程序、Electron 桌面端、Node.js 服务端、Node.js 工具链等。

开发各种大型项目的时候，JavaScript 的动态类型语言的缺点就暴露出来了，bug 率太高了，健壮性很难保证。那自然就有了对静态类型的强烈需求，于是 TypeScript 应运而生。

TypeScript 给 JavaScript 添加了一套静态类型系统，从动态类型语言变成了静态类型语言，可以在编译期间做类型检查，提前发现一些类型安全问题。



## TypeScript类型编程为什么被叫做类型体操

类型系统不止 TypeScript 有，别的语言 Java、C++ 等都有，为什么 TypeScript 的类型编程被叫做类型体操，而其他语言没有呢？这节我们来分析下原因。

TypeScript 给 JavaScript 增加了一套静态类型系统，通过 TS Compiler 编译为 JS，编译的过程做类型检查。

它并没有改变 JavaScript 的语法，只是在 JS 的基础上添加了类型语法，所以被叫做 JavaScript 的超集。

JavaScript 的标准在不断的发展，TypeScript 的类型系统也在不断完善，因为“超集”的设计理念，这两者可以很好的融合在一起，是不会有冲突的。

静态类型编程语言都有自己的类型系统，从简单到复杂可以分为 3 类：

### 简单类型系统

变量、函数、类等都可以声明类型，编译器会基于声明的类型做类型检查，类型不匹配时会报错。

这是最基础的类型系统，能保证类型安全，但有些死板。

比如一个 add 函数既可以做整数加法、又可以做浮点数加法，却需要声明两个函数：

```c++
int add(int a, int b) {
    return a + b;
}

double add(double a, double b) {
    return a + b;
}
```

这个问题的解决思路很容易想到：如果类型能传参数就好了，传入 int 就是整数加法，传入 double 就是浮点数加法。

所以，就有了第二种类型系统。

### 支持泛型的类型系统

泛型的英文是 Generic Type，通用的类型，它可以代表任何一种类型，也叫做类型参数。

它给类型系统增加了一些灵活性，在整体比较固定，部分变量的类型有变化的情况下，可以减少很多重复代码。

比如上面的 add 函数，有了泛型之后就可以这样写：

```c++
T add<T>(T a, T b) {
    return a + b;
}

add(1,2);
add(1.111, 2.2222);
```

声明时把会变化的类型声明成泛型（也就是类型参数），在调用的时候再确定类型。

Java 就是这种类型系统。如果你看过 Java 代码，你会发现泛型用的特别多，这确实是一个很好的增加类型系统灵活性的特性。

但是，这种类型系统的灵活性对于 JavaScript 来说还不够，因为 JavaScript 太过灵活了。

比如，在 Java 里，对象都是由类 new 出来的，你不能凭空创建对象，但是 JavaScript 却可以，它支持对象字面量。

那如果是一个返回对象某个属性值的函数，类型该怎么写呢？

```ts
function getPropValue<T>(obj: T, key): key对应的属性值类型 {
    return obj[key];
}
```

好像拿到了 T，也不能拿到它的属性和属性值，如果能对类型参数 T 做一些逻辑处理就好了。

所以，就有了第三种类型系统。

### 支持类型编程的类型系统

在 Java 里面，拿到了对象的类型就能找到它的类，进一步拿到各种信息，所以类型系统支持泛型就足够了。

但是在 JavaScript 里面，对象可以字面量的方式创建，还可以灵活的增删属性，拿到对象并不能确定什么，所以要支持对传入的类型参数做进一步的处理。

对传入的类型参数（泛型）做各种逻辑运算，产生新的类型，这就是类型编程。

比如上面那个 getProps 的函数，类型可以这样写：

```ts
function getPropValue<
    T extends object,
    Key extends keyof T
>(obj: T, key: Key): T[Key] {
    return obj[key];
}
```

这里的 keyof T、T[Key] 就是对类型参数 T 的类型运算。

TypeScript 的类型系统就是第三种，支持对类型参数做各种逻辑处理，可以写很复杂的类型逻辑。

### 类型逻辑可以多复杂？

类型逻辑是对类型参数的各种处理，可以实现很多强大的功能：

比如这个 ParseQueryString 的类型：
```ts
type res = ParseQueryString<'a=1&b=2&c=3'>

/*
type res = {
    a:'1',
    b:'2',
    c:'3'
}
*/
```
它可以对传入的字符串的类型参数做解析，返回解析以后的结果。

如果是 Java 的只支持泛型的类型系统可以做到么？明显不能。但是 TypeScript 的类型系统就可以，因为它可以对泛型（类型参数）做各种逻辑处理。

只不过，这个类型的类型逻辑的代码比较多（下面的 ts 类型暂时看不懂没关系，在顺口溜那节会有详解，这里只是用来直观感受下类型编程的复杂度的，等学完以后大家也能实现这样的复杂高级类型的）：
```ts
type ParseParam<Param extends string> = 
    Param extends `${infer Key}=${infer Value}`
        ? {
            [K in Key]: Value 
        } : {};

type MergeValues<One, Other> = 
    One extends Other 
        ? One
        : Other extends unknown[]
            ? [One, ...Other]
            : [One, Other];

type MergeParams<
    OneParam extends Record<string, any>,
    OtherParam extends Record<string, any>
> = {
  [Key in keyof OneParam | keyof OtherParam]: 
    Key extends keyof OneParam
        ? Key extends keyof OtherParam
            ? MergeValues<OneParam[Key], OtherParam[Key]>
            : OneParam[Key]
        : Key extends keyof OtherParam 
            ? OtherParam[Key] 
            : never
}
type ParseQueryString<Str extends string> = 
    Str extends `${infer Param}&${infer Rest}`
        ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
        : ParseParam<Str>;
```

__TypeScript 的类型系统是`图灵完备`的，也就是能描述各种可计算逻辑。简单点来理解就是循环、条件等各种 JS 里面有的语法它都有，JS 能写的逻辑它都能写__。

对类型参数的编程是 TypeScript 类型系统最强大的部分，可以实现各种复杂的类型计算逻辑，是它的优点。但同时也被认为是它的缺点，因为除了业务逻辑外还要写很多类型逻辑。

不过，我倒是觉得这种复杂度是不可避免的，因为 JS 本身足够灵活，要准确定义类型那类型系统必然也要设计的足够灵活。

是不是感觉 TypeScript 类型系统挺复杂的？确实，不然大家也不会把 TS 的类型编程戏称为`类型体操`了。

但不用担心，这本小册就是专门讲这个的，后面会讲各种 TS 类型编程的套路，学完那些之后，再回来看这个问题就没那么难了。