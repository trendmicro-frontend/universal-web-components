/* eslint-disable react/react-in-jsx-scope */
import { storiesOf, addDecorator } from '@storybook/vue'
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

import TmVueInput from '../components/vue-input'

import Welcome from './Welcome.vue';

import TmVueFilterTag from '../components/vue-filter-tag';
import TmVueCheckbox from '../components/vue-checkbox';
import TmVueCheckallCheckbox from '../components/vue-checkbox-checkall';
import TmVueRadio from '../components/vue-radio';
import TmVueDropdown from '../components/vue-dropdown';
import TmVueStepProcess from '../components/vue-step-process';

import TmVueBadge from '../components/vue-badge';
import TmVueLabel from '../components/vue-label';
import uwcDecorator from './uwcDecorator'

import TmVueGroupSelect from '../components/vue-group-select';


import "./ddei"

addDecorator(uwcDecorator)

storiesOf('Welcome', module).add('to Universal Web Components', () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />',
  methods: { action: linkTo('Button') },
}));

storiesOf('Badge', module)
  .add('light gray', () => ({
    components: { TmVueBadge },
    template: `<tm-vue-badge variant="light-gray">
                badge
               </tm-vue-badge>`
  }))
  .add('blue', () => ({
    components: { TmVueBadge },
    template: `<tm-vue-badge variant="blue">
                badge
               </tm-vue-badge>`
  }))
  .add('green', () => ({
    components: { TmVueBadge },
    template: `<tm-vue-badge variant="green">
                badge
               </tm-vue-badge>`
  }))
  .add('cyan', () => ({
    components: { TmVueBadge },
    template: `<tm-vue-badge variant="cyan">
                badge
               </tm-vue-badge>`
  }))
  .add('orange', () => ({
    components: { TmVueBadge },
    template: `<tm-vue-badge variant="orange">
                badge
               </tm-vue-badge>`
  }))
  .add('red', () => ({
    components: { TmVueBadge },
    template: `<tm-vue-badge variant="red">
                badge
               </tm-vue-badge>`
  }))
  .add('yellow', () => ({
    components: { TmVueBadge },
    template: `<tm-vue-badge variant="yellow">
                badge
               </tm-vue-badge>`
  }))
  .add('dark', () => ({
    components: { TmVueBadge },
    template: `<tm-vue-badge variant="dark">
                badge
               </tm-vue-badge>`
  }))
  .add('default link', () => ({
    components: { TmVueBadge },
    template: `<tm-vue-badge href="https://trendmicro.com">
                badge
               </tm-vue-badge>`
  }))

  storiesOf('Label', module)
  .add('blue', () => ({
    components: { TmVueLabel },
    template: `<tm-vue-label variant="blue">
                label
               </tm-vue-label>`
  }))
  .add('green', () => ({
    components: { TmVueLabel },
    template: `<tm-vue-label variant="green">
                label
               </tm-vue-label>`
  }))
  .add('cyan', () => ({
    components: { TmVueLabel },
    template: `<tm-vue-label variant="cyan">
                label
               </tm-vue-label>`
  }))
  .add('orange', () => ({
    components: { TmVueLabel },
    template: `<tm-vue-label variant="orange">
                label
               </tm-vue-label>`
  }))
  .add('red', () => ({
    components: { TmVueLabel },
    template: `<tm-vue-label variant="red">
                label
               </tm-vue-label>`
  }))
  .add('indigo', () => ({
    components: { TmVueLabel },
    template: `<tm-vue-label variant="indigo">
                label
               </tm-vue-label>`
  }))
  .add('yellow', () => ({
    components: { TmVueLabel },
    template: `<tm-vue-label variant="yellow">
                label
               </tm-vue-label>`
  }))
  .add('light-gray', () => ({
    components: { TmVueLabel },
    template: `<tm-vue-label variant="light-gray">
                label
               </tm-vue-label>`
  }))
  .add('gray', () => ({
    components: { TmVueLabel },
    template: `<tm-vue-label variant="gray">
                label
               </tm-vue-label>`
  }))
  .add('dark', () => ({
    components: { TmVueLabel },
    template: `<tm-vue-label variant="dark">
                label
               </tm-vue-label>`
  }))
  .add('default link', () => ({
    components: { TmVueLabel },
    template: `<tm-vue-label href="https://trendmicro.com">
                label
               </tm-vue-label>`
  }))

storiesOf('Breadcrumb', module)
  .add('default', () => ({
    components: { TmVueBreadcrumb, TmVueBreadcrumbItem },
    template: `<tm-vue-breadcrumb>
                <tm-vue-breadcrumb-item to="/">Home</tm-vue-breadcrumb-item>
                <tm-vue-breadcrumb-item to="/components/breadcrumb">Components</tm-vue-breadcrumb-item>
                <tm-vue-breadcrumb-item>Breadcrumb</tm-vue-breadcrumb-item>
               </tm-vue-breadcrumb>`
  }))
