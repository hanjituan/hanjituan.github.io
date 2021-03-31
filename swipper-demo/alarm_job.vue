<template>
    <div class="min-body">
        <div class="ict-main-box">
            <div class="import_she_bei">XX接入设备</div>
            <div class="alarm_detail">
                <!-- <div class="left_img">
                    <img src="~@/assets/img/rw1.png">
                </div> -->
                <div class="left_imgs swiper-container">
                    <img src="~@/assets/img/rw1.png">
                    <img src="~@/assets/img/rw1.png">
                    <img src="~@/assets/img/rw1.png">
                    <img src="~@/assets/img/rw1.png">
                    <img src="~@/assets/img/rw1.png">
                    <img src="~@/assets/img/rw1.png">
                </div>
                <div class="right_detail">
                    <div class="alarm_msg">
                        <div class="msg_titlt">
                            <div class="msg_titlt_icon"></div>
                            <div>告警信息</div>
                        </div>
                        <div class="msg_content">
                            <div class="msg_box">告警等级：高等级</div>
                            <div class="msg_box">告警时间：2020-01-01 12:00:00</div>
                            <div class="msg_box" style="display:flex;">
                                <div>告警描述：</div>
                                <div style="width: 200px;height: 70px; overflow: auto;">滚动啊多福多寿
                                    上大巴地方撒发标暗示法大V发发呆的范围分为二分为人人让我如个人122滚动啊多
                                    福多寿 上大巴地方撒发标暗示法大V发发呆的范围分为二分为人人让我如个人122</div>
                            </div>
                        </div>
                    </div>
                    <div class="alarm_msg">
                        <div class="msg_titlt">
                            <div class="msg_titlt_icon"></div>
                            <div>图片信息</div>
                        </div>
                        <div class="msg_content">
                            <div class="msg_box">图片名称：123</div>
                            <div class="msg_box">图片尺寸：1080 * 720</div>
                            <div class="msg_box">图片大小：180KB </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer_box">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="item in banner" :key="item.id">
                            <!-- <img :src="item.pic" alt=""> -->
                            <img src="~@/assets/img/rw1.png" alt="">
                        </div>
                    </div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Swiper from "swiper";
    import "swiper/css/swiper.css";
    export default {
        data() {
            return {
                banner: [
                    { id: 1, pic: '~@/assets/img/rw1.png' },
                    { id: 2, pic: '~@/assets/img/rw1.png' },
                    { id: 3, pic: '~@/assets/img/rw1.png' },
                    { id: 4, pic: '~@/assets/img/rw1.png' },
                    { id: 5, pic: '~@/assets/img/rw1.png' },
                    { id: 6, pic: '~@/assets/img/rw1.png' },
                    { id: 7, pic: '~@/assets/img/rw1.png' },
                ]
            };
        },
        created() {
        },
        mounted() {
            setTimeout(() => {
                this.$nextTick(() => {
                    new Swiper(".swiper-container", {
                        slidesPerView: 7,
                        spaceBetween: 10,
                        loopFillGroupWithBlank: true,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        loop: true,
                        // 自动轮播
                        autoplay: {
                            // 每秒钟自动切换 
                            delay: 1000,
                            // 用户操作swiper之后，是否禁止autoplay 
                            disableOnInteraction: false
                        }
                    });
                });
            }, 0);
        },
        methods: {},
    };
</script>
<style lang="scss">
    @import "~@/common/css/base.css";
    @import "~@/common/css/ict_style.scss";

    .min-body {
        .ict-main-box {
            .import_she_bei {
                text-align: left;
            }

            .alarm_detail {
                display: flex;
                margin: 15px auto;
                width: 100%;
                height: 70%;

                .left_img {
                    width: 70%;
                    height: 100%;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .left_imgs {
                    width: 70%;
                    height: 100%;
                    border: 1px solid #eee;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    overflow: auto;

                    img {
                        width: 48%;
                        height: 48%;
                        margin: 5px;
                    }
                }

                .right_detail {
                    width: 30%;
                    margin: 0 15px;

                    .alarm_msg {
                        width: 100%;
                        height: 25vh;
                        border: 1px solid #eee;
                        margin-bottom: 15px;
                        padding: 3px;
                        text-align: left;

                        .msg_titlt {
                            display: flex;
                            font-size: 16px;

                            .msg_titlt_icon {
                                width: 5px;
                                height: 20px;
                                background-color: #409eff;
                                margin-right: 3px;
                            }
                        }

                        .msg_content {
                            padding: 0 25px 15px 25px;

                            .msg_box {
                                margin: 15px 0;
                            }
                        }
                    }
                }
            }

            .footer_box {
                width: 100%;
                height: 20vh;

                .swiper-container {
                    width: 100%;
                    height: 100%;

                    .swiper-slide {
                        width: 150px;

                        img {
                            width: 150px;
                            height: 100%;
                        }
                    }

                }

            }
        }
    }
</style>