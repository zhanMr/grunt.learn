module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //合并文件
        concat: {
            options: {
                banner: '/*!<%= grunt.template.today(new Date()) %> */\n',
                // 定义一个用于插入合并输出文件之间的字符
                separator: ''
            },
            dist: {
                files: [{
                    //匹配这3个脚本
                    //src: ['src/jquery.js', 'src/require.js', 'src/underscore.js'],
                    //匹配src目录下的所有脚本
                    //src: 'src/*.js',
                    //匹配这3个脚本
                    //src: 'src/{jquery,require,underscore}.js',
                    //匹配src下的所有的脚本，但是排除jquery.js
                    //src: ['src/*.js', '!src/jquery.js'],
                    src: ['src/{jquery,require,underscore}.js'],
                    dest: 'dest/libs.js'
                },{
                    src: 'webapp/*/*.js',
                    dest: 'dest/v_index.js'
                }]
            }
        },
        //压缩文件
        uglify: {
            options: {
                banner: '/*!<%= grunt.template.today(new Date()) %> */\n'
            },
            builds: {
                files: [{
                    src: 'dest/libs.js',
                    dest: 'dest/libs.min.js'
                },{
                    //处理单个文件的 将jquery.js 压缩成jquery.min.js
                    expand: true, //为 true 用于启用下面的选项
                    cwd: 'src/', //所有src指定的匹配都将相对于此处指定的路径（但不包括此路径）
                    src: '*.js', //相当于cwd路径的匹配模式
                    dest: 'dest/', //目标文件路径前缀
                    ext: '.min.js', // 对于生成的dest路径中所有实际存在文件，均使用这个属性值替换扩展名
                    extDot: 'first'
                },{
                    src: 'dest/v_index.js',
                    dest: 'dest/v_index.min.js'
                }]
            }
        },
        //语法检查
        //官方文档 http://jshint.com/docs/
        jshint: {
            files: 'src/*.js',
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        //运行 grunt watch
        //监听要打包的文件，如果有变化，知道执行tasks的任务
        watch:{
            files: 'src/*.js',
            tasks: ['concat', 'uglify']
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'webapp',
                    mainConfigFile: 'src/main.js',
                    name: 'project',
                    out: 'dest/v_detail.js'
                }
            }
        }
    });
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-concat'); //合并
    grunt.loadNpmTasks('grunt-contrib-uglify'); //压缩
    grunt.loadNpmTasks('grunt-contrib-jshint'); //语法检查
    grunt.loadNpmTasks('grunt-contrib-watch'); //监听
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    //默认被执行的任务列表
    //如果要执行某个单独的任务 直接运行 grunt concat
    grunt.registerTask('default', ['concat', 'uglify', 'requirejs']);
};