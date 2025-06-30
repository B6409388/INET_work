<template>
  <div class="apicon-bg">
    <v-container>
      <v-row class="justify-center mb-8">
        <v-col cols="12" class="text-center">
          <h1 class="shopee-title">Shopee-Like Shop</h1>
        </v-col>
      </v-row>

      <!-- ปุ่มเพิ่มสินค้า -->
      <v-row class="mb-4" justify="center">
        <v-btn
          color="deep-orange accent-2"
          class="white--text font-weight-bold create-product-btn"
          elevation="4"
          large
          rounded
          @click="showCreateDialog = true"
          prepend-icon="mdi-plus-box"
        >
          เพิ่มสินค้าใหม่
        </v-btn>
      </v-row>

      <!-- Popup สร้างสินค้า -->
      <v-dialog v-model="showCreateDialog" max-width="500">
        <v-card class="pa-4 create-dialog-card">
          <v-card-title class="headline font-weight-bold text-center orange--text mb-2">
            <v-icon color="deep-orange accent-2" class="mr-2">mdi-plus-box</v-icon>
            สร้างสินค้าใหม่
          </v-card-title>
          <v-divider class="mb-4" />
          <v-card-text>
            <v-form ref="createForm" v-model="valid">
              <v-text-field
                v-model="newProduct.product_id"
                label="Product ID"
                :rules="[v => !!v || 'กรุณากรอก Product ID']"
                required
                prepend-inner-icon="mdi-barcode"
                color="deep-orange accent-2"
                class="mb-3"
              />
              <v-text-field
                v-model="newProduct.name"
                label="ชื่อสินค้า"
                :rules="[v => !!v || 'กรุณากรอกชื่อสินค้า']"
                required
                prepend-inner-icon="mdi-tag"
                color="deep-orange accent-2"
                class="mb-3"
              />
              <v-text-field
                v-model="newProduct.description"
                label="รายละเอียด"
                :rules="[v => !!v || 'กรุณากรอกรายละเอียด']"
                required
                prepend-inner-icon="mdi-text"
                color="deep-orange accent-2"
                class="mb-3"
              />
              <v-text-field
                v-model.number="newProduct.price"
                label="ราคา"
                type="number"
                :rules="[v => v > 0 || 'กรุณากรอกราคา']"
                required
                prepend-inner-icon="mdi-currency-thb"
                color="deep-orange accent-2"
                class="mb-3"
              />
              <v-text-field
                v-model.number="newProduct.stock"
                label="สต็อก"
                type="number"
                :rules="[v => v >= 0 || 'กรุณากรอกสต็อก']"
                required
                prepend-inner-icon="mdi-warehouse"
                color="deep-orange accent-2"
                class="mb-3"
              />
              <v-file-input
                v-model="newProduct.imageFile"
                label="เลือกรูปภาพสินค้า"
                accept="image/*"
                prepend-icon="mdi-image"
                show-size
                clearable
                class="mb-3"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text color="grey" class="mr-2" @click="showCreateDialog = false">
              <v-icon left>mdi-close</v-icon> ยกเลิก
            </v-btn>
            <v-btn
              color="deep-orange accent-2"
              class="white--text font-weight-bold"
              elevation="2"
              @click="createProduct"
            >
              <v-icon left>mdi-check-circle</v-icon> สร้างสินค้า
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- รายการสินค้า -->
      <v-row class="ma-2" justify="center">
        <v-col
          v-for="(item, index) in apidata"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="mx-auto my-4 shopee-card" max-width="350" elevation="8" rounded="lg">
            <v-img
              :src="'http://localhost:3000' + item.image"
              height="180"
              class="rounded-t-lg shopee-img"
              cover
            />
            <v-card-title class="headline font-weight-bold text-center shopee-name">
              {{ item.name }}
            </v-card-title>
            <v-card-subtitle class="text-center grey--text shopee-desc">
              {{ item.description }}
            </v-card-subtitle>
            <v-divider />
            <v-card-text>
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="font-weight-medium">ราคา:</span>
                <span class="red--text font-weight-bold">{{ item.price }} บาท</span>
              </div>
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="font-weight-medium">คงเหลือ:</span>
                <span class="blue--text font-weight-bold">{{ item.stock }} ชิ้น</span>
              </div>
              <v-text-field
                v-model="quantities[item._id]"
                type="number"
                label="จำนวนที่ต้องการสั่งซื้อ"
                min="1"
                dense
                outlined
                hide-details
                class="mt-2"
                style="max-width: 120px"
              />
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                color="deep-orange accent-2"
                class="white--text shopee-btn"
                @click="buyItem(item)"
                elevation="2"
                rounded
              >
                ซื้อสินค้า
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      apidata: [],
      quantities: {},
      showCreateDialog: false,
      valid: false,
      newProduct: {
        product_id: "",
        name: "",
        description: "",
        price: null,
        quantity: null,
        stock: null,
        imageFile: null,
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get("http://localhost:3000/api/products").then((response) => {
        this.apidata = response.data;
        this.apidata.forEach((item) => {
          if (!this.quantities[item._id]) {
            this.quantities[item._id] = 1;
          }
        });
      });
    },
    async createProduct() {
      if (!this.$refs.createForm.validate()) return;

      try {
        const formData = new FormData();
        formData.append("product_id", this.newProduct.product_id);
        formData.append("name", this.newProduct.name);
        formData.append("description", this.newProduct.description);
        formData.append("price", this.newProduct.price);
        formData.append("stock", this.newProduct.stock);
        if (this.newProduct.imageFile) {
          formData.append("image", this.newProduct.imageFile);
        }

        await this.axios.post("http://localhost:3000/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        Swal.fire({
          icon: "success",
          title: "สร้างสินค้าสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });

        this.showCreateDialog = false;
        this.newProduct = {
          product_id: "",
          name: "",
          description: "",
          price: null,
          quantity: null,
          stock: null,
          imageFile: null,
        };
        this.getData();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถสร้างสินค้าได้",
        });
      }
    },
    async buyItem(item) {
      const quantity = parseInt(this.quantities[item._id]) || 1;
      if (quantity < 1) {
        return Swal.fire({
          icon: "warning",
          title: "จำนวนไม่ถูกต้อง",
          text: "กรุณากรอกจำนวนให้ถูกต้อง",
        });
      }

      if (quantity > item.stock) {
        return Swal.fire({
          icon: "error",
          title: "สต็อกไม่เพียงพอ",
          text: `เหลือ ${item.stock} ชิ้น`,
        });
      }

      const orderData = {
        order_id: "order-" + Date.now(),
        items: [{ product: item._id, quantity }],
      };
      const token = localStorage.getItem("token");
      if (!token) {
        return Swal.fire({
          icon: "info",
          title: "ยังไม่เข้าสู่ระบบ",
          text: "กรุณาเข้าสู่ระบบก่อนทำรายการสั่งซื้อ",
        });
      }

      try {
        await this.axios.post("http://localhost:3000/api/orders", orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire({
          icon: "success",
          title: "สั่งซื้อสำเร็จ",
          text: `สั่งซื้อ ${quantity} ชิ้น เรียบร้อยแล้ว`,
          timer: 2000,
          showConfirmButton: false,
        });

        this.getData();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถทำรายการได้",
          text: error.response?.data?.error || "ไม่ทราบสาเหตุ",
        });
      }
    },
  },
};
</script>


<style scoped>
.apicon-bg {
  background-image: url('https://inwfile.com/s-dm/evp65z.jpg'); /* วาง bg-shop.jpg ไว้ใน public/images/ */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding-top: 32px;
  padding-bottom: 32px;
}
.create-product-btn {
  font-size: 1.1rem;
  letter-spacing: 1px;
  padding-left: 24px;
  padding-right: 24px;
}
.create-dialog-card {
  border-radius: 18px;
  background: #fff8f4;
}
.v-card-title.headline {
  font-size: 1.5rem;
}
.v-text-field input {
  background: #fff;
  border-radius: 8px;
}
.v-btn[large] {
  font-size: 1.1rem;
}
</style>
