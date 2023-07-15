import { useFormik } from "formik";
import { useEffect, useState } from "react";

const useData = () => {
  const [data, setData] = useState([]);
  const options = ["html", "css", "java", "python,css,java", "scss"];
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setData(options);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  const initialValues = {
    result: data,
  };
  const onSubmit = (props) => console.log({ props });
  const formik = useFormik({
    initialValues,
    onSubmit,
    enableReinitialize: true,
  });
  return formik;
};
export default useData;
