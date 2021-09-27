export class Rangy {
  container: HTMLDivElement;
  selection;
  constructor(container) {
    this.container = container;
  }

  saveSelection = () => {
    const containerEl = this.container;
    var doc = containerEl.ownerDocument,
      win = doc.defaultView;
    var range = win.getSelection().getRangeAt(0);
    var preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    var start = preSelectionRange.toString().length;

    this.selection = {
      start: start,
      end: start + range.toString().length
    };
  };

  restoreSelection = () => {
    const containerEl = this.container;
    const savedSel = this.selection;
    var doc = containerEl.ownerDocument,
      win = doc.defaultView;
    var charIndex = 0,
      range = doc.createRange();
    range.setStart(containerEl, 0);
    range.collapse(true);
    var nodeStack = [containerEl],
      foundStart = false,
      stop = false;
    let node = undefined as Node | undefined;
    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType == 3) {
        var nextCharIndex = charIndex + node.length;
        if (!foundStart && savedSel.start >= charIndex && savedSel.start < nextCharIndex) {
          range.setStart(node, savedSel.start - charIndex);
          foundStart = true;
        }
        if (foundStart && savedSel.end >= charIndex && savedSel.end < nextCharIndex) {
          const offset = savedSel.end - charIndex;

          if (offset === 0) {
            console.log({ node }, node.previousSibling);
            range.setEnd(node.previousSibling, node.previousSibling.textContent.length);
          } else {
            range.setEnd(node, offset);
          }
          stop = true;
        }
        charIndex = nextCharIndex;
      } else {
        var i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    var sel = win.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };
}
