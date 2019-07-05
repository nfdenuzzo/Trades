<template>
  <div class="dayView">
    <el-row>
      <el-col :span="18">
        <div class="grid-content-left autoGrow">
          <newTradeGroupDisplay v-if="$store.getters.getAddNewTradeGroup"></newTradeGroupDisplay>
          <div :loading="$store.getters.getGlobalLoad">
            <TradeGroupDisplay :model="item" :index="index" :key="index" v-for="(item, index) in getTradeGroups"/>
          </div>
          <!-- displays this if no data -->
          <noDataDisplay v-if="getTradeGroupLength === 0"/>
          <!-- end -->
          <!-- pagination to page through the pages -->
          <el-pagination
            v-if="!$store.getters.getGlobalLoad"
            style="margin-bottom: 10px;"
            @current-change="setTradeGroupCurrentPage"
            @prev-click="setTradeGroupPrePage"
            @next-click="setTradeGroupNextPage"
            @size-change="setPageSizeTradeGroup"
            :current-page='getTradeGroupPaging.currentPage'
            :page-size="getTradeGroupPaging.pageSize"
            :page-sizes="[5, 10, 20, 50]"
            :page-count="getTradeGroupPaging.totalPages"
            background
            layout="prev, pager, next, sizes"
            :total="getTradeGroupPaging.totalItems">
          </el-pagination>
          <!-- end -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import TradeGroupDisplay from '@/components/ui/TradeGroup/TradeGroupDisplay'
import noDataDisplay from '@/components/ui/TradeGroup/noDataDisplay'
import newTradeGroupDisplay from '@/components/ui/TradeGroup/newTradeGroupDisplay'

export default {
  name: 'TradeGroupView',
  components: {
    TradeGroupDisplay,
    noDataDisplay,
    newTradeGroupDisplay
  },
  data () {
    return {
      loading: false,
      results: [],
      StartingIndex: 1
    }
  },
  watch: {
    'getTradeGroupPaging.currentPage' () {
      if (this.$store.getters.getTradeGroup.length > 0) {
        this.loadTradeGroupData()
      }
    },
    showDeleted() {
      this.loadTradeGroupData()
    }
  },
  mounted () {
    this.$store.commit('resetPager')
  },
  methods: {
    // part of pagination
    setTradeGroupCurrentPage (index) {
      this.$store.commit({
        type: 'setTradeGroupPagingCurrentPage',
        data: index
      })
    },
    // part of pagination
    setTradeGroupPrePage (index) {
      this.$store.commit({
        type: 'setTradeGroupPagingCurrentPage',
        data: index
      })
    },
    // part of pagination
    setTradeGroupNextPage (index) {
      this.$store.commit({
        type: 'setTradeGroupPagingCurrentPage',
        data: index
      })
    },
    loadTradeGroupData () {
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
    },
    // part of pagination
    setPageSizeTradeGroup (total) {
      this.$store.commit({
        type: 'setTradeGroupPagingSize',
        data: total
      })
    },
    // part of pagination
    pageCount () {
      return Math.floor(this.$store.getters.getTotalCountTradeGroup / this.$store.getters.pageSizeTradeGroup)
    }
  },
  computed: {
    getTradeGroups () {
      return this.$store.getters.getTradeGroup
    },
    // part of pagination
    getTradeGroupPaging () {
      return this.$store.getters.getTradeGroupPaging
    },
    // part of pagination
    getTradeGroupLength () {
      return this.$store.getters.getTradeGroup.length
    },
    // part of pagination
    currentPageTradeGroup () {
      return this.$store.getters.getCurrentPageTradeGroup
    },
    // part of pagination
    pageSizeTradeGroup () {
      return this.$store.getters.getPageSizeTradeGroup
    },
    showDeleted () {
      return this.$store.getters.getShowDeletedTradeGroup
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
