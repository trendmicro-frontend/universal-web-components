<template>
    <div class="ms-container uwc">
      <div class="ms-selectable">
        <p>{{left_title}}</p>
        <ul class="ms-list">
          <template v-for="(item_,index) in left">
            <template v-if="has_children(item_)">
              <li @click="parent_toggle(item_,index)" :class="disable_li" class="parent"><span class="tmicon" :class="parent_class(item_)"></span> {{item_.name}}</li>
              <template v-for="child in item_.children">
                <li v-show="show_child(item_)" :class="disable_li" class="child" @click="left_click(child)">
                  <span>{{child.name}}</span>
                </li>                                
              </template>
            </template>
            <template v-else>
              <li :class="disable_li" @click="left_click(item_)">    
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
            <li :class="disable_li" @click="right_click(item_)">
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
                type:Array,
                default:[]
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
            disabled:{
                type:Boolean,
                default:false
            }
        },
        data:function(){
            return {
                left:this.left_list.sort(this.compare),
                right:this.right_list.sort(this.compare),
            }
        },        
        computed:{
            disable_li(){
                return{
                    "disabledLi":this.disabled
                };
            }
        },
        methods: {
            left_click(object){
                if(this.disabled){
                    return ;
                }
                if(this.arr_find(this.right,object)){
                    this.$emit('item-exist',object);
                    return false;
                }
                //keep the item in left list
                /*this.left = this.left.filter(function(item){
                    return !(item.value == object.value);
                });*/
                this.right = this.right.concat(object).sort(this.compare);
                this.$emit('change-selected',this.right);
            },
            right_click(object){
                var _vue = this;
                if(this.disabled){
                    return;
                }
                this.right = this.right.filter(function(item){
                    return !(item.value == object.value);
                });
                //remove the item in right directly and don't add it back to left list.
                /*
                if(this.arr_find(this.left,object) === false){
                    this.left = this.left.concat(object).sort(this.compare);
                }*/
                this.$emit('change-selected',this.right);
            },
            compare(a,b){
                if(a.name > b.name){
                    return 1;
                }else if(a.name == b.name){
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
                var tmp = this.left[index];
                tmp.expand = !tmp.expand;
                Vue.set(this.left,index,tmp);       
            },
            show_child(object){
                return object.expand;
            }
            
        },
        watch:{
            left_list:{
                handler(){
                    this.left = _.map(this.left_list, _.clone); 
                    this.left = this.left.sort(this.compare)
                    console.log(this.left);
                },
                deep:true
            }
        }
    }
</script>