storiesOf('Button', module)
  .add('default', () => ({
    components: { TmVueButton },
    template: `<tm-vue-button type="default">Default</tm-vue-button>`
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
  .add('Tag', () => ({
    components: { TmVueFilterTag },
    data() {
      return {
        selected_list: [ 1,3],
        selected_list_1: [ 2,4],
        initial_list: [{ name: "AAAA", id: 1 }, { name: "BBBB", id: 2 },{ name: "CCCC", id: 3 }, { name: "DDDD", id: 4 },{ name: "EEEE", id: 5 }],
        width: "512",
        disabled: false,
      }
    },
    methods: {
      disableTag() {
        this.disabled = true;
      },
      enableTag() {
        this.disabled = false;
      }
    },
    template: `
              <div>
              select list is: {{selected_list}}
              <tm-vue-filter-tag placeholder="Select..." no_result="No result match" v-model="selected_list" :disabled="disabled" :width="width" :initial_list="initial_list" ></tm-vue-filter-tag>
              select list_1 is: {{selected_list_1}}
              <tm-vue-filter-tag placeholder="Select..." no_result="No result match" v-model="selected_list_1" :disabled="disabled" :width="width" :initial_list="initial_list" ></tm-vue-filter-tag>
              <button @click="disableTag" type="button">disable tag</button><button @click="enableTag" type="button">enable tag</button>
              </div>
              `,

  }));
storiesOf('Dropdown', module)
  .add('default', () => ({
    components: { TmVueDropdown },
    data() {
      return {
        disabled: false,
        dropdown_value: 1,
        droplist: [{ value: 1, display: "aaa" }, { value: 2, display: "bbb" }]
      }
    },
    methods: {

    },
    template: `
              <div>
              select list is: {{dropdown_value}}
              <tm-vue-dropdown :list="droplist" :disabled="disabled" v-model="dropdown_value"></tm-vue-dropdown>
              </div>
              `,

  }))
  .add('disabled', () => ({
    components: { TmVueDropdown },
    data() {
      return {
        disabled: true,
        dropdown_value: 1,
        droplist: [{ value: 1, display: "aaa" }, { value: 2, display: "bbb" }]
      }
    },
    methods: {

    },
    template: `
              <div>
              select list is: {{dropdown_value}}
              <tm-vue-dropdown :list="droplist" :disabled="disabled" v-model="dropdown_value"></tm-vue-dropdown>
              </div>
              `,

  }));

storiesOf('Step process ', module)
  .add('first', () => ({
    components: { TmVueStepProcess },
    data() {
      return {
        processes: [{step:1,action:"Uploading","description":"DDEI is uploading your upgrade package."},{step:2,action:"Installing","description":"DDEI is installing upgrade package. Please do not leave this page, otherwise you will lose your data."},{step:3,action:"Configuring","description":"DDEI is configuring and preparing restart. It might take some times according to your size of data."}],
        percent: 10,
        current: 1
      }
    },
    methods: {
        first(){
          this.current = 1;
          this.percent = 50;
        },
        second(){
          this.current = 2;
          this.percent = 70;
        },
        third(){
          this.current = 3;
          this.percent = 100;
        },
    },
    template: `
              <div>
              <button @click="first">first</button>&nbsp;<button @click="second">second</button>&nbsp;<button @click="third">third</button>
              <tm-vue-step-process  :processes="processes" :percent="percent" :current="current" ></tm-vue-step-process>
              </div>
              `,

  }))
    .add('second', () => ({
    components: { TmVueStepProcess },
    data() {
      return {
        processes: [{step:1,action:"Uploading","description":"DDEI is uploading your upgrade package."},{step:2,action:"Installing","description":"DDEI is installing upgrade package. Please do not leave this page, otherwise you will lose your data."},{step:3,action:"Configuring","description":"DDEI is configuring and preparing restart. It might take some times according to your size of data."}],
        percent: 60,
        current: 2
      }
    },
    methods: {

    },
    template: `
              <div>
              
              <tm-vue-step-process  :processes="processes" :percent="percent" :current="current" ></tm-vue-step-process>
              </div>
              `,

  }))
    .add('third', () => ({
    components: { TmVueStepProcess },
    data() {
      return {
        processes: [{step:1,action:"Uploading","description":"DDEI is uploading your upgrade package."},{step:2,action:"Installing","description":"DDEI is installing upgrade package. Please do not leave this page, otherwise you will lose your data."},{step:3,action:"Configuring","description":"DDEI is configuring and preparing restart. It might take some times according to your size of data."}],
        percent: 90,
        current: 3
      }
    },
    methods: {

    },
    template: `
              <div>
              
              <tm-vue-step-process  :processes="processes" :percent="percent" :current="current" ></tm-vue-step-process>
              </div>
              `,

  })) 
  .add('Only two step first', () => ({
    components: { TmVueStepProcess },
    data() {
      return {
        processes: [{step:1,action:"Uploading","description":"DDEI is uploading your upgrade package."},{step:2,action:"Installing","description":"DDEI is installing upgrade package. Please do not leave this page, otherwise you will lose your data."}],
        percent: 10,
        current: 1
      }
    },
    methods: {

    },
    template: `
              <div>
              
              <tm-vue-step-process  :processes="processes" :percent="percent" :current="current" ></tm-vue-step-process>
              </div>
              `,

  }))
  .add('Only two step second', () => ({
    components: { TmVueStepProcess },
    data() {
      return {
        processes: [{step:1,action:"Uploading","description":"DDEI is uploading your upgrade package."},{step:2,action:"Installing","description":"DDEI is installing upgrade package. Please do not leave this page, otherwise you will lose your data."}],
        percent: 80,
        current: 2
      }
    },
    methods: {

    },
    template: `
              <div>
              
              <tm-vue-step-process  :processes="processes" :percent="percent" :current="current" ></tm-vue-step-process>
              </div>
              `,

  }))  
  ;

storiesOf('Radio & Check box', module)
  .add('Check box group', () => ({
    components: { TmVueCheckbox, TmVueCheckallCheckbox },
    data() {
      return {
        e_check_box: { disabled: false, value: 1 },
        f_check_box: { disabled: false, value: 2 },
        all_check_box: { disabled: false, name: "all", id: "checkbox_all", indeterminate: true },
        checkbox_1: [1],
        checkbox_all: false,
      }
    },
    methods: {
      getSelectRadio_3(value) {
        if (this.checkbox_1.length == 1) {
          this.all_check_box.indeterminate = true;
          this.checkbox_all = false;
        } else if (this.checkbox_1.length == 2) {
          this.all_check_box.indeterminate = false;
          this.checkbox_all = true;
        } else {
          this.all_check_box.indeterminate = false;
          this.checkbox_all = false
        }
      },
      getSelectRadio_4: function (value) {
        this.checkbox_all = value;
        this.all_check_box.indeterminate = false;
        if (this.checkbox_all) {
          this.checkbox_1 = [1, 2];
        } else {
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
    data() {
      return {
        e_check_box: { disabled: false },
        f_check_box: { disabled: false },
        checkbox_a: false,
        checkbox_b: false
      }
    },
    methods: {
    },
    template: `<div>
              checkbox test a:{{checkbox_a}}<br/>
              checkbox test b:{{checkbox_b}}
              <tm-vue-checkbox :disabled="e_check_box.disabled" v-model="checkbox_a">checkbox test a</tm-vue-checkbox>
              <tm-vue-checkbox :disabled="f_check_box.disabled" v-model="checkbox_b">checkbox test b</tm-vue-checkbox>
              </div>`,

  }))
  .add('Radio', () => ({
    components: { TmVueRadio },
    data() {
      return {
        a_check_box: { disabled: false, value: 1 },
        b_check_box: { disabled: false, value: 2 },
        radio_checked_1: 1
      }
    },
    methods: {
      getSelectRadio_1(val) {
        console.log("change triggered");
      }
    },
    template: `<div>
              select value:{{radio_checked_1}}
              <tm-vue-radio :value="a_check_box.value" :disabled="a_check_box.disabled" v-model="radio_checked_1" @change="getSelectRadio_1">radio test a</tm-vue-radio>
              <tm-vue-radio :value="b_check_box.value" :disabled="b_check_box.disabled" v-model="radio_checked_1" @change="getSelectRadio_1">radio test b</tm-vue-radio>
              </div>`,

  }));


storiesOf('Multiple Select', module)
  .add('Select group', () => ({
    components: { TmVueGroupSelect },
    data() {
      return {
        left_list: [{"value": "US", "name": "America",children:[{"value":1,"name":"Credit card of US"},{"value":2,"name":"ID of US"}] },
        {"value": "CN", "name": "China",children:[{"value":3,"name":"Credit card of China"},{"value":4,"name":"ID of china"}]}
        ],
        left_title: "Type for select",
        right_list: [],
        right_title: "Selected type",
        disabled: false,
        selected_list:[]
      }
    },
    methods: {
      changeSelected(object){
        this.selected_list = object;
      },
      itemExist(object){
        alert(object+'already exist in the right list');
      },
      oneLayer(){
        this.left_list = [];
        //console.log(this.left_list);
        this.left_list.push({"value":1,"name":"Credit card of US"},{"value":3,"name":"Credit card of China"});
      },
      twoLayer(){
        this.left_list = [];
        this.left_list.push({"value": "US", "name": "America",children:[{"value":1,"name":"Credit card of US"},{"value":2,"name":"ID of US"}] },
        {"value": "CN", "name": "China",children:[{"value":3,"name":"Credit card of China"},{"value":4,"name":"ID of china"}]});
      }
    },
    template: `<div>
              <div>select value:{{selected_list}}</div>
              <button @click="oneLayer">one layer</button>
              <button @click="twoLayer">two layer</button>
              <tm-vue-group-select v-on:change-selected="changeSelected" v-on:item-exist="itemExist" :disabled="disabled" :left_list="left_list" :left_title="left_title" :right_list="right_list" :right_title="right_title">
              </tm-vue-group-select>

              </div>`,

  }));


storiesOf('Form', module)
  .add('default', () => ({
    components: { TmVueForm, TmVueFormItem, TmVueButton, Icon },
    template: `<tm-vue-form ref="formInline" :model="formInline" :rules="ruleInline" inline >
                <tm-vue-form-item prop="user">
                  <tm-vue-button type="default" v-model="formInline.user" placeholder="Username">
                    <icon type="ios-person-outline" slot="prepend"></icon>
                  </tm-vue-button>
                </tm-vue-form-item>
                <tm-vue-form-item prop="password">
                  <tm-vue-button type="default" v-model="formInline.password" placeholder="Password">
                    <icon type="ios-locked-outline" slot="prepend"></icon>
                  </tm-vue-button>
                </tm-vue-form-item>
                <tm-vue-form-item>
                  <tm-vue-button type="default" @click="handleSubmit('formInline')">Signin</tm-vue-button>
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
    methods: {
      handleSubmit: function (name) {
        console.log('hello world');
        // this.$refs[name].validate((valid) => {
        //   if (valid) {
        //     this.$Message.success('Success!');
        //   } else {
        //     this.$Message.error('Fail!');
        //   }
        // })
      }
    },
  }))
  .add('complex', () => ({
    components: { TmVueForm, TmVueFormItem, TmVueButton, Icon, TmVueInput },
    template: `<tm-vue-form :model="formItem" :label-width="80">
                  <tm-vue-form-item label="data">
                      <tm-vue-input v-model="formItem.input" placeholder="Enter something..."></tm-vue-input>
                  </tm-vue-form-item>
                  <tm-vue-form-item label="Select">
                      <tm-vue-select v-model="formItem.select">
                          <tm-vue-option value="beijing">New York</tm-vue-option>
                          <tm-vue-option value="shanghai">London</tm-vue-option>
                          <tm-vue-option value="shenzhen">Sydney</tm-vue-option>
                      </tm-vue-select>
                  </tm-vue-form-item>
                  <tm-vue-form-item label="DatePicker">
                      <Row>
                          <Col span="11">
                              <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                          </Col>
                          <Col span="2" style="text-align: center">-</Col>
                          <Col span="11">
                              <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                          </Col>
                      </Row>
                  </tm-vue-form-item>
                  <tm-vue-form-item label="Radio">
                      <RadioGroup v-model="formItem.radio">
                          <Radio label="male">Male</Radio>
                          <Radio label="female">Female</Radio>
                      </RadioGroup>
                  </tm-vue-form-item>
                  <tm-vue-form-item label="Checkbox">
                      <CheckboxGroup v-model="formItem.checkbox">
                          <Checkbox label="Eat"></Checkbox>
                          <Checkbox label="Sleep"></Checkbox>
                          <Checkbox label="Run"></Checkbox>
                          <Checkbox label="Movie"></Checkbox>
                      </CheckboxGroup>
                  </tm-vue-form-item>
                  <tm-vue-form-item label="Switch">
                      <i-switch v-model="formItem.switch" size="large">
                          <span slot="open">On</span>
                          <span slot="close">Off</span>
                      </i-switch>
                  </tm-vue-form-item>
                  <tm-vue-form-item label="Slider">
                      <Slider v-model="formItem.slider" range></Slider>
                  </tm-vue-form-item>
                  <tm-vue-form-item label="Text">
                      <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                  </tm-vue-form-item>
                  <tm-vue-form-item>
                      <Button type="primary">Submit</Button>
                      <Button type="ghost" style="margin-left: 8px">Cancel</Button>
                  </tm-vue-form-item>
              </tm-vue-form>`,
    data() {
      return {
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        }
      }
    },
    methods: {
      handleSubmit: function (name) {
        debugger;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      }
    },
  }))
/* eslint-enable react/react-in-jsx-scope */


