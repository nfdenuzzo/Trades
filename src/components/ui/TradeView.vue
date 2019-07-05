<template>
  <div class="dayView">
    <el-row>
      <el-col :span="18">
        <div class="grid-content-left autoGrow">
          <newTradeDisplay v-if="$store.getters.getAddNewTrade"></newTradeDisplay>
          <div v-if="!$store.getters.getGlobalLoad">
            <TradeDisplay :model="item" :index="index" :key="index" v-for="(item, index) in getTrades"/>
          </div>
          <!-- displays this if no data -->
          <noDataDisplay v-if="getTradesLength === 0"/>
          <!-- end -->
          <!-- pagination to page through the pages -->
          <el-pagination
            style="margin-bottom: 10px;"
            @current-change="setTradesCurrentPage"
            @prev-click="setTradesPrePage"
            @next-click="setTradesNextPage"
            @size-change="setPageSize"
            :current-page='getTradesPaging.currentPage'
            :page-size="getTradesPaging.pageSize"
            :page-sizes="[5, 10, 20, 50]"
            :page-count="getTradesPaging.totalPages"
            background
            layout="prev, pager, next, sizes"
            :total="getTradesPaging.totalItems">
          </el-pagination>
          <!-- end -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import TradeDisplay from '@/components/ui/TradeDisplay'
import noDataDisplay from '@/components/ui/noDataDisplay'
import newTradeDisplay from '@/components/ui/newTradeDisplay'

export default {
  name: 'TradeView',
  components: {
    TradeDisplay,
    noDataDisplay,
    newTradeDisplay
  },
  data () {
    return {
      loading: false,
      results: [],
      StartingIndex: 1,
      loadingTradeGroups: false
    }
  },
  watch: {
    'getTradesPaging.currentPage' () {
      if (this.$store.getters.getTrades.length > 0) {
        this.loadTradeData()
      }
    },
    showDeleted() {
      this.loadTradeData()
    }
  },
  mounted () {
    this.GetTradeGroupsDisplay()
  },
  methods: {
    GetTradeGroupsDisplay() {
      this.loadingTradeGroups = true
      this.$store.dispatch({
        type: 'GetTradeGroupsDisplayData'
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.loadingTradeGroups = false
      })
    },
    // part of pagination
    setTradesCurrentPage (index) {
      this.$store.commit({
        type: 'setTradesPagingCurrentPage',
        data: index
      })
    },
    // part of pagination
    setTradesPrePage (index) {
      this.$store.commit({
        type: 'setTradesPagingCurrentPage',
        data: index
      })
    },
    // part of pagination
    setTradesNextPage (index) {
      this.$store.commit({
        type: 'setTradesPagingCurrentPage',
        data: index
      })
    },
    loadTradeData () {
      this.setGlobalLoading(true)
      this.$store.dispatch({
        type: 'TradeDataRequest'
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
    },
    // part of pagination
    setPageSize (total) {
      this.$store.commit({
        type: 'setTradesPagingSize',
        data: total
      })
    },
    // part of pagination
    pageCount () {
      return Math.floor(this.$store.getters.getTotalCount / this.$store.getters.getPageSize)
    }
  },
  computed: {
    getTrades () {
      return this.$store.getters.getTrades
    },
    // part of pagination
    getTradesPaging () {
      return this.$store.getters.getTradesPaging
    },
    // part of pagination
    getTradesLength () {
      return this.$store.getters.getTrades.length
    },
    // part of pagination
    currentPage () {
      return this.$store.getters.getCurrentPage
    },
    // part of pagination
    pageSize () {
      return this.$store.getters.getPageSize
    },
    showDeleted () {
      return this.$store.getters.getShowDeleted
    }
  }
}
</script>

<style scoped>

  .dayView {
    position: relative;
    margin: 0px 0px;
  }

  .grid-content-left {
    min-height: 36px;
  }

  .grid-content-right {
    min-height: 36px;
  }

  .autoGrow{
    min-height: 500px;
    height: auto;
  }

  .grid-padding {
    padding: 5px;
  }

  .grid-content-sub-heading {
    min-height: 25px;
    line-height: 25px;
    font-size: 1vw;
    color: #fff;
    background: transparent;
  }

  .grid-content-sub-heading-bg {
    background: #5D6D7E  ;
  }

</style>
