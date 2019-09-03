<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>{{photoinfo.time}}</span>
            <span>点击: {{photoinfo.click}}次</span>
        </p>

        <hr>

        <vue-preview :slides="list" @close="handleClose"></vue-preview>

        <div class="content" v-html="photoinfo.content">

        </div>
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue';
export default {
    data() {
        return {
            id: this.$route.params.id,
            photoinfo: {},
            list: []
        }
    },
    created() {
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods: {
        getPhotoInfo() {
            this.$http.get("json/photoInfo.json")
            .then(result => {
                if (result.body.status == 0) {
                    this.photoinfo = result.body.message[0];
                }
            })
        },
        getThumbs() {
            this.$http.get('json/photoId.json')
            .then(result => {
                if (result.body.status == 0) {
                    // result.body.message.forEach(item => {
                    //     item.w = 600;
                    //     item.h = 400;
                    // });
                    this.list = result.body.message;
                }
            });
        },
        handleClose () {
            console.log('close event')
        }
    }, 
    components: {
        'cmt-box':comment
    } 
}
</script>

<style lang="scss" scoped>
    .photoinfo-container {
        padding: 3px;
        h3 {
            color: #26A2FF;
            font-size : 15px;
            text-align: center;
            margin: 15px 0;  
        }

        .subtitle {
            display: flex;
            justify-content: space-between;
        }

        .content {
            font-size: 13px;
            line-height: 30px;
        }
    }
</style>