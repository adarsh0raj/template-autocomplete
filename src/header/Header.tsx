import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { headerStyles } from "./Header.styles";
import { createUseStyles } from "react-jss";
import { INote } from "../common/models";

interface IHeaderProps {
  notesList: INote[];
  setSelectedNote: any;
}

const Header: React.FC<IHeaderProps> = ({ notesList, setSelectedNote }) => {
  const classes = createUseStyles(headerStyles)();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = notesList.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotes(filtered);
      setDropdownVisible(true);
    } else {
      setFilteredNotes([]);
      setDropdownVisible(false);
    }
  };

  const handleNoteClick = (note: INote) => {
    setSelectedNote(note);
    setSearchQuery("");
    setDropdownVisible(false); 
  };

  return (
    <header className={classes.header}>
      <div className={classes.headerLeft}>
        <h1 className={classes.title}>Notepad</h1>
      </div>
      <div className={classes.headerCenter}>
        <div className={classes.searchWrapper}>
          <input
            type="text"
            placeholder="Search notes..."
            className={classes.searchBar}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => dropdownVisible && setDropdownVisible(true)}
          />
          {dropdownVisible && filteredNotes.length > 0 && (
            <ul className={classes.dropdown}>
              {filteredNotes.map((note) => (
                <li
                  key={note.id}
                  className={classes.dropdownItem}
                  onClick={() => handleNoteClick(note)}
                >
                  {note.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={classes.headerRight}>
        <a
          href="https://github.com/adarsh0raj/template-autocomplete"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.githubLink}
        >
          <FaGithub size={30} />
        </a>
      </div>
    </header>
  );
};

export default Header;