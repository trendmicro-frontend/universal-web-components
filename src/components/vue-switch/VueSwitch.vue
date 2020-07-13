<template>
    <div class="vue-switch">
      <span :class="{'large':this.size=='large'}"><slot></slot></span>
      <div class="vue-toggle" :class="toggle_class" @click="toggle"></div>
    </div>    
</template>
<script>
    export default {
        name: 'TmVueSwitch',
        props:{
            /**
              * Default status of the switch
            */          
            value:{
                type:Boolean,
                value:false
            },
            /**
              * Size of the switch, large,medium,or small
            */            
            size:{
              type:String,
              value:"medium"
            },
            /**
              * Disabled the switch
            */            
            disabled:{
                type:Boolean,
                value:false
            },
            /**
              * Triggered event before chage the switch
            */            
            beforeChange:{
              type:Function,
              value:null
            }
        },
        data(){
          return {
            current_value:this.value
          }
        },
        computed:{
          toggle_class(){
            return {
              "checked":this.current_value,
              "large":this.size == 'large',
              "small":this.size == 'small',
              "disabled":this.disabled
            }
          }
        },
        methods:{
          toggle(){
            if(this.disabled)return;
            if(!this.beforeChange || this.beforeChange() === true){
              this.current_value = !this.current_value;
              /**
                 * Defaut triggered event for v-model
                 * @type {Event}
              */            
              this.$emit('input', this.current_value);
              this.$emit('change', this.current_value);             
            }
          }
        },
        watch:{
          value:function(){
            this.current_value = this.value;
          }
        }        
    }
</script>