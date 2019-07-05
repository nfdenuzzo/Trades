<template>
  <div class="displayTrade">
    <el-row>
      <el-col :span="24">
          <div class="grid-content">
            <el-row :gutter="2">
            <!--trade name heading -->
            <el-col :span="8">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-input size="mini" style="width: 90%;" placeholder="Please input" v-model="tradesGroup.code"></el-input>
              </div>
            </el-col>
            <!-- description heading -->
            <el-col :span="8">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center"  style="overflow-x: scroll;">
                <el-input size="mini" style="width: 90%;" placeholder="Please input" v-model="tradesGroup.description"></el-input>
              </div>
            </el-col>
              <!-- operations buttons-->
              <el-col :span="8" style="overflow-x: scroll; background: #34495E;">
                <div class="grid-content-buttons grid-content-bg" style="width 90%;" >
                  <el-tooltip :enterable="false" effect="dark" placement="top" content="Create Trade">
                    <el-button size="mini" type="warning" icon="el-icon-circle-plus" circle @click="CreateTradeGroup()" ></el-button>
                  </el-tooltip>
                  <el-tooltip :enterable="false" effect="dark" placement="top" content="Delete Trade">
                    <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="removeTradeGroup()" ></el-button>
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
  props: ['model', 'index'],
  components: {
  },
  data () {
    return {
      tradesGroup: {
        code: null,
        description: null
      }
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    setGlobalLoading (loading) {
      this.$store.commit({
        type: 'setGlobalLoad',
        load: loading
      })
    },
    async CreateTradeGroup () {
      if ((this.tradesGroup.code !== null) && (this.tradesGroup.code !== undefined) && (this.tradesGroup.description !== null) && (this.tradesGroup.description !== undefined) && (/\S/.test(this.tradesGroup.description)) && (/\S/.test(this.tradesGroup.code))) {
        this.setGlobalLoading(true)
        this.$store.dispatch({
          type: 'addorUpdateTradeGroupDataAndReload',
          data: this.tradesGroup
        }).then(() => {
          this.showSuccessNotification('Trade Group was successfully Added.')
          this.$store.commit('setAddNewTradeGroup', false)
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          this.setGlobalLoading(false)
        })
      } else {
        this.showWarningNotification('Missing Information, Please ensure u provide a code and Description')
      }
    },
    showWarningNotification (message) {
      this.$message({
        message: message,
        type: 'warning'
      })
    },
    removeTradeGroup () {
      this.$store.commit('setAddNewTradeGroup', false)
      this.$store.commit('setTradeGroupPagingReset', 1)
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
