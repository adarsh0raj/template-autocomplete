import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import SidePanel from "./sidepanel/SidePanel";
import Editor from "./editor/Editor";
import "./App.css";
import { INote } from "./common/models";

const App: React.FC = () => {
  const [notesList, setNotesList] = useState<INote[]>([]);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);

  return (
    <div className="app-container">
      <Header notesList={notesList} setSelectedNote={setSelectedNote}/>
        <div className="main-content">
          <SidePanel setSelectedNote={setSelectedNote} notesList={notesList}/>
          <Editor selectedNote={selectedNote} setNotesList={setNotesList}/>
        </div>
    </div>
  );
};

export default App;
