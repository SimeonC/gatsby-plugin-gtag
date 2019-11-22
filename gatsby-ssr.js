'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GTAG_SRC = 'https://www.googletagmanager.com/gtag/js';

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents,
      setPostBodyComponents = _ref.setPostBodyComponents;

  if (!pluginOptions.trackingId || process.env.GATSBY_GTAG !== 'development' && process.env.NODE_ENV !== 'production') {
    return null;
  }

  var anonymize = pluginOptions.anonymize || false;

  var gtagScript = _react2.default.createElement('script', {
    async: true,
    key: 'gatsby-plugin-gtag-gtag-js',
    src: GTAG_SRC + '?id=' + pluginOptions.trackingId
  });

  var scriptStr = '\n    window.GATSBY_GTAG_PLUGIN_GA_TRACKING_ID = (\n      \'' + pluginOptions.trackingId + '\'\n    );\n    window.GATSBY_GTAG_PLUGIN_ANONYMIZE = ' + anonymize + ';\n\n    var options = {\n      send_page_view: false\n    };\n    if (' + anonymize + ') {\n      options.anonymize_ip = true;\n    }\n\n    window.dataLayer = window.dataLayer || [];\n    function gtag(){dataLayer.push(arguments);}\n    window.gtag = gtag;\n    gtag(\'js\', new Date());\n    gtag(\'config\', \'' + pluginOptions.trackingId + '\', options);\n  ';
  var trackScript = _react2.default.createElement('script', {
    key: 'gatsby-plugin-gtag-inline-script',
    dangerouslySetInnerHTML: { __html: scriptStr }
  });

  var setComponents = pluginOptions.head ? setHeadComponents : setPostBodyComponents;

  return setComponents([gtagScript, trackScript]);
};