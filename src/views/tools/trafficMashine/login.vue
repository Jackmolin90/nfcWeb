<template>
  <el-form
    :model="form.data"
    :rules="form.rules"
    ref="ruleForm"
    label-width="auto"
    class="demo-ruleForm"
  >
    <el-form-item label="IP" prop="ip">
      <el-input v-model="form.data.ip" placeholder="192.168.1.1" />
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input v-model="form.data.password" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-loading="form.loading" @click="submitForm"
        >link</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        loading: false,
        rules: {
          password: [
            { required: true, message: "password", trigger: "blur" },
          ],
          ip: [
            { required: true, message: "IP", trigger: "blur" },
            {
              validator: (rule, value, callback) => {
                let ipr =
                  /^(0|[1-9]?|1\d\d?|2[0-4]\d|25[0-5])\.(0|[1-9]?|1\d\d?|2[0-4]\d|25[0-5])\.(0|[1-9]?|1\d\d?|2[0-4]\d|25[0-5])\.(0|[1-9]?|1\d\d?|2[0-4]\d|25[0-5])$/;
                if (ipr.test(value)) {
                  callback();
                } else {
                  return callback(new Error("IP"));
                }
              },
              trigger: "blur",
            },
          ],
        },
        data: { ip: "", password: "" },
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("submitForm", this.form);
        }
      });
    },
  },
};
</script>