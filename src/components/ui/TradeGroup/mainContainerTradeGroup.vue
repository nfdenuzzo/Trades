<template>
  <div class="mainContainer">
    <div class="grid-content-main" v-loading="isLoading">
      <addTradeGroupDisplay/>
      <TradeGroupViewHeading/>
      <TradeGroupView/>
    </div>
  </div>
</template>
<script>

import TradeGroupViewHeading from '@/components/ui/TradeGroup/TradeGroupViewHeading'
import TradeGroupView from '@/components/ui/TradeGroup/TradeGroupView'
import addTradeGroupDisplay from '@/components/ui/TradeGroup/addTradeGroupDisplay'

export default {
  name: 'MainContainerTradeGroup',
  components: {
    TradeGroupViewHeading,
    TradeGroupView,
    addTradeGroupDisplay
  },
  data () {
    return {
      tradeItem: null
    }
  },
  methods: {
    loadInitialData () {
      this.setGlobalLoading(true)
      this.$store.dispatch({
        type: 'TradeGroupDataRequest'
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.setGlobalLoading(false)
      })
    },
    setGlobalLoading (loading) {
      this.$store.commit({
        type: 'setGlobalLoad',
        load: loading
      })
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.getGlobalLoad
    }
  },
  mounted () {
    this.$store.commit('resetPager')
    this.loadInitialData()
  },
  watch: {
  }
}
</script>

<style scoped>

  .grid-content-left {
    border-radius: 7px;
    min-height: 36px;
    margin: 5px;
    border: 2px solid #B2BABB;
    color: #fff;
  }

  .grid-content-right {
    min-height: 36px;
  }

  .grid-content-left-bg {
    background: #34495e;
  }
  .grid-content-right-bg {
    background: #FBFCFC;
  }

  .autoGrow{
    min-height: 95vh;
    height: auto;
  }

  .grid-padding {
    padding: 5px;
  }

  .grid-content-headings{
    height: 5.8vw;
  }

  .grid-content-main {
    margin-top: 5px;
    min-height: 50vh;
  }
</style>
