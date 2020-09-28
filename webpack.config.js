module.exports = {
    entry: {
        main: './main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement'}]]
                    }
                }
            }
        ]
    },
    mode: 'development',
    // 不压缩
    optimization: {
        minimize: false
    }
}