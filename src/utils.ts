import { isKana } from "wanakana";

export const isElementNode = (node: Node | null): node is Element => {
  if (node === null) return false;

  return node.nodeType === node.ELEMENT_NODE;
};

export const textWithFurigana = (text: string, furigana: string | null) => {
  if (furigana) {
    const lastKana = text.split("").findIndex((char) => isKana(char));
    const insertPoint = lastKana === -1 ? text.length : lastKana;

    const before = text.slice(0, insertPoint);
    const after = text.slice(insertPoint, text.length);

    return `${before}[${furigana}]${after}`;
  }

  return text;
};
