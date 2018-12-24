<template>
    <div class="radio" :class="{'disabled':isDisabled}">
      <input type="radio" :value="value" :id="id" @change="handleChange" v-model="checked" class="input-radio" :disabled="isDisabled" :class="{'disabled':disabledClass}">
      <label @click="labelClick"><slot></slot></label>
    </div>
</template>

<script>
    export default {
        name: 'TmVueRadio',
        model:{
            prop:"checked",
            event:"change"
        },
        props:{
            checked:{
                type:Number,
                default:""
            },
            value:{
                type:[String,Number],
                value:""
            },
            disabled:{
                type:Boolean,
                default:false
            },
            id:{
                type:String,
                default:""
            }
        },
        computed:{
            isDisabled:function(){
                return this.disabled===true?true:false;//default disabled attribute is false
            },
            disabledClass:function(){
                return this.isDisabled && (this.checked != this.value);//only add disabled class for the unchecked radio to stop hover color change.
            }
        },
        methods:{
            handleChange:function() {
                this.$nextTick(function(){
                    this.$emit('change', this.checked);
                });
            },
            labelClick:function(){
                if(this.isDisabled)return;
                this.checked = this.value;
                this.handleChange();
            }
        }
    }
</script>