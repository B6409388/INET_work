<template>
  <v-container class="d-flex justify-center align-center login-bg" style="height: 100vh; margin: 0; padding: 0; width: 100vw; max-width: 100vw;">
    <v-card class="pa-8 rounded-xl elevation-10 login-card" max-width="400">
      <div class="text-center mb-6">
        <img src="https://upload.wikimedia.org/wikipedia/th/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png" alt="Logo" class="login-logo mb-2" />
        <div class="text-h5 font-weight-bold" style="color: #ee4d2d;">เข้าสู่ระบบ</div>
        <div class="text-caption" style="color: #888;">ยินดีต้อนรับเข้าสู่ระบบของเรา</div>
      </div>
      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="username"
          label="ชื่อผู้ใช้"
          prepend-inner-icon="mdi-account"
          outlined
          dense
          class="mb-3"
          color="orange"
          required
        />
        <v-text-field
          v-model="password"
          label="รหัสผ่าน"
          prepend-inner-icon="mdi-lock"
          type="password"
          outlined
          dense
          class="mb-1"
          color="orange"
          required
        />
        <v-btn color="orange darken-2" type="submit" block class="mb-2" style="color: white; font-weight: bold;">
          เข้าสู่ระบบ
        </v-btn>
        <div class="text-center mt-2">
          <span class="text-caption">ยังไม่มีบัญชี? <a href="/register" class="register-link">สมัครใหม่</a></span>
        </div>
      </v-form>
      <v-alert
        v-if="message"
        :type="isError ? 'error' : 'success'"
        class="mt-4"
        dense
        border="left"
      >
        {{ message }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
.login-bg {
  min-height: 100vh;
  height: 100vh;
  background: linear-gradient(135deg, #fff6f0 0%, #ffe3d3 100%);
}
.login-card {
  border: 1px solid #ffd6c0;
  box-shadow: 0 8px 24px 0 rgba(238,77,45,0.08);
}
.login-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
}
.forgot-link, .register-link {
  color: #ee4d2d;
  text-decoration: none;
  font-weight: 500;
}
.forgot-link:hover, .register-link:hover {
  text-decoration: underline;
}
</style>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);

          Swal.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            showConfirmButton: false,
            timer: 1500,
          });

          if (this.username === 'admin' && this.password === 'admin') {
            this.$router.push('/createproduct');
          } else {
            this.$router.push('/product');
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: data.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
          });
        }
      } catch (err) {
        console.error('Login Error:', err);
        Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์',
          text: err.message,
        });
      }
    },
  },
};
</script>

<style>
.login {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.login input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 12px;
}
</style>
