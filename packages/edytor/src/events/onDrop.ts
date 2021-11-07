import { Editor } from "..";

export const onDrop = (editor: Editor, e: DragEvent) => {
  if (e.dataTransfer?.files.length > 0) {
    e.preventDefault();
    console.log(e.dataTransfer?.files);
  }
};
export const onDragOver = (editor: Editor, e: DragEvent) => {
  e.preventDefault();

  if (e.dataTransfer?.files.length > 0) {
    e.preventDefault();
    console.log(e.dataTransfer?.files);
  }
};
