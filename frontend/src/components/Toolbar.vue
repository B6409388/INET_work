<template>
  <v-app>
    <v-card flat>
      <v-toolbar
        dark
        color="#f53d2d"
        style="background: linear-gradient(90deg, #f53d2d 0%, #ff7337 100%); box-shadow: 0 2px 8px rgba(245,61,45,0.08);"
        height="70"
      >
        <v-btn
          text
          class="font-weight-bold"
          style="font-size: 1.6rem; letter-spacing: 1px; text-transform: none;"
          @click="$router.push('/product')"
        >
          ระบบจัดการคำสั่งซื้อ
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn color="#ffb400" dark style="margin-right: 10px;" @click="$router.push('/oder')">
          <v-icon left>mdi-file-document</v-icon>
          รายการสั่งซื้อ
        </v-btn>

        <!-- ปุ่มตะกร้า -->
        <v-btn icon @click="dialogCart = true" style="margin-right: 10px;">
          <v-badge :content="cartItemCount" color="#ffb400" overlap v-if="cartItemCount > 0">
            <v-icon color="#fff" size="30">mdi-cart</v-icon>
          </v-badge>
          <v-icon v-else color="#fff" size="30">mdi-cart</v-icon>
        </v-btn>

        <!-- ปุ่ม user -->
        <v-btn icon @click="dialogUser = true" style="margin-right: 10px;">
          <v-icon color="#fff" size="30">mdi-account</v-icon>
        </v-btn>

        <!-- ปุ่มไป logout -->
        <v-btn icon @click="confirmLogout">
          <v-icon color="#fff" size="28">mdi-logout</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-main style="background: linear-gradient(180deg, #fff 0%, #fff6f6 100%); min-height: 100vh;">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <!-- Dialog ตะกร้าสินค้า -->
    <v-dialog v-model="dialogCart" max-width="600px" transition="dialog-bottom-transition">
      <v-card elevation="12" class="rounded-xl" style="border: 2px solid #f53d2d;">
        <v-card-title class="headline" style="background: linear-gradient(90deg, #f53d2d 0%, #ff7337 100%); color: #fff;">
          <v-icon left color="#fff" class="mr-2">mdi-cart</v-icon>
          ตะกร้าสินค้า
          <v-spacer />
          <v-btn icon @click="dialogCart = false">
            <v-icon color="#fff">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="background: #fff6f6;">
          <v-list v-if="cart.length" dense>
            <v-list-item
              v-for="(item, index) in cart"
              :key="item.product?._id || index"
              class="mb-2 rounded-lg"
              style="background: #fff; border: 1.5px solid #ffb400;"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.name || '-' }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  จำนวน: {{ item.quantity }} | ราคา: {{ item.price || 0 }} บาท
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn icon color="error" @click="removeCartItem(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
          <div v-else class="text-center grey--text py-8">
            <v-icon size="48" color="#ffb400">mdi-cart-off</v-icon>
            <div style="color: #f53d2d;">ไม่มีสินค้าในตะกร้า</div>
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="text-right font-weight-bold" style="color: #f53d2d; font-size: 1.2rem;">
            รวมทั้งหมด: <span style="color: #ff7337;">{{ cartTotalPrice }} บาท</span>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end" style="background: #fff6f6;">
          <v-btn color="#f53d2d" text @click="dialogCart = false" style="font-weight: bold;">
            <v-icon left color="#f53d2d">mdi-close</v-icon> ปิด
          </v-btn>
          <v-btn color="#ffb400" dark :disabled="cart.length === 0" @click="checkoutCart" style="font-weight: bold;">
            <v-icon left>mdi-cash-register</v-icon> ซื้อสินค้า
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog แก้ไขข้อมูลผู้ใช้ -->
    <v-dialog v-model="dialogUser" max-width="500px" transition="dialog-bottom-transition">
      <v-card elevation="12" class="rounded-xl" style="border: 2px solid #f53d2d;">
        <v-card-title class="headline" style="background: linear-gradient(90deg, #f53d2d 0%, #ff7337 100%); color: #fff;">
          <v-icon left color="#fff" class="mr-2">mdi-account</v-icon>
          แก้ไขข้อมูลผู้ใช้
          <v-spacer />
          <v-btn icon @click="dialogUser = false">
            <v-icon color="#fff">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text style="background: #fff6f6; padding-top: 20px;">
          <v-form ref="userForm" lazy-validation>
            <v-text-field
              v-model="user.username"
              label="Username"
              prepend-icon="mdi-account"
              outlined
              dense
              color="#f53d2d"
            />
            <v-text-field
              v-model="user.first_name"
              label="ชื่อ"
              prepend-icon="mdi-account"
              outlined
              dense
              color="#f53d2d"
            />
            <v-text-field
              v-model="user.last_name"
              label="นามสกุล"
              prepend-icon="mdi-account"
              outlined
              dense
              color="#f53d2d"
            />
            <v-text-field
              v-model="user.age"
              label="อายุ"
              prepend-icon="mdi-calendar"
              outlined
              type="number"
              dense
              color="#f53d2d"
            />
            <v-text-field
              v-model="user.gender"
              label="เพศ"
              prepend-icon="mdi-account"
              outlined
              type="text"
              dense
              color="#f53d2d"
            />
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end" style="background: #fff6f6;">
          <v-btn color="#f53d2d" text @click="updateUser()" style="font-weight: bold;">
            <v-icon left color="#f53d2d">mdi-content-save</v-icon> บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  name: "MainLayout",
  data() {
    return {
      dialogCart: false,
      dialogOrder: false,
      dialogUser: false,
      user: {
        user_id: "",
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        age: null,
        gender: "",
      },
      cart: [],
      cartItemCount: 0,
      orders: [],
    };
  },
  computed: {
    cartTotalPrice() {
      return this.cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    },
    totalAllPrice() {
      return this.orders.reduce((sum, order) => sum + (order.total_price || 0), 0);
    },
  },
  methods: {
    confirmLogout() {
      Swal.fire({
        title: 'ออกจากระบบ?',
        text: "คุณต้องการออกจากระบบใช่หรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ออกจากระบบ',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          this.goToLogin();
        }
      });
    },
    goToLogin() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    },
    removeCartItem(index) {
      this.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.getCartCount();
    },
    getCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      this.cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      this.cart = cart;
    },
    async checkoutCart() {
      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          icon: 'warning',
          title: 'ยังไม่ได้เข้าสู่ระบบ',
          text: 'กรุณาเข้าสู่ระบบก่อนทำรายการสั่งซื้อ',
        });
        return;
      }

      if (!this.cart.length) {
        Swal.fire({
          icon: 'info',
          title: 'ไม่มีสินค้าในตะกร้า',
          text: 'กรุณาเพิ่มสินค้าลงตะกร้าก่อนทำรายการ',
        });
        return;
      }

      const orderData = {
        order_id: "order-" + Date.now(),
        items: this.cart.map(item => ({
          product: item.productId, // ใช้ _id ของ product
          quantity: item.quantity || 1,
        })),
        total_price: this.cartTotalPrice
      };

      try {
        const res = await this.axios.post("http://localhost:3000/api/orders", orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        this.orders.push(res.data);
        this.cart = [];
        localStorage.setItem("cart", JSON.stringify([]));
        this.getCartCount();
        this.dialogCart = false;
        this.dialogOrder = true;

        await Swal.fire({
          icon: 'success',
          title: 'สั่งซื้อสำเร็จ',
          text: 'รายการของคุณถูกบันทึกเรียบร้อยแล้ว',
          confirmButtonText: 'ตกลง',
        });

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: error.response?.data?.error || "ไม่สามารถสั่งซื้อได้ในขณะนี้",
        });
      }
    },
    updateUser() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token is missing');
        return;
      }
      if (!this.user || !this.user._id) {
        console.error('User ID is missing');
        return;
      }
      this.axios.put(`http://localhost:3000/api/users/${this.user._id}`, this.user, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        this.dialogUser = false;
        this.$emit('user-updated', response.data);
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.error || 'เกิดข้อผิดพลาดในการอัปเดตผู้ใช้';
        if (this.$toast) {
          this.$toast.error(errorMessage);
        } else {
          alert(errorMessage);
        }
      });
    },
    fetchUser() {
      const token = localStorage.getItem('token');
      if (!token) return;
      this.axios.get('http://localhost:3000/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.user = res.data;
      })
      .catch(err => {
        console.error(err.response?.data || err);
      });
    },
    fetchOrders() {
      const token = localStorage.getItem('token');
      if (!token) return;
      this.axios.get('http://localhost:3000/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.orders = res.data;
      })
      .catch(err => {
        console.error(err.response?.data || err);
      });
    }
  },
  watch: {
    dialogUser(val) {
      if (val) {
        this.fetchUser();
      }
    },
    dialogCart(val) {
      if (val) this.getCartCount();
    }
  },
  mounted() {
    this.fetchOrders();
    this.getCartCount();
  },
};
</script>
