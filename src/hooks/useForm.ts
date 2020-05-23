import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
  } from 'react';
import { ObjectSchema } from 'yup';

const useForm = (initialValues: { [name: string]: any }, validationSchema: ObjectSchema) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [valid, setValid] = useState(true);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      event.persist();
      setFormValues(prev => {
        const val =
          event.target.type === 'checkbox' && event.target instanceof HTMLInputElement
            ? event.target.checked
            : event.target.value;
        return {
          ...prev,
          [event.target.name]: val
        };
      });
    },
    [setFormValues]
  );

  //TODO: debounce the validation, or run it on blur?
  // come up with some way to handle multiple validation requests going out (in the case of async validations)
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
