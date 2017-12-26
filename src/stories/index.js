/* eslint-disable react/react-in-jsx-scope */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import {
  withKnobs,
  text,
  number,
  boolean,
  array,
  select,
  color,
  date,
} from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import Icon from '../components/icon'
import TmVueBreadcrumb from '../components/vue-breadcrumb'
import TmVueBreadcrumbItem from '../components/vue-breadcrumb/breadcrumb-item.vue'
import TmVueButton from '../components/vue-button'

import TmVueForm from '../components/vue-form'

import TmVueFormItem from '../components/vue-form/form-item.vue'

import Welcome from './Welcome.vue';

import TmVueFilterTag from '../components/vue-filter-tag';
import TmVueCheckbox from '../components/vue-checkbox';
import TmVueCheckallCheckbox from '../components/vue-checkbox-checkall';
import TmVueRadio from '../components/vue-radio';
import TmVueDropdown from '../components/vue-dropdown';

import "./ddei"
import "./demo.css"

storiesOf('Welcome', module).add('to Universal Web Components', () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />',
  methods: { action: linkTo('Button') },
}));

storiesOf('Breadcrumb', module)
  .addDecorator(centered)
  .add('default', () => ({
    components: { TmVueBreadcrumb, TmVueBreadcrumbItem },
    template: `<tm-vue-breadcrumb>
                <tm-vue-breadcrumb-item to="/">Home</tm-vue-breadcrumb-item>
                <tm-vue-breadcrumb-item to="/components/breadcrumb">Components</tm-vue-breadcrumb-item>
                <tm-vue-breadcrumb-item>Breadcrumb</tm-vue-breadcrumb-item>
               </tm-vue-breadcrumb>`
  }))
storiesOf('Button', module)
  .addDecorator(centered)
  .add('default', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button>Default</tm-vue-button>`
  }))
  .add('primary', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button type="primary">Primary</tm-vue-button>`
  }))
  .add('danger', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button type="danger">Danger</tm-vue-button>`
  }))
  .add('border', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button type="border">Border</tm-vue-button>`
  }))
  .add('link', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button type="link">Link</tm-vue-button>`
  }))
  .add('Button Size Full Width', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button type="primary" full size="lg">Full Width</tm-vue-button>`
  }))
  .add('Button Size Large', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button type="primary" size="lg">Large</tm-vue-button>`
  }))
  .add('Button Size Default', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button type="primary">Default</tm-vue-button>`
  }))
  .add('Button Size Small', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button type="primary" size="sm">Small</tm-vue-button>`
  }))
  .add('Button Size Extra Small', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button type="primary" size="xs">Extra Small</tm-vue-button>`
  }))
  .add('Button Primary loading', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button type="primary" loading >Uploading</tm-vue-button>`
  }))
  .add('Button Border loading', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button type="border" loading >Uploading</tm-vue-button>`
  }))
storiesOf('Tag & Token', module)
  .addDecorator(centered)
  .add('Tag', () => ({
    components: { TmVueFilterTag },
    data(){
      return {
        selected_list:[{name:"No DMARC record",id:1},{name:"absdfew",id:2},{name:"cdwerwd",id:4}],
        initial_list:[{name:"cdwerwerdf",id:3},{name:"fdwerds",id:5}],
        width:"512px" ,
        disabled:false,
      }     
    },
    methods:{
      getSelectList(list){
        this.selected_list = list;
      },
      disableTag(){
        this.disabled = true;
      },
      enableTag(){
        this.disabled = false;
      }
    },
    template: `
              <div>
              select list is: {{selected_list}}
              <tm-vue-filter-tag @change="getSelectList":disabled="disabled" :width="width" :initial_list="initial_list" :selected_list="selected_list"></tm-vue-filter-tag>
              <button @click="disableTag" type="button">disable tag</button><button @click="enableTag" type="button">enable tag</button>
              </div>
              `,

  }));
storiesOf('Dropdown', module)
  .addDecorator(centered)
  .add('default', () => ({
    components: { TmVueDropdown },
    data(){
      return {
        drop_down:{disabled:false,droplist:[{value:1,display:"aaa"},{value:2,display:"bbb"}]},
        disabled:false,
        dropdown_value:1
      }     
    },
    methods:{
      getDropDownValue(value){
        this.dropdown_value = value;
      }
    },
    template: `
              <div>
              select list is: {{dropdown_value}}
              <tm-vue-dropdown :param="drop_down" v-model="dropdown_value" @change="getDropDownValue">checkbox test b</tm-vue-dropdown>
              </div>
              `,

  }));  
