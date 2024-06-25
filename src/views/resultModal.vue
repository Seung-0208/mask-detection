<script setup>
    import { defineModel, defineProps, onMounted, onUpdated } from 'vue';
    import axios from "axios"

    const props = defineProps(['imgFile'])
    const model = defineModel()
    onUpdated(()=>{

        console.log('모달로 들어옴', props.imgFile)
        if (typeof props.imgFile != 'undefined'){
            const reader = new FileReader()
            reader.readAsDataURL(props.imgFile)
            reader.onload = event => {
                const base64Encoded = event.target.result.split(",")[1]
                const data = new FormData()
                data.append("base64Encoded", base64Encoded)
                axios.post("http://127.0.0.1:5000/maskdetect", data, {headers:{'Content-Type':'multipart/form-data'}})
                .then(resp=>resp.data)
                .then(data=>{
                    console.log(data.base64)
                    document.getElementById("loading").style.display='none'
                    const resultTag = document.getElementById("result")
                    console.log(resultTag)
                    var textInfo = document.createElement('span')
                    textInfo.style.fontFamily='Orbit-Regular'
                    textInfo.style.margin='20px 0'
                    textInfo.innerHTML = '분석 결과입니다<br/>이미지에 변경사항이 없다면<br/>얼굴이 나온 사진으로 다시 올려주세요🤗'
                    var imgTag = document.createElement('img')
                    //imgTag.style.width = '60%'
                    imgTag.style.height = '300px'
                    imgTag.src = 'data:image/jpeg;base64,'+data.base64
                    resultTag.append(textInfo, imgTag)
                    //resultTag.innerHTML = imgTag
                })
                .catch(err=>{
                    console.log(err)
                    document.getElementById("loading").style.display='none'
                    const resultTag = document.getElementById("result")
                    resultTag.innerHTML="⚠️ 오류가 발생했습니다. 관리자에게 문의하세요. ⚠️"
                })
            }
        }
    })
</script>
<template>
    <v-dialog v-model="model" width="500">
    <v-card id="result" style="display: flex; height: 400px; justify-content: center; justify-content: center">
        <div id="loading">
        <v-title style="font-family: 'Orbit-Regular';">마스크 착용 여부를 분석중입니다</v-title>
        <div style="margin-top: 30px">
            <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
        </div>
        </div>
    </v-card>
    </v-dialog>
</template>