import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const state = {
    secretKey:'GR4VDO3930EZA2',
    snackbar:false,
    snackbarText:'hello',
    snackbarColor:'primary',
    isPreview: false,
    previewFile: null,
    previewType:''
}
const actions = {
    setSnackbarText(ctx,val){
        ctx.commit('SetSnackbarText',val)
    },
    setPreviewFile(ctx,val){
        ctx.commit('SetPreviewFile',val)
    }
}
const mutations = {
    SetSnackbarText(state,val){
        state.snackbarText = val
    },
    SetSnackbar(state,val){
        state.snackbar = val
    },
    SetPreviewFile(state,val){
        state.previewFile = val
    },
    SetIsPreview(state,val){
        state.isPreview = val
    },
    SetPreviewType(state,val){
        state.previewType = val
    }
}

export default new Vuex.Store({
	actions,
	mutations,
	state
})