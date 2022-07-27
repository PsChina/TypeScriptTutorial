type Zip2<One extends unknown[], Other extends unknown> = One extends [infer OneFirst, ...infer OneRest] ? Other extends [infer OtherFirst, ...infer OtherRest] ? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>] : [] : []


type One = ['a', 'b', 'c']

type Two = [1, 2, 3]

type ZipResult = Zip2<One, Two>


type CarpitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : Str


type shan = 'shan'

type carpitalizeStr = CarpitalizeStr<shan>


type CamelCase<Str extends string> = Str extends `${infer Left}_${infer Right}${infer Rest}` ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}` : Str

type panshanshan = 'pan_shan_shan'

type panShanShan = CamelCase<panshanshan>

type DropSubStr<Str extends string, SubStr extends string> = Str extends `${infer Prefix}${SubStr}${infer Suffix}` ? DropSubStr<`${Prefix}${Suffix}`, SubStr> : Str

type DropSubStrResult = DropSubStr<'shanshan~~~', '~'>

type AppendArgument<Func extends Function, Arg> = Func extends (...args: infer Args) => infer returnType ? (...args: [...Args, Arg]) => returnType : never


type Func = (a: number, number) => void

type AppendArgumentResult = AppendArgument<Func, number>


type UppercaseKey<Obj extends object> = {
    [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}


type UppercaseKeyResult = UppercaseKey<{ a: 1, b: 2, [1]: 1 }>


type UppercaseKey2<Obj extends Record<string, any>> = {
    [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}

type ToReadonly<T extends Record<any, any>> = {
    readonly [Key in keyof T]: T[Key]
}

type ToReadonlyResult = ToReadonly<{ a: 1, b: 2 }>


type ToPartial<T extends Record<any, any>> = {
    [Key in keyof T]?: T[Key]
}

interface Person {
    name: string,
    age: number,
}

