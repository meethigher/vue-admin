// 使用vuex进行全局状态管理

import {createStore} from "vuex";

const store = createStore({
    //严格模式，在生产环境中，不能打开
    strict: process.env.NODE_ENV !== "production",
    //全局状态
    state() {

        return {
            count: 100
        };
    },
    //项目中唯一修改数据的方法
    //严格模式中，不允许在这里做异步，要在actions里面做。比如setTimeout等
    mutations: {
        add(state) {
            state.count++;
        },
        addNum(state, amount) {
            state.count += amount;
        }
    },
    //异步修改数据的地方
    actions: {
        addAction(context) {
            setTimeout(function () {
                /*所谓异步，也还要调用同步的方法进行修改数据*/
                context.commit("add");
            }, 5000);
        },
        addActionNum(context, amount) {
            setTimeout(function () {
                /*所谓异步，也还要调用同步的方法进行修改数据*/
                context.commit("addNum", amount);
            }, 5000);
        }
    },
    //vuex中的计算属性
    getters: {},
    //全局状态模块
    modules: {}
});


//导出创建好的实例
export default store;
