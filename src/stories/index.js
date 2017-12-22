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
