import useData from "formik-data";
import { forwardRef, useEffect, useMemo, useState } from "react";
import Combo from "ui-components/combo/Combo";
import VirtualizedDropdown from "ui-components/virtual";
import VirtualizedDropdownNew from "ui-components/virtual-tanstack";
import MyCombobox from "ui-components/virtual-tanstack/MyCombobox";
import "./App.css";
import ComboBoxAutocomplete from "./ui-components/combobox";

function App() {
  // const data = [...Array(5000)].map((_, idx) => `item-${idx}`);
  const options = [...Array(5000)].map((_, idx) => ({
    label: `label-${idx}`,
    salary: `$${idx}`,
  }));
  const dropdownHeight = "400px";
  const handleSelect = (e) => {
    console.log("onselect:", e);
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const url = "https://jsonplaceholder.typicode.com/posts";
    const getData = () => {
      fetch(url)
        .then((res) => res.json())
        .then(setData)
        .catch(console.log)
        .finally(() => setIsLoading(false));
    };
    getData();
  }, []);
  // console.log(data);

  const arrayOfObjectsInit = [
    {
      userId: 1,
      id: 7,
      title: "magnam facilis autem",
      body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
    },
    {
      userId: 2,
      id: 15,
      title: "eveniet quod temporibus",
      body: "reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae",
    },
    {
      userId: 1,
      id: 10,
      title: "optio molestias id quia eum",
      body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
    },
  ];
  const arrayOfStrings = [...Array(8)].map((_, idx) => `str-${idx}`);
  const [initialValueOfCombo, setInitialValueOfCombo] = useState();
  const commaData = ["html", "css", "java", "python,css,java", "scss"];
  useEffect(() => {
    const init = ["str-4", "str-6", "str-7"];
    setTimeout(() => setInitialValueOfCombo(init), 4000);
    // setTimeout(() => setInitialValueOfCombo(arrayOfObjectsInit), 4000);
  }, []);

  const formik = useData();
  // console.log("formik", formik.values.result);
  return (
    <div className="App">
      <div className="w-80">
        <Combo
          dropdownHeight={dropdownHeight}
          options={arrayOfStrings}
          initialValue={formik.values.result}
          // initialValue={initialValueOfCombo}
          // onSelect={handleSelect}
          onApply={(e) => console.log("onapply:", e)}
          // getValue={(el) => `${el?.salary}`.toLowerCase()} //converting number to string
          // getLabel={(el) => el?.mySalary}
          // keyOfValue="salary"
          // keyOfLabel="mySalary"
          isLoading={isLoading}
          isVirtualized={true}
          isMultiSelect={true}
          customInput={CustomInput}
          onCreateNew={(e) => console.log("new option:", e)}
        />
      </div>
      {/* <ComboBoxAutocomplete options={data} virtualized /> */}
      {/* <VirtualizedDropdown options={data} /> */}
      {/* <MyCombobox
        items={data}
        dropdownHeight={dropdownHeight}
        isVirtualized={true}
      /> */}
      {/* <VirtualizedDropdownNew options={data} /> */}
    </div>
  );
}

export default App;

//onApply(for query string pushing or api calling), comma separate, dupliactes remove, create new option, remove on clicking chip, tolowercase check, debounce, custom input
//initial values with formik 2sec delay

const CustomInput = forwardRef((props, ref) => {
  return (
    <>
      <input
        type="text"
        className="bg-green-200 border-2 border-solid border-red-400 w-full"
        ref={ref}
        {...props}
      />
    </>
  );
});
