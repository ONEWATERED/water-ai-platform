'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';

const lowlight = createLowlight(common);

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto'
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-700 underline'
        }
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: 'rounded-lg overflow-hidden'
        }
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'rounded-lg bg-gray-800 p-4 font-mono text-sm text-gray-200'
        }
      }),
      Placeholder.configure({
        placeholder: 'Write something amazing...',
        emptyEditorClass: 'is-editor-empty',
      }),
      CharacterCount.configure({
        limit: 10000
      })
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="min-h-[500px]">
      <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 p-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${
              editor.isActive('bold') ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${
              editor.isActive('italic') ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded ${
              editor.isActive('heading', { level: 1 }) ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded ${
              editor.isActive('heading', { level: 2 }) ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${
              editor.isActive('bulletList') ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded ${
              editor.isActive('orderedList') ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            Numbered List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded ${
              editor.isActive('codeBlock') ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            Code Block
          </button>
          <button
            onClick={() => {
              const url = window.prompt('Enter the URL:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={`p-2 rounded ${
              editor.isActive('link') ? 'bg-gray-700' : 'hover:bg-gray-800'
            }`}
          >
            Link
          </button>
        </div>
      </div>

      <EditorContent editor={editor} />

      <div className="mt-4 text-sm text-gray-400">
        {editor.storage.characterCount.characters()}/{editor.storage.characterCount.limit()} characters
      </div>
    </div>
  );
}
