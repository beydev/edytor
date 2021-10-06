import { useEditor, useSelectionChange } from "edytor-solid";
import { For } from "solid-js";
import {
  TextBolder,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  CodeSimple,
  HighlighterCircle
} from "phosphor-solid";
import { EdytorSelection, formatText } from "edytor/src";

export const HooverMenu = ({}) => {
  let ref = undefined as undefined | HTMLDivElement;
  const editor = useEditor();
  const selection = useSelectionChange((s: EdytorSelection) => {
    if (!ref) return;
    if (!s.boundingRect || s.type === "collapsed") {
      ref.style.transform = `scale(0.9)`;
      ref.style.opacity = "0";
    } else {
      ref.style.opacity = "1";
      ref.style.transform = `scale(1)`;
      ref.style.top = `${s.boundingRect.top + window.pageYOffset - ref.offsetHeight - 5}px`;
      ref.style.left = `${s.boundingRect.left + window.pageXOffset - ref.offsetWidth / 2 + s.boundingRect.width / 2}px`;
      ref.style.transition = `opacity 0.2s, transform 0s ease-in-out`;
      setTimeout(() => {
        ref.style.transition = `opacity 0.2s, transform 0.2s ease-in-out`;
      }, 200);
    }
  });

  const icons = [
    {
      Icon: TextBolder,
      mark: { bold: true }
    },
    { Icon: TextUnderline, mark: { underline: true } },
    { Icon: TextItalic, mark: { italic: true } },
    { Icon: TextStrikethrough, mark: { strikethrough: true } },
    { Icon: CodeSimple, mark: { code: true } },
    { Icon: HighlighterCircle, mark: { highlight: "bg-blue" } }
  ];

  return (
    <>
      <div className="shadow-lg absolute bg-white z-10 overflow-hidden rounded-md h-8  origin-bottom-left" ref={ref}>
        <For each={icons}>
          {({ Icon, mark }) => {
            return (
              <button
                onClick={() => {
                  formatText(editor, mark);
                }}
                className="p-1 h-full hover:bg-gray-100 "
              >
                <Icon weight="bold" />
              </button>
            );
          }}
        </For>
      </div>
    </>
  );
};
