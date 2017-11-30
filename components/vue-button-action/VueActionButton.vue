<template>
    <button class="btn" :class="buttonStatus" :disabled="disabled" v-on:click="clicked">
        <span class="glyphicon-loader" v-show="isLoading"></span>{{ val }}
    </button>
</template>

<script>
    var vaule = "";
    export default {
        name: 'TmVueActionButton',
        props: {
            name: {
                type: String,
                default: null
            },
            loadingName: {
                type: String,
                default: null
            },
            isPrimary: {
                type: Boolean,
                default: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            isLoading: {
                type: Boolean,
                default: false
            }
        },

        data: function () {
            return {
                // show_name:this.param.name,
                // is_disabled:'',
            }

        },
        computed: {
            val: function () {
                if (this.isLoading) {
                    return this.loadingName;
                } else {
                    return this.name;
                }
            },
            buttonStatus: function () {
                if (this.isPrimary)
                    return 'btn-primary';
                else
                    return 'btn-default';
            }
        },
        methods:{
            clicked:function(){
                this.$emit("clicked");
            }
        }
    }
</script>