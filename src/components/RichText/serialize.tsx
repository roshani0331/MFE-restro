import React from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';

interface CustomText extends Text {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

const serialize = (children: any): React.ReactNode[] => {
  return children.map((node: any, i: number) => {
    if (Text.isText(node)) {
      const textNode = node as CustomText;
      let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(textNode.text) }} />;

      if (textNode.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (textNode.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (textNode.underline) {
        text = <u key={i}>{text}</u>;
      }

      if (textNode.strikethrough) {
        text = <s key={i}>{text}</s>;
      }

      if (textNode.code) {
        text = <code key={i}>{text}</code>;
      }

      return text;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case 'h1':
        return <h1 key={i} className="text-4xl font-bold mb-4">{serialize(node.children)}</h1>;
      case 'h2':
        return <h2 key={i} className="text-3xl font-bold mb-3">{serialize(node.children)}</h2>;
      case 'h3':
        return <h3 key={i} className="text-2xl font-bold mb-3">{serialize(node.children)}</h3>;
      case 'h4':
        return <h4 key={i} className="text-xl font-bold mb-2">{serialize(node.children)}</h4>;
      case 'h5':
        return <h5 key={i} className="text-lg font-bold mb-2">{serialize(node.children)}</h5>;
      case 'h6':
        return <h6 key={i} className="text-base font-bold mb-2">{serialize(node.children)}</h6>;
      case 'quote':
        return <blockquote key={i} className="border-l-4 border-gray-300 pl-4 italic my-4">{serialize(node.children)}</blockquote>;
      case 'ul':
        return <ul key={i} className="list-disc pl-6 mb-4">{serialize(node.children)}</ul>;
      case 'ol':
        return <ol key={i} className="list-decimal pl-6 mb-4">{serialize(node.children)}</ol>;
      case 'li':
        return <li key={i} className="mb-1">{serialize(node.children)}</li>;
      case 'link':
        return (
          <a
            key={i}
            href={node.url}
            className="text-blue-600 hover:underline"
            target={node.newTab ? '_blank' : undefined}
            rel={node.newTab ? 'noopener noreferrer' : undefined}
          >
            {serialize(node.children)}
          </a>
        );
      default:
        return <p key={i} className="mb-4">{serialize(node.children)}</p>;
    }
  });
};

export default serialize;