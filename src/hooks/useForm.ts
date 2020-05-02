import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
  } from 'react';
import { ObjectSchema } from 'yup';

const useForm = (initialValues: { [name: string]: string }, validationSchema: ObjectSchema) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [valid, setValid] = useState(true);

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

  useEffect(() => {
    validationSchema.isValid(formValues).then(valid => {
      setValid(valid);
    });
  }, [formValues, validationSchema]);

  const returnValue = useMemo(() => {
    return {
      handleChange: handleChange,
      values: formValues,
      isValid: valid
    };
  }, [formValues, handleChange, valid]);

  return returnValue;
};

export default useForm;
