<template>
    <div class="register-bg d-flex align-center justify-center">
        <v-card
            class="mx-auto register-card"
            max-width="420"
            elevation="12"
            title="สมัครสมาชิก"
        >
            <v-container>
                <!-- Logo -->
                <div class="text-center mb-4">
                    <v-avatar size="64" class="mb-2">
                        <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg"></v-img>
                    </v-avatar>
                    <div class="register-desc">
                        สร้างบัญชีใหม่เพื่อใช้งานระบบของเรา
                    </div>
                </div>

                <v-text-field
                    v-model="user_id"
                    color="orange"
                    label="รหัสผู้ใช้"
                    variant="outlined"
                    class="register-input"
                    prepend-inner-icon="mdi-account"
                ></v-text-field>

                <v-text-field
                    v-model="username"
                    color="orange"
                    label="ชื่อผู้ใช้"
                    variant="outlined"
                    class="register-input"
                    prepend-inner-icon="mdi-account-circle"
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    color="orange"
                    label="รหัสผ่าน"
                    placeholder="กรอกรหัสผ่านของคุณ"
                    variant="outlined"
                    type="password"
                    class="register-input"
                    prepend-inner-icon="mdi-lock"
                ></v-text-field>

                <v-text-field
                    v-model="first_name"
                    color="orange"
                    label="ชื่อจริง"
                    variant="outlined"
                    class="register-input"
                    prepend-inner-icon="mdi-account-edit"
                ></v-text-field>

                <v-text-field
                    v-model="last_name"
                    color="orange"
                    label="นามสกุล"
                    variant="outlined"
                    class="register-input"
                    prepend-inner-icon="mdi-account-edit-outline"
                ></v-text-field>

                <v-text-field
                    v-model="age"
                    color="orange"
                    label="อายุ"
                    placeholder="กรอกอายุของคุณ"
                    variant="outlined"
                    type="number"
                    class="register-input"
                    prepend-inner-icon="mdi-cake-variant"
                ></v-text-field>

                <v-select
                    v-model="gender"
                    :items="['ชาย', 'หญิง', 'อื่นๆ']"
                    color="orange"
                    label="เพศ"
                    variant="outlined"
                    class="register-input"
                    prepend-inner-icon="mdi-gender-male-female"
                ></v-select>

                <v-checkbox
                    v-model="terms"
                    color="orange"
                    label="ฉันยอมรับข้อตกลงและเงื่อนไข"
                    class="register-checkbox"
                ></v-checkbox>
            </v-container>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange" class="register-btn" @click="submitRegister">
                    สมัครสมาชิก
                    <v-icon icon="mdi-chevron-right" end></v-icon>
                </v-btn>
            </v-card-actions>

            <!-- Link to login -->
            <div class="text-center mt-3 mb-2">
                <span>มีบัญชีอยู่แล้ว?</span>
                <router-link to="/" class="login-link">เข้าสู่ระบบ</router-link>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user_id: '',
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            age: '',
            gender: '',
            terms: false
        }
    },
    methods: {
        async submitRegister() {
            if (!this.terms) {
                alert('กรุณายอมรับข้อตกลงและเงื่อนไข');
                return;
            }
            try {
                const response = await fetch('http://localhost:3000/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: this.user_id,
                        username: this.username,
                        password: this.password,
                        first_name: this.first_name,
                        last_name: this.last_name,
                        age: this.age,
                        gender: this.gender
                    })
                });
                if (response.ok) {
                    alert('สมัครสมาชิกสำเร็จ');
                    this.$router.push('/');
                } else {
                    alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
                }
            } catch (error) {
                alert('เกิดข้อผิดพลาดในการเชื่อมต่อ API');
            }
        }
    }
}
</script>

<style scoped>
.register-bg {
    min-height: 100vh;
    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}
.register-card {
    border-radius: 18px;
    box-shadow: 0 8px 32px 0 rgba(255, 87, 34, 0.18);
    background: #fff;
    border: 2px solid #ff5722;
}
.register-input {
    margin-bottom: 18px;
}
.register-btn {
    font-weight: bold;
    letter-spacing: 1px;
    border-radius: 8px;
    background: linear-gradient(90deg, #ff5722 0%, #ff9800 100%);
    color: #fff !important;
    box-shadow: 0 2px 8px rgba(255, 152, 0, 0.15);
}
.register-btn:hover {
    background: linear-gradient(90deg, #ff9800 0%, #ff5722 100%);
}
.register-checkbox {
    margin-top: 10px;
}
.register-desc {
    color: #ff9800;
    font-size: 1.1rem;
    margin-bottom: 8px;
}
.login-link {
    color: #ff5722;
    font-weight: bold;
    margin-left: 4px;
    text-decoration: none;
}
.login-link:hover {
    text-decoration: underline;
}
</style>