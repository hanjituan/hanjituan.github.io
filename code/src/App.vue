<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    #app {
        width: 100%;
        height: 100%;
    }

    body,
    html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }
</style>