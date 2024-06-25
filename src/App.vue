<script setup>
import {ekUpload, fileCheck} from '@/fileUpload.js'
import { onMounted } from 'vue';
import resultModal from './views/resultModal.vue';
import {ref} from 'vue'
import axios from "axios"


onMounted(()=>{
  ekUpload()
})

const isModalOpen = ref(false)
const imgFile = ref()
const buttonController = () => {
  isModalOpen.value = true
  console.log('클릭됨', isModalOpen.value)
  console.log(typeof axios)
  imgFile.value = document.getElementById("file-upload").files[0];
  console.log('result:', imgFile.value)
}
</script>

<template>
  <h2 style="margin-top: 100px">마스크를 쓰셨나요?</h2>
  <div style="margin: 10px 0">
    <p class="lead" style="{margin-top: 300px}">이미지 속 인물의 마스크 착용 여부를 분석합니다<br/>얼굴이 나온 사진을 넣어주세요</p>
  </div>
  <!-- Upload  -->
  <form id="file-upload-form" class="uploader">
    <input id="file-upload" type="file" name="fileUpload" accept="image/gif, image/jpeg, image/png" @onchange="fileCheck(this)" />

    <label for="file-upload" id="file-drag">
      <img id="file-image" src="#" alt="Preview" class="hidden">
      <div id="start">
        <i class="fa fa-download" aria-hidden="true"></i>
        <div>Select a file or drag here</div>
        <div id="notimage" class="hidden">Please select an image</div>
        <span id="file-upload-btn" class="btn btn-primary">UPLOAD</span>
      </div>
      <div id="response" class="hidden">
        <div id="messages"></div>
      </div>
    </label>
    <!-- <v-btn class="custom-btn btn-4" @click="buttonController"><span>SUBMIT</span></v-btn> -->
    <v-btn @click="buttonController"><span>SUBMIT</span></v-btn>
  </form>
  <resultModal v-model="isModalOpen" :imgFile="imgFile"/>
</template>