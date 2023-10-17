<template>
  <div style="overflow: hidden" class="content-container">
    <div class="top-wrapper" v-if="showTop || title">
      <div class="left-wrapper">
        <span v-show="!!title">{{ $t(title) }}</span>
        <span v-show="!!subtitle">{{ $t(subtitle) }}</span>
      </div>
    </div>
    <el-row
      :style="{ 'background-color': bgcolor }"
      :gutter="20"
      class="display-pc-and-pad"
    >
      <el-col
        v-for="(item, cd) in titles"
        :key="cd"
        :span="item.colWidth || colWidth"
        class="ie_el_col"
        :style="{ 'text-align': position }"
      >
        <div class="warppaer_item">
          <div
            class="item-wrapper"
            v-for="(itemt, cdt) in item.titles || []"
            :key="cdt"
            v-show="!itemt.notShow"
          >
            <slot :name="`colrow_${itemt.title}`" :data="datas">
              <span
                class="tran-title"
                :style="{ width: titleWidth, 'text-align': titleAlign }"
                >{{ itemt.notT ? itemt.title : $t(itemt.title) }}
              </span>
              <span class="equal-width" v-if="itemt.type == 'address'">
                <el-popover
                  placement="bottom"
                  trigger="hover"
                  :content="datas[itemt.name || itemt.title || '']"
                >
                  <span slot="reference">
                    {{
                      getAddrFormat(datas[itemt.name || itemt.title || ""], 10)
                    }}
                  </span>
                </el-popover>
              </span>
              <span class="equal-width" v-else-if="itemt.isT">
                {{ $t(datas[itemt.name || itemt.title || ""]) }}
              </span>
              <span class="equal-width" v-else>
                <slot
                  :name="'colData_' + itemt.title"
                  :data="datas[itemt.title || '']"
                >
                  {{ datas[itemt.name || itemt.title || ""] }}
                </slot>
              </span>
            </slot>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="display-phone">
      <el-col
        :span="24"
        v-for="(item, cd) in phoneTitles"
        :key="cd"
        style="margin-bottom: 5px"
      >
        <div class="warppaer_item">
          <div class="item-wrapper">
            <slot :name="`colrow_phone_${item.title}`" :data="datas">
              <span class="tran-title"
               :style="{ width: titleWidth, 'text-align': titleAlign }"
              >{{ $t(item.title) }} </span>
              <span class="equal-width" v-if="item.type == 'address'">
                <el-popover
                  placement="bottom"
                  trigger="hover"
                  :content="datas[item.name || item.title || '']"
                >
                  <span slot="reference">
                    {{
                      getAddrFormat(datas[item.name || item.title || ""], 8)
                    }}
                  </span>
                </el-popover>
              </span>
              <span v-else-if="item.isT" class="equal-width">{{
               $t( datas[item.name || item.title || ""])

              }}</span>
              <span v-else class="equal-width">{{
                datas[item.name || item.title || ""]
              }}</span>
            </slot>
          </div>
        </div>
      </el-col>
    </el-row>
    <slot name="ie_bottom"> </slot>
  </div>
</template>
<script>
import * as helper from "@/utils/helper";
export default {
  props: {
    showTop: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    colWidth: {
      type: Number,
      default: 12,
    },
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
    position: {
      type: String,
      default: "left",
    },
    bgcolor: {
      type: String,
      default: "#f9fafc",
    },
    titleWidth: {
      type: String,
      default: "auto",
    },
    titleAlign: {
      type: String,
      default: "left",
    },
    datas: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    getAddrFormat(data, number) {
      return helper.getAddrFormat(data, number);
    },
  },
  computed: {
    phoneTitles() {
      let titles = [];
      (this.titles || []).forEach((element) => {
        (element.titles || []).forEach((item) => {
          titles.push(item);
        });
      });

      return titles;
    },
  },
};
</script>
<style scoped>
.warppaer_item {
  padding: 5px 15px;
  margin: 0px auto;
  display: inline-block;
  text-align: left;
  max-width: 100%;
}

.warppaer_item .item-wrapper {
  font-weight: 400;
  line-height: 36px;
  font-size: 14px;
  background: initial;
  max-width: 100%;
  overflow: hidden;
}
.warppaer_item .item-wrapper .equal-width {
  font: inherit;
  vertical-align: baseline;
  color: #2d353b;
}
.warppaer_item .item-wrapper .equal-width .cursor {
  color: #5e89d8;
  font-weight: 600;
}
.tran-title {
  color: #888;
  display: inline-block;
}
.top-wrapper .left-wrapper span:first-child {
  font-size: 16px;
  font-weight: 400;
  color: #2d353b !important;
}

.top-wrapper .left-wrapper span:last-child {
  font-size: 12px;
  color: #b3bdc8;
  margin-left: 20px;
}
</style>
<style >
.ieHome .content-container {
  margin-bottom: 20px !important;
  margin-top: 20px !important;
}
</style> 