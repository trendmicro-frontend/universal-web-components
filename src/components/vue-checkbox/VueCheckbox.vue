<template>
    <div class="checkbox" :class="{'disabled':isDisabled}">
      <input type="checkbox" :value="value" :id="id" @change="handleChange" v-model="checked" class="input-checkbox" :disabled="isDisabled" :class="{'checked':isChecked,'disabled':disabledClass}">
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
                type:[Boolean,Array],
                default:"",
            },
            value:{
                type:[String,Number],
                default:""
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
                return this.disabled===true?true:false;//default disabled attribute is false.
            },
            disabledClass:function(){
                return this.isDisabled && (this.isBoolean ? !this.checked : this.checked.indexOf(this.value) == -1);//only add disabled class for the unchecked radio to stop hover color change.
            },
            isChecked:function(){
                if(this.isBoolean){
                    return this.checked;
                }else{
                    return this.checked.indexOf(this.value) != -1;
                }
            },
            isBoolean(){
                return typeof this.checked === 'boolean';
            }
        },
        methods: {
            handleChange() {
                this.$nextTick(function(){
                    this.$emit('change', this.checked);
                });
            },
            lableClick(){
                if(this.isDisabled)return;
                if(this.isBoolean){
                    this.checked = !this.checked;
                }else{
                    var index = this.checked.indexOf(this.value);
                    if(index == -1){
                        this.checked.push(this.value);
                    }else{
                        this.checked.splice(index, 1);
                    }
                }
                this.handleChange();
                
            }
            
        }
    }
</script>