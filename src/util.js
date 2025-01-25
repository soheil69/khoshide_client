// const HashModel = {
//     tgWebAppData: {
//         auth_date: "",
//         hash: "",
//         query_id: "",
//         user: {
//             allows_write_to_pm: false,
//             first_name: "",
//             id: 0,
//             username: ""
//         }
//     },
//     tgWebAppPlatform: "",
//     tgWebAppThemeParams: {},
//     tgWebAppVersion: ""
// };

export function parseHashToModel(hash) {
    // const hash = hash.substring(1); // remove the '#' character
    const params = {};
    const model = {
        tgWebAppData: {
            auth_date: "",
            hash: "",
            query_id: "",
            user: {
                "allows_write_to_pm": true,
                "first_name": "محمدامين توتونچي ",
                "id": 311532832,
                "username": "amin_desu"
            }
        },
        tgWebAppPlatform: "",
        tgWebAppThemeParams: {},
        tgWebAppVersion: ""
    };

    // Parse the hash parameters
    hash.split("&").forEach((param) => {
        const [key, value] = param.split("=");
        params[key] = decodeURIComponent(value);
    });

    // Map the parsed parameters to the model
    if (params.tgWebAppData) {
        const dataParts = params.tgWebAppData.split("&");
        const tgWebAppData = {};
        dataParts.forEach((part) => {
            const [key, value] = part.split("=");
            tgWebAppData[key] = decodeURIComponent(value);
        });

        // Parse the user data inside tgWebAppData
        if (tgWebAppData.user) {
            try {
                tgWebAppData.user = JSON.parse(tgWebAppData.user);
            } catch (err) {
                console.error("Failed to parse user field:", err);
            }
        }

        model.tgWebAppData = { ...tgWebAppData };
    }

    // Map other parameters
    model.tgWebAppPlatform = params.tgWebAppPlatform || "";
    try {
        model.tgWebAppThemeParams = JSON.parse(params.tgWebAppThemeParams || "{}");
    } catch (err) {
        console.error("Invalid theme params JSON:", err);
    }
    model.tgWebAppVersion = params.tgWebAppVersion || "";

    // Return the structured model
    return model;
}