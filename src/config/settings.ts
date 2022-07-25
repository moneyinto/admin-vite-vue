interface SettingsType {
    // token 存储的 key值
    siteTokenKey: string;
    // 请求头headers所传token的key值
    ajaxHeadersTokenKey: string;
}

const settings: SettingsType = {
    siteTokenKey: "ADMIN_VITE_TOKEN",
    ajaxHeadersTokenKey: "token"
};

export default settings;
