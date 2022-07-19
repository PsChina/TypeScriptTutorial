# TypeScript Tutorial

1. [为什么说 TypeScript 的火爆是必然](#为什么说 typescript 的火爆是必然)

1. [TypeScript 类型编程为什么被叫做类型体操](#Typescript 类型编程为什么被叫做类型体操)

1. [TypeScript 类型系统支持哪些类型和类型运算](#TypeScript 类型系统支持哪些类型和类型运算)

## 为什么说 TypeScript 的火爆是必然

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


### 总结

类型决定了变量的内存大小和可以对它进行的操作，保证对什么类型只做什么操作就叫做类型安全，而保证类型安全的方式就是类型检查。

类型检查可以在运行时做，叫做动态类型检查，也可以在编译时做，叫做静态类型检查。

动态类型可能藏在代码里的隐患太多了，bug 率比较高，所以大型项目注定会用静态类型语言来开发。

JavaScript 本身是一门动态类型语言，因为被越来越多的用来开发各种大型项目，所以就有了对静态类型的需求。TypeScript 就满足了这个需求。而且还有额外的更好的提示、更易于重构的好处。

所以，TypeScript 的出现和现在的火爆是必然会发生的。


## TypeScript 类型编程为什么被叫做类型体操

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


### 总结

TypeScript 给 JavaScript 增加了一套类型系统，但并没有改变 JS 的语法，只是做了扩展，是 JavaScript 的超集。

这套类型系统支持泛型，也就是类型参数，有了一些灵活性。而且又进一步支持了对类型参数的各种处理，也就是类型编程，灵活性进一步增强。

现在 TS 的类型系统是图灵完备的，JS 可以写的逻辑，用 TS 类型都可以写。

但是很多类型编程的逻辑写起来比较复杂，因此被戏称为类型体操。


## TypeScript 类型系统支持哪些类型和类型运算

学完前几节我们知道 TypeScript 给 JavaScript 加了一套静态类型系统，还支持了泛型和各种类型运算逻辑。

那么这个类型系统里都有哪些类型？支持哪些类型运算逻辑？

### TypeScript 类型系统中的类型

静态类型系统的目的是把类型检查从运行时提前到编译时，那 TS 类型系统中肯定要把 JS 的运行时类型拿过来，也就是 number、boolean、string、object、bigint、symbol、undefined、null 这些类型，还有就是它们的包装类型 Number、Boolean、String、Object、Symbol。

这些很容易理解，给 JS 添加静态类型，总没有必要重新造一套基础类型吧，直接复用 JS 的基础类型就行。

复合类型方面，JS 有 class、Array，这些 TypeScript 类型系统也都支持，但是又多加了三种类型：元组（Tuple）、接口（Interface）、枚举（Enum）。

### 元祖

`元组（Tuple）`就是元素个数和类型固定的数组类型：

对象：

```ts
interface IPerson {
    name: string;
    age: number;
}

class Person implements IPerson {
    name: string;
    age: number;
}

const obj: IPerson = {
    name: 'guang',
    age: 18
}
```

函数:

```ts
interface SayHello {
    (name: string): string;
}

const func: SayHello = (name: string) => {
    return 'hello,' + name
}
```

构造器：

```ts
interface PersonConstructor {
    new (name: string, age: number): IPerson;
}

function createPerson(ctor: PersonConstructor):IPerson {
    return new ctor('guang', 18);
}
```

对象类型、class 类型在 TypeScript 里也叫做索引类型，也就是索引了多个元素的类型的意思。对象可以动态添加属性，如果不知道会有什么属性，可以用可索引签名：


```ts
interface IPerson {
    [prop: string]: string | number;
}
const obj:IPerson = {};
obj.name = 'guang';
obj.age = 18;
```

总之，__接口可以用来描述函数、构造器、索引类型（对象、class、数组）等复合类型__。


### 枚举

`枚举（Enum）`是一系列值的复合：

```ts
enum Transpiler {
    Babel = 'babel',
    Postcss = 'postcss',
    Terser = 'terser',
    Prettier = 'prettier',
    TypeScriptCompiler = 'tsc'
}

const transpiler = Transpiler.TypeScriptCompiler;
```

此外，TypeScript 还支持`字面量类型`，也就是类似 1111、'aaaa'、{ a: 1} 这种值也可以做为类型。

其中，字符串的字面量类型有两种，一种是普通的字符串字面量，比如 'aaa'，另一种是模版字面量，比如 `aaa${string}`，它的意思是以 aaa 开头，后面是任意 string 的字符串字面量类型。

所以想要约束以某个字符串开头的字符串字面量类型时可以这样写：

```ts
function func(str: `¥${number}`){
    
}

// func('aaa') 这样的参数就会报错 Argument of type '"aaa"' is not assignable to parameter of type '¥${number}'

// func('¥100') 这样就正常
```

还有四种特殊的类型：void、never、any、unknown：

- __never__ 代表不可达，比如函数抛异常的时候，返回值就是 never。
- __void__ 代表空，可以是 undefined 或 never。
- __any__ 是任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型（除了 never）。
- __unknown__ 是未知类型，任何类型都可以赋值给它，但是它不可以赋值给别的类型。


这些就是 TypeScript 类型系统中的全部类型了，大部分是从 JS 中迁移过来的，比如基础类型、Array、class 等，也添加了一些类型，比如 枚举（enum）、接口（interface）、元组等，还支持了字面量类型和 void、never、any、unknown 的特殊类型。


### 类型的装饰

除了描述类型的结构外，TypeScript 的类型系统还支持描述类型的属性，比如是否可选，是否只读等：

```ts
interface IPerson {
    readonly name: string;
    age?: number;
}

type tuple = [string, number?];
```

### TypeScript 类型系统中的类型运算

我们知道了 TypeScript 类型系统里有哪些类型，那么可以对这些类型做什么类型运算呢？

__条件：extends ? :__

TypeScript 里的条件判断是 `extends ? :`，叫做条件类型（Conditional Type）比如：

```ts
type res = 1 extends 2 ? true : false;
// type res = false
```

这就是 TypeScript 类型系统里的 if else。

但是，上面这样的逻辑没啥意义，静态的值自己就能算出结果来，为什么要用代码去判断呢？

所以，类型运算逻辑都是用来做一些动态的类型的运算的，也就是对类型参数的运算。

```ts
type isTwo<T> = T extends 2 ? true: false;

type res = isTwo<1>;
type res2 = isTwo<2>;

// type res = false
// type res2 = true
```
这种类型也叫做`高级类型`。

__高级类型的特点是传入类型参数，经过一系列类型运算逻辑后，返回新的类型。__

__推导：infer__

如何提取类型的一部分呢？答案是 infer。

比如提取元组类型的第一个元素：

```ts
type First<Tuple extends unknown[]> = Tuple extends [infer T,...infer R] ? T : never;

type res = First<[1,2,3]>;

// type res = 1
```

注意，第一个 extends 不是条件，条件类型是 extends ? :，这里的 extends 是约束的意思，也就是约束类型参数只能是数组类型。


因为不知道数组元素的具体类型，所以用 unkown。

__联合：｜__

联合类型（Union）类似 js 里的或运算符 |，但是作用于类型，代表类型可以是几个类型之一。

```ts
type Union = 1 | 2 | 3;
```

__交叉：&__

交叉类型（Intersection）类似 js 中的与运算符 &，但是作用于类型，代表对类型做合并。

```ts
type ObjType = {a: number } & {c: boolean};

type res2 = {a: number, c: boolean} extends ObjType ? true : false

// res2 = true
```

注意，同一类型可以合并，不同的类型没法合并，会被舍弃：

```ts
type res = 'aaaa' & '2222'
// type res = never  
```

__映射类型__

对象、class 在 TypeScript 对应的类型是索引类型（Index Type），那么如何对索引类型作修改呢？

答案是`映射类型`。

```ts
type MapType<T> = {
  [Key in keyof T]?: T[Key]
}
```

keyof T 是查询索引类型中所有的索引，叫做`索引查询`。

T[Key] 是取索引类型某个索引的值，叫做`索引访问`。

in 是用于遍历联合类型的运算符。

比如我们把一个索引类型的值变成 3 个元素的数组：

```ts
type MapType<T> = {
    [Key in keyof T]: [T[Key], T[Key], T[Key]]
}

type res = MapType<{a: 1, b: 2}>;

// type res = {a:[1,1,1], b:[2,2,2]}
```
__映射类型就相当于把一个集合映射到另一个集合，这是它名字的由来。__

除了值可以变化，索引也可以做变化，用 as 运算符，叫做`重映射`。


```ts
type MapType<T> = {
    [
        Key in keyof T 
            as `${Key & string}${Key & string}${Key & string}`
    ]: [T[Key], T[Key], T[Key]]
}
```
我们用 as 把索引也做了修改，改成了 3 个 key 重复：


```ts
type res = MapType<{a:1,b:2}>
// type res = {aaa:[1,1,1],bbb:[2,2,2]}
```

这里的 & string 可能大家会迷惑，解释一下：

因为索引类型（对象、class 等）可以用 string、number 和 symbol 作为 key，这里 keyof T 取出的索引就是 string | number | symbol 的联合类型，和 string 取交叉部分就只剩下 string 了。就像前面所说，交叉类型会把同一类型做合并，不同类型舍弃。

```ts
// 'string | number | symobl' & 'string' => 'string'
```


因为 js 处理对象比较多，所以索引类型的映射比较重要。


### 总结 

给 JavaScript 添加静态类型系统，那肯定是能复用的就复用，所以在 TypeScript 里，基础类型和 class、Array 等复合类型都是和 JavaScript 一样的，只是又额外加了接口（interface）、枚举（enum）、元组这三种复合类型（对象类型、class 类型在 TypeScript 里叫做索引类型），还有 void、never、any、unkown 四种特殊类型，以及支持字面量做为类型。此外，TypeScript 类型系统也支持通过 readonly、？等修饰符对属性的特性做进一步的描述。

此外，TypeScript 支持对类型做运算，这是它的类型系统的强大之处，也是复杂之处。

TypeScript 支持条件、推导、联合、交叉等运算逻辑，还有对联合类型做映射。

这些逻辑是针对类型参数，也就是泛型（类型参数）来说的，__传入类型参数，经过一系列类型运算逻辑后，返回新的类型的类型就叫做高级类型__，如果是静态的值，直接算出结果即可，没必要写类型逻辑。

这些语法看起来没有多复杂，但是他们却可以实现很多复杂逻辑，就像 JS 的语法也不复杂，却可以实现很多复杂逻辑一样。

后面我们会大量用到这些类型编程语法来实现各种复杂的类型逻辑。