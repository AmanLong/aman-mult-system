import html2canvas from "html2canvas";
import { mapMutations } from "vuex";
import MUTATION_TYPES from "@/store/mutation-types";


export default {
    
    data() {
        return {
        };
    },
    methods: {
        ...mapMutations([MUTATION_TYPES.updateSysImg]),
        // 保存
        saveFile(data, filename) {
            const save_link = document.createElementNS(
                "http://www.w3.org/1999/xhtml",
                "a"
            );
            save_link.href = data;
            save_link.download = filename;

            const event = document.createEvent("MouseEvents");
            event.initMouseEvent(
                "click",
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
            save_link.dispatchEvent(event);
        },
        // 生成图片
        TAKE_PHOTO(name) {
            html2canvas(document.querySelector("#app")).then((canvas) => {
                // 转成图片，生成图片地址
                let img = canvas.toDataURL("image/png");
                let obj = { name: name, img: img };
                this.updateSysImg(obj);
            });
        },
    },
};