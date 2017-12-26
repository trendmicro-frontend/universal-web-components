<template>
	<div class="Tokenize tokenize" :class="{disabled:disabled}" tabindex="0" @click="showInput" :style="{width:width_display}">
	    <span v-show="selected_list.length > 0" @click="removeAll" class="icon icon-cancel"></span>
	    <ul class="TokensContainer tag-editor" tabindex="0">
	        <li class="Placeholder placeholder" v-show="showPlaceholder" >Select...</li>
	        
	        <li v-for="item in selected_list" class="Token">
	            <a class="Close">
	                <span class="icon icon-cancel" tabindex="0" @click.stop="removeItem(item.id)"></span>
	            </a>
	            <span>{{item.name}}</span>
	        </li>
	        <li class="TokenSearch">
	            <input v-focus="focus" @keydown.down="selectNextItem" @keyup.enter="addSelectItem" @keydown.up="selectPreviousItem" :disabled="disabled" v-model="text_value" @focusout="hideInput($event)" size="8">
	        </li>
	    </ul>
	    <ul tabindex="0" class="Dropdown dropdown-menu" :style="{display:dropdown_display,width:width_display}">
	       <li tabindex="0" data="for-select" v-show="showInitList.length>0" :class="{Hover:item.hover}" @mouseover="setHoverItem(item.id)" @mouseout="clearAllHover" v-for="item in showInitList" @click.stop="addItem(item.id)">{{item.name}}</li>
         <li tabindex="0" class="no-matches" v-show="showInitList.length==0">No matches found</li>
	    </ul>
	</div>
</template>

