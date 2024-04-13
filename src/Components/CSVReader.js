import React from "react";
import "./CSVReader.css";
import { useState } from "react";
import Papa from "papaparse";
const CSVReader = () => {
  const allowedExtensions = ["csv"];
  const [data, setData] = useState([]);
  const [file, setFile] = useState("");
  const [key, setKey] = useState("");
  let [loading, setLoading] = useState(true);

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        alert("Please input a csv file");
        // setError("Please input a csv file");
        return;
      }
      setFile(inputFile);
    }
  };

  const handleParse = (file) => {
    const inputFile = file;
    Papa.parse(inputFile, {
      header: true,
      complete: (results) => {
        setData(results.data);
        setKey(results.meta.fields);
        setLoading(false);
      },
    });
  };

  return (
    <div>
      <div className="button-container">
        <h3 className="csvTitle">Read CSV file in React</h3>
        <label htmlFor="csvInput" style={{ display: "block" }}>
          Enter CSV File
        </label>
        <input
          id="csvInput"
          name="file"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
        <div>
          <button onClick={() => handleParse(file)}>Parse</button>
        </div>
      </div>
      <div>
        <div style={{ marginTop: "1rem" }} className="Container">
          {loading ? (
            loading
          ) : (
            <div>
              {
                <div className="item">
                  {key[0]} {"<==>"} {key[key.length - 1]}
                </div>
              }
              {data.map((row, i) => (
                <div key={i} className="item">
                  {row[key[0]]} {"<==>"} {row[key[key.length - 1]]}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSVReader;
