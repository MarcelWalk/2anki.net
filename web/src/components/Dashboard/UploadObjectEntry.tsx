import { useState } from "react";
import styled from "styled-components";
import Backend from "../../lib/Backend";
import SettingsModal from "../modals/SettingsModal";
import SliceRules from "./SliceRules";

const Entry = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 1.2rem;
  padding: 1rem;
  font-size: 2.4vw;
  justify-content: space-between;
`;

const ObjectMeta = styled.div`
  align-items: center;
  display: flex;
  grid-gap: 1.2rem;
`;

const ObjectAction = ({ url, image, onClick }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer" onClick={onClick}>
      <img alt="Page action" width="32px" src={image}></img>
    </a>
  );
};

const ObjectActions = styled.div`
  display: flex;
  grid-gap: 1rem;
  min-width: 80px;
`;

const UploadObjectEntry = ({ size, title, icon, url, id, deleteUpload }) => {
  return (
    <>
      <Entry>
        <ObjectMeta>
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-info">Size</span>
              <span className="tag">{size}</span>
            </div>
          </div>
          <span>{icon}</span>
          <span className="subtitle is-6">{title}</span>
        </ObjectMeta>
        <ObjectActions>
          <ObjectAction
            url={url}
            image="/icons/Anki_app_logo.png"
            onClick={() => {}}
          />
          <ObjectAction
            url={url}
            image="/icons/Notion_app_logo.png"
            onClick={() => {}}
          />
          <div>
            <button className="delete" onClick={() => deleteUpload(id)}>
              Delete
            </button>
          </div>
        </ObjectActions>
      </Entry>
    </>
  );
};

export default UploadObjectEntry;
