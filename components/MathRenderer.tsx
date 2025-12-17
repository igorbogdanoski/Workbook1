import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  expression: string;
  block?: boolean;
  className?: string;
}

const MathRenderer: React.FC<MathRendererProps> = ({ expression, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      // renderToString generates HTML string without checking document.compatMode,
      // avoiding the "quirks mode" error in certain environments.
      return katex.renderToString(expression, {
        throwOnError: false,
        displayMode: block,
        output: 'html', 
        strict: false
      });
    } catch (error) {
      console.error('KaTeX rendering error:', error);
      return expression;
    }
  }, [expression, block]);

  return (
    <span 
      className={`math-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};

export default MathRenderer;