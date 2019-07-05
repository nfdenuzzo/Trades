<template>
  <div class="addTradeDisplay">
    <el-row>
      <el-col :span="6">
          <div class="grid-content grid-content-bg">
            Create New Trade Group
            <el-button :disabled="$store.getters.getAddNewTradeGroup" @click="addButtonOnClick" :loading="addLoading" style="margin-left: 15px;" size="medium" type="success" icon="el-icon-circle-plus" circle></el-button>
          </div>
      </el-col>
      <el-col :span="6" v-if="$store.getters.getTotalCountTradeGroup > 0">
          <div class="grid-content grid-content-bg">
            Export to Excel
            <el-button @click="ExportToExcel" style="margin-left: 15px;" size="medium" type="success" icon="far fa-file-excel" :loading="ExportLoading" circle></el-button>
          </div>
      </el-col>
      <el-col :span="6">
          <div class="grid-content grid-content-bg">
            <el-checkbox v-model="showDeleted">Show Deleted</el-checkbox>
          </div>
      </el-col>
      <el-col :span="6">
          <div class="grid-content grid-content-bg">
            <el-input style="width: 90%;" placeholder="Filter Input" v-model="filter" :onkeydown="filterArrays()"></el-input>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FileSaver from 'file-saver/dist/FileSaver.js'
export default {
  name: 'addTradeGroupDisplay',
  data () {
    return {
      showDeleted: false,
      addLoading: false,
      filter: null,
      TradeModel: {
        tradeGroupId: null,
        description: null
      },
      ExportLoading: false
    }
  },
  mounted () {
    this.showDeleted = this.$store.getters.getShowDeletedTradeGroup
  },
  watch: {
    showDeleted () {
      this.$store.commit('setShowDeletedTradeGroup', this.showDeleted)
      this.$store.commit('setTradeGroupPagingReset', 1)
    },
    // filtering
    filter () {
      if (((this.filter === null) || (this.filter === undefined) || !(/\S/.test(this.filter))) && (this.filter.length === 0)) {
        this.loadTradeGroupData()
      }
    }
  },
  methods: {
    ExportToExcel () {
      this.ExportLoading = true
      this.$httpClient.exportToExcelTradeGroup().then((resp) => {
        FileSaver.saveAs(resp.data, 'TradesGroups.xlsx')
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.ExportLoading = false
      })
    },
    addButtonOnClick () {
      this.$store.commit('setAddNewTradeGroup', true)
      this.$store.commit('setTradeGroupPagingReset', 1)
    },
    // filtering
    filterArrays () {
      if ((this.filter !== null) && (this.filter !== undefined) && (/\S/.test(this.filter))) {
        this.$store.commit('setFilterTradeGroup', this.filter)
        this.$store.commit('setTradeGroupPagingReset', 1)
        var vm = this
        setTimeout( function() { vm.loadTradeGroupData() }, 400)
      }
    },
    // filtering
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
    // filtering
    setGlobalLoading (loading) {
      this.$store.commit({
        type: 'setGlobalLoad',
        load: loading
      })
    }
  },
  computed: {
  }
}
</script>

<style scoped>

  .el-row {
    position: relative;
  }

  .addTradeDisplay {
    margin-top: 3px;
  }

  .grid-content {
    min-height: 60px;
    font-size: 1vw;
    color: #fff;
    line-height: 60px;
    margin-bottom: 1px;
  }

  .grid-content-bg {
    background: #34495E;
  }
</style>
