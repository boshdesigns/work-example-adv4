module.exports = function(grunt) {
  var path = require('path');

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), '../fmgautobase/grunt/config'),
    jitGrunt: {
      customTasksDir: '../fmgautobase/grunt/tasks'
    },
    data: {
      theme_name: 'fmgautoadvancedfour',
      css_file_name: '<%= theme_name %>.css',
      scss_file_name: '<%= theme_name %>.scss',
      js_file_name: '<%= theme_name %>.min.js',
      foundation_theme_path: '../zurb_foundation',
      foundation_js: [
        '<%= foundation_theme_path %>/js/foundation/foundation.js',
        // '<%= foundation_theme_path %>/js/foundation/foundation.abide.js',
        // '<%= foundation_theme_path %>/js/foundation/foundation.accordion.js',
        '<%= foundation_theme_path %>/js/foundation/foundation.alert.js',
        // '<%= foundation_theme_path %>/js/foundation/foundation.clearing.js',
        '<%= foundation_theme_path %>/js/foundation/foundation.dropdown.js',
        // '<%= foundation_theme_path %>/js/foundation/foundation.equalizer.js',
        // '<%= foundation_theme_path %>/js/foundation/foundation.interchange.js',
        // '<%= foundation_theme_path %>/js/foundation/foundation.joyride.js',
        // '<%= foundation_theme_path %>/js/foundation/foundation.magellan.js',
        // '<%= foundation_theme_path %>/js/foundation/foundation.offcanvas.js',
        // '<%= foundation_theme_path %>/js/foundation/foundation.orbit.js',
        // '<%= foundation_theme_path %>/js/foundation/foundation.reveal.js',
        // '<%= foundation_theme_path %>/js/foundation/foundation.slider.js',
        '<%= foundation_theme_path %>/js/foundation/foundation.tab.js',
        '<%= foundation_theme_path %>/js/foundation/foundation.tooltip.js',
        '<%= foundation_theme_path %>/js/foundation/foundation.topbar.js'
      ],
      bourbon: require('node-bourbon').includePaths
    }
  });

};
