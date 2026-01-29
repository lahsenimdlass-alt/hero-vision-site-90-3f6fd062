import React from "react";

interface FormattedTextProps {
  content: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Parse and render text with formatting markers.
 * Format: [format:bold,size:18]Text content
 */
export const parseFormattedText = (content: string) => {
  const formatMatch = content.match(/^\[format:(.*?)\]/);
  if (!formatMatch) {
    return { text: content, isBold: false, fontSize: undefined };
  }

  const formatString = formatMatch[1];
  const isBold = formatString.includes("bold");
  const sizeMatch = formatString.match(/size:(\d+)/);
  const fontSize = sizeMatch ? parseInt(sizeMatch[1]) : undefined;
  const text = content.replace(/^\[format:.*?\]/, "");

  return { text, isBold, fontSize };
};

export const FormattedText: React.FC<FormattedTextProps> = ({
  content,
  className = "",
  as: Component = "span",
}) => {
  const { text, isBold, fontSize } = parseFormattedText(content);

  const style: React.CSSProperties = {};
  if (isBold) style.fontWeight = "bold";
  if (fontSize) style.fontSize = `${fontSize}px`;

  return (
    <Component className={className} style={style}>
      {text}
    </Component>
  );
};

export default FormattedText;
