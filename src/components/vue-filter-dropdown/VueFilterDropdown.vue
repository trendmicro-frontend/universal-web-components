<template>
	<div class="Tokenize tokenize filter-dropdown" :class="{disabled:disabled}" tabindex="0" @click="showOrHideInput" :style="{width:width_display}">
	    <ul class="TokensContainer tag-editor" tabindex="0">
	        <li class="Placeholder placeholder" v-show="showPlaceholder" >{{placeholder}}</li>
	        <li class="select-name" v-show = "!focus" :title="selected_name" :style="{width: (width-24)+'px'}"> {{selected_name}}</li>

	        <li class="TokenSearch">
	            <input v-show="focus" v-focus="focus" @keydown.down="selectNextItem" @keyup.enter="addSelectItem" @keydown.up="selectPreviousItem" :disabled="disabled" v-model="text_value" @focusout="hideInput($event)">
	        </li>
	    </ul>
	    <ul tabindex="0" @mouseup="scrollBarMouseUp($event)" class="Dropdown dropdown-menu" :style="{display:dropdown_display,width:width_display,'max-height': height_display}">
        <template v-for="(item, index) in filterList">
	       <li :title="item.display" tabindex="0" data="for-select" :class="{Hover:item.hover}" @mouseover="setHoverItemById(item.value)" @mouseout="clearAllHover"  @click.stop="addItem(item.value)">{{item.display}}</li>
         </template>
         <li tabindex="0" class="no-matches" v-show="filterList.length==0">{{no_result}}</li>
	    </ul>
	</div>
</template>

<script>
    import _ from 'lodash';
    export default {
        name: 'TmVueFilterDropdown',                 
        props:{
            value:{
                type:String,
                default:''
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
            height:{
              type: String,
              default: ""
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
        	}
        },
        computed:{
        	dropdown_display(){
        		return this.focus?'block':'none';
        	},
        	width_display(){
        		return this.width?this.width+'px':'100%';
          },
          height_display(){
            return this.height?this.height+'px':'150px';
          },
        	showPlaceholder(){
        		return (this.value == '') && (this.text_value == '');
        	},
          filterList(){
            var _this = this;        
            let tmp = this.initial_list.filter(function(item){
                if(_.startsWith(item.display.toLowerCase(),_this.text_value.toLowerCase()) === false)
                  return false;
                else 
                  return true;
            });
            return tmp;
          },
          selected_name(){
              let _self = this;
               let item = _.find(this.initial_list, function(item) {
                  return item.value == _self.value; 
               });
               if(item)
                 return item.display;
            },          
        },
        methods:{
          scrollBarMouseUp(e){
              let _this = this;
              if (e.target == this.$el.getElementsByClassName("Dropdown")[0]){
                  setTimeout(function() { _this.$el.getElementsByTagName("input")[0].focus(); }, 10);
                  this.focus = true;
              }             
          },
            
            addItem(id){
              if(this.disabled) return;
              this.text_value="";
              this.value = id;
							this.showOrHideInput();
            },
            
            selectNextItem(){
              if(this.filterList.length > 0){
                let index = this.getHoverItemIndex();
                // this.clearAllHover();
                if(index == (this.filterList.length - 1)){
                  index = 0;
                }else{
                  index = index+1;
                }
                this.setHoverItemById(this.filterList[index].value);
              }
            },
            selectPreviousItem(){
              let index = this.getHoverItemIndex();
              // this.clearAllHover();
              if(index == 0 || index == -1){
                index = this.filterList.length -1;
              }else{
                index = index-1;
              }
              this.setHoverItemById(this.filterList[index].value);
            },
            setHoverItemById:_.debounce(function (id){
              this.clearAllHover();
              let index = _.findIndex(this.initial_list,function(item){
                return item.value == id
              });
              let tmp_object = _.clone(this.initial_list[index]);
              tmp_object.hover=true;
              this.initial_list.splice(index, 1, tmp_object);;
            },100),

            getHoverItemIndex(){
              return _.findIndex(this.filterList,'hover');
            },
            addSelectItem(){
              if(this.filterList.length == 0){
                this.text_value ='';
                // this.clearAllHover();
                this.setHoverItemById(this.filterList[0].value);
                return;
              }
              let index = this.getHoverItemIndex();
              if(index == -1)
                return;
              let id = this.filterList[index].value;
              this.addItem(id);
              // this.clearAllHover();
              if(this.filterList.length >0){
                this.setHoverItemById(this.filterList[0].value);
              }
            },
            showInput(){
              if(this.disabled) return;
            	this.focus = true;
              //clear the focus before show init list.
              // this.clearAllHover();     
              //hover on the first item when show the init list.
              if(this.filterList.length > 0 ){
                this.setHoverItemById(this.filterList[0].value);
              }
            },
            hideInput(e){              
              if(this.disabled) return;
              if((e.relatedTarget == this.$el.getElementsByClassName("TokensContainer")[0]) || (e.relatedTarget == this.$el.getElementsByClassName("Dropdown")) || (e.relatedTarget && (e.relatedTarget.getAttribute("data")=="for-select"))){
                let _this = this;
                setTimeout(function() { _this.$el.getElementsByTagName("input")[0].focus(); }, 10);
                return;
              }else{
                let _this = this;
                if (e.relatedTarget != this.$el.getElementsByClassName("Dropdown")[0]){
                  this.focus = false;
                }
                  
              }             
            },
						showOrHideInput(){
							if(this.disabled) return;
							if(!this.focus){
								this.focus = true;
								//clear the focus before show init list.
								// this.clearAllHover();     
                //hover on the first item when show the init list.	
                if(this.filterList.length > 0)							
								  this.setHoverItemById(this.filterList[0].value);
							}else{
								this.text_value = '';
								this.focus = false;
							}
						},
            clearAllHover(){
              this.initial_list = _.map(this.initial_list,function(item){ item.hover = false; return item;});
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
        updated:function(){
        },
        watch:{
          value:function(){
            this.$emit('input', this.value);
         },
         text_value:function(){
           if(this.filterList.length >0 && this.getHoverItemIndex()==-1){
                this.setHoverItemById(this.filterList[0].value);
           }
         },
      }
    }                
</script>

