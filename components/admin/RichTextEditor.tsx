"use client";

import { useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { toast } from "sonner";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  error?: boolean;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        active ? "bg-brand-red text-white" : "hover:bg-gray-100 text-gray-600"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ value, onChange, placeholder, error }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAndInsertImageRef = useRef<(file: File) => void>();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: placeholder || "Décrivez l'événement..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose-event min-h-[220px] max-w-none focus:outline-none p-3",
      },
      handlePaste: (_view, event) => {
        const file = Array.from(event.clipboardData?.items || [])
          .find((item) => item.type.startsWith("image/"))
          ?.getAsFile();
        if (file) {
          uploadAndInsertImageRef.current?.(file);
          return true;
        }
        return false;
      },
      handleDrop: (_view, event) => {
        const file = Array.from(event.dataTransfer?.files || []).find((f) => f.type.startsWith("image/"));
        if (file) {
          uploadAndInsertImageRef.current?.(file);
          return true;
        }
        return false;
      },
    },
  });

  const uploadAndInsertImage = useCallback(
    async (file: File) => {
      if (!editor) return;
      const toastId = toast.loading("Envoi de l'image...");
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/upload-image", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Échec de l'envoi");
        editor.chain().focus().setImage({ src: data.url }).run();
        toast.success("Image ajoutée", { id: toastId });
      } catch (e: any) {
        toast.error(e.message || "Erreur lors de l'envoi de l'image", { id: toastId });
      }
    },
    [editor]
  );
  uploadAndInsertImageRef.current = uploadAndInsertImage;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadAndInsertImage(file);
    e.target.value = "";
  };

  const handleSetLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL du lien", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  if (!editor) return null;

  return (
    <div className={`rounded-lg border overflow-hidden ${error ? "border-red-500" : "border-gray-300"}`}>
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <ToolbarButton title="Gras" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Italique" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Souligné" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Barré" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-6 bg-gray-200 mx-1" />

        <ToolbarButton title="Titre 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Titre 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-6 bg-gray-200 mx-1" />

        <ToolbarButton title="Liste à puces" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Liste numérotée" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Citation" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-6 bg-gray-200 mx-1" />

        <ToolbarButton title="Aligner à gauche" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Centrer" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Aligner à droite" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-6 bg-gray-200 mx-1" />

        <ToolbarButton title="Insérer un lien" active={editor.isActive("link")} onClick={handleSetLink}>
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Retirer le lien" disabled={!editor.isActive("link")} onClick={() => editor.chain().focus().unsetLink().run()}>
          <Unlink className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Insérer une image" onClick={() => fileInputRef.current?.click()}>
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />

        <span className="w-px h-6 bg-gray-200 mx-1" />

        <ToolbarButton title="Annuler" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Rétablir" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}
