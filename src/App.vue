<template>
  <div id="app" v-loading="isLoading">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: () => ({
  }),
  methods: {
    setGlobalLoading (loading) {
      this.$store.commit({
        type: 'setGlobalLoad',
        load: loading
      })
    },
    loadInitialData () {
      this.setGlobalLoading(true)
      this.$store.dispatch({
        type: 'TradeDataRequest'
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.setGlobalLoading(false)
      })
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.getGlobalLoad
    }
  },
  created () {
    this.loadInitialData()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-switch__label{
  color: #fff !important;
}

.el-checkbox{
  color: #fff !important;
}

/* width */
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #E67E22
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #fff
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #fff
}
</style>
