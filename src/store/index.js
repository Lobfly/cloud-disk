import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const state = {
    isPreview: false,
    previewFile: null,
    previewType:''
}
const actions = {
    setPreviewFile(ctx,val){
        ctx.commit('SetPreviewFile',val)
    }
}
const mutations = {
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