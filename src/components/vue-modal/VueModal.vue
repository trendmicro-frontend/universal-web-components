<template>
  <div>
    <div ref="modal" :class="classes" @click.self="close()" @keyup.esc="close()" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" :class="modalClasses" role="document">
            <div class="modal-content">
                <div v-if="needHeader" class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="icon icon-modal-close">
                    </span>
                  </button>
                  <h3 class="modal-title">
                      <slot name="title">
                          {{title}}
                      </slot>
                  </h3>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div v-if="needFooter" class="modal-footer">
                    <slot name="footer">
                        <button type="button" class="btn btn-primary" @click="ok">{{okText}}</button>
                        <button type="button" class="btn btn-default" @click="cancel">{{cancelText}}</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
    <div v-if="isShow" class="modal-backdrop fade in"></div>
  </div>
</template>
<script>
const prefixCls = "modal";
export default {
  name: "TmVueModal",
  props: {
    opened: {
      type: Function,
      default: () => {}
    },
    closed: {
      type: Function,
      default: () => {}
    },
    needHeader: {
      type: Boolean,
      default: true
    },
    needFooter: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "Modal"
    },
    type: {
      default: "md",
      validator(value) {
        return oneOf(value, ["xs", "sm", "md", "lg"]);
      }
    },
    okText: {
      type: String,
      default: "OK"
    },
    cancelText: {
      type: String,
      default: "Cancel"
    }
  },
  data() {
    return {
      isOpen: false,
      isShow: false,
      isOk: false,
      lastKnownBodyStyle: {
        overflow: "auto"
      }
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          in: this.isOpen,
          show: this.isShow
        }
      ];
    },
    modalClasses() {
      return `modal-${this.type}`;
    }
  },
  methods: {
    open() {
      this.isOk = false;
      this.isShow = true;
      this.$nextTick(function() {
        this.isOpen = true;
        this.$refs.modal.focus();
        this.lastKnownBodyStyle.overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        this.opened();
      });
    },
    close() {
      this.isOpen = false;
      this.$nextTick(function() {
        setTimeout(() => {
          this.isShow = false;
          document.body.style.overflow = this.lastKnownBodyStyle.overflow;
          this.closed();
        }, 500);
      });
    },
    ok() {
      this.isOk = true;
      this.close();
    },
    cancel() {
      this.isOk = false;
      this.close();
    }
  }
};
</script>