// class A {
//   constructor() { }

//   sayA() {
//     console.log('A');
//   }
// }

// class B {
//   constructor() { }

//   sayB() {
//     console.log('B');
//   }
// }

// const mixinClass = (base, ...mixins) => {
//   const mixinProps = (target, source) => {
//     Object.getOwnPropertyNames(source).forEach(prop => {
//       if (/^constructor$/.test(prop)) { return; }
//       Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
//     })
//   };

//   let Ctor;
//   if (base && typeof base === 'function') {
//     Ctor = class extends base {
//       constructor(...props) {
//         super(...props);
//       }
//     };
//     mixins.forEach(source => {
//       mixinProps(Ctor.prototype, source.prototype);
//     });
//   } else {
//     Ctor = class {};
//   }
//   return Ctor;
// };

// class C extends mixinClass(A, B){
//   constructor(...args) {
//     super(...args)
//   }

//   sayC() {
//     console.log('C');
//   }
// }

// const c = new C()
// console.log(c);

// function compose(...funcs) {
//   if (funcs.length === 0) {
//     return arg => arg;
//   }

//   if (funcs.length === 1) {
//     return funcs[0];
//   }

//   return funcs.reduce((a, b) => (...args) => a(b(...args)));
// }
// const obj = {
//   c: 3
// }
// const fn1 = (parmas) => {
//   parmas.a = 1
//   return parmas
// }
// const fn2 = (parmas) => {
//   parmas.b = 2
//   return parmas
// }
// const m = compose(fn1, fn2)

// console.log(m(obj));

// function fn() {
//   console.log(1);
//   !(() => {
//     return
//   })
//   console.log(2);
// }
// fn()

let o1 = {
  a: 1
}
let p = o1
o1.x = o1 = {
  a: 2
}
console.log(o1);
console.log(o1.x);
console.log(p);