<script>
    import _ from 'lodash';
    export default {
        name: 'TmVueFilterTag',                                                                                       
        props:{
            initial_list:{
              type:Array,
              default:[]
            },
            selected_list:{
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
            }
        },
        data:function(){
        	return {
            	focus:false,
            	text_value:'',
              current_hover_id:'',
              new_init_list:_.map(this.initial_list,function(item){return _.extend({},item,{hover:false})})
        	}
        },
        computed:{
        	dropdown_display(){
        		return this.focus?'block':'none';
        	},
        	width_display(){
        		return this.width?this.width:'100%';
        	},
        	showPlaceholder(){
        		return (this.selected_list.length==0) && (this.text_value.length == 0);
        	},
          showInitList(){
            let _this = this;
            if(this.text_value.length==0)
              return this.new_init_list;            
            let tmp = this.new_init_list.filter(function(item){
              if(item.name.toLowerCase().startsWith(_this.text_value.toLowerCase()) === false)
                return false;
              else
                return true;
            });
            return tmp;
          }

        },
        methods: {
            addItem(id){
              if(this.disabled) return;
              this.text_value="";
              let remove_item = _.find(this.showInitList, function(item) {
                return item.id == id; 
             });
              let i = this.showInitList.map(item => item.id).indexOf(id) 
              this.showInitList.splice(i, 1);
              this.selected_list.push(remove_item);
              this.returnList();
            },
            removeAll(value){
              if(this.disabled) return;
              this.text_value="";
              let tmp = _.clone(this.selected_list);
              for(let i=0;i<tmp.length;i++){
                this.removeItem(tmp[i].id);
              }
            	this.selected_list= [];
              this.returnList();
            },
            removeItem(id){
              if(this.disabled) return;
              this.text_value="";
              let remove_item = _.find(this.selected_list, function(item) {
                return item.id == id; 
             });
              let i = this.selected_list.map(item => item.id).indexOf(id);
              this.selected_list.splice(i, 1)        
              this.showInitList.push(remove_item);
              this.sortInitList();
              this.returnList();
            },
            selectNextItem(){
              if(this.showInitList.length > 0){
                let index = this.getHoverItemIndex();
                this.clearAllHover();
                if(index == (this.showInitList.length - 1)){
                  index = 0;
                }else{
                  index = index+1;
                }
                this.setHoverItemFlag(index);
              }
            },
            selectPreviousItem(){
              let index = this.getHoverItemIndex();
              this.clearAllHover();
              if(index == 0 || index == -1){
                index = this.showInitList.length -1;
              }else{
                index = index-1;
              }
              this.setHoverItemFlag(index);
            },
            setHoverItem(hover_id){
              this.clearAllHover();
              let index = this.getItemIndexById(hover_id,this.new_init_list);
              this.setHoverItemFlag(index);
            },
            setHoverItemFlag(index){
              let tmp_object = _.clone(this.new_init_list[index]);
              tmp_object.hover=true;
              this.new_init_list.splice(index, 1, tmp_object);
            },
            getItemIndexById(item_id,list){
              return _.findIndex(list,function(item) { return item.id == item_id });
            },
            getHoverItemIndex(){
              return _.findIndex(this.new_init_list,'hover');
            },
            addSelectItem(){
              let index = this.getHoverItemIndex();
              let id = this.new_init_list[index].id;
              this.addItem(id);
              this.returnList();
            },
            filterIintList(){
              let tmp = this.showInitList
            },
            showInput(){
              if(this.disabled) return;
            	this.focus = true;
              //clear the focus before show init list.
              this.clearAllHover();     
              //hover on the first item when show the init list.
              if(this.showInitList.length > 0){
                this.setHoverItemFlag(0);
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
            },
            sortInitList(){
              this.showInitList.sort(function(a,b){
                if(a.name < b.name)
                  return -1;
                if(a.name > b.name)
                  return 1;
                return 0;
              });
            },
            returnList(){
              this.$emit('change', this.selected_list);
            },
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
      mounted(){
          this.sortInitList();
      }             
    }
</script>
<style scoped>
.tokenize{
	position: relative;
}
.tokenize.disabled * {
  cursor: not-allowed !important;
}
.tokenize.disabled .tag-editor:after {
  cursor: not-allowed !important;
}
.tag-editor {
  list-style-type: none;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 3px;
  overflow: hidden;
  border: 1px solid #cccccc;
  border-radius: 3px;
  background-color: #ffffff;
  cursor: text;
}
.tag-editor.focused,
.tag-editor.Focused {
  border-color: #0096cc;
  transition: all 0.2s linear 0s;
  outline: none;
}
.tag-editor li {
  display: block;
  float: left;
  overflow: hidden;
  margin-right: 4px;
  margin-top: 3px;
}
.tag-editor li:hover .tag-editor-tag,
.tag-editor li:hover > span {
  cursor: default;
}
.tag-editor li:hover .tag-editor-editTag,
.tag-editor li:hover .tag-editor-editTag + .tag-editor-delete {
  background: #E6F4FC;
  cursor: pointer;
}
.tag-editor div {
  float: left;
}
.tag-editor input {
  vertical-align: inherit;
  border: 0;
  outline: none;
  padding: 0;
  margin: 0;
  cursor: text;
  box-shadow: none;
  background: none;
  color: #222222;
}
.tag-editor .tag-editor-tag,
.tag-editor .Token > span {
  padding: 2px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 3px 0 0 3px;
  max-width: 184px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 12px;
  color: #222222;
  background: #cceaf5;
  float: left;
}
.tokenize.disabled .tag-editor .tag-editor-tag,
.tokenize.disabled .tag-editor .Token > span {
  color:gray;
}
.tag-editor .tag-editor-tag.active,
.tag-editor .Token > span.active {
  color: #222222;
  background: none !important;
  max-width: none;
}
.tag-editor .tag-editor-editTag {
  color: #0096cc;
}
.tag-editor .tag-editor-delete,
.tag-editor .Token .Close {
  padding-right: 8px;
  padding-top: 2px;
  padding-bottom: 2px;
  cursor: pointer;
  border-radius: 0 3px 3px 0;
  background: #cceaf5;
  float:right;
}
.tag-editor .tag-editor-delete .icon-cancel,
.tag-editor .Token .Close .icon-cancel {
  opacity: 0.4;
  vertical-align: top;
  margin-top: 1px;
}
.tag-editor .tag-editor-delete .icon-cancel:hover,
.tag-editor .Token .Close .icon-cancel:hover {
  opacity: 1;
}
.tokenize.disabled .tag-editor .tag-editor-delete .icon-cancel:hover,
.tokenize.disabled .tag-editor .Token .Close .icon-cancel:hover {
  opacity: 0.4;
}
.tag-editor .tag-editor-tag.active + .tag-editor-delete,
.tag-editor .tag-editor-tag.active + .tag-editor-delete .icon {
  visibility: hidden;
  cursor: text;
}
.tag-editor .placeholder {
  color: #bbbbbb;
  line-height: 20px;
  padding: 2px 0;
  padding-left: 8px;
}
.tag-editor-hidden-src {
  position: absolute !important;
  left: -99999px;
}
.tokenize {
  position: relative;
}
.tokenize .tag-editor {
  padding-right: 48px;
}
.tokenize .tag-editor:after {
  content: " ";
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE2IDE2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwb2x5Z29uIGlkPSJpY29uU2VsZWN0Q2FyZXREb3duIiBmaWxsPSIjNjY2NjY2IiBwb2ludHM9IjUsNyAxMiw3IDEyLDggMTEsOCAxMSw5IDEwLDkgMTAsMTAgOSwxMCA5LDExIDgsMTEgOCwxMCA3LDEwIDcsOSA2LDkgDQoJNiw4IDUsOCAiLz4NCjwvc3ZnPg0K) no-repeat;
  background-position: left 7px;
  width: 24px;
  height: 32px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.tokenize ul li.placeholder {
  position: absolute;
}
.tokenize ul input {
  padding-top: 2px;
  padding-left: 8px;
  padding-bottom: 2px;
}
.tokenize > .icon-cancel {
  position: absolute;
  right: 24px;
  margin-top: 8px;
  opacity: 0.4;
}
.tokenize > .icon-cancel:hover {
  opacity: 1;
  cursor: pointer;
}
.tokenize.disabled > .icon-cancel:hover {
  opacity: 0.4;
}
.tokenize .dropdown-menu li {
  display: block;
  padding: 4px 16px;
  clear: both;
  font-weight: normal;
  line-height: 20px;
  color: #222;
  white-space: nowrap;
  cursor: pointer;
}
.tokenize .dropdown-menu li:hover,
.tokenize .dropdown-menu li.Hover {
  color: #222;
  text-decoration: none;
  background-color: #eee;
}
.dropdown-menu .no-matches,
.dropdown-menu li.no-matches {
  color: #999999;
}
.dropdown-menu .no-matches:hover,
.dropdown-menu li.no-matches:hover,
.dropdown-menu .no-matches.selected,
.dropdown-menu li.no-matches.selected {
  color: #999999;
  background-color: #ffffff;
  cursor: text;
}
</style>