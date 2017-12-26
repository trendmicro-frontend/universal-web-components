<template>
    <div class="btn-group">
      <button type="button" :title="selectedText" class="form-control btn btn-border dropdown-toggle" data-toggle="dropdown" aria-expanded="false" :disabled="isDisabled" :class="widthClass">
        <span class="caret"></span>{{selectedText}}</button>
        <ul class="dropdown-menu">
          <template v-for="item in param.droplist">
            <li  @click="handleChange(item.value)"><a href="javascript:void(0)">{{item.display}}</a></li>
          </template>                               
        </ul>
    </div>
</template>
<script>
    import '../jquery-global';
    import 'bootstrap';
    export default {
        name: 'TmVueDropdown',
        props:{
            value:{
                type:[String,Number],
                default:0
            },          
            param:{
                type:Object,
                default:function(){
                    return {
                        droplist:[],//list of for dropdown [{value:"xx","display":"xx"}],
                        disabled:Boolean,
                        width:"default"//["mini","sm","default","md","lg","auto"]
                    }   
                }
            }
        },
        computed:{
            isDisabled:function(){
                return this.param.disabled===true?true:false;//default disabled attribute is false
            },
            selectedText:function(){
                var index = 0;
                for(var i=0;i<this.param.droplist.length;i++){
                    if(this.param.droplist[i].value == this.value){
                        index = i;
                    }
                }
                return this.param.droplist[index].display;
            },
            widthClass:function(){
                var class_list = {"mini":"input-width-mini","sm":"input-width-sm","default":"input-width-default","md":"input-width-md","lg":"input-width-lg","auto":""};
                return class_list[this.param.width?this.param.width:'default'];
            }
        },
        methods: {
            handleChange(value) {
                this.value = value;
                this.$nextTick(function(){
                    this.$emit('input', this.value);
                });
            }
        }
    }
</script>