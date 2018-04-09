<template>
    <div class="btn-group" :style="widthStyle">
      <button type="button" :title="selectedText" class="form-control btn btn-border dropdown-toggle" data-toggle="dropdown" aria-expanded="false" :disabled="isDisabled" :class="widthClass" :style="widthStyle">
        <span class="caret"></span>{{selectedText}}</button>
        <ul class="dropdown-menu" :class="widthClass" :style="widthStyle">
          <template v-for="item in list">
            <li  @click="handleChange(item.value)"><a href="javascript:void(0)">{{item.display}}</a></li>
          </template>                               
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'TmVueDropdown',
        props:{
            value:{
                type:[String,Number],
                default:0
            },
            list:{
                type:Array,
                default:[]
            },
            disabled:{
                type:Boolean,
                default:false
            },
            width:{
                type:String,
                default:'default'
            }
        },
        data:function(){
            var class_list = {"mini":"input-width-mini","sm":"input-width-sm","default":"input-width-default","md":"input-width-md","lg":"input-width-lg"};
            return {
                widthStyle:{width:class_list[this.width]?"":this.width}
            }
        },
        computed:{
            isDisabled:function(){
                return this.disabled===true?true:false;//default disabled attribute is false
            },
            selectedText:function(){
                if(this.list.length ==0)
                    return '';
                var index = 0;
                for(var i=0;i<this.list.length;i++){
                    if(this.list[i].value == this.value){
                        index = i;
                    }
                }
                return this.list[index].display;
            },
            widthClass:function(){
                var class_list = {"mini":"input-width-mini","sm":"input-width-sm","default":"input-width-default","md":"input-width-md","lg":"input-width-lg"};

                return class_list[this.width] || "";
            },

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