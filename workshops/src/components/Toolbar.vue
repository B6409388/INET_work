<template>
  <v-app>
    <!-- Toolbar ด้านบน -->
    <v-app-bar app color="#rgb(251, 225, 34)" dark flat>
      <v-toolbar-title class="font-weight-bold" style="font-family: 'Kanit', sans-serif;">
        My Workshop
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        to="/profile"
        tag="router-link"
        class="toolbar-btn profile-btn"
        style="font-family: 'Kanit', sans-serif; color: #fff; font-weight: bold;"
      >
        Profile
      </v-btn>
      <v-btn
        text
        to="/Cutgrade"
        tag="router-link"
        class="toolbar-btn"
        style="font-family: 'Kanit', sans-serif; color: #fff;"
      >
        ตัดเกรด
      </v-btn>
    </v-app-bar>

    <!-- เนื้อหาของ route ลูก เช่น profile.vue จะแสดงตรงนี้ -->
    <v-main style="padding: 0px 0px 0px;">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.profile-btn {
  background: rgba(255,255,255,0.08);
  border-radius: 8px;
  margin-right: 8px;
  transition: background 0.2s;
}
.profile-btn:hover {
  background: rgba(255,255,255,0.18);
}
</style>
