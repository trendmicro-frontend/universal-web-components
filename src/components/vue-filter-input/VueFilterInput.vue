<template>
<div class="vue-filter-input" @click="show_search_input">
  <input v-show="show_input || searching" :style="{width:final_width}" :placeholder="placeholder" @focus="keywordFocus"  type="text" class="form-control search"  :disabled="searching" v-focus="focus" @blur="keywordFocusOut" v-model="keyword">
  <input class="form-control search" v-show="show_selected" :value="selected_item.name" :style="{width:final_width}" />
  <label v-show="show_input || searching" class="input-icon-label">
  <i v-show="show_input || searching" class="fa fa-search" :class="{focus:focus}"></i>
  </label>
  <label v-show="show_selected" class="input-icon-label">
  <i v-show="show_selected" class="fa fa-search" :class="{focus:focus}"></i>
  </label>
  <span v-show="searching" class="loader loader-small"></span>
  <span v-show="typing" class="fa fa-pencil typing"></span>
  <div v-on-clickaway="hideSearchResult" v-show = "show_search_result" class="search_result" :style="{width:final_width,'max-height':(search_height || 150) +'px'}">
    <ul v-if="search_result.length > 0">
      <li v-for="(item,index) in search_result" :title="item.name" @click.stop="selectItem(item)">{{item.name || ''}}</li>
    </ul>
    <ul v-else class="no_result">
      <li>No search results found</li>
    </ul>
  </div>
</div>
</template>

<script>
    import _ from 'lodash';
    import { directive as onClickaway } from 'vue-clickaway';
    export default {
        name: 'TmVueFilterInput',                 
        props:{
            value:{
                type:String,
                default:""
            },          
            width:{
              type:[Number,String],
              default:256
            },
            search_callback:{
              type:Function,
              default:function(){
              }
            },
            search_result:{
              type:Array,
              default:function(){
                return []
              }
            },
            placeholder:{
              type:String,
              default:''
            },
            search_height:{
              type:[String,Number],
              default:150
            }
        },
        data:function(){
        	return {
            	searching:false,
              typing:false,
              focus:false,
              show_search_result:false,
              selected_item:{},
              keyword:"",
              show_input:true
        	}
        },
        computed:{
          final_width(){
            return this.width?this.width+'px':'256px';
          },
          show_selected(){
            return !this.show_input && !this.searching;
          }
        },
        methods:{
          changeKeyword:_.debounce(function(){
              this.typing = false;
              this.doSearch();
          },700),
          show_search_input(){
            this.show_input = true;
            this.$nextTick(()=>{
              this.focus = true;
            })
          },
          doSearch(){
            this.searching = true;
            this.search_callback(this.keyword.trim());
          },
          selectItem(item){
            this.selected_item = item;
            this.show_search_result = false;
            this.show_input = false;
            this.keyword = "";
            this.$emit('input', item);
          },
          hideSearchResult(){
            this.show_search_result = false;
          },
          keywordFocus(){
            //this.handleKeyword();
          },
          keywordFocusOut(){
            this.focus = false;
            this.show_input = false;
          },
          handleKeyword(){
            if(this.keyword.trim().length > 0){
              this.typing = true;
              this.searching = false;
              this.changeKeyword();                 
            }          
          }
        },
        directives: {
          onClickaway: onClickaway,
    			focus: {
    				componentUpdated(el, value) {
    					if ( value.value) {
    						el.focus();
    					}
            }
    			}
  		  },
        updated:function(){
        },
        watch:{
          keyword(){
            this.handleKeyword();
          },
          search_result(){
            this.searching = false;
            this.focus = true;
            this.show_input = true;
            this.show_search_result = true;
          },
          value:{
            handler() {
              if(Object.keys(this.value).length == 0){//reset the keywrod to default
                this.keyword = "";
                this.show_input = true;
                this. selected_item = {};
              }
            },
            deep: true
          }
        }
    }                
</script>

