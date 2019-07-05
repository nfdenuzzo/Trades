<template>
  <div class="displayShift">
    <el-row>
      <el-col :span="24">
          <div class="grid-content">
            <el-row :gutter="2">
            <!--Shift Code heading -->
            <el-col :span="8">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div v-if="(!Edit)">{{model.code}}</div>
                <el-input size="mini" style="width: 90%;" placeholder="Please input" v-model="model.code" v-if="(Edit)"></el-input>
              </div>
            </el-col>
            <!-- description heading -->
            <el-col :span="8">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center" @dblclick="MakeRowEditable()" style="overflow-x: scroll;">
                <div v-if="(!Edit)" style="width 90%; padding: 0 10px 0 10px;">{{model.description}}</div>
                <el-input size="mini" style="width: 90%;" placeholder="Please input" v-model="model.description" v-if="(Edit)"></el-input>
              </div>
            </el-col>
              <!-- operations buttons-->
              <el-col :span="8" style="overflow-x: scroll; background: #34495E;">
                <div class="grid-content-buttons grid-content-bg" style="width 90%;" >
                  <!-- cancel edit -->
                  <el-tooltip :enterable="false" v-if="((!Edit) && (model.deleted === false))" placement="top" content="Edit Trade" >
                    <el-button v-if="((!Edit) && (model.deleted === false))" size="mini" type="warning" icon="el-icon-edit" circle @click="MakeRowEditable()"></el-button>
                  </el-tooltip>
                  <!-- make row editable -->
                  <el-tooltip :enterable="false" v-if="((Edit) && (model.deleted === false))" placement="top" content="Cancel Edit" >
                    <el-button v-if="((Edit) && (model.deleted === false))" size="mini" type="danger" icon="far fa-window-close" circle @click="CancelRowEditable()"></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" effect="dark" v-if="(Edit)" placement="top" content="Save Changes" >
                    <el-button v-if="(Edit)" size="mini" type="success" icon="fas fa-save" circle @click="UpdateTradeGroup(tradesGroup)"></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" effect="dark" placement="top" content="Delete Trade" v-if="(model.deleted === false)">
                    <el-button v-if="(model.deleted === false)" size="mini" type="danger" icon="el-icon-delete" circle @click="removeTradeGroup(tradesGroup, index)" ></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" effect="dark" placement="top" content="Reactivate Trade" v-if="model.deleted === true">
                    <el-button v-if="model.deleted === true" size="mini" type="success" icon="fas fa-trash-restore" circle @click="reactivateTradeGroup(tradesGroup, index)" ></el-button>
                  </el-tooltip>
                </div>
              </el-col>
            </el-row>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'displayTradeGroup',
  props: ['model', 'index', 'NewTrade'],
  components: {
  },
  data () {
    return {
      loadingTradeGroups: false,
      TradeGroupsLoading: false,
      clearCopy: false,
      Edit: false,
      tradesGroup: {
        code: null,
        description: null,
        tradeGroupId: this.model.tradeGroupId
      }
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    CancelRowEditable () {
      this.Edit = false
    },
    MakeRowEditable () {
      this.Edit = true
    },
    UpdateTradeGroup (item) {
      this.CreateTradeGroup(item)
    },
    CreateTradeGroup (item) {
      this.tradesGroup.code = this.model.code
      this.tradesGroup.description = this.model.description
      if ((this.tradesGroup.code !== null) && (this.tradesGroup.code !== undefined) && (this.tradesGroup.description !== null) && (this.tradesGroup.description !== undefined) && (/\S/.test(this.tradesGroup.description)) && (/\S/.test(this.tradesGroup.code))) {
        this.setGlobalLoading(true)
        this.$store.dispatch({
          type: 'addorUpdateTradeGroupDataAndReload',
          data: item
        }).then(() => {
          this.showSuccessNotification('Trade Group was successfully Added.')
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          this.Edit = false
          this.setGlobalLoading(false)
        })
      } else {
        this.showWarningNotification('Missing Information, Please ensure u provide a Code and Description')
        this.tradesGroup.code = null
        this.tradesGroup.description = null
      }
    },
    showWarningNotification (message) {
      this.$message({
        message: message,
        type: 'warning'
      })
    },
    removeTradeGroup (item, index) {
      this.$confirm('Do you want to disable this?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'error'
      }).then(() => {
        this.setGlobalLoading(true)
        this.$store.dispatch({
          type: 'DisableOrEnableTradeGroupDataAndReload',
          Id: item.tradeGroupId
        }).then(() => {
          this.showSuccessNotification('Trade was successfully disabled.')
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          this.setGlobalLoading(false)
        })
      })
    },
    reactivateTradeGroup (item, index) {
      this.$confirm('Do you want to reactivate this?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'error'
      }).then(() => {
        this.setGlobalLoading(true)
        this.$store.dispatch({
          type: 'DisableOrEnableTradeGroupDataAndReload',
          Id: item.tradeGroupId
        }).then(() => {
          this.showSuccessNotification('Trade Group was successfully reactivated.')
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          this.setGlobalLoading(false)
        })
      }).catch(() => {
        this.setGlobalLoading(false)
      })
    },
    setGlobalLoading (loading) {
      this.$store.commit({
        type: 'setGlobalLoad',
        load: loading
      })
    },
    showSuccessNotification (message) {
      this.$message({
        message: message,
        type: 'success'
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

  .displayJob {
    margin-top: 3px;
  }

  .grid-content {
    min-height: 60px;
    font-size: 1vw;
    color: #fff;
    line-height: 60px;
    margin-bottom: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .grid-content-buttons {
    min-height: 59px;
    font-size: 1vw;
    color: #fff;
    max-height: 60px;
  }

  .grid-content-bg {
    background: #34495E;
  }

  .radioButton {
    color: #fff !important;
    margin: 10px 10px;
  }

  .grid-content-indicator{
    min-height: 10px;
  }

  .grid-content-sub-heading-bg-center {
    background: #34495E;
    text-align: center;
    vertical-align: middle;
    line-height: 60px;
  }

  .grid-content-indicator-unsaved {
    background: #F56C6C !important;
  }

.grid-content-top-heading {
  min-height: 40px;
  color: #323232;
  text-align: left;
  margin-left: 5px;
  font-weight: bold;
}

.headingLabel-top-heading  {
  line-height: 40px;
  font-size: 1.5vw;
}

.grid-content-top-heading-sub {
  min-height: 35px;
  color: #fff;
  font-weight: bold;
  background: #34495E;
  margin-bottom: 7px;
}

.grid-content-top-heading-sub-clear {
  min-height: 35px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 7px;
}

.headingLabel-top-heading-sub  {
  line-height: 35px;
  font-size: 0.9vw;
}

</style>
