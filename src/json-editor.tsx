import React, { useState } from "react";
import styled from "styled-components";

const defaultValue = `
{
	"id": "0001",
	"type": "donut",
	"name": "Cake",
	"ppu": 0.55,
	"batters": {
		"batter": [{
				"id": "1001",
				"type": "Regular"
			},
			{
				"id": "1002",
				"type": "Chocolate"
			},
			{
				"id": "1003",
				"type": "Blueberry"
			},
			{
				"id": "1004",
				"type": "Devil's Food"
			}
		]
	},
	"topping": [{
			"id": "5001",
			"type": "None"
		},
		{
			"id": "5002",
			"type": "Glazed"
		},
		{
			"id": "5005",
			"type": "Sugar"
		},
		{
			"id": "5007",
			"type": "Powdered Sugar"
		},
		{
			"id": "5006",
			"type": "Chocolate with Sprinkles"
		},
		{
			"id": "5003",
			"type": "Chocolate"
		},
		{
			"id": "5004",
			"type": "Maple"
		}
	]
}
`;

const JsonActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  border-radius: 15px;
  outline: 0;
  border: 0.5px solid gray;
  background-color: white;
  padding: 7px;
  margin: 15px;
  min-width: 7vw;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  -moz-box-shadow: inset -1px -1px 2px #fff;
  -webkit-box-shadow: inset -1px -1px 2px #fff;
  box-shadow: inset -1px -1px 2px #fff;
  &:hover {
    background-color: lightgray;
  }
`;

const StyledJSONContainer = styled.textarea`
  background: #fff;
  border-radius: 4px;
  border: 0.2px solid #c4c4c4;
  padding: 20px;
  transition: all 0.2s;
  font-weight: 400;
  font-family: "Roboto Mono", sans-serif;
  font-size: 14px;
  color: black;
  height: 45vh;
  width: 50vw;
  overflow: scroll;
  overflow-x: hidden;
  -moz-box-shadow: inset -1px -1px 2px #ccc;
  -webkit-box-shadow: inset -1px -1px 2px #ccc;
  box-shadow: inset -1px -1px 2px #ccc;

  ::placeholder {
    color: lightgray;
  }

  &:focus {
    outline: 0;
  }
`;

export const JSONEditor: React.FC = () => {
  const [jsonData, setJsonData] = useState("");
  const [placeholderText, setPlaceholderText] = useState(
    JSON.stringify(JSON.parse(defaultValue), undefined, 4)
  );
  const [showError, setError] = useState(false);

  const isValidJson = (data: string): boolean => {
    try {
      JSON.parse(data);
    } catch (e) {
      if (e instanceof SyntaxError) return false;
    }
    return true;
  };

  const prettify = (data: string): string => {
    const isValid = isValidJson(data);
    if (isValid) return JSON.stringify(JSON.parse(data), undefined, 4);
    else {
      setError(true);
      return "";
    }
  };

  const onPrettify = (): void => {
    if (jsonData && isValidJson(jsonData)) {
      const pretty = prettify(jsonData);
      setJsonData(pretty);
      setError(false);
    }
    if (!isValidJson(jsonData)) setError(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void =>
    setJsonData(e.target.value);

  const onFocus = (): void => setPlaceholderText("");

  const onBlur = (): void => {
    if (!jsonData) setPlaceholderText(prettify(defaultValue));
    else setPlaceholderText("");
  };

  const onClear = (): void => {
    setJsonData("");
    setError(false);
  };

  return (
    <div>
      <StyledJSONContainer
        id="myTextArea"
        value={Object.entries(jsonData).length > 0 ? jsonData : ""}
        placeholder={placeholderText}
        onChange={(e) => onChange(e)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {showError && <p style={{ color: "red" }}>Invalid JSON</p>}
      <JsonActions>
        <StyledButton onClick={onPrettify}>Prettify</StyledButton>
        <StyledButton onClick={onClear}> Clear</StyledButton>
      </JsonActions>
    </div>
  );
};
