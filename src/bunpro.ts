export {};

const main = () => {
  const getText = (nodes: NodeListOf<ChildNode>): string => {
    return [...nodes]
      .map((node) => {
        if (["RT", "RP"].includes(node.nodeName)) return "";
        if (node.nodeType === node.TEXT_NODE) return node.textContent;
        if (node.nodeType === node.ELEMENT_NODE)
          return getText(node.childNodes);
        return "";
      })
      .join("");
  };

  const sentenceHolder = document.getElementsByClassName(
    "study-question-japanese"
  )[0];
  const statsHolder = document.getElementsByClassName("in-review-stats")[0];

  if (!sentenceHolder || !statsHolder)
    throw new Error("Could not find study elements");

  const copyButton = document.createElement("div");
  copyButton.classList.add("review__stats");
  copyButton.textContent = "Copy";
  copyButton.style.cursor = "pointer";

  copyButton.onclick = () => {
    const sentenceWithoutFurigana = getText(sentenceHolder.childNodes);

    navigator.clipboard.writeText(sentenceWithoutFurigana);
  };

  statsHolder.prepend(copyButton);
};

main();
