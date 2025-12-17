import React from 'react';
import MathRenderer from './MathRenderer';

interface Props {
  text: string;
  className?: string;
}

/**
 * Parses a string and renders segments enclosed in $...$ as Math,
 * and the rest as regular text.
 * Example: "Calculate $\frac{1}{2}$ of the sum."
 */
const TextWithMath: React.FC<Props> = ({ text, className = '' }) => {
  if (!text) return null;

  // Split the text by the delimiter $
  // The capturing group () ensures the delimiter/math content is kept in the result array
  const parts = text.split(/(\$[^$]+\$)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          // Remove the $ delimiters and render as math
          const mathExpression = part.slice(1, -1);
          return (
            <span key={index} className="inline-block mx-1 align-middle">
              <MathRenderer expression={mathExpression} block={false} />
            </span>
          );
        }
        // Render regular text
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

export default TextWithMath;