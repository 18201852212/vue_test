<template>
    <div>{{$route.params.id}}{{$route.params.num}}</div>
</template>
<script>
export default {
    data(){
        return {}
    },
    beforeRouteEnter (to, from, next) {
        to.params.num="333"
        console.log('ok')
        next()
    }
}
</script>