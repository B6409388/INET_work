<template>
  <div class="cutgrade-container">
    <h1>ตัดเกรด</h1>
    <div class="input-group">
      <input
        type="text"
        v-model="scoreInput"
        placeholder="กรอกคะแนน (0-100)"
        @keyup.enter="calculateGrade"
      />
      <button @click="calculateGrade">คำนวณ</button>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="grade" class="result">เกรดที่ได้: <span>{{ grade }}</span></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scoreInput = ref('')
const grade = ref('')
const error = ref('')

function calculateGrade() {
  error.value = ''
  grade.value = ''
  const score = Number(scoreInput.value)
  if (
    scoreInput.value.trim() === '' ||
    isNaN(score) ||
    !/^\d+(\.\d+)?$/.test(scoreInput.value) ||
    score < 0 ||
    score > 100
  ) {
    error.value = 'กรุณากรอกคะแนนเป็นตัวเลข 0-100 เท่านั้น'
    return
  }
  if (score >= 80) grade.value = 'A'
  else if (score >= 70) grade.value = 'B'
  else if (score >= 60) grade.value = 'C'
  else if (score >= 50) grade.value = 'D'
  else grade.value = 'F'
}
</script>

<style scoped>
.cutgrade-container {
  max-width: 350px;
  margin: 60px auto;
  padding: 32px 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  text-align: center;
  font-family: 'Segoe UI', 'Prompt', sans-serif;
}
h1 {
  margin-bottom: 24px;
  color: #2d3748;
  font-size: 2rem;
  font-weight: 600;
}
.input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
  justify-content: center;
}
input[type="text"] {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  width: 140px;
  transition: border 0.2s;
}
input[type="text"]:focus {
  border-color: #3182ce;
  outline: none;
}
button {
  padding: 8px 18px;
  background: #3182ce;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #2563eb;
}
.error {
  color: #f8f8f8;
  margin-top: 8px;
  font-size: 1rem;
}
.result {
  margin-top: 12px;
  font-size: 1.2rem;
  color: #2b6cb0;
}
.result span {
  font-weight: bold;
  font-size: 1.4rem;
}
</style>
