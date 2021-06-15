import anime from "animejs";
import { mapGetters, mapMutations } from "vuex";
import MUTATION_TYPES from "@/store/mutation-types";
import GETTER_TYPES from "@/store/getter-types";
import takePhoto from "./takePhoto";

export default {
    mixins: [takePhoto],
    data() {
        return {
            clientHeight: `${document.documentElement.clientHeight}`,
            clientWidth: `${document.documentElement.clientWidth}`,
        }
    },
    computed: {
        ...mapGetters([GETTER_TYPES.getCard]),
    },
    methods: {
        ...mapMutations([MUTATION_TYPES.changeCardStatus]),

        MAX(card) {
            let cl = card.offsetLeft;
            let cw = card.offsetWidth;
            let ct = card.offsetTop;
            let ch = card.offsetHeight;
            let _card = {
                cl: cl,
                cw: cw,
                ct: ct,
                ch: ch,
            };
            this.changeCardStatus(_card);

            let row = 0;
            row = this.getRow(card, cl, cw, ct, ch, row);
            anime({
                targets: card,
                translateX: -30,
                translateY: -90 - (ch + 30) * row,
                width: this.clientWidth,
                height: this.clientHeight,
                duration: 1000,
            });
        },

        getRow(card, cl, cw, ct, ch, row) {
            if (ct <= ch) {
                cl > cw ? row++ : row;
                return row;
            } else {
                row++;
                ct = ct - ch - 30;
                return this.getRow(card, cl, cw, ct, ch, row);
            }
        },

        WINDOW(card, photoName) {
            let cardPosition = this.getCard;
            this.TAKE_PHOTO(photoName);
            anime({
                targets: card,
                translateX: cardPosition.cl,
                translateY: cardPosition.ct,
                width: cardPosition.cw,
                height: cardPosition.ch,
                duration: 1000,
            });
        }
    }

}