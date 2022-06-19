import {
  EventBus
} from "./index";

describe('EventBus', () => {
  it('绑定事件，触发事件', () => {
    const event = new EventBus()

    const fn1 = jest.fn()
    const fn2 = jest.fn()
    const fn3 = jest.fn()

    event.$on('key1', fn1)
    event.$on('key1', fn2)
    event.$on('key2', fn3)

    event.$emit('key1', 'ok')

    expect(fn1).toBeCalledWith('ok')
    expect(fn2).toBeCalledWith('ok')
    expect(fn3).not.toBeCalled()
  })
})