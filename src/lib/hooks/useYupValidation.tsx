import { useCallback, useState } from "react";
import {Resolver, useForm, UseFormProps} from "react-hook-form";
import { UseFormReturn } from "react-hook-form/dist/types";
import { DefaultValues } from "react-hook-form/dist/types/form";
import { SchemaOf } from "yup";

interface UseYupValue<T> extends UseFormReturn<T> {
  loading: boolean;
}


interface useYupValidationOption extends Pick<UseFormProps, "mode" | "reValidateMode" | "shouldFocusError"> {

}

export function useYupValidation<T>(
  validationSchema: SchemaOf<T>,
  defaultValues?: DefaultValues<T>,
  useFormOptions?: useYupValidationOption,
): UseYupValue<T> {
  const [loading, setLoading] = useState<boolean>(false);
  const resolver: Resolver = useCallback(
    async (data: T) => {
      try {
        if (process.env.NODE_ENV == "development") {
          console.log("[useYupValidation] : ", data);
        }
        setLoading(true);
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (e) {
        const errors = e.inner?.reduce(
          (allErrors, currentError) => ({
            ...allErrors,
            [currentError.path]: {
              type: currentError.type ?? "validation",
              message: currentError.message,
            },
          }),
          {},
        );
        if (process.env.NODE_ENV == "development") {
          console.log("[useYupValidation] Errors : ", errors);
        }
        return {
          values: {},
          errors: errors || {},
        };
      } finally {
        setLoading(false);
      }
    },
    [validationSchema],
  );

  const props = useForm<any>({
    mode: useFormOptions?.mode || "onSubmit",                     // 전송 눌러야 에러가 발생
    reValidateMode: useFormOptions?.reValidateMode || "onChange", // 에러 발생후에는 계속 체크
    shouldFocusError: useFormOptions?.shouldFocusError || true,   // submit 후 에러가 있는 필드에 포커스
    defaultValues,
    resolver,
  });

  return {
    ...props,
    loading,
  };
}

export default useYupValidation;
