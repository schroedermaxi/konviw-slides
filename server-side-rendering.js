import express from 'express';
import path from "path";
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components'

export function addServerSideRendering(app, handlebarsEngine) {
  const devEnv = app.get('env') === 'development';
  const viewsDir = app.get('views');
  app.use(express.static(viewsDir));
  const ssrEngine = function (viewFile, options, callback) {
    const viewFilePath = viewFile.replace(/\.jsx$/,'.js');
    const relativeViewFilePath = path.join('/', path.relative(viewsDir, viewFilePath));
    const nodeViewPath = path.join(viewsDir, 'node', relativeViewFilePath);
    const props = { ...options };
    for (const key of Object.keys(props._locals)) {
      if (props[key] === props._locals[key]) {
        delete props[key];
      }
    }
    delete props._locals;
    delete props.settings;
    delete props.cache;
    let sheet = null;
    try {
      const ssrOptions = {
        body: '',
        styleTags: ''
      };
      if (!options.browserOnly) {
        sheet = new ServerStyleSheet();
        if (devEnv) delete require.cache[nodeViewPath];
        const rootElement = React.createElement(require(nodeViewPath).default, props);
        ssrOptions.body = renderToString(sheet.collectStyles(rootElement));
        ssrOptions.styleTags = sheet.getStyleTags();
      }
      const viewOptions = {
        ...options,
        ...ssrOptions,
        reactSource: `//unpkg.com/react@16/umd/react.${devEnv ? 'development' : 'production.min'}.js`,
        reactDomSource: `//unpkg.com/react-dom@16/umd/react-dom.${devEnv ? 'development' : 'production.min'}.js`,
        rootComponentSource: relativeViewFilePath,
        props: JSON.stringify(props)
      };
      const layoutTemplate = path.join(viewsDir, 'react-layout.hbs');
      return handlebarsEngine(
        layoutTemplate,
        viewOptions,
        callback
      );
    } catch (e) {
      if (e && e.code === 'MODULE_NOT_FOUND') {
        return callback(new Error(`Could not load the component ${path.basename(viewFile)}. Did you run \`npm build\` to compile your jsx files?`));
      }
      return callback(e);
    } finally {
      sheet && sheet.seal();
    }
  };
  app.engine('.js', ssrEngine);
  app.engine('.jsx', ssrEngine);
}

