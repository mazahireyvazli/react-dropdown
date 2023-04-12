import { useState } from "react";
import { Dropdown } from "./dropdown/Dropdown";

const options = [
  { value: "icecream", label: "Option 1" },
  { value: "iceberg", label: "Option 2" },
  { value: "vanilla", label: "Option 3" },
  {
    value: "jsx",
    label: "Option 4",
  },
  { value: "apple", label: "Option 5" },
  { value: "pickle", label: "Option 6" },
  { value: "sourplum", label: "Option 7" },
  { value: "pie", label: "Option 8" },
  { value: "watermelon", label: "Option 9" },
];

function App() {
  const [selectedOption, setSelectedOption] = useState<string>();
  const [placeholder, setPlaceholder] = useState("Select an option");

  return (
    <div>
      <h1>React dropdown</h1>
      <Dropdown
        placeholder={placeholder}
        value={selectedOption}
        options={options}
        onSelect={(option) => {
          setSelectedOption(option.value);
        }}
      />
      <div className="actions">
        <button onClick={() => setSelectedOption("")}>Reset value</button>
        <button onClick={() => setPlaceholder("Random placeholder")}>
          Update placeholder
        </button>
      </div>
    </div>
  );
}

export default App;
