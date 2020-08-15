<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
    @import url(../src/style/less/variable.less);

    html,
    body,
    #app {
        width: 100%;
        height: 100%;
        min-width: 1440px;
        min-height: 900px;
    }

    /* #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    } */
    * {
        box-sizing: border-box;
    }

    .cursor-hand {
        cursor: pointer;
    }
</style>