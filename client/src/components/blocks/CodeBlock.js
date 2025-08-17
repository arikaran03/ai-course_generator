import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, text }) => {
  return (
    <div className="code-block-container">
      <SyntaxHighlighter language={language || 'javascript'} style={materialDark}>
        {text}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;