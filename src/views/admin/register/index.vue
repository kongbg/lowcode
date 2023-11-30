<template>
    <div class="admin-login__wrapper">
        <div class="login-form__wrapper">
            <div class="title">注 册</div>
            <div class="form">
                <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="用户名" prop="userName">
                        <el-input size="small" placeholder="请输入用户名" v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="passWord">
                        <el-input size="small" placeholder="请输入密码" v-model="form.passWord" show-password></el-input>
                    </el-form-item>
                    <el-form-item class="login-btn__wrapper">
                        <el-button type="primary" class="login-btn" size="small" :loading="loading" @click="register">注 册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { register } from '@/api/admin/user/index.js'
export default {
    name: 'AdminRegister',
    data () {
        return {
            loading: false,
            form: {
                userName: 'admin',
                passWord: '123456'
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        async register() {
            this.loading = true;
            let [err, res] = await register(this.form);
            this.loading = false;
            if (!err) {
                this.$message({
                    type: 'success',
                    message: '注册成功！'
                })

                setTimeout(() =>{
                    localStorage.clear();
                    this.$router.push({name: 'Adminlogin'})
                }, 1500)
            }
        }
    }
}
</script>
<style lang="less" scoped>
.admin-login__wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    /* background: rgb(119, 119, 197); */
    .login-form__wrapper {
        width: 400px;
        padding: 20px 40px;
        color: #303133;
        border-radius: 4px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-70%);
        border: 1px solid #ebeef5;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        .title {
            text-align: center;
            font-size: 20px;
            font-weight: 550;
            padding: 10px 0 30px;
        }
        /deep/.login-btn__wrapper {
            .el-form-item__content {
                margin-left: 0!important;
                text-align: center;
                .login-btn {
                    width: 240px;
                }
            }
        }
    }
}
</style>