import { Directive } from "vue";
import Global from "@/store/global";

const Permission: Directive = (el, binding) => {
    const { value } = binding;
    if (value) {
        const permissions = Global.state.permissionFuncs;
        if (typeof value === "string" && permissions.includes(value)) {
            return;
        }

        if (value instanceof Array && value.length > 0 && value.some((p) => permissions.includes(p))) {
            return;
        }
        el.parentNode && el.parentNode.removeChild(el);
    }
};

export default Permission;
