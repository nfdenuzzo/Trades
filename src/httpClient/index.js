import config from './config'
import Store from '@/store'

export default {
  // This will authenticate a user and return a token for him
  authenticateUserRequest (username) {
    const postData = {
      username
    }
    return config.axiosInstance.post('Auth/RosterAuth', postData)
  },
  TradeDataRequest () {
    const params = {
      PageSize: Store.getters.getPageSize,
      PageNumber: Store.getters.getCurrentPage,
      Filter: Store.getters.getFilter,
      ShowDeleted: Store.getters.getShowDeleted
    }
    return config.axiosInstance.get('trade', {
      params
    })
  },
  GetTradeGroupsDisplayData () {
    return config.axiosInstance.get('trade/TradeGroups')
  },
  addorUpdateTradeDataAndReload (data) {
    var Trades = []
    Trades.push(data)
    return config.axiosInstance.post('trade', Trades)
  },
  DisableOrEnableTradeDataAndReload (tradeId) {
    return config.axiosInstance.delete(`trade/?tradeId=${tradeId}`)
  },
  getTradeGroups (tradeId) {
    return config.axiosInstance.get(`trade/tradegroup/?tradeId=${tradeId}`)
  },
  exportToExcel () {
    return config.axiosInstance.get('trade/export', { responseType: 'blob' })
  },
  // trade group
  TradeGroupDataRequest () {
    const params = {
      PageSize: Store.getters.getPageSizeTradeGroup,
      PageNumber: Store.getters.getCurrentPageTradeGroup,
      Filter: Store.getters.getFilterTradeGroup,
      ShowDeleted: Store.getters.getShowDeletedTradeGroup
    }
    return config.axiosInstance.get('tradegroup', {
      params
    })
  },
  addorUpdateTradeGroupDataAndReload (data) {
    var TradeGroups = []
    TradeGroups.push(data)
    return config.axiosInstance.post('tradeGroup', TradeGroups)
  },
  DisableOrEnableTradeGroupDataAndReload (tradeGroupId) {
    return config.axiosInstance.delete(`tradegroup/?tradeGroupId=${tradeGroupId}`)
  },
  exportToExcelTradeGroup () {
    return config.axiosInstance.get('tradegroup/export', { responseType: 'blob' })
  }
}
