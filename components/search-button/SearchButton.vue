<template>
    <div class="search-button">
        <div class="input-group has-clear" style="width:100%">
            <div class="input-icon-group">
                <input type="text" class="form-control" :placeholder="placeholder"  style="width:100%" v-model="textVal" v-on:input="updated" v-on:keyup.enter="changed">
                <span class="form-control-clear icon icon-cancel hidden"></span>
            </div>
            <span class="input-group-btn">
                <button type="button" class="btn btn-default btn-icon-only" v-on:click="changed"><span
                        class="fa fa-search"></span></button>
            </span>
        </div>
    </div>
</template>

<script>
    var vaule = "";
    export default {
        name: 'SearchButton',
        props: {
            placeholder: {
                type: String,
                default: null
            }
        },
        data:function(){
            return {
                textVal:""
            }
        },
        methods:{
            changed:function(e){
                this.$emit("changed",this.textVal);
            },
            updated:function(){
                this.$emit("updated",this.textVal);
            }
        },

        mounted: function () {
            var self = this;
            /**
             * todo
             * should bind custom element
             */
            $('.has-clear input[type="text"]').on('input propertychange', function() {
                var $this = $(this);
                var visible = Boolean($this.val());
                $this.siblings('.form-control-clear').toggleClass('hidden', !visible);
            }).trigger('propertychange');

            $('.form-control-clear').click(function() {
                self.textVal = '';
                $(this).siblings('input[type="text"]').val('')
                    .trigger('propertychange').focus();
            });
        }
    }
</script>


<style scoped>
.search-button .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
}

.search-button .input-group[class*="col-"] {
    float: none;
    padding-left: 0;
    padding-right: 0;
}

.search-button .input-group .form-control {
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0;
}

.search-button .input-group .form-control:hover,
.search-button .input-group .form-control:focus,
.search-button .input-group .form-control.input-focus {
    z-index: 4;
}

.search-button .input-group .input-icon-group>.form-control {
    padding-left: 12px;
}

.search-button .input-group .input-icon-group>.icon {
    z-index: 4;
}

.search-button .input-group-btn,
.search-button .input-group .form-control,
.search-button .input-group .input-icon-group {
    display: table-cell;
}

.search-button .input-group-addon:not(:first-child):not(:last-child),
.search-button .input-group-btn:not(:first-child):not(:last-child),
.search-button .input-group .form-control:not(:first-child):not(:last-child),
.search-button .input-group .input-icon-group:not(:first-child):not(:last-child) {
    border-radius: 0;
}

.search-button .input-group .input-icon-group:not(:first-child):not(:last-child) .form-control {
    border-radius: 0;
}

.search-button .input-group-addon,
.search-button .input-group-btn {
    width: 1%;
    white-space: nowrap;
    vertical-align: middle;
}

.search-button .input-group .form-control:first-child,
.search-button .input-group-btn:first-child>.btn,
.search-button .input-group-btn:first-child>.btn-group>.btn,
.search-button .input-group-btn:first-child>.dropdown-toggle,
.search-button .input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle),
.search-button .input-group-btn:last-child>.btn-group:not(:last-child)>.btn,
.search-button .input-group .btn-group-vertical>.btn {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
}

.search-button .input-group .form-control:last-child,
.search-button .input-group-btn:last-child>.btn,
.search-button .input-group-btn:last-child>.btn-group>.btn,
.search-button .input-group-btn:last-child>.dropdown-toggle,
.search-button .input-group-btn:first-child>.btn:not(:first-child),
.search-button .input-group-btn:first-child>.btn-group:not(:first-child)>.btn,
.search-button .input-group .btn-group-vertical>.btn {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}

.search-button .input-group-btn:last-child>.dropdown-menu {
    left: auto;
    right: 0;
}

.search-button .input-icon-group {
    position: relative;
}

.search-button .input-icon-group>.form-control {
    padding-left: 30px;
    padding-right: 36px;
}

.search-button .input-icon-label {
    position: absolute;
    left: 9px;
    top: 50%;
    margin-top: -10px;
    color: #666666;
}

.search-button .input-icon-group .loader,
.search-button .input-icon-group .icon {
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -8px;
}

.search-button .input-icon-group .icon-cancel {
    opacity: 0.4;
}

.search-button .input-icon-group .icon-cancel:hover {
    cursor: pointer;
    opacity: 1;
}

.search-button .input-group-btn {
    position: relative;
    font-size: 0;
    white-space: nowrap;
}

.search-button .input-group-btn:first-child>.btn,
.search-button .input-group-btn:first-child>.btn-group {
    z-index: 3;
    margin-right: -1px;
}

.search-button .input-group-btn:first-child>.btn:hover,
.search-button .input-group-btn:first-child>.btn-group:hover {
    z-index: 3;
}

.search-button .input-group-btn:last-child>.btn,
.search-button .input-group-btn:last-child>.btn-group {
    z-index: 3;
    margin-left: -1px;
}

.search-button .input-group-btn:last-child>.btn:hover,
.search-button .input-group-btn:last-child>.btn-group:hover {
    z-index: 3;
}

.search-button .input-group-btn>.btn {
    position: relative;
}

.search-button .input-group-btn>.btn+.btn {
    margin-left: -1px;
}

.search-button .input-group-btn>.btn:focus,
.search-button .input-group-btn>.btn:active {
    z-index: 4;
}
</style>