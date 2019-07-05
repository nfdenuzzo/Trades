import Vue from 'vue'
import Vuex from 'vuex'
import HttpClient from '@/httpClient'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    getGlobalLoad: state => state.globalLoad,
    getTradeGroups: state => state.TradeGroup,
    getTradeGroupsDisplay: state => state.TradeGroupsDisplay,
    getNewTrade: state => state.NewTrade,
    getAddNewTrade: state => state.AddNewTrade,
    getfilterLoading: state => state.filterLoading,
    // paging new
    getCurrentPage: state => state.TradesPaging.currentPage,
    getPageSize: state => state.TradesPaging.pageSize,
    getTotalCount: state => state.TradesPaging.totalItems,
    getTrades: state => state.Trades,
    getFilter: state => state.filter,
    getTradesPaging: state => state.TradesPaging,
    getShowDeleted: state => state.ShowDeleted,
    // trade group
    getNewTradeGroup: state => state.NewTradeGroup,
    getAddNewTradeGroup: state => state.AddNewTradeGroup,
    getfilterTradeGroupLoading: state => state.filterTradeGroupLoading,
    getCurrentPageTradeGroup: state => state.TradeGroupPaging.currentPage,
    getPageSizeTradeGroup: state => state.TradeGroupPaging.pageSize,
    getTotalCountTradeGroup: state => state.TradeGroupPaging.totalItems,
    getTradeGroup: state => state.TradeGroup,
    getFilterTradeGroup: state => state.filterTradeGroup,
    getTradeGroupPaging: state => state.TradeGroupPaging,
    getShowDeletedTradeGroup: state => state.ShowDeletedTradeGroup
    // end
  },
  state: {
    ShowDeleted: false,
    NewTrade: null,
    AddNewTrade: false,
    filterLoading: false,
    globalLoad: false,
    Trades: [],
    TradeGroupsDisplay: [],
    TradeGroup: [],
    apiErrors: [],
    filter: null,
    TradesPaging: {
      totalItems: 0,
      currentPage: 1,
      pageSize: 10,
      totalPages: 0
    },
    // trade group
    ShowDeletedTradeGroup: false,
    NewTradeGroup: null,
    AddNewTradeGroup: false,
    filterLoadingTradeGroup: false,
    filterTradeGroup: null,
    TradeGroupPaging: {
      totalItems: 0,
      currentPage: 1,
      pageSize: 10,
      totalPages: 0
    }
    // end
  },
  mutations: {
    updatePager (state, payload) {
      state.TradesPaging.pageSize = payload.paging.pageSize
      state.TradesPaging.totalPages = payload.paging.totalPages
      state.TradesPaging.currentPage = payload.paging.pageNumber
      state.TradesPaging.totalItems = payload.paging.totalItems
      state.TradeGroupPaging.pageSize = payload.paging.pageSize
      state.TradeGroupPaging.totalPages = payload.paging.totalPages
      state.TradeGroupPaging.currentPage = payload.paging.pageNumber
      state.TradeGroupPaging.totalItems = payload.paging.totalItems
    },
    resetPager (state, payload) {
      state.TradesPaging.pageSize = 10
      state.TradesPaging.totalPages = 0
      state.TradesPaging.currentPage = 1
      state.TradesPaging.totalItems = 0
      state.TradeGroupPaging.pageSize = 10
      state.TradeGroupPaging.totalPages = 0
      state.TradeGroupPaging.currentPage = 1
      state.TradeGroupPaging.totalItems = 0
    },
    setShowDeleted (state, payload) {
      state.ShowDeleted = payload
    },
    // paging
    setLoadNewTrades (state, payload) {
      state.Trades.push(payload)
    },
    setAddNewTrade (state, payload) {
      state.AddNewTrade = payload
    },
    // paging
    setTradesPagingCurrentPage (state, payload) {
      state.TradesPaging.currentPage = payload.data
    },
    // paging
    setTradesPagingReset (state, payload) {
      state.TradesPaging.currentPage = payload
    },
    // paging
    setTradesPagingSize (state, payload) {
      state.TradesPaging.pageSize = payload.data
    },
    setGlobalLoad (state, payload) {
      state.globalLoad = payload.load
    },
    addApiError (state, payload) {
      state.apiErrors.push(payload.error)
    },
    setTrades (state, payload) {
      state.Trades.unshift(Object.assign({}, payload))
    },
    setClearTrades (state) {
      state.Trades = []
    },
    setFilter (state, payload) {
      state.filter = payload
    },
    setTradeGroupsDisplay (state, payload) {
      state.TradeGroupsDisplay = payload
    },
    setTradeGroupsDisplayClear (state, payload) {
      state.TradeGroupsDisplay = []
    },
    setTradeGroups (state, payload) {
      state.TradeGroup = payload
    },
    // trade group
    setShowDeletedTradeGroup (state, payload) {
      state.ShowDeletedTradeGroup = payload
    },
    // paging
    setTotalCountTradeGroup (state, payload) {
      state.TradeGroupPaging.total = payload
    },
    // paging
    setLoadNewTradeGroup (state, payload) {
      state.TradeGroup.push(payload)
    },
    setAddNewTradeGroup (state, payload) {
      state.AddNewTradeGroup = payload
    },
    // paging
    setTradeGroupPagingCurrentPage (state, payload) {
      state.TradeGroupPaging.currentPage = payload.data
    },
    // paging
    setTradeGroupPagingReset (state, payload) {
      state.TradeGroupPaging.currentPage = payload
    },
    // paging
    setTradeGroupPagingSize (state, payload) {
      state.TradeGroupPaging.pageSize = payload.data
    },
    setTradeGroup (state, payload) {
      state.TradeGroup.unshift(Object.assign({}, payload))
    },
    setClearTradeGroup (state) {
      state.TradeGroup = []
    },
    setFilterTradeGroup (state, payload) {
      state.filterTradeGroup = payload
    }
    // end
  },
  actions: {
    async GetTradeGroupsDisplayData (context) {
      return HttpClient.GetTradeGroupsDisplayData().then((response) => {
        context.commit('setTradeGroupsDisplayClear')
        context.commit('setTradeGroupsDisplay', response.data)
      })
    },
    // paging
    async TradeDataRequest (context) {
      return HttpClient.TradeDataRequest().then((response) => {
        context.commit('setClearTrades')
        for (var i = 0; i < response.data.length; i++) {
          context.commit('setTrades', response.data[i])
        }
      })
    },
    async addorUpdateTradeDataAndReload (context, payload) {
      await HttpClient.addorUpdateTradeDataAndReload(payload.data).catch((error) => {
        // Return the rejected promise, and don't even go through with the rest of the method
        return Promise.reject(error)
      })
      context.commit('setTradesPagingReset', 1)
      return context.dispatch({
        type: 'resetTradeDataAndReload'
      })
    },
    async resetTradeDataAndReload (context) {
      context.commit('setClearTrades')
      return context.dispatch({
        type: 'TradeDataRequest'
      })
    },
    async DisableOrEnableTradeDataAndReload (context, payload) {
      await HttpClient.DisableOrEnableTradeDataAndReload(payload.Id).catch((error) => {
        // Return the rejected promise, and don't even go through with the rest of the method
        return Promise.reject(error)
      })
      context.commit('setTradesPagingReset', 1)
      return context.dispatch({
        type: 'TradeDataRequest'
      })
    },
    // her begins
    // trade group
    // paging
    async TradeGroupDataRequest (context) {
      return HttpClient.TradeGroupDataRequest().then((response) => {
        context.commit('setClearTradeGroup')
        for (var i = 0; i < response.data.length; i++) {
          context.commit('setTradeGroup', response.data[i])
        }
      })
    },
    async addorUpdateTradeGroupDataAndReload (context, payload) {
      await HttpClient.addorUpdateTradeGroupDataAndReload(payload.data).catch((error) => {
        // Return the rejected promise, and don't even go through with the rest of the method
        return Promise.reject(error)
      })
      context.commit('setTradeGroupPagingReset', 1)
      return context.dispatch({
        type: 'resetTradeGroupDataAndReload'
      })
    },
    async resetTradeGroupDataAndReload (context) {
      context.commit('setClearTradeGroup')
      return context.dispatch({
        type: 'TradeGroupDataRequest'
      })
    },
    async DisableOrEnableTradeGroupDataAndReload (context, payload) {
      context.commit('setClearTradeGroup')
      await HttpClient.DisableOrEnableTradeGroupDataAndReload(payload.Id).catch((error) => {
        // Return the rejected promise, and don't even go through with the rest of the method
        return Promise.reject(error)
      })
      context.commit('setTradeGroupPagingReset', 1)
      return context.dispatch({
        type: 'TradeGroupDataRequest'
      })
    }
    // end
  }
})
