import {
  Section,
  Title,
  Subtitle,
  Container,
  Button,
  Columns,
  Column,
} from "trunx";
import MonacoEditor from "react-monaco-editor";
import { useEffect, useState } from "react";
import TemplateSelect from "../components/TemplateSelect";

interface TemplateField {
  name: string;
  position: number;
  font: string;
  rtl: string;
  size: number;
  sticky: boolean;
  sortField: number; // is this correct?
}

interface TemplateFile {
  parent: string;
  name: string;
  front: string;
  back: string;
  styling: string;
  storageKey: string;
}

let files: TemplateFile[] = [
  {
    parent: "Basic",
    name: "n2a-basic",
    front: '<span class="front-text-pre">{{Front}}</span>',
    back: `<span class="front-text-post">{{Front}}</span>' '<hr id="answer">' '<span class="back-text">{{Back}}</span>`,
    styling: "",
    storageKey: "n2a-basic",
  },
  // { parent: "Cloze", name: "n2a-cloze" },
  // { parent: "Basic (type in the answer)", name: "n2a-input" },
];

const TemplatePage = () => {
  const [code, setCode] = useState("");
  const [options, setOptions] = useState({});
  const [isFront, setIsFront] = useState(true);
  const [isBack, setIsBack] = useState(false);
  const [isStyling, setIsStyling] = useState(false);
  const [language, setLanguage] = useState("html");

  const [isFrontPreview, setIsFrontPreview] = useState(true);

  const [isBackPreview, setIsBackPreview] = useState(false);

  const editorDidMount = (editor: { focus: () => void }, _monaco: any) => {
    editor.focus();
  };

  const onChange = (newValue: any, event: any) => {
    console.log("newValue", newValue, event);
  };

  const saveChanges = () => {
    console.log("TODO save");
  };

  const currentCardType = () => {
    const currentCardType = localStorage.getItem("current-card-type");
    console.log(currentCardType);
    return files.find((x) => x.storageKey === currentCardType);
  };

  useEffect(() => {
    if (isFront) {
      const c = currentCardType();
      if (c) {
        setLanguage("html");
        setCode(c.front);
      }
      setIsFrontPreview(isFront);
      setIsBackPreview(false);
      setIsStyling(false);
      setIsBack(false);
    }
  }, [isFront]);

  useEffect(() => {
    if (isBack) {
      const c = currentCardType();
      if (c) {
        setCode(c.back);
        setLanguage("html");
      }
      setIsBackPreview(isBack);
      setIsFrontPreview(false);
      setIsStyling(false);
      setIsFront(false);
    }
  }, [isBack]);

  useEffect(() => {
    if (isStyling) {
      setIsStyling(isStyling);
      setIsFront(false);
      setIsBack(false);
      const c = currentCardType();
      if (c) {
        setCode(c.styling);
        setLanguage("css");
      }
    }
  }, [isStyling]);

  useEffect(() => {
    if (isBackPreview) {
      setIsFrontPreview(false);
    }
  }, [isBackPreview]);

  useEffect(() => {
    if (isFrontPreview) {
      setIsBackPreview(false);
    }
  }, [isFrontPreview]);

  return (
    <Section m4>
      <Container>
        <Title>Template Manager</Title>
        <Subtitle hasTextDanger>This is a work in progress.</Subtitle>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Card Type: </label>
          </div>
          <div className="field-body">
            <div className="field">
              <TemplateSelect
                values={files.map((f) => {
                  return { label: f.name, value: f.name };
                })}
                defaultValue="n2a-basic"
                storageKey="current-card-type"
              />
            </div>
          </div>
        </div>
        <Columns>
          <Column>
            <p>Template</p>
            <div className="control m-2">
              <label className="radio">
                <input
                  checked={isFront}
                  onChange={(event) => setIsFront(event.target.checked)}
                  className="m-2"
                  type="radio"
                  name="front-template"
                />
                Front Template
              </label>
              <label className="radio">
                <input
                  checked={isBack}
                  onChange={(event) => setIsBack(event.target.checked)}
                  className="m-2"
                  type="radio"
                  name="back-template"
                />
                Back Template
              </label>
              <label className="radio">
                <input
                  checked={isStyling}
                  onChange={(event) => setIsStyling(event.target.checked)}
                  className="m-2"
                  type="radio"
                  name="styling"
                />
                Styling
              </label>
            </div>
            <MonacoEditor
              width="540px"
              height="600"
              language="html"
              theme="vs-light"
              value={code}
              options={options}
              onChange={onChange}
              editorDidMount={editorDidMount}
            />
          </Column>
          <Column>
            <p>Preview</p>
            <div className="control m-2">
              <label className="radio">
                <input
                  checked={isFrontPreview}
                  onChange={(event) => setIsFrontPreview(event?.target.checked)}
                  className="m-2"
                  type="radio"
                  name="front-preview"
                />
                Front Preview
              </label>
              <label className="radio">
                <input
                  checked={isBackPreview}
                  onChange={(event) => setIsBackPreview(event.target.checked)}
                  className="m-2"
                  type="radio"
                  name="back-preview"
                />
                Back Preview
              </label>
              <div
                className="mt-2"
                style={{
                  height: "600px",
                  width: "540px",
                  border: "1.3px solid grey",
                }}
              ></div>
            </div>
          </Column>
        </Columns>
        <Container hasTextCentered mt2>
          <Button isPrimary onClick={saveChanges}>
            Save
          </Button>
        </Container>
      </Container>
    </Section>
  );
};

export default TemplatePage;