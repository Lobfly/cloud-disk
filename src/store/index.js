import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const state = {
    secretKey:'GR4VDO3930EZA2',
    snackbar:false,
    snackbarText:'hello',
    snackbarColor:'primary'
}
const actions = {
    setSnackbarText(ctx,val){
        ctx.commit('SetSnackbarText',val)
    }
}
const mutations = {
    SetSnackbarText(state,val){
        state.snackbarText = val
    },
    SetSnackbar(state,val){
        state.snackbar = val
    }
}

export default new Vuex.Store({
	actions,
	mutations,
	state
})