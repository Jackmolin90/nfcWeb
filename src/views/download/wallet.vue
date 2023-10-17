<template>
  <div class="txns-container">
    <div class="top-container"></div>
    <div class="content-container">
      <div class="block-container display-pc-and-pad">
        <div class="content-wrapper">
          <div class="top-wrapper">
            <div class="left-wrapper">
              <span>BluebeMask Extension</span>
              <span></span>
            </div>
            <div class="right-wrapper">
               <a href="/static/plugins/bluebeMask.zip"
                ><el-button icon="el-icon-download" type="primary">Download</el-button></a
              >
            </div>
          </div>
          <div class="center-context">
            <div style="maring: 0px auto; display: inline-table">
              <div style="text-align: left; color: #555"></div>
              <div>
                <div  class="img_divs" v-for="(url, key) in srcList" :key="key">
                  <div style="font-size:13px;text-align:left">
                    {{ imgStrs[key] }}
                  </div>
                  <el-image
                    class="demo-image__preview"
                    :src="url"                   
                  >
                  </el-image>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- < div class="accountsinfo-container">
    <div class="top-container">
     
    </div>
    <div class="content-container">
          <div class="top-container">
            <div class="left-wrapper">
              <span style="color:#333">BluebeMask Extension</span>
              <span></span>
            </div>
          </div>
      <div class="content-wrapper">
        <div class="center-context">
          <div style="maring: 0px auto; display: inline-table">
            <div style="text-align: left; color: #555">
              <li>1.unpacked compressed file "bluebeMask.zip"</li>
              <li>2.browser=>extensions=>Developer mode(Open)</li>
              <li>3.Load unpacked</li>
            </div>
            <a href="static/plugins/bluebeMask.zip"
              ><el-button type="primary">Download</el-button></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>-->
</template>
<script>
export default {
  data() {
    return {
      srcList: [
        "/static/images/extensions/extensions_1.png",
        "/static/images/extensions/extensions_2.png",
        "/static/images/extensions/extensions_3.png",
        "/static/images/extensions/extensions_4.png",
      ],
      imgStrs: [
        "1.unpacked compressed file 'bluebeMask.zip' =>chrome(folder)",
        "2.Google Chrome=>extensions",
        "3.Developer mode(ON)",
        "4.Load unpacked=>Select chrome(folder)",
      ],
    };
  },
  methods: {
    dowloadFile() {
      window.open("");
    },
  },
};
</script>
<style scoped>
.center-context {
  min-height: 400px;
  text-align: center;
  padding-top: 20px;
}
.demo-image__preview {
  width: 500px;
  height: 200px;
  margin: 5px;
}
.img_divs{
  box-shadow: 3px 3px 8px #ccc;
  margin-bottom: 30px;
  padding:10px;
}
</style>