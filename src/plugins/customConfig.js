import Vue from 'vue'
import httpClient from '../httpClient'
import dateUtil from '../helper/dateUtil'
import timeChecker from '../helper/timeChecker'

Vue.prototype.$httpClient = httpClient
Vue.prototype.$dateHelper = dateUtil
Vue.prototype.$timeChecker = timeChecker
