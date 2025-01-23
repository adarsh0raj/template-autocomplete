import React from "react";

export const autocompleteDecorator = {
  strategy: (contentBlock: any, callback: any, contentState: any) => {
    contentBlock.findEntityRanges(
      (character: any) => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === "AUTOCOMPLETE";
      },
      callback
    );
  },
  component: (props: any) => {
    return (
      <span
        style={{
          backgroundColor: "#e6f7ff",
          color: "#0056b3",
          padding: "2px 4px",
          borderRadius: "4px",
        }}
      >
        {props.children}
      </span>
    );
  },
};
