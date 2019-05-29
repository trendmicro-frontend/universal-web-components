<template>
    <div class="ms-container uwc">
      <div class="ms-selectable">
        <p>{{left_title}}</p>
        <ul class="ms-list" :class="{'input-left':is_input_left}">
          <template v-if="is_input_left">
            <input type="text" v-model="input" :placeholder="placeholder" @keyup.enter="left_enter" class="form-control input-width-md" />
          </template>
          <template v-else v-for="(item_,index) in left">
            <template v-if="has_children(item_)">
              <li :title="item_.name" @click="parent_toggle(item_,index)" :class="disable_li" class="parent"><span class="tmicon" :class="parent_class(item_)"></span> {{item_.name}}</li>
              <template v-for="child in item_.children">
                <li :title="child.name" v-show="show_child(item_)" :class="disable_li" class="child" @click="left_click(child)">
                  <span>{{child.name}}</span>
                </li>                                
              </template>
            </template>
            <template v-else>
              <li :title="item_.name" :class="disable_li" @click="left_click(item_)">    
                <span>{{item_.name}}</span>
              </li>
            </template>
          </template>
        </ul>
      </div>
      <div class="exchange">&nbsp;</div>
      <div class="ms-selection">
        <p>{{right_title}}</p>
        <ul class="ms-list">
          <template v-for="item_ in right">
            <li :title="item_.name" :class="disable_li" @click="right_click(item_)">
              <span>{{item_.name}}</span>
            </li>
          </template>
        </ul>
      </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import Vue from 'vue';
    export default {
        name: 'TmVueGroupSelect',
        props:{         
            left_list:{
                type:Object,
                default:{}
            },
            left_title:{
                type:String,
                default:"" 
            },
            right_list:{
                type:Array,
                default:[]
            },
            right_title:{
                type:String,
                default:"" 
            },
            left_type:{
              type:String,
              default:"select_left"
            },
            placeholder:{
              type:String,
              default:""
            },
            validator:{
              type:Function,
              default:function(){}
            },
            pre_duplicate_check_list:{
              type:Array,
              default:function(){return []}
            },
            disabled:{
                type:Boolean,
                default:false
            }
        },
        data:function(){
            return {
                left:_.sortBy(this.left_list,function(item){return item.name}),
                right:this.right_list.sort(this.compare),
                input:""
            }
        },        
        computed:{
            disable_li(){
                return{
                    "disabledLi":this.disabled
                };
            },
            is_input_left(){
              return this.left_type=='input_left'?true:false;
            }
        },
        methods: {
            left_click(object){
                if(this.disabled){
                    return ;
                }
                if(this.validator && this.validator(object) ==false){
                  this.$emit('item-invalid',object);
                      return false;
                }
                if(this.pre_duplicate_check_list){
                  if(this.arr_find(this.pre_duplicate_check_list,object)){
                      this.$emit('item-exist',object);
                      return false;
                  }
                }
                if(this.arr_find(this.right,object)){
                    this.$emit('item-exist',object);
                    return false;
                }
                this.right = this.right.concat(object).sort(this.compare);
                this.$emit('change-selected',this.right);
            },
            left_enter(){
              var object = {name:this.input.trim(),value:this.input.trim()};
              this.left_click(object);
            },
            right_click(object){
                var _vue = this;
                if(this.disabled){
                    return;
                }
                this.right = this.right.filter(function(item){
                    return !(item.value == object.value);
                });
                this.$emit('change-selected',this.right);
            },
            compare(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }else if(a.name.toLowerCase() == b.name.toLowerCase()){
                    return 0;
                }else{
                    return -1;
                }               
            },
            arr_find(arr,need){
                var tmp = _.findIndex(arr,function(item){
                    return item.value == need.value;
                })
                return tmp !== -1;
            },
            has_children(object){
                return typeof(object.children) !== 'undefined';
            },
            parent_class(object){
                if(object.expand){
                    return "tmicon-minus-square-o";
                }else{
                    return "tmicon-add-square-o";
                }
            },
            parent_toggle(object,index){
                this.left[index].expand =  !this.left[index].expand;   
            },
            show_child(object){
                return object.expand;
            }
            
        },
        watch:{
            left_list:{
                handler(){
                    this.left = _.sortBy(this.left_list,function(item){return item.name.toLowerCase()}); 
                },
                deep:true
            },
            right_list:{
                handler(){
                    var tmp = _.map(this.right_list, _.clone);
                    this.right = tmp.sort(this.compare); 
                },
                deep:true
            }
        }
    }
</script>