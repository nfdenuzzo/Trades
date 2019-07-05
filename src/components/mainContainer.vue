<template>
  <div class="mainContainer">
    <div class="grid-content-main">
      <addTradeDisplay/>
      <TradeViewHeading/>
      <TradeView/>
    </div>
  </div>
</template>
<script>

import TradeViewHeading from '@/components/ui/TradeViewHeading'
import TradeView from '@/components/ui/TradeView'
import addTradeDisplay from '@/components/ui/addTradeDisplay'

export default {
  name: 'MainContainer',
  components: {
    TradeViewHeading,
    TradeView,
    addTradeDisplay
  },
  data () {
    return {
      tradeItem: null
    }
  },
  methods: {
  },
  computed: {
    getGlobalLoadingValue () {
      return this.$store.getters.getGlobalLoad
    }
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
