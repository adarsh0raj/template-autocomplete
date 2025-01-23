import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { sidePanelStyles } from './SidePanel.styles';
import { INote } from '../common/models';

interface ISidePanelProps {
  setSelectedNote: any;
  notesList: INote[];
}

const SidePanel: React.FC<ISidePanelProps> = ({setSelectedNote, notesList}) => {
  const classes = createUseStyles(sidePanelStyles)();

  const handleNewNoteClick = () => {
    setSelectedNote(null);
  }

  const handleNoteClick = (note: INote) => {
    setSelectedNote(note);
  }

  return (
    <div className={classes.sidePanel}>
      <div className={classes.accordion}>
        <div className={classes.accordionHeader}>
          <span>Notes</span>
        </div>
        <div className={classes.accordionContent}>
          {notesList.length > 0 ? (
            <ul className={classes.noteList}>
              {notesList.map((note) => (
                <li
                  key={note.id}
                  className={classes.noteItem}
                  onClick={() => handleNoteClick(note)}
                >
                  {note.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className={classes.placeholderText}>No notes available.</p>
          )}
        </div>
      </div>
      <button onClick={handleNewNoteClick} className={classes.newNoteButton}>
        New Note
      </button>
    </div>
  );
};

export default SidePanel;