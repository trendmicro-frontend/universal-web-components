<template>
	<div class="Tokenize tokenize" :class="{disabled:disabled}" tabindex="0" @click="showInput" :style="{width:width_display}">
	    <span v-show="value.length > 0" @click="removeAll" class="icon icon-cancel"></span>
	    <ul class="TokensContainer tag-editor" tabindex="0">
	        <li class="Placeholder placeholder" v-show="showPlaceholder" >{{placeholder}}</li>
	        
	        <li v-for="item in value" class="Token">
	            <a class="Close" style="display:inline-block">
	                <span class="icon icon-cancel" tabindex="0" @click.stop="removeItem(item)"></span>
	            </a>
	            <span>{{selected_name(item)}}</span>
	        </li>
	        <li class="TokenSearch">
	            <input v-focus="focus" @keydown.down="selectNextItem" @keyup.enter="addSelectItem" @keydown.up="selectPreviousItem" :disabled="disabled" v-model="text_value" @focusout="hideInput($event)" size="8">
	        </li>
	    </ul>
	    <ul tabindex="0" class="Dropdown dropdown-menu" :style="{display:dropdown_display,width:width_display}">
	       <li tabindex="0" data="for-select" v-show="filterList.length>0" :class="{Hover:item.hover}" @mouseover="setHoverItemById(item.id)" @mouseout="clearAllHover" v-for="item in filterList" @click.stop="addItem(item.id)">{{item.name}}</li>
         <li tabindex="0" class="no-matches" v-show="filterList.length==0">{{no_result}}</li>
	    </ul>
	</div>
</template>

<script>
    import _ from 'lodash';
    export default {
        name: 'TmVueFilterTag',                 
        props:{
            value:{
                type:[Array],
                default:0
            },          
            initial_list:{
              type:Array,
              default:[]
            },
            disabled:{
              type:Boolean,
              default:false
            },
            width:{
              type:String,
              default:""
            },
            placeholder:{
              type:String,
              default:""
            },
            no_result:{
              type:String,
              default:""
            }
        },
        data:function(){
        	return {
            	focus:false,
            	text_value:'',
              current_hover_id:'',
              new_init_list:_.map(this.initial_list,function(item){return _.extend({},item,{hover:false});})
        	}
        },
        computed:{
        	dropdown_display(){
        		return this.focus?'block':'none';
        	},
        	width_display(){
        		return this.width?this.width+'px':'100%';
        	},
        	showPlaceholder(){
        		return (this.value.length==0) && (this.text_value.length == 0);
        	},
          filterList(){
            var _this = this;        
            let tmp = this.new_init_list.filter(function(item){
                if(_this.value.indexOf(item.id) !== -1 ){
                  return false;
                }else{
                  return true;
                }
            }).filter(function(item){
                if(_.startsWith(item.name.toLowerCase(),_this.text_value.toLowerCase()) === false)
                  return false;
                else 
                  return true;
            }).sort(function(a,b){
              if(a.name < b.name)
                return -1;
              if(a.name > b.name)
                return 1;
              return 0;
            });
            return tmp;
          }
        },
        methods:{
            selected_name(id){
               let item = _.find(this.new_init_list, function(item) {
                  return item.id == id; 
               });
               if(item)
                 return item.name;
            },          
            addItem(id){
              if(this.disabled) return;
              this.text_value="";
              this.value.push(id);
            },
            removeAll(){
              let _this = this;
              if(this.disabled) return;
              this.text_value="";
              _.each(this.value,function(value){
                _this.removeItem(value);               
              });
            },
            removeItem(id){
              if(this.disabled) return;
              this.text_value="";
              let index = _.findIndex(this.value,function(value){return value == id});
              this.value.splice(index,1);
            },
            selectNextItem(){
              if(this.filterList.length > 0){
                let index = this.getHoverItemIndex();
                this.clearAllHover();
                if(index == (this.filterList.length - 1)){
                  index = 0;
                }else{
                  index = index+1;
                }
                this.setHoverItemById(this.filterList[index].id);
              }
            },
            selectPreviousItem(){
              let index = this.getHoverItemIndex();
              this.clearAllHover();
              if(index == 0 || index == -1){
                index = this.filterList.length -1;
              }else{
                index = index-1;
              }
              this.setHoverItemById(this.filterList[index].id);
            },
            setHoverItemById(id){
              let index = _.findIndex(this.new_init_list,function(item){
                return item.id == id
              });
              let tmp_object = _.clone(this.new_init_list[index]);
              tmp_object.hover=true;
              this.new_init_list.splice(index, 1, tmp_object);;
            },
            getHoverItemIndex(){
              return _.findIndex(this.filterList,'hover');
            },
            addSelectItem(){
              if(this.filterList.length == 0){
                this.text_value ='';
                this.clearAllHover();
                this.setHoverItemById(this.filterList[0].id);
                return;
              }
              let index = this.getHoverItemIndex();
              if(index == -1)
                return;
              let id = this.filterList[index].id;
              this.addItem(id);
              this.clearAllHover();
              if(this.filterList.length >0){
                this.setHoverItemById(this.filterList[0].id);
              }
            },
            showInput(){
              if(this.disabled) return;
            	this.focus = true;
              //clear the focus before show init list.
              this.clearAllHover();     
              //hover on the first item when show the init list.
              if(this.filterList.length > 0){
                this.setHoverItemById(this.filterList[0].id);
              }
            },
            hideInput(e){              
              if(this.disabled) return;
              if((e.relatedTarget == this.$el.getElementsByClassName("TokensContainer")[0]) || (e.relatedTarget == this.$el.getElementsByClassName("Dropdown")) || (e.relatedTarget && (e.relatedTarget.getAttribute("data")=="for-select"))){
                let _this = this;
                setTimeout(function() { _this.$el.getElementsByTagName("input")[0].focus(); }, 10);
                return;
              }else{
                this.focus = false;
              }             
            },
            clearAllHover(){
              this.new_init_list = _.map(this.new_init_list,function(item){ item.hover = false; return item;});
            }
        },
        directives: {
    			focus: {
    				componentUpdated: function (el, value) {
    					if ( value.value) {
    						el.focus();
    					}
            }
    			}
  		  },
        watch:{
          value:function(){
            this.$emit('input', this.value);
         }
      }
    }                
</script>

