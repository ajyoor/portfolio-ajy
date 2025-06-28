import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = "",
  onChange,
  onImageUpload,
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (initialValue !== value) {
      const editor = quillRef.current?.getEditor();
      const editorIsEmpty =
        editor?.getLength() === 1 && editor?.getText().trim() === "";

      if (
        !editor ||
        (!editor.hasFocus() && (editorIsEmpty || initialValue !== value)) ||
        (initialValue !== value && editorIsEmpty)
      ) {
        setValue(initialValue);
      }
    }
  }, [initialValue]);

  const imageHandler = useCallback(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) {
      console.warn("Quill editor instance is not available for image upload.");
      return;
    }

    const currentRange = editor.getSelection();

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (!input.files || input.files.length === 0) {
        editor.focus();
        return;
      }
      const file = input.files[0];

      editor.focus(); // Re-focus editor after file selection dialog closes

      if (onImageUpload) {
        try {
          const imageUrl = await onImageUpload(file);
          const rangeToInsert = editor.getSelection() || currentRange;

          if (editor && rangeToInsert) {
            editor.insertEmbed(rangeToInsert.index, "image", imageUrl);
            editor.setSelection(rangeToInsert.index + 1);
          } else {
            console.error("Editor or range became invalid after image upload.");
            editor.insertEmbed(editor.getLength(), "image", imageUrl);
            editor.setSelection(editor.getLength());
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Gagal mengupload gambar.");
        }
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          const base64data = reader.result as string;
          const rangeToInsert = editor.getSelection() || currentRange;
          if (editor && rangeToInsert) {
            editor.insertEmbed(rangeToInsert.index, "image", base64data);
            editor.setSelection(rangeToInsert.index + 1);
          }
        };
        reader.readAsDataURL(file);
        alert(
          "Peringatan: Gambar diupload sebagai Base64. Disarankan untuk menggunakan API upload."
        );
      }
    };
  }, [onImageUpload]);

  // **** REVISI handlePaste LEBIH AGGRESIF ****
  const handlePaste = useCallback((event: ClipboardEvent) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) {
      console.warn("Quill editor instance not found on paste.");
      return;
    }

    // Capture selection BEFORE event.preventDefault() for better stability
    const currentRange = editor.getSelection();

    event.preventDefault(); // Stop default paste behavior

    const text = event.clipboardData?.getData("text/plain");

    if (text) {
      try {
        // Ensure editor is focused before inserting
        editor.focus();

        // Use the captured range, or get current if it's still valid
        const rangeToInsertAt = editor.getSelection() || currentRange;

        if (rangeToInsertAt) {
          editor.insertText(rangeToInsertAt.index, text);
          editor.setSelection(rangeToInsertAt.index + text.length);
        } else {
          // Fallback: insert at the end if no valid range can be found
          editor.insertText(editor.getLength(), text);
          editor.setSelection(editor.getLength());
        }

        // Optional: Add a small timeout to let Quill re-stabilize its DOM
        // This can sometimes help with race conditions or browser painting issues
        setTimeout(() => {
          editor.focus(); // Re-focus after a very short delay
        }, 0); // 0ms timeout means it runs after current call stack, not immediately
      } catch (pasteError) {
        console.error("Error during custom paste handling:", pasteError);
        // You might want to allow default paste if custom fails (though it might still cause issues)
        // Or simply log the error and let the user re-paste.
      }
    }
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
        matchers: [],
      },
    }),
    [imageHandler]
  );

  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "link",
      "image",
    ],
    []
  );

  const handleChange = useCallback(
    (content: string) => {
      setValue(content);
      onChange(content);
    },
    [onChange]
  );

  useEffect(() => {
    let editorElement: HTMLElement | null = null;
    let frameId: number;

    const attachListener = () => {
      if (quillRef.current) {
        editorElement = quillRef.current.getEditor().root;
        if (editorElement) {
          editorElement.addEventListener("paste", handlePaste);
        } else {
          frameId = requestAnimationFrame(attachListener);
        }
      } else {
        frameId = requestAnimationFrame(attachListener);
      }
    };

    frameId = requestAnimationFrame(attachListener);

    return () => {
      if (editorElement) {
        editorElement.removeEventListener("paste", handlePaste);
      }
      cancelAnimationFrame(frameId);
    };
  }, [handlePaste]);

  return (
    <div className="h-fit mb-[50px] bg-white">
      <ReactQuill
        key="blog-content-quill-editor"
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Tulis konten blog Anda di sini..."
      />
    </div>
  );
};

export default RichTextEditor;
