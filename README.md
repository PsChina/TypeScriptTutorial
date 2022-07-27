# TypeScript Tutorial

1. [为什么说 TypeScript 的火爆是必然](#为什么说-typescript-的火爆是必然)

1. [TypeScript 类型编程为什么被叫做类型体操](#Typescript-类型编程为什么被叫做类型体操)

1. [TypeScript 类型系统支持哪些类型和类型运算](#TypeScript-类型系统支持哪些类型和类型运算)

1. [套路一：模式匹配做提取](#套路一模式匹配做提取)

1. [套路二：重新构造做变换](#套路二重新构造做变换)

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


__总结__

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


__总结__

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

__元组__：

`元组（Tuple）`就是元素个数和类型固定的数组类型：

```ts
type tuple = ['string', true, 0]
```

__对象__：

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

__函数__：

```ts
interface SayHello {
    (name: string): string;
}

const func: SayHello = (name: string) => {
    return 'hello,' + name
}
```

__构造器__：

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


__枚举__：

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


__总结__ 

给 JavaScript 添加静态类型系统，那肯定是能复用的就复用，所以在 TypeScript 里，基础类型和 class、Array 等复合类型都是和 JavaScript 一样的，只是又额外加了接口（interface）、枚举（enum）、元组这三种复合类型（对象类型、class 类型在 TypeScript 里叫做索引类型），还有 void、never、any、unkown 四种特殊类型，以及支持字面量做为类型。此外，TypeScript 类型系统也支持通过 readonly、？等修饰符对属性的特性做进一步的描述。

此外，TypeScript 支持对类型做运算，这是它的类型系统的强大之处，也是复杂之处。

TypeScript 支持条件、推导、联合、交叉等运算逻辑，还有对联合类型做映射。

这些逻辑是针对类型参数，也就是泛型（类型参数）来说的，__传入类型参数，经过一系列类型运算逻辑后，返回新的类型的类型就叫做高级类型__，如果是静态的值，直接算出结果即可，没必要写类型逻辑。

这些语法看起来没有多复杂，但是他们却可以实现很多复杂逻辑，就像 JS 的语法也不复杂，却可以实现很多复杂逻辑一样。

后面我们会大量用到这些类型编程语法来实现各种复杂的类型逻辑。


## 套路一：模式匹配做提取

TypeScript 类型编程的代码看起来比较复杂，但其实这些逻辑用 JS 大家都会写，之所以到了类型体操就不会了，那是因为还不熟悉一些套路。

所以，这节开始我们就来学习一些类型体操的套路，熟悉这些套路之后，各种类型体操逻辑就能够很顺畅的写出来。

首先，我们来学习类型体操的第一个套路：模式匹配做提取。


### 模式匹配

我们知道，字符串可以和正则做模式匹配，找到匹配的部分，提取子组，之后可以用 1,1,2 等引用匹配的子组。


```js
'abc'.replace(/a(b)c/,'$1,$1,$1')
// 'b,b,b,'
```

Typescript 的类型也同样可以做模式匹配。

比如这样一个 Promise 类型：

```ts
type p = Promise<'shan'>;
```

我们想提取 value 的类型，可以这样做：

```ts
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
```

通过 extends 对传入的类型参数 P 做模式匹配，其中值的类型是需要提取的，通过 infer 声明一个局部变量 Value 来保存，如果匹配，就返回匹配到的 Value，否则就返回 never 代表没匹配到。

```ts
type GetValueResult = GetValueType<Promise<'shan'>>
// type GetValueResult = "shan"
```

这就是 Typescript 类型的模式匹配：

__Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，结果保存到通过 infer 声明的局部类型变量里，如果匹配就能从该局部变量里拿到提取出的类型__。

这个模式匹配的套路有多有用呢？我们来看下在数组、字符串、函数、构造器等类型里的应用。


### 数组类型


__First__

数组类型想提取第一个元素的类型怎么做呢？

```ts
type arr = [1,2,3]
```

用它来匹配一个模式类型，提取第一个元素的类型到通过 infer 声明的局部变量里返回。

```ts
type GetFirst<Arr extends unkown:[]> = Arr extends [infer First, ...unknown[]] ? First : never
```

类型参数 Arr 通过 extends 约束为只能是数组类型，数组元素是 unkown 也就是可以是任何值。

> __any 和 unknown 的区别__： any 和 unknown 都代表任意类型，但是 unknown 只能接收任意类型的值，而 any 除了可以接收任意类型的值，也可以赋值给任意类型（除了 never）。类型体操中经常用 unknown 接受和匹配任何类型，而很少把任何类型赋值给某个类型变量。

对 Arr 做模式匹配，把我们要提取的第一个元素的类型放到通过 infer 声明的 First 局部变量里，后面的元素可以是任何类型，用 unknown 接收，然后把局部变量 First 返回。

当类型参数 Arr 为 [1,2,3] 时：

```ts
type FirstResult = GetFirst<[1,2,3]>
// type FirstResult = 1
```

当类型参数 Arr 为 [] 时：
```ts
type FirstResult = GetFirst<[]>
// type FirstResult = never
```

__Last__

可以提取第一个元素，当然也可以提取最后一个元素，修改下模式类型就行：

```ts
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[],Last] ? Last ： never
```

当类型参数 Arr 为 [1,2,3]时：

```ts
type LastResult = GetLast<[1,2,3]>
// type LastResult = 3
```

__PopArr__

我们分别取了首尾元素，当然也可以取剩余的数组，比如取去掉了最后一个元素的数组：

```ts
type PopArr<Arr extends unknown[]> = Arr extends [] ? [] : Arr extends [...infer Rest, unknown] ? Rest : never
```

如果是空数组，就直接返回，否则匹配剩余的元素，放到 infer 声明的局部变量 Rest 里，返回 Rest。

当类型参数 Arr 为 [1,2,3] 时：

```ts
type PopResult = PopArr<[1,2,3]>
// type PopResult = [1, 2]
```

当类型参数 Arr 为 [] 时：

```ts
type PopResult2 = PopArr<[]>
// type PopResult2 = []
```

__ShiftArr__

同理可得 ShiftArr 的实现：

```ts
type ShiftArr<Arr extends unknown[]> = 
    Arr extends [] ? [] 
        : Arr extends [unknown, ...infer Rest] ? Rest : never;
```

当类型参数 Arr 为 [1,2,3]时：

```ts
type ShiftResult = ShiftArr<[1,2,3]>
// type ShiftResult = [2, 3]
```

### 字符串类型

字符串类型也同样可以做模式匹配，匹配一个模式字符串，把需要提取的部分放到 infer 声明的局部变量里。

__StartsWith__

判断字符串是否以某个前缀开头，也是通过模式匹配：

```ts
type StartsWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false
```

需要声明字符串 Str、匹配的前缀 Prefix 两个类型参数，它们都是 string。

用 Str 去匹配一个模式类型，模式类型的前缀是 Prefix，后面是任意的 string，如果匹配返回 true，否则返回 false。

当匹配时：


```ts
type StartWithResult =  StartsWith<'pan shanshan', 'pan'>
// type StartWithResult = true
```

不匹配时：


```ts
type StartWithResult2 =  StartsWith<'pan shanshan', 'shanshan'>
// type StartWithResult2 = false
```


__Replace__

字符串可以匹配一个模式类型，提取想要的部分，自然也可以用这些再构成一个新的类型。

比如实现字符串替换：


```ts
type ReplaceStr<Str extends string, From extends string, To extends string> = Str extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : Str
```

声明要替换的字符串 Str、待替换的字符串 From、替换成的字符串 3 个类型参数，通过 extends 约束为都是 string 类型。

用 Str 去匹配模式串，模式串由 From 和之前之后的字符串构成，把之前之后的字符串放到通过 infer 声明的局部变量 Prefix、Suffix 里。

用 Prefix、Suffix 加上替换到的字符串 To 构造成新的字符串类型返回。

当匹配时：

```ts
type replacedStr = ReplaceStr<"PsChina's name is ?",'?','shan shan'>
// type replacedStr = "PsChina's name is shan shan"
```

不匹配时：

```ts
type replacedStr2 = ReplaceStr<"string",'?','shan shan'>
// type replacedStr2 = "string"
```

__Trim__

能够匹配和替换字符串，那也就能实现去掉空白字符的 Trim：

不过因为我们不知道有多少个空白字符，所以只能一个个匹配和去掉，需要递归。

先实现 TrimRight:

```ts
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimStrRight<Rest> : Str
```

类型参数 Str 是要 Trim 的字符串。

如果 Str 匹配字符串 + 空白字符 (空格、换行、制表符)，那就把字符串放到 infer 声明的局部变量 Rest 里。

把 Rest 作为类型参数递归 TrimRight，直到不匹配，这时的类型参数 Str 就是处理结果。

```ts
type TrimStrRightResult = TrimStrRight<'panshanshan      '>
// type TrimStrRightResult = "panshanshan"
```

同理可得 TrimLeft：

```ts
type TrimStrLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimStrLeft<Rest> : Str
```

```ts
type TrimStrLeftResult = TrimStrLeft<'      panshanshan'>
// type TrimStrLeftResult = "panshanshan"
```

TrimRight 和 TrimLeft 结合就是 Trim：

```ts
type TrimStr<Str extends string> = TrimStrRight<TrimStrLeft<Str>>
```

试一下
```ts
type TrimStrResult = TrimStr<'           panshanshan          '>
// type TrimStrResult = "panshanshan"
```

### 函数

函数同样也可以做类型匹配，比如提取参数、返回值的类型。


__GetParameters__


函数类型可以通过模式匹配来提取参数的类型：

```ts
type GetParameters<Func extends Function> = Func extends (...args:infer Args)=>unknown ? Args : never
```

类型参数 Func 是要匹配的函数类型，通过 extends 约束为 Function。

Func 和模式类型做匹配，参数类型放到用 infer 声明的局部变量 Args 里，返回值可以是任何类型，用 unknown。

返回提取到的参数类型 Args。

```ts
type func = (a:number,b:number)=>number

type ArgsType = GetParameters<func>
// type ArgsType = [a: number, b: number]
```

__GetReturnType__

能提取参数类型，同样也可以提取返回值类型： 

```ts
type GetReturnType<Func extends Function> = Func extends (...args:any[]) => infer ReturnType ? ReturnType : never
```

Func 和模式类型做匹配，提取返回值到通过 infer 声明的局部变量 ReturnType 里返回。

参数类型可以是任意类型，也就是 any[]（注意，这里不能用 unknown，因为参数类型是要赋值给别的类型的，而 unknown 只能用来接收类型，所以用 any）。

```ts
type func = (a:number,b:number)=>number

type ReturnType = GetReturnType<func>
// type ReturnType = number
```

__GetThisParameterType__

方法里可以调用 this，比如这样：

```ts
class Dong {
    name: string;

    constructor() {
        this.name = "dong";
    }

    hello() {
        return 'hello, I\'m ' + this.name;
    }
}

const dong = new Dong();
dong.hello();
```

用`对象.方法名`的方式调用的时候，this 就指向那个对象。

但是方法也可以用 `call` 或者 `apply` 调用：

```ts
const dong = new Dong();
dong.hello();

dong.hello.call({xxx:1})
// 这里ts并没有检测出来
```

call 调用的时候，this 就变了，但这里却没有被检查出来 this 指向的错误。

如何让编译器能够检查出 this 指向的错误呢？

可以在方法声明时指定 this 的类型：


```ts
class Dong {
    name: string;

    constructor() {
        this.name = "dong";
    }

    hello(this: Dong) {
        return 'hello, I\'m ' + this.name;
    }
}
```

这样，当 call/apply 调用的时候，就能检查出 this 指向的对象是否是对的：

```ts
const dong = new Dong();
dong.hello();

dong.hello.call({xxx:1})
// 这里报错 Argument of type '{xxx:number;}' is not assignable to parameter od type 'Dong'.
```

如果没有报错，说明没开启 strictBindCallApply 的编译选项，这个是控制是否按照原函数的类型来检查 bind、call、apply

这里的 this 类型同样也可以通过模式匹配提取出来：

```ts
type GetTHisParameterType<T> = T extends (this:infer ThisType,...args:any[]) => any ? ThisType : unknown
```

类型参数 T 是待处理的类型。

用 T 匹配一个模式类型，提取 this 的类型到 infer 声明的局部变量 ThisType 中，其余的参数是任意类型，也就是 any，返回值也是任意类型。

返回提取到的 ThisType。

这样就能提取出 this 的类型：

```ts
type thisType = GetTHisParameterType<typeof dong.hello>

// type thisType = Dong
```

### 构造器

构造器和函数的区别是，构造器是用于创建对象的，所以可以被 new。

同样，我们也可以通过模式匹配提取构造器的参数和返回值的类型：

__GetInstanceType__

构造器类型可以用 interface 声明，使用 new(): xx 的语法。

比如：

```ts
interface Person {
    name:string
}

interface PersonConstructor{
    new(name:string): Person
}
```

这里 PersonConstructor 返回的是 Person 类型的实例对象，这个也可以通过模式匹配取出来。

```ts
type GetInstanceType<ConstructorType extends new(...args:any[])=>any> = ConstructorType extends new (...args:any[])=>infer InstanceType ? InstanceType : any
```

类型参数 ConstructorType 是待处理的类型，通过 extends 约束为构造器类型。

用 ConstructorType 匹配一个模式类型，提取返回的实例类型到 infer 声明的局部变量 InstanceType 里，返回 InstanceType。

这样就能取出构造器对应的实例类型：

```ts
type InstanceType = GetInstanceType<PersonConstructor>
// type InstanceType = Person
```

### 索引类型

索引类型也同样可以用模式匹配提取某个索引的值的类型，这个用的也挺多的，比如 React 的 index.d.ts 里的 PropsWithRef 的高级类型，就是通过模式匹配提取了 ref 的值的类型：

```ts
type PropsWithRef<P> = 
    'ref' extends keyof P 
    ? P extends {ref?: infer R | undefined} 
        ? string extends R 
            ? PropsWithoutRef<P> & {ref?:Exclude<R, string> | undefined}
            : P
        :P
    :P;
```

我们简化一下那个高级类型，提取 Props 里 ref 的类型：

__GetRefProps__

我们同样通过模式匹配的方式提取 ref 的值的类型：

```ts
type GetRefProps<Props> = 
    'ref' extends keyof Props
        ? Props extends { ref?: infer Value | undefined}
            ? Value
            : never
        : never;
```

类型参数 Props 为待处理的类型。

通过 keyof Props 取出 Props 的所有索引构成的联合类型，判断下 ref 是否在其中，也就是 'ref' extends keyof Props。

在 ts3.0 里面如果没有对应的索引，Obj[Key] 返回的是 {} 而不是 never，所以这样做下兼容处理。

如果有 ref 这个索引的话，就通过 infer 提取 Value 的类型返回，否则返回 never。


```ts
type RefProps = GetRefProps<{ ref?: 1, name: 'dong' }>
// type RefProps = 1
```

当 ref 为 undefined 时：
```ts
type RefProps2 = GetRefProps<{ ref?: undefined, name: 'dong' }>
// type RefProps2 = undefined
```

__总结__

就像字符串可以匹配一个模式串提取子组一样，TypeScript 类型也可以匹配一个模式类型提取某个部分的类型。

__TypeScript 类型的模式匹配是通过类型 extends 一个模式类型，把需要提取的部分放到通过 infer 声明的局部变量里，后面可以从这个局部变量拿到类型做各种后续处理__。

模式匹配的套路在数组、字符串、函数、构造器、索引类型、Promise 等类型中都有大量的应用，掌握好这个套路能提升很大一截类型体操水平。

## 套路二：重新构造做变换

类型编程的主要目的就是对类型做各种转换，那么如何对类型做修改呢？

TypeScript 类型系统支持 3 种可以声明任意类型的变量：type、infer、类型参数。

type 叫做类型别名，其实就是申明一个变量存储某个类型：

```ts
type ttt = Promsie<number>;
```

infer 用于类型提取，然后存到一个变量里，相当于局部变量:

```ts
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
```

类型参数用于接受具体类型，在类型运算中也相当于局部变量:

```ts
type isTwo<T> = T extends 2 ? true : false
```

但是，严格来说这三种也都不叫变量，因为他们不能被重新赋值。

TypeScript 设计可以做类型编程的类型系统的目的就是为了产生各种复杂的类型，那不能修改怎么产生新类型呢？

答案是重新构造。

这就设计到了第二个类型体操套路：重新构造做变换。

### 重新构造做变换

__TypeScript 的 type、infer、类型参数声明的变量都不能修改，想对类型做各种变换产生新的类型就需要重新构造__。

数组、字符串、函数等类型的重新构造比较简单。

索引类型，也就是多个元素的聚合类型的重新构造复杂一些，涉及到了映射类型的语法。

我们先从简单的开始：

### 数组类型的重新构造：

__Push__

有这样一个元组类型：

```ts
type tuple = [1,2,3]
```

我想给这个元组类型再添加一些类型，怎么做呢？

TypeScript 类型变量不支持修改，我们可以构造一个新元组类型：

```ts
type Push<Arr extends unknown[], Ele> = [...Arr, Ele]
```

 类型参数 Arr 是要修改的数组/元组类型，元素的类型任意，也就是 unknown。

 类型参数 Ele 是添加的元素类型

 返回的是用 Arr 已有的元素加上 Ele 构造的新的元组类型。

 ```ts
 type PushResult = Push<[1,2,3],4>
 // type PushResult = [1,2,3,4]
 ```

 这就是数组/元组的重新构造。

 >__数组和元组的区别__：数组类型是指任意多个同一类型的元素构造成的，比如 `number[]`、`Array<number>`，而元组则是数量固定，类型可以不同的元素构成的，比如`[1,true,'shan']`。

 __Unshift__

 可以在后面添加，同样也可以在前面添加：

 ```ts
 type Unshift<Arr extends  unknown[], Ele> = [Ele, ...Arr];
 ```

  ```ts
 type UnshiftResult = Unshift<[1,2,3],0>
 // type UnshiftResult = [0,1,2,3]
 ```

这两个案例比较简单，我们来做一个复杂的：

__Zip__

有这样两个元组：

```ts
type tuple1 = [1,2];
type tuple2 = ['shan', 'song'];
```

我们想把它们合并成这样的元组：

```ts
type tuple = [[1, 'shan'], [2, 'song']];
```

思路很容易想到，提取元组中的两个元素，构造成新的元组：

```ts
type Zip<One extends [unknown, unknown], Other extends [unknown, unknown]> = One extends [infer OneFirst, infer OneSecond] ? Other extends [infer OtherFirst, infer OtherSeconed] ? [[OneFirst, OtherFirst],[OneSecond, OtherSeconed]] : [] : []
```

两个类型参数 One、Other 是两个元组，类型是 [unknown, unknown]，代表 2 个任意类型的元素构成的元组。

通过 infer 分别提取 One 和 Other 的元素到 infer 声明的局部变量 OneFirst、OneSecond、OtherFirst、OtherSecond 里。

用提取的元素构造成新的元组返回即可：


```ts
type One = ['a','b']

type Two = [1,2]

type ZipResult = Zip<One,Two>

// type ZipResult = [["a", 1], ["b", 2]]
```

但是这样只能合并两个元素的元组，如果是任意个呢？

那就得递归了：

```ts
type Zip2<One extends unknown[], Other extends unknown> = One extends [infer OneFirst, ...infer OneRest] ? Other extends [infer OtherFirst, ...infer OtherRest] ? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>] : [] : []
```

类型参数 One、Other 声明为 unknown[]，也就是元素个数任意，类型任意的数组。

每次提取 One 和 Other 的第一个元素 OneFirst、OtherFirst，剩余的放到 OneRest、OtherRest 里。

用 OneFirst、OtherFirst 构造成新的元组的一个元素，剩余元素继续递归处理 OneRest、OtherRest。

这样，就能处理任意个数元组的合并：


```ts
type One = ['a','b','c']

type Two = [1,2,3]

type ZipResult = Zip2<One,Two>

// type ZipResult = [["a", 1], ["b", 2], ["c", 3]]
```

了解了数组类型的重新构造，我们再来看下字符串类型的：

### 字符串类型的重新构造：

CapitalizeStr 

我们想把一个字符串字面量类型的 'shan' 转为首字母大写的 'Shan'。

需要用到字符串类型的提取和重新构造：

```ts 
type CarpitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : Str

```

我们声明了类型参数 Str 是要处理的字符串类型，通过 extends 约束为 string。

通过 infer 提取出首个字符到局部变量 First，提取后面的字符到局部变量 Rest。

然后使用 TypeScript 提供的内置高级类型 Uppercase 把首字母转为大写，加上 Rest，构造成新的字符串类型返回。

```ts
type shan = 'shan'

type carpitalizeStr = CarpitalizeStr<shan>

// type carpitalizeStr = "Shan"
```

这就是字符串类型的重新构造：__从已有的字符串类型中提取出一些部分字符串，经过一系列变换，构造成新的字符串类型__。

__CamelCase__

我们再来实现 shan_shan_shan 到 shanShanShan 的变换。

同样是提取和重新构造：

```ts
type CamelCase<Str extends string> = Str extends `${infer Left}_${infer Right}${infer Rest}` ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}` : Str
```

类型参数 Str 是待处理的字符串类型，约束为 string。

提取 _ 之前和之后的两个字符到 infer 声明的局部变量 Left 和 Right，剩下的字符放到 Rest 里。

然后把右边的字符 Right 大写，和 Left 构造成新的字符串，剩余的字符 Rest 要继续递归的处理。

这样就完成了从下划线到驼峰形式的转换：

```ts
type camelCaseString = CamelCase<'pan_shan_shan'>
// type panShanShan = "panShanShan"
```

__DropSubStr__

可以修改自然也可以删除，我们再来做一个删除一段字符串的案例：删除字符串中的某个子串

```ts
type DropSubStr<Str extends string, SubStr extends string> = Str extends `${infer Prefix}${SubStr}${infer Suffix}` ? DropSubStr<`${Prefix}${Suffix}`, SubStr> : Str
```

类型参数 Str 是待处理的字符串， SubStr 是要删除的字符串，都通过 extends 约束为 string 类型。

通过模式匹配提取 SubStr 之前和之后的字符串到 infer 声明的局部变量 Prefix、Suffix 中。

如果不匹配就直接返回 Str。

如果匹配，那就用 Prefix、Suffix 构造成新的字符串，然后继续递归删除 SubStr。直到不再匹配，也就是没有 SubStr 了。

```ts
type DropSubStrResult = DropSubStr<'shanshan~~~', '~'>
// type DropSubStrResult = "shanshan"
```

字符串类型的重新构造之后，我们再来看下函数类型的重新构造：


### 函数类型的重新构造：

之前我们分别实现了参数和返回值的提取，那么重新构造就是用这些提取出的类型做下修改，构造一个新的类型即可。


比如在已有的函数类型上添加一个参数：

__AppendArgument__

```ts
type AppendArgument<Func extends Function, Arg> = Func extends (...args: infer Args) => infer returnType ? (...args: [...Args, Arg]) => returnType : never
```

类型参数 Func 是待处理的函数类型，通过 extends 约束为 Function，Arg 是要添加的参数类型。

通过模式匹配提取参数到 infer 声明的局部变量 Args 中，提取返回值到局部变量 ReturnType 中。

用 Args 数组添加 Arg 构造成新的参数类型，结合 ReturnType 构造成新的函数类型返回。

这样就完成了函数类型的修改：


```ts
type Func = (a:number,number)=>void

type AppendArgumentResult = AppendArgument<Func, number>

// type AppendArgumentResult = (args_0: number, args_1: any, args_2: number) => void
```

最后，我们再来看下索引类型的重新构造

### 索引类型的重新构造

索引类型是聚合多个元素的类型，class、对象等都是索引类型，比如这就是一个索引类型：


```ts
type obj = {
    name:string;
    age:number;
    gender:boolean;
}
```

索引类型可以添加修饰符 readonly（只读）、?（可选）:

```ts
type obj = {
    readonly name:string;
    age?:number;
    gender:boolean;
}
```

对它的修改和构造新类型涉及到了映射类型的语法：

```ts
type Mapping<Obj extends object> = { 
    [Key in keyof Obj]: Obj[Key]
}
```

__Mapping__

映射的过程中可以对 value 做下修改，比如：

```ts
type Mapping<Obj extends object> = { 
    [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]]
}
```

类型参数 Obj 是待处理的索引类型，通过 extends 约束为 object。

用 keyof 取出 Obj 的索引，作为新的索引类型的索引，也就是 Key in keyof Obj。

值的类型可以做变换，这里我们用之前索引类型的值 Obj[Key] 构造成了三个元素的元组类型 [Obj[Key], Obj[Key], Obj[Key]]：

```ts
type res = Mapping<{a:1,b:2}>
// type res = {
//     a: [1, 1, 1], b: [2, 2, 2]
// }
```

__UppercaseKey__


除了可以对 Value 做修改，也可以对 Key 做修改，使用 as， 这叫 `重映射`:

比如把索引类型的 Key 变为大写。

```ts
type UppercaseKey<Obj extends object> = {
    [Key in keyof Obj as Uppercase<Key & string>] : Obj[Key]
}
```

类型参数 Obj 是待处理的索引类型，通过 extends 约束为 object。

新的索引类型的索引为 Obj 中的索引，也就是 Key in keyof Obj，但要做一些变换，也就是 as 之后的。

通过 Uppercase 把索引 Key 转为大写，因为索引可能为 string、number、symbol 类型，而这里只能接受 string 类型，所以要 & string，也就是取索引中 string 的部分。

value 保持不变，也就是之前的索引 Key 对应的值的类型 Obj[Key]。

这样构造出的新的索引类型，就把原来索引类型的索引转为了大写而数字类型的 key 则被抛弃了：

```ts
type UppercaseKeyResult = UppercaseKey<{a:1,b:2, [1]:1}>
// type UppercaseKeyResult = {
//     A: 1;
//     B: 2;
// }
```

__Record__

TypeScript 提供了内置的高级类型 Record 来创建索引类型：

```ts
type Record<K extends string | number | symbol, T> = { [P in K]: T; }
```


指定索引和值的类型分别为 K 和 T，就可以创建一个对应的索引类型。

上面的索引类型的约束我们用的 object，其实更语义化一点我推荐用 Record<string, object>：

```ts
type UppercaseKey2<Obj extends Record<string, any>> = { 
    [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}
```

__ToReadonly__

索引类型的索引可以添加 readonly 的修饰符，代表只读。

那我们就可以实现给索引类型添加 readonly 修饰的高级类型：

```ts
type ToReadonly<T extends Record<any, any>> = {
    readonly [Key in keyof T]: T[Key]
} 
```

通过映射类型构造了新的索引类型，给索引加上了 readonly 的修饰，其余的保持不变，索引依然为原来的索引 Key in keyof T，值依然为原来的值 T[Key]。


```ts
type ToReadonlyResult = ToReadonly<{a:1,b:2}>

// type ToReadonlyResult = {
//     readonly a: 1;
//     readonly b: 2;
// }
```


__ToPartial__

同理，索引类型还可以添加可选修饰符：

```ts
type ToPartial<T extends Record<any, any>> = {
    [Key in keyof T]?: T[Key]
}
```

给索引类型 T 的索引添加了 ? 可选修饰符，其余保持不变。

```ts
interface Person {
    name: string,
    age: number,
}


type ToPartialRsult = ToPartial<Person>

// type ToPartialRsult = {
//     name?: string | undefined;
//     age?: number | undefined;
// }
```

__ToRequired__

同理，也可以去掉可选修饰符：

```ts
type ToRequired<T extends Record<any, any>> = {
    [Key in keyof T]-?: T[Key]
}
```
给索引类型 T 的索引去掉 ? 的修饰 ，其余保持不变。

```ts
interface Person {
    name: string,
    age?: number,
}


type ToRequiredRsult = ToRequired<Person>

// type ToRequiredRsult = {
//     name: string;
//     age: number;
// }
```

__FilterByValueType__

可以在构造新索引类型的时候根据值的类型做下过滤：

```ts

```