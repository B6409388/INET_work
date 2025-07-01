<template>
  <div
    style="
      min-height: 100vh;
      width: 100vw;
      background-image: url('https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg');
      background-repeat: no-repeat;
      background-size: 500px;
      background-position: center 80px;
      background-color: #DA291C;
    "
  >
    <v-container fluid class="pa-0 fill-height" style="min-height: 100vh; max-width: 100vw;">
      <v-row class="text-center" align="center" justify="center" style="min-height: 100vh;">
        <v-col cols="12" md="10" lg="8" class="mx-auto">

          <!-- รูปโปรไฟล์ -->
          <v-fade-transition>
            <v-img
              :src="require('@/assets/profile.jpg')"
              class="my-6 rounded-circle mx-auto elevation-10"
              contain
              height="220"
              width="220"
              style="border: 8px solid #FBE122; box-shadow: 0 8px 32px rgba(218,41,28,0.25); background: #fff;"
            />
          </v-fade-transition>

          <!-- แนะนำตัว -->
          <v-slide-y-transition>
            <v-card
              class="pa-8 mx-auto mb-6"
              max-width="900"
              elevation="8"
              style="background: #DA291C; color: #fff; border: 2px solid #FBE122;"
            >
              <h3 class="font-weight-bold mb-3" style="color: #FBE122; font-size: 2.4rem;">
                สวัสดีครับ ผมชื่อ {{ name }} <span style="font-size:1.3rem;">⚽️</span>
              </h3>
              <p class="subheading font-weight-regular" style="font-size: 1.3rem;">
                ยินดีต้อนรับสู่เว็บไซต์แนะนำตัวของผม<br />
                ผมเป็นนักพัฒนาเว็บและแฟนแมนยูตัวยง!<br />
                <span style="color:#FBE122;">Glory Glory Man United! ❤️💛</span>
              </p>
            </v-card>
          </v-slide-y-transition>

          <!-- ข้อมูลส่วนตัว -->
          <v-slide-x-transition>
            <v-card
              class="pa-7 mx-auto mb-6"
              max-width="900"
              elevation="6"
              style="background: #FBE122; color: #DA291C; border: 2px solid #DA291C;"
            >
              <h2 class="headline font-weight-bold mb-3" style="color: #DA291C;">ข้อมูลส่วนตัว</h2>
              <v-row justify="center">
                <v-col cols="12" md="10" class="text-left mx-auto">
                  <ul>
                    <li>
                      <v-icon color="red darken-2" small class="mr-2">mdi-account</v-icon>
                      <strong>ชื่อ:</strong> {{ name }} (แต่เพื่อนเรียก "บีม" ก็ได้นะ)
                    </li>
                    <li>
                      <v-icon color="red darken-2" small class="mr-2">mdi-briefcase</v-icon>
                      <strong>อาชีพ:</strong> {{ job }} (แต่ยังไม่รวยซักที 😂)
                    </li>
                    <li>
                      <v-icon color="red darken-2" small class="mr-2">mdi-star</v-icon>
                      <strong>ทักษะ:</strong> {{ skills.join(', ') }} (แต่ยังเขียน bug เก่งเหมือนเดิม)
                    </li>
                    <li>
                      <v-icon color="red darken-2" small class="mr-2">mdi-email</v-icon>
                      <strong>อีเมล:</strong> {{ email }} (ตอบช้าก็อย่าเพิ่งน้อยใจนะครับ)
                    </li>
                  </ul>
                </v-col>
              </v-row>
            </v-card>
          </v-slide-x-transition>

          <!-- ผลงาน -->
          <v-scale-transition>
            <v-card
              class="pa-7 mx-auto mb-6"
              max-width="900"
              elevation="6"
              style="background: #fff; color: #DA291C; border: 2px solid #FBE122;"
            >
              <h2 class="headline font-weight-bold mb-3" style="color: #DA291C;">ผลงานของฉัน</h2>
              <v-row justify="center">
                <v-col
                  v-for="(project, i) in projects"
                  :key="i"
                  cols="auto"
                  class="my-1"
                >
                  <v-hover v-slot="{ hover }">
                    <v-btn
                      :href="project.href"
                      target="_blank"
                      color="red darken-2"
                      dark
                      rounded
                      elevation="2"
                      class="px-8"
                      :style="{
                        border: '2px solid #FBE122',
                        background: hover ? '#FBE122' : '#DA291C',
                        color: hover ? '#DA291C' : '#fff',
                        transform: hover ? 'scale(1.08)' : 'scale(1)',
                        transition: 'all 0.2s'
                      }"
                    >
                      <v-icon left>mdi-github</v-icon>
                      {{ project.text }} <span v-if="hover">🏆</span>
                    </v-btn>
                  </v-hover>
                </v-col>
              </v-row>
              <div class="mt-2" style="color:#DA291C;">
                * ถ้าเข้าไปดูแล้วงง แสดงว่าคุณปกติ เพราะผมก็ยังงงเหมือนกัน 🤣
              </div>
            </v-card>
          </v-scale-transition>

          <!-- ความถนัด -->
          <v-scale-transition>
            <v-card
              class="pa-7 mx-auto mb-6"
              max-width="900"
              elevation="6"
              style="background: #fff; color: #DA291C; border: 2px solid #FBE122;"
            >
              <h2 class="headline font-weight-bold mb-3" style="color: #DA291C;">ความถนัดของฉัน</h2>
              <v-row justify="center">
                <v-col
                  v-for="(skill, i) in skillLevels"
                  :key="i"
                  cols="auto"
                  class="text-center my-2"
                >
                  <v-progress-circular
                    :value="skill.level"
                    :size="110"
                    :width="12"
                    color="#DA291C"
                    style="background: #FBE122; border-radius: 50%;"
                  >
                    <span style="color:#DA291C; font-weight:bold; font-size:1.2rem;">
                      {{ skill.level }}%
                    </span>
                  </v-progress-circular>
                  <div class="mt-2" style="font-weight:bold; font-size:1.1rem;">
                    {{ skill.name }}
                  </div>
                </v-col>
              </v-row>
              <div class="mt-2" style="color:#DA291C;">
                * ตัวเลขแสดงความมั่นใจในแต่ละทักษะ (แต่ยังต้องเรียนรู้อีกเยอะ!)
              </div>
            </v-card>
          </v-scale-transition>

          <!-- Timeline Section -->
          <v-scale-transition>
            <v-card
              class="pa-7 mx-auto mb-10"
              max-width="900"
              elevation="6"
              style="background: #fff; color: #DA291C; border: 2px solid #DA291C;"
            >
              <v-row justify="center">
                <v-col cols="12">
                  <v-timeline direction="horizontal">
                    <v-timeline-item>
                      <template v-slot:opposite>
                       เรียนที่ประถมศึกษาที่
                      </template>
                      <div>
                        <div class="text-h6">โรงเรียนอนุศาสน์วิทยา</div>
                        <p>
                          ที่อยู่: 214 ถนนสืบศิริ ตำบลเมืองปัก อำเภอปักธงชัย จังหวัดนครราชสีมา 30150
                          โทรศัพท์:044-441-033
                          เวลาทำการ: จันทร์-ศุกร์ เวลา 08:30-15:00
                        </p>
                      </div>
                    </v-timeline-item>
                    <v-timeline-item>
                      <template v-slot:opposite>
                        มัธยมศึกษาที่
                      </template>
                      <div>
                        <div class="text-h6">โรงเรียนปักธงชัยประชานิรมิต</div>
                        <p>
                          68 หมู่ 11 ถนนนิวาสดำเนิน ตำบลเมืองปัก อำเภอปักธงชัย นครราชสีมา 30150
                        </p>
                      </div>
                    </v-timeline-item>
                    <v-timeline-item>
                      <template v-slot:opposite>
                       มหาวิทยาลัยที่
                      </template>
                      <div>
                        <div class="text-h6">มหาวิทยาลัยเทคโนโลยีสุรนารี</div>
                        <p>
                          ที่อยู่: 111, ถนน มหาวิทยาลัย ตำบล สุรนารี อำเภอเมืองนครราชสีมา นครราชสีมา 30000
                        </p>
                      </div>
                    </v-timeline-item>
                  </v-timeline>
                </v-col>
              </v-row>
            </v-card>
          </v-scale-transition>

          <!-- ติดต่อ -->
          <v-scale-transition>
            <v-card
              class="pa-7 mx-auto mb-10"
              max-width="900"
              elevation="6"
              style="background: #fff; color: #DA291C; border: 2px solid #DA291C;"
            >
              <h2 class="headline font-weight-bold mb-3" style="color: #DA291C;">ติดต่อฉัน</h2>
              <v-row justify="center">
                <v-col
                  v-for="(contact, i) in contacts"
                  :key="i"
                  cols="auto"
                  class="my-1"
                >
                  <v-hover v-slot="{ hover }">
                    <v-btn
                      :href="contact.href"
                      target="_blank"
                      outlined
                      rounded
                      color="yellow darken-2"
                      elevation="1"
                      class="px-7"
                      :style="{
                        border: '2px solid #DA291C',
                        color: hover ? '#DA291C' : '#DA291C',
                        background: hover ? '#DA291C' : 'transparent',
                        transform: hover ? 'scale(1.08)' : 'scale(1)',
                        transition: 'all 0.2s'
                      }"
                    >
                      <v-icon left>{{ contact.icon }}</v-icon>
                      {{ contact.text }} <span v-if="hover">⚽️</span>
                    </v-btn>
                  </v-hover>
                </v-col>
              </v-row>
              <div class="mt-2" style="color:#DA291C;">
                * ทักมาได้เลย ไม่กัด (แต่ตอบช้าบ้างนะ ขออภัยล่วงหน้า 😅)
              </div>
            </v-card>
          </v-scale-transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  name: 'profile',
  data: () => ({
    name: 'ธีรพงษ์ จุลตะคุ',
    job: 'นักพัฒนาเว็บไซต์',
    email: 'teerapong@email.com',
    skills: ['Vue.js', 'JavaScript', 'HTML', 'CSS'],
    skillLevels: [
      { name: 'Vue.js', level: 50 },
      { name: 'JavaScript', level: 70 },
      { name: 'HTML', level: 80 },
      { name: 'CSS', level: 40 },
    ],
    projects: [
      {
        text: 'GitHub',
        href: 'https://github.com/B6409388',
      },
    ],
    contacts: [
      {
        text: 'อีเมล',
        href: 'mailto:theerapong.juntaku2002@gmail.com',
        icon: 'mdi-email',
      },
      {
        text: 'Facebook',
        href: 'https://www.facebook.com/beemcbr.juntaku',
        icon: 'mdi-facebook',
      },
    ],
  }),
}
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}
</style>