storiesOf('Radio & Check box', module)
  .addDecorator(centered)
  .add('Check box group', () => ({
    components: { TmVueCheckbox,TmVueCheckallCheckbox },
    data(){
      return {
        e_check_box:{disabled:false,value:1},
        f_check_box:{disabled:false,value:2},
        all_check_box:{disabled:false,name:"all",id:"checkbox_all",indeterminate:true},
        checkbox_1:[1],
        checkbox_all:false,
      }     
    },
    methods:{
      getSelectRadio_3(value){
        this.checkbox_1 = value;
        if(this.checkbox_1.length == 1){
          this.all_check_box.indeterminate = true;
          this.checkbox_all = false;
        }else if(this.checkbox_1.length == 2){
          this.all_check_box.indeterminate = false;
          this.checkbox_all = true;
        }else{
          this.all_check_box.indeterminate = false;
          this.checkbox_all = false
        }
      },
      getSelectRadio_4:function(value){
        this.checkbox_all = value;
        this.all_check_box.indeterminate = false;
        if(this.checkbox_all){
          this.checkbox_1 = [1,2];
        }else{
          this.checkbox_1 = [];
        }
      },      
    },
    template: `<div>
              select value:{{checkbox_1}}
              <tm-vue-checkall-checkbox :disabled="all_check_box.disabled" :indeterminate="all_check_box.indeterminate" :checked="checkbox_all" @change="getSelectRadio_4">checkbox check all</tm-vue-checkall-checkbox>
              <tm-vue-checkbox :disabled="e_check_box.disabled" :value="e_check_box.value" v-model="checkbox_1" @change="getSelectRadio_3">checkbox test a</tm-vue-checkbox>
              <tm-vue-checkbox :disabled="f_check_box.disabled" :value="f_check_box.value" v-model="checkbox_1" @change="getSelectRadio_3">checkbox test b</tm-vue-checkbox>
              </div>`,

  }))
  .add('Single checkbox', () => ({
    components: { TmVueCheckbox },
    data(){
      return {
        e_check_box:{disabled:false},
        f_check_box:{disabled:false},
        checkbox_a:false,
        checkbox_b:false
      }     
    },
    methods:{
      getSelectRadio_3(val){
        this.checkbox_a = val;
        console.log(this.checkbox_a);
      },
      getSelectRadio_4(val){
        this.checkbox_b = val;
        console.log(this.checkbox_b);
      }     
    },
    template: `<div>
              checkbox test a:{{checkbox_a}}<br/>
              checkbox test b:{{checkbox_b}}
              <tm-vue-checkbox :disabled="e_check_box.disabled" v-model="checkbox_a" @change="getSelectRadio_3">checkbox test a</tm-vue-checkbox>
              <tm-vue-checkbox :disabled="f_check_box.disabled" v-model="checkbox_b" @change="getSelectRadio_4">checkbox test b</tm-vue-checkbox>
              </div>`,

  }))
  .add('Radio', () => ({
    components: { TmVueRadio },
    data(){
      return {
        a_check_box:{disabled:false,value:1},
        b_check_box:{disabled:false,value:2},
        radio_checked_1:1
      }     
    },
    methods:{
      getSelectRadio_1(val){
        this.radio_checked_1 = val;
      }
    },
    template: `<div>
              select value:{{radio_checked_1}}
              <tm-vue-radio :value="a_check_box.value" :disabled="a_check_box.disabled" v-model="radio_checked_1" @change="getSelectRadio_1">radio test a</tm-vue-radio>
              <tm-vue-radio :value="b_check_box.value" :disabled="b_check_box.disabled" v-model="radio_checked_1" @change="getSelectRadio_1">radio test b</tm-vue-radio>
              </div>`,

  }));
storiesOf('Form', module)
  .addDecorator(centered)
  .add('default', () => ({
    components: { TmVueForm, TmVueFormItem, TmVueButton, Icon },
    template: `<tm-vue-form ref="formInline" :model="formInline" :rules="ruleInline" inline >
                <tm-vue-form-item prop="user">
                  <tm-vue-button type="text" v-model="formInline.user" placeholder="Username">
                    <icon type="ios-person-outline" slot="prepend"></icon>
                  </tm-vue-button>
                </tm-vue-form-item>
                <tm-vue-form-item prop="password">
                  <tm-vue-button type="password" v-model="formInline.password" placeholder="Password">
                    <icon type="ios-locked-outline" slot="prepend"></icon>
                  </tm-vue-button>
                </tm-vue-form-item>
                <tm-vue-form-item>
                  <tm-vue-button type="primary" @click="handleSubmit('formInline')">Signin</tm-vue-button>
                </tm-vue-form-item>
              </tm-vue-form>`,
    data() {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        }
      }
    },
  }))

/* eslint-enable react/react-in-jsx-scope */