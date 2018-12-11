<template>
    <div class="alert fade in" :class="class_type" role="alert">
              <a href="#" class="cancel" ><span @click.prevent="hide_alert" class="icon icon-cancel"></span></a>
              <span class="icon" :class="icon_type"></span>
              <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'TmVueNotification',
        props:{
            type:{
                type:String,
                default:"error",
            },
        },
        data(){
            return{
                show_alert:false
            }
        },
        computed:{
        	class_type(){
        		if(this.type == 'error'){
                    return "alert-danger";
                }else if(this.type == "warning"){
                    return "alert-warning";
                }else{
                    return "alert-info";
                }
        	},
            icon_type(){
                if(this.type == 'error'){
                    return "icon-danger";
                }else if(this.type == "warning"){
                    return "icon-warn";
                }else{
                    return "icon-info";
                }
            },
        },
        methods:{
            hide_alert(){
                this.$emit("hide-notification");
            }
        }
    }
</script>