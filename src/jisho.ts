export {};
import { isElementNode, textWithFurigana } from "./utils";

const extractTextFromElement = (element: Element) => {
  const nodeIterator = document.createNodeIterator(
    element,
    NodeFilter.SHOW_TEXT
  );

  // skip container node
  nodeIterator.nextNode();

  let node: Node | null;
  let lastFurigana: string | null = null;
  let result = "";
  while ((node = nodeIterator.nextNode())) {
    const parentNode = node.parentNode;

    if (!isElementNode(parentNode))
      throw new Error("Expected type ELEMENT_NODE.");

    console.log(node);

    const isFurigana = parentNode.classList.contains("furigana");

    if (isFurigana) lastFurigana = node.textContent;
    else {
      result += textWithFurigana(node.textContent ?? "", lastFurigana);
      lastFurigana = null;
    }
  }

  return result.trim();
};

const main = () => {
  const sentenceElements = document.getElementsByClassName("japanese_sentence");

  // [...sentenceElements].forEach((el) => {
  [sentenceElements[1]].forEach((el) => {
    const text = extractTextFromElement(el);

    const copyButton = document.createElement("span");
    copyButton.textContent = "Copy";
    copyButton.style.cursor = "pointer";
    copyButton.style.float = "right";
    copyButton.onclick = () => {
      navigator.clipboard.writeText(text);
    };

    const parentElement = el.parentElement?.parentElement;
    if (!parentElement)
      throw new Error("Couldn't find parent element of sentence.");

    parentElement.prepend(copyButton);
  });
};

main();
