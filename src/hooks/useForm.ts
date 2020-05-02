import {
  ChangeEvent,
  useCallback,
  useMemo,
  useState
  } from 'react';

const useForm = (initialValues: { [name: string]: string }) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.persist();
      setFormValues(prev => {
        return {
          ...prev,
          [event.target.name]: event.target.value
        };
      });
    },
    [setFormValues]
  );

  const returnValue = useMemo(() => {
    return {
      handleChange: handleChange,
      values: formValues
    };
  }, [formValues, handleChange]);

  return returnValue;
};

export default useForm;
