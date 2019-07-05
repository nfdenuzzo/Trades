<template>
  <div class="dayViewHeading">
    <el-row>
      <el-col :span="24">
        <div class="grid-content-sub-heading">
            <!--Code heading -->
            <el-col :span="6">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center">
                Code.
              </div>
            </el-col>
            <!-- Description heading -->
            <el-col :span="6">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center">
                Description.
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content-sub-heading grid-content-sub-heading-bg-center">
                Operations.
              </div>
            </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'tradeGroupHeading'
}
</script>

<style scoped>

  .dayViewHeading {
    position: relative;
    margin: 0px 0px;
  }

  .grid-content-left {
    min-height: 36px;
  }

  .grid-content-right {
    min-height: 36px;
  }

  .grid-content-left-bg {
    padding-top: 2px;
  }

  .autoGrow{
    min-height: 500px;
    height: auto;
  }

  .grid-padding {
    padding: 5px;
  }

  .grid-content-sub-heading {
    height: 50px;
    min-height: 25px;
    line-height: 25px;
    font-size: 1vw;
    color: #fff;
    background: transparent;
  }

  .grid-content-sub-heading-bg {
    background: #5D6D7E;
  }

  .grid-content-sub-heading-bg-center {
    background: #5D6D7E;
    text-align: center;
    vertical-align: middle;
    line-height: 50px;
  }

</style>
