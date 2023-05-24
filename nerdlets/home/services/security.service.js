import CryptoJS from "crypto-js";
import { KEYS } from "../constants/tokens";

export default class SecurityService {
    static Enconde = (value) => {
        value = `${value}___${KEYS[0]}`
        value = CryptoJS.DES.encrypt(value, KEYS[1]);
        value = btoa(value);

        return value;
    }

    static Decode = (value) => {
        value = atob(value);
        value = CryptoJS.DES.decrypt(value, KEYS[1]).toString(CryptoJS.enc.Utf8);
        value = value.replace(`___${KEYS[0]}`, "");

        return value;
    }
}