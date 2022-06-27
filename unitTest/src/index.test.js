import {
  cloneDeep
} from "./index";

describe('深拷贝', () => {
  it('基本类型', () => {
    expect(cloneDeep(100)).toBe(100)
    expect(cloneDeep('lll')).toBe('lll')
    expect(cloneDeep(null)).toBe(null)
  })
  it('Object and Array', () => {
    const obj = {
      name: 'lll',
      info: {
        city: 'BJ'
      },
      hobbys: [1, 2, 3]
    }
    const obj1 = cloneDeep(obj)
    expect(obj1).toEqual(obj)
    expect(obj1.info.city).toBe('BJ')
    expect(obj1.hobbys).toEqual([1, 2, 3])
  })
  it('Map and Set', () => {
    const map1 = new Map([
      ['x', 10],
      ['y', 20]
    ])
    const map2 = cloneDeep(map1)
    expect(map2.size).toBe(2)

    const obj1 = {
      key: new Map([
        ['x', 10],
        ['y', 20]
      ])
    }
    const obj2 = cloneDeep(obj1)
    expect(obj1.key.size).toBe(2)
  })
  it('循环引用', () => {
    const a = {}
    a.self = a
    const b = cloneDeep(a)
    expect(b.self).toBe(b)
  })
})