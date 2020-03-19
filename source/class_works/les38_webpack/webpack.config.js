const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlPlugins = generateHtmlPlugins('./src/html/views');


function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: false,
        })
    })
}



module.exports = {
    entry: [
        './src/js/main.js',
        './src/scss/styles.scss'
    ],
    output: {
        filename: './js/main.js'
    },
    module: {
        rules: [

            //html packing

            {
                test: /\.html$/,
                include: path.resolve(__dirname, './src/html/includes'),
                use: ['raw-loader']
            },

            //sass

            {
                test: /\.(css|sass|scss)$/,
                include: path.resolve(__dirname, 'src/scss'),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')
                            ],
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: './css/styles.min.css',
          }),
    ].concat(htmlPlugins)
};