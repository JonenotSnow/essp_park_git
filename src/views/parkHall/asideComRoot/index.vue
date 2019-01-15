<template>
    <div class="active_index 3333333333">
        <div class="esspclearfix 3333333333">
            <div class="content_l text_align_r active_l 33333333333">
                <essp-aside></essp-aside>
            </div>
            <div class="content_r">
                <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
import EsspAside from "@/components/EsspAside";
export default {
  name: "",
  components: {
    EsspAside
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  },
  watch: {
  }
};
</script>

<style lang="less">
@import "../../../assets/css/mixin";
.active_index {
  .essp_width_auto();
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
