import Vue from 'vue';
//引入vue-i18n cnpm i vue-i18n;
import VueI18n from 'vue-i18n';
import enElementLocale from 'element-ui/lib/locale/lang/en'
import zhElementLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en'
import zhLocale from './zh'
Vue.use(VueI18n);
const messages = {
    en: {
        ...enElementLocale,
        ...enLocale
    },
    zh: {
        ...zhElementLocale,
        ...zhLocale
    }
}
const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'zh',
    messages,
});

export default i18n;