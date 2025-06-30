<template>
  <div class="apicon-bg">
    <v-container>
      <!-- Title -->
      <v-row class="justify-center mb-2">
        <v-col cols="12" class="text-center">
          <h1 class="shopee-title">Shopee-Like Shop</h1>
        </v-col>
      </v-row>

      <!-- Banner Carousel -->
      <v-row class="justify-center mb-8">
        <v-col cols="12" md="10">
          <v-carousel
            cycle
            height="220"
            hide-delimiter-background
            show-arrows-on-hover
            class="shopee-carousel"
          >
            <v-carousel-item v-for="(banner, i) in banners" :key="i">
              <v-img :src="banner.img" :alt="banner.title" class="banner-img">
                <div class="banner-caption">
                  <h2>{{ banner.title }}</h2>
                  <p>{{ banner.desc }}</p>
                </div>
              </v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>

      <!-- Filter Section -->
      <v-row class="justify-center mb-6">
        <v-col cols="12" md="8">
          <v-text-field
            v-model="filter.keyword"
            label="ค้นหาสินค้า"
            prepend-inner-icon="mdi-magnify"
            outlined
            dense
            clearable
          />
        </v-col>
        <v-col cols="6" md="2">
          <v-text-field
            v-model.number="filter.minPrice"
            label="ราคาต่ำสุด"
            type="number"
            outlined
            dense
          />
        </v-col>
        <v-col cols="6" md="2">
          <v-text-field
            v-model.number="filter.maxPrice"
            label="ราคาสูงสุด"
            type="number"
            outlinedผ
            dense
          />
        </v-col>
      </v-row>

      <!-- Product Cards -->
      <v-row class="ma-2" justify="center">
        <v-col
          v-for="(item, index) in filteredProducts"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="mx-auto my-4 shopee-card"
            max-width="350"
            elevation="10"
            rounded="xl"
          >
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
  @click="addToCart(item)"
  elevation="2"
  rounded
>
  เพิ่มเข้าตะกร้า
</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      apidata: [],
      quantities: {},
      filter: {
        keyword: "",
        minPrice: null,
        maxPrice: null,
      },
      banners: [
        {
          img: "https://da.lnwfile.com/_/da/_raw/up/c6/e7.jpg",
          title: "ลดราคาสินค้าสุดพิเศษ!",
          desc: "ช้อปเลยวันนี้ รับส่วนลดสูงสุด 50% เฉพาะสินค้าร่วมรายการ",
        },
        {
          img: "https://da.lnwfile.com/_/da/_raw/qx/3e/t1.jpg",
          title: "ส่งฟรีทั่วไทย",
          desc: "เมื่อสั่งซื้อครบ 499 บาทขึ้นไป",
        },
        {
          img: "https://da.lnwfile.com/_/da/_raw/ya/gn/b9.jpg",
          title: "สินค้าใหม่มาแรง",
          desc: "อัปเดตสินค้าล่าสุดก่อนใครที่นี่!",
        },
      ],
    };
  },
  computed: { 
    filteredProducts() {
      return this.apidata.filter((item) => {
        const keywordMatch = item.name
          .toLowerCase()
          .includes((this.filter.keyword || "").toLowerCase());
        const minPriceMatch =
          this.filter.minPrice === null ||
          this.filter.minPrice === "" ||
          item.price >= this.filter.minPrice;
        const maxPriceMatch =
          this.filter.maxPrice === null ||
          this.filter.maxPrice === "" ||
          item.price <= this.filter.maxPrice;
        return keywordMatch && minPriceMatch && maxPriceMatch;
      });
    },
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
  addToCart(item) {
    const quantity = parseInt(this.quantities[item._id]) || 1;

    if (quantity < 1) {
      Swal.fire({
        icon: 'warning',
        title: 'จำนวนไม่ถูกต้อง',
        text: 'กรุณากรอกจำนวนให้ถูกต้อง',
      });
      return;
    }

    if (quantity > item.stock) {
      Swal.fire({
        icon: 'error',
        title: 'สต็อกไม่พอ',
        text: `สต็อกคงเหลือไม่เพียงพอ (เหลือ ${item.stock} ชิ้น)`,
      });
      return;
    }

    // โหลดตะกร้าจาก localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // ตรวจสอบว่ามีสินค้าอยู่แล้วในตะกร้าหรือยัง
    const existingItemIndex = existingCart.findIndex((i) => i.productId === item._id);
    if (existingItemIndex !== -1) {
      // ถ้ามีอยู่แล้ว ให้บวกจำนวน
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // ถ้ายังไม่มี ให้เพิ่มใหม่
      existingCart.push({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: quantity,
      });
    }
    // เซฟกลับเข้า localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    Swal.fire({
      icon: 'success',
      title: 'เพิ่มสินค้าสำเร็จ',
      text: `เพิ่ม ${item.name} จำนวน ${quantity} ชิ้น เข้าตะกร้าแล้ว`,
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      window.location.reload();
    });
  }

  },
};
</script>

<style scoped>
.apicon-bg {
  background: linear-gradient(135deg, #fff7f0 0%, #ffe0e0 100%);
  min-height: 100vh;
  padding-bottom: 40px;
}
.shopee-title {
  font-size: 2.7rem;
  color: #ee4d2d;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 0.2em;
  text-shadow: 1px 2px 8px #fff0e6;
}
.shopee-card {
  border: 2px solid #fff0e6;
  transition: box-shadow 0.2s, transform 0.2s;
  background: #fff;
  box-shadow: 0 4px 24px #ee4d2d22;
}
.shopee-card:hover {
  box-shadow: 0 12px 32px #ee4d2d44;
  transform: translateY(-6px) scale(1.04);
  border-color: #ee4d2d;
}
.shopee-img {
  object-fit: cover;
  background: #fff0e6;
}
.shopee-name {
  color: #ee4d2d;
  font-size: 1.3rem;
}
.shopee-btn {
  font-weight: bold;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #ff7337 0%, #ee4d2d 100%);
  box-shadow: 0 2px 8px #ee4d2d33;
}
.shopee-desc {
  font-size: 1.05rem;
}
.shopee-carousel {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 24px #ee4d2d22;
}
.banner-img {
  height: 220px;
  object-fit: cover;
  position: relative;
}
.banner-caption {
  position: absolute;
  bottom: 18px;
  left: 32px;
  color: #fff;
  background: rgba(238,77,45,0.85);
  padding: 12px 28px;
  border-radius: 12px;
  box-shadow: 0 2px 12px #ee4d2d44;
}
.banner-caption h2 {
  margin: 0 0 4px 0;
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: 1px;
}
.banner-caption p {
  margin: 0;
  font-size: 1rem;
}
</style>
