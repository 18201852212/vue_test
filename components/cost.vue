<template>
    <div><span>{{$route.params.id}}</span><span>{{$route.params.num}}</span></div>
</template>
<script>
export default {
    data(){
        return {}
    },
    beforeRouteEnter (to, from, next) {
        to.params.num="111"
        console.log('ok')
        next()
    }
}
</script>