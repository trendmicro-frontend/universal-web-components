<template>
    <div class="checkbox" :class="{'disabled':isDisabled}">
      <input type="checkbox" :value="value" @change="handleChange" v-model="checked" class="input-checkbox" :disabled="isDisabled" :class="{'checked':isChecked,'disabled':disabledClass}">
      <label @click="lableClick"><slot></slot></label>
    </div>
</template>

<script>
    export default {
        name: 'TmVueCheckbox',
        model:{
            prop:"checked",
            event:"change"
        },
        props:{
            checked:{
                type:Number,
                default:0
            },
            value:{
                type:String,
                default:""
            },
            disabled:{
                type:Boolean,
                default:false
            }
        },
        computed:{
            isDisabled:function(){
                return this.disabled===true?true:false;//default disabled attribute is false.
            },
            disabledClass:function(){
                return this.isDisabled && (this.checked.indexOf(this.value) == -1);//only add disabled class for the unchecked radio to stop hover color change.
            },
            isChecked:function(){
                return this.checked.indexOf(this.value) != -1;
            }
        },
        methods: {
            handleChange() {
                this.$nextTick(function(){
                    this.$emit('change', this.checked);
                });
            },
            lableClick:function(){
                if(this.isDisabled)return;
                var index = this.checked.indexOf(this.value);
                if(index == -1){
                    this.checked.push(this.value);
                }else{
                    this.checked.splice(index, 1);
                }
                this.handleChange();
                
            }
        }
    }
</script>