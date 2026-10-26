import path from "node:path";

export default {
    entry: "./src/index.html",
    output: {
        filename: "main.js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            { 
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: "asset/resource", 
            },
        ],
    },
}