<template>
  <div class="addTradeDisplay">
    <el-row>
      <el-col :span="5">
          <div class="grid-content grid-content-bg">
            Create New Trade
            <el-button :disabled="$store.getters.getAddNewTrade" @click="addButtonOnClick" :loading="addLoading" style="margin-left: 15px;" size="medium" type="success" icon="el-icon-circle-plus" circle></el-button>
          </div>
      </el-col>
      <el-col :span="5">
          <div class="grid-content grid-content-bg">
            Create Trade Group
            <el-button @click="OpenTradeGroupDialog" style="margin-left: 15px;" size="medium" type="success" icon="far fa-file-excel" circle></el-button>
          </div>
      </el-col>
      <el-col :span="5" v-if="$store.getters.getTotalCount > 0">
          <div class="grid-content grid-content-bg">
            Export to Excel
            <el-button @click="ExportToExcel" style="margin-left: 15px;" size="medium" type="success" icon="far fa-file-excel" :loading="ExportLoading" circle></el-button>
          </div>
      </el-col>
      <el-col :span="5">
          <div class="grid-content grid-content-bg">
            <el-checkbox v-model="showDeleted">Show Deleted</el-checkbox>
          </div>
      </el-col>
      <el-col :span="4">
          <div class="grid-content grid-content-bg">
            <el-input style="width: 90%;" placeholder="Filter Input" v-model="filter" :onkeydown="filterArrays()"></el-input>
          </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogTradeGroups" fullscreen :show-close="false">
    <!-- heading -->
      <mainContainerTradeGroups v-if="dialogTradeGroups"></mainContainerTradeGroups>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="CloseTradeGroupDialog()">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FileSaver from 'file-saver/dist/FileSaver.js'
import mainContainerTradeGroups from '../ui/TradeGroup/mainContainerTradeGroup.vue'
export default {
  name: 'addTradeDisplay',
  components: {
    mainContainerTradeGroups
  },
  data () {
    return {
      dialogTradeGroups: false,
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
    this.showDeleted = this.$store.getters.getShowDeleted
  },
  watch: {
    showDeleted () {
      this.$store.commit('setShowDeleted', this.showDeleted)
      this.$store.commit('setTradesPagingReset', 1)
    },
    // filtering
    filter () {
      if (((this.filter === null) || (this.filter === undefined) || !(/\S/.test(this.filter))) && (this.filter.length === 0)) {
        this.$store.commit('resetPager')
        this.loadTradeData()
      }
    }
  },
  methods: {
    OpenTradeGroupDialog () {
      this.dialogTradeGroups = true
    },
    CloseTradeGroupDialog () {
      this.setGlobalLoading(true)
      this.dialogTradeGroups = false
      this.loadTradeData()
    },
    ExportToExcel () {
      this.ExportLoading = true
      this.$httpClient.exportToExcel().then((resp) => {
        FileSaver.saveAs(resp.data, 'Trades.xlsx')
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.ExportLoading = false
      })
    },
    addButtonOnClick () {
      this.$store.commit('setAddNewTrade', true)
      this.$store.commit('setTradesPagingReset', 1)
    },
    // filtering
    filterArrays () {
      if ((this.filter !== null) && (this.filter !== undefined) && (/\S/.test(this.filter))) {
        this.$store.commit('setFilter', this.filter)
        this.$store.commit('setTradesPagingReset', 1)
        var vm = this
        setTimeout( function() { vm.loadTradeData() }, 400)
      }
    },
    // filtering
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
