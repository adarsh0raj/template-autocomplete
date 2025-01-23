import React, { useState, useRef, useEffect } from "react";
import {
  Editor as DraftEditor,
  EditorState,
  ContentState,
  Modifier,
  SelectionState,
  CompositeDecorator,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { createUseStyles } from "react-jss";
import { editorStyles } from "./Editor.styles";
import { INote } from "../common/models";
import { suggestions } from "../common/constants";
import { autocompleteDecorator } from "./Editor.utils";

interface IEditorProps {
  selectedNote: INote | null;
  setNotesList: any;
}

const Editor: React.FC<IEditorProps> = ({ selectedNote, setNotesList }) => {
  const classes = createUseStyles(editorStyles)();
  const compositeDecorator = new CompositeDecorator([autocompleteDecorator]);
  const [editorState, setEditorState] = useState(() =>
    selectedNote
      ? EditorState.createWithContent(ContentState.createFromText(selectedNote.content),
          compositeDecorator
        )
      : EditorState.createEmpty(compositeDecorator)
  );
  const [autocompleteVisible, setAutocompleteVisible] = useState(false);
  const [matchString, setMatchString] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const editorRef = useRef<DraftEditor>(null);
  const [noteTitle, setNoteTitle] = useState(selectedNote ? selectedNote.title : "");
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (selectedNote) {
      const content = ContentState.createFromText(selectedNote.content);
      setEditorState(EditorState.createWithContent(content, compositeDecorator));
      setNoteTitle(selectedNote.title);
    }
    else {
      setEditorState(EditorState.createEmpty(compositeDecorator));
      setNoteTitle("");
    }
  }, [selectedNote]);

  useEffect(() => {
    if (suggestionsListRef.current && autocompleteVisible) {
      const highlightedElement = suggestionsListRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [highlightedIndex, autocompleteVisible]);

  useEffect(() => {
    editorRef.current?.focus();
  }, []);

  const filteredSuggestions = suggestions.filter((s) => s.startsWith(matchString));

  const getMatchString = (text: string, selectionOffset: number): string | null => {
    const match = /<>([^]*)$/.exec(text.slice(0, selectionOffset));
    return match ? match[1] : null;
  };

  const handleAutocomplete = (newEditorState: EditorState) => {
    const content = newEditorState.getCurrentContent();
    const selection = newEditorState.getSelection();
    const blockKey = selection.getAnchorKey();
    const block = content.getBlockForKey(blockKey);
    const text = block.getText();
    const offset = selection.getAnchorOffset();

    const currentMatchString = getMatchString(text, offset);
    if (currentMatchString !== null) {
      setAutocompleteVisible(true);
      setMatchString(currentMatchString);

      const selectionRange = window.getSelection()?.getRangeAt(0);
      if (selectionRange) {
        const rect = selectionRange.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    } else {
      setAutocompleteVisible(false);
      setMatchString("");
    }
  };

  const insertAutocomplete = (value: string) => {
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getAnchorKey();
    const block = content.getBlockForKey(blockKey);
    const text = block.getText();
    const offset = selection.getAnchorOffset();
  
    const matchStart = text.lastIndexOf("<>", offset);
    const matchEnd = offset;
  
    const contentWithEntity = content.createEntity("AUTOCOMPLETE", "IMMUTABLE", { value });
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
  
    const newContent = Modifier.replaceText(
      contentWithEntity,
      SelectionState.createEmpty(blockKey).merge({
        anchorOffset: matchStart,
        focusOffset: matchEnd,
      }),
      value,
      undefined,
      entityKey
    );
  
    const newEditorState = EditorState.push(editorState, newContent, "insert-characters");
    setEditorState(EditorState.forceSelection(newEditorState, newContent.getSelectionAfter()));
    setAutocompleteVisible(false);
    setMatchString("");
    setHighlightedIndex(0);
  };  

  const handleKeyCommand = (e: React.KeyboardEvent) => {
    if (autocompleteVisible) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filteredSuggestions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex(
          (prev) => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length
        );
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        if (filteredSuggestions.length > 0) {
          insertAutocomplete(filteredSuggestions[highlightedIndex]);
        } else {
          insertAutocomplete(matchString);
        }
      }
    }
  };

  const handleSaveNote = () => {
    const content = editorState.getCurrentContent();
    const contentText = content.getPlainText();

    if (!contentText.trim()) return;

    const newNote: INote = {
      id: selectedNote ? selectedNote.id : Date.now().toString(),
      title: noteTitle || contentText.substring(0, 30), 
      content: contentText,
      date: new Date().toLocaleString(),
    };

    setNotesList((prevNotesList: INote[]) => [...prevNotesList, newNote]);
    setEditorState(EditorState.createEmpty());
    setNoteTitle("");
  };

  return (
    <div className={classes.editorContainer}>
      <div className={classes.editorHeader}>
        <div className={classes.dateDisplay}>
          {selectedNote ? selectedNote.date : new Date().toLocaleString()}
        </div>
        <div className={classes.titleDiv}>
          <input
            type="text"
            placeholder="Title"
            className={classes.titleInput}
            value={noteTitle}
            onChange={(e) => {
              setNoteTitle(e.target.value);
            }}
          />
        </div>
      </div>
      <div
        className={classes.editorWrapper}
        onKeyDown={handleKeyCommand}
      >
        <DraftEditor
          editorState={editorState}
          placeholder="Start typing here..."
          
          onChange={(newEditorState) => {
            setEditorState(newEditorState);
            handleAutocomplete(newEditorState);
          }}
          ref={editorRef}
        />
      </div>
      {autocompleteVisible && filteredSuggestions.length > 0 && (
        <ul
          className={classes.suggestionsList}
          ref={suggestionsListRef}
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={
                index === highlightedIndex
                  ? classes.suggestionHighlighted
                  : classes.suggestion
              }
              onMouseDown={() => insertAutocomplete(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button className={classes.saveButton} onClick={handleSaveNote}>
        Save Note
      </button>
    </div>
  );
};

export default Editor;
