<template>
  <el-container class="tax-app-login-container">
    <el-header class="header" height="105px">
      <div class="logo">
        <img
          class="pic-404__child right"
          src="@/assets/tax/images/logo/logo_gd.png"
          alt="404"
        />
      </div>
    </el-header>
    <el-main class="main">
      <el-carousel class="carousel-container">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="carousel-item">
            <img src="http://test.aierp.cn:8089//vendor/img/login/login-bg-1.png" />
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="form-border">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">登 录</h3>
          </div>

          <el-form-item prop="loginName">
            <span class="svg-container">
              <!-- <svg-icon icon-class="user" /> -->
            </span>
            <el-input
              ref="loginName"
              v-model="loginForm.loginName"
              placeholder="Username"
              name="loginName"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
              <span class="svg-container">
                <!-- <svg-icon icon-class="password" /> -->
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
              </span>
            </el-form-item>
          </el-tooltip>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
          >Login</el-button>
        </el-form>
      </div>
    </el-main>
    <el-footer class="footer">金财管家v1.0.45.3083 版权所有 © 2018 金财互联数据服务有限公司 粤ICP备14007298号</el-footer>
    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
  </el-container>
</template>

<script>
import { validPhone } from "@ttkv/lib/utils/validate";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        loginName: "13760749780",
        password: "Lq123456",
        remember: true
      },
      loginRules: {
        loginName: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= "a" && key <= "z")) ||
          (!shiftKey && (key >= "A" && key <= "Z"))
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("tax_user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    register() {
      const parent = window.parent;
      if (!parent) return;
      parent.postMessage &&
        parent.postMessage(
          JSON.stringify({
            type: "new-tag",
            tabName: window.document.title, // 标签标题
            link: "http://www.baidu.com" // 目标页面
          }),
          // 父级域名
          "http://localhost:8003"
        );
    }
  }
};
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.tax-app-login-container {
  min-height    : 100%;
  width         : 100%;
  overflow      : auto;
  display       : flex;
  flex-direction: column;
  flex          : auto;

  .header {
    padding            : 10px 20px;
    background-repeat  : no-repeat;
    box-shadow         : 0 1px 4px rgba(0, 21, 41, 0.08);
    background-color   : #1d82d8;
    background-position: right;
    background-image   : url("~@/assets/tax/images/common/logintop.png");
  }

  .main {
    flex          : 1;
    flex-direction: row;
    position      : relative;
    overflow      : hidden;
    padding       : 0;
    min-height    : 700px;

    .carousel-container {
      position: absolute;
      width   : 100%;
      height  : 100%;

      .carousel-item {
        height: 100%;

        img {
          // width        : 1009px;
          // height       : 263px;
          position        : absolute;
          top             : 50%;
          left            : 50%;
          padding-right   : 600px;
          transform       : translate(-50%, -50%);
        }
      }
    }

    .form-border {
      position : absolute;
      width    : 600px;
      max-width: 100%;
      padding  : 0px 0 0 500px;
      margin   : 0 auto;
      overflow : hidden;
      z-index  : 2;
      transform: translate(-50%, -50%);
      top      : 50%;
      left     : 50%;

      .login-form {
        border          : 1px #cccccc solid;
        padding         : 20px;
        border-radius   : 15px;
        background-color: rgba(255, 255, 255, 0.6);

        .tips {
          font-size    : 14px;
          color        : rgba(30, 28, 56, 0.815);
          margin-bottom: 10px;

          span {
            &:first-of-type {
              margin-right: 16px;
            }
          }
        }
      }
    }
  }

  .footer {
    padding         : 15px;
    background-color: #fff;
    border-top      : 1px #cccccc solid;
    text-align      : center;
    color           : #ccc;
  }

  .el-carousel__item h3 {
    color      : #475669;
    font-size  : 14px;
    opacity    : 0.75;
    line-height: 150px;
    margin     : 0;
  }

  .el-carousel__container {
    height: inherit;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #f7f5ee;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .el-carousel__indicator .el-carousel__button {
    background-color: #889aa4;
  }

  .el-carousel__indicator.is-active .el-carousel__button {
    background-color: #283443;
  }
}
</style>
