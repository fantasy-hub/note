### Vue3
- watchEffect 副作用刷新时机
    Vue 的响应式系统会缓存副作用函数，并异步地刷新它们，这样可以避免同一个 tick 中多个状态改变导致的不必要的重复调用。
    在核心的具体实现中, 组件的更新函数也是一个被侦听的副作用。
    当一个用户定义的副作用函数进入队列时, 会在所有的组件更新后执行
    ```
    // 同步运行
    watchEffect(
    () => {
        /* ... */
    },
    {
        flush: 'sync',
    }
    )
    // 组件更新前执行
    watchEffect(
    () => {
        /* ... */
    },
    {
        flush: 'pre',
    }
    )
    ```

----

- watchEffect: onTrack 和 onTrigger 选项可用于调试一个侦听器的行为。
    当一个 reactive 对象属性或一个 ref 作为依赖被追踪时，将调用 onTrack。新增生依赖项变更导致副作用被触发时，将调用 onTrigger。新增生命周期：onRenderTriggered

----

- 生命周期钩子函数：
    这些生命周期钩子注册函数只能在 setup() 期间同步使用， 因为它们依赖于内部的全局状态来定位当前组件实例（正在调用 setup() 的组件实例）, 不在当前组件下调用这些函数会抛出一个错误。
    组件实例上下文也是在生命周期钩子同步执行期间设置的，因此，在卸载组件时，在生命周期钩子内部同步创建的侦听器和计算状态也将自动删除。

---- 

- 模板 Refs
    Render / JSX
    ```
    export default {
    setup() {
        const root = ref(null)

        return () =>
        h('div', {
            ref: root,
        })

        // 使用 JSX
        return () => <div ref={root} />
    },
    }
    ```

    在 v-for 中使用
    ```
    <template>
    <div v-for="(item, i) in list" :ref="el => { divs[i] = el }">
        {{ item }}
    </div>
    </template>

    <script>
    import { ref, reactive, onBeforeUpdate } from 'vue'

    export default {
        setup() {
        const list = reactive([1, 2, 3])
        const divs = ref([])

        // 确保在每次变更之前重置引用
        onBeforeUpdate(() => {
            divs.value = []
        })

        return {
            list,
            divs,
        }
        },
    }
    </script>
    ```

----

- Ref
    ```
    const foo = ref<string | number>('foo') // foo 的类型: Ref<string | number>
    foo.value = 123 // 能够通过！
    ```

----

- Provided / Injected
    ```
    // 父组件
    import { InjectionKey, provide, inject } from 'vue'
    const key: InjectionKey<string> = Symbol()
    provide(key, 'foo') // 类型不是 string 则会报错

    // 子组件
    const foo = inject(key) // foo 的类型: string | undefined
    ```
