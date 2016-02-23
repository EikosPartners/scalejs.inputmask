
module.exports = ( grunt ) ->

    analysis = require 'rjs-build-analysis'

    build:
        options:
            baseUrl: 'src'
            include: '<%=package.name%>'
            exclude: [
                'scalejs',
                'jquery',
                'inputmask',
                'knockout',
                'jquery.inputmask',
                'jquery.inputmask.extensions',
                'jquery.inputmask.date.extensions',
                'jquery.inputmask.numeric.extensions',
                'jquery.inputmask.phone.extensions',
                'jquery.inputmask.regex.extensions'
            ]
            mainConfigFile: 'rjsconfig.js'
            out: 'build/<%=package.name%>.js'
            optimize: 'none'
            done: ( done, output ) ->
                duplicates = analysis.duplicates output

                if duplicates.length > 0
                    grunt.log.subhead 'Duplicates found in requirejs build: '
                    grunt.log.warn duplicates
                    done new Error 'r.js build duplicate modules, please check the excludes option.'
                else
                    done()


