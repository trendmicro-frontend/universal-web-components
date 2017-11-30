<template>
    <div class="checkbox" :class="{'disabled':isDisabled}">
      <input type="checkbox" @change="handleChange" v-model="checked" class="input-checkbox" :disabled="isDisabled" :class="{'checked':checked,'disabled':disabledClass,'checkbox-partical':this.indeterminate}">
      <label @click="labelClick"><slot></slot></label>
    </div>
</template>

<script>
    export default {
        name: 'TmVueCheckallCheckbox',
        props:{
            checked:{
                type:Boolean,
                default:false
            },
            disabled:{
                type:Boolean,
                default:false
            },
            indeterminate:{
                type:Boolean,
                default:false
            }
        },
        computed:{
            isDisabled:function(){
                return this.disabled===true?true:false;//default disabled attribute is false.
            },
            disabledClass:function(){
                return this.isDisabled && !this.checked;//only add disabled class for the unchecked radio to stop hover color change.
            }
        },
        methods: {
            handleChange() {
                this.$nextTick(function(){
                    this.$emit('change', this.checked);
                });
            },
            labelClick:function(){
                if(this.isDisabled)return;
                this.checked = !this.checked;
                this.handleChange();
            }
        }
    }
</script>