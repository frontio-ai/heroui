import {CloseFilledIcon} from "@heroui/shared-icons";
import {useMemo} from "react";
import {forwardRef} from "@heroui/system";

import {UseNumberInputProps, useNumberInput} from "./use-number-input";
import NumberInputStepper from "./number-input-stepper";

export interface NumberInputProps extends UseNumberInputProps {}

const NumberInput = forwardRef<"input", NumberInputProps>((props, ref) => {
  const {
    Component,
    label,
    description,
    isClearable,
    startContent,
    endContent,
    labelPlacement,
    hasHelper,
    isOutsideLeft,
    shouldLabelBeOutside,
    errorMessage,
    isInvalid,
    hideStepper,
    getBaseProps,
    getLabelProps,
    getNumberInputProps,
    getHiddenNumberInputProps,
    getInnerWrapperProps,
    getInputWrapperProps,
    getMainWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
    getStepperIncreaseButtonProps,
    getStepperDecreaseButtonProps,
    getStepperWrapperProps,
  } = useNumberInput({...props, ref});

  const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;

  const end = useMemo(() => {
    if (isClearable) {
      return (
        <>
          <button {...getClearButtonProps()}>
            <CloseFilledIcon />
          </button>
          {endContent}
        </>
      );
    }

    return endContent;
  }, [isClearable, getClearButtonProps]);

  const helperWrapper = useMemo(() => {
    const shouldShowError = isInvalid && errorMessage;
    const hasContent = shouldShowError || description;

    if (!hasHelper || !hasContent) return null;

    return (
      <div {...getHelperWrapperProps()}>
        {shouldShowError ? (
          <div {...getErrorMessageProps()}>{errorMessage}</div>
        ) : (
          <div {...getDescriptionProps()}>{description}</div>
        )}
      </div>
    );
  }, [
    hasHelper,
    isInvalid,
    errorMessage,
    description,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  ]);

  const innerWrapper = useMemo(() => {
    return (
      <div {...getInnerWrapperProps()}>
        {startContent}
        <input {...getNumberInputProps()} />
        <input {...getHiddenNumberInputProps()} />
        {end}
        {!hideStepper && (
          <div {...getStepperWrapperProps()}>
            <NumberInputStepper {...getStepperIncreaseButtonProps()} direction="up" />
            <NumberInputStepper {...getStepperDecreaseButtonProps()} direction="down" />
          </div>
        )}
      </div>
    );
  }, [startContent, end, getNumberInputProps, getInnerWrapperProps]);

  const mainWrapper = useMemo(() => {
    if (shouldLabelBeOutside) {
      return (
        <div {...getMainWrapperProps()}>
          <div {...getInputWrapperProps()}>
            {!isOutsideLeft ? labelContent : null}
            {innerWrapper}
          </div>
          {helperWrapper}
        </div>
      );
    }

    return (
      <>
        <div {...getInputWrapperProps()}>
          {labelContent}
          {innerWrapper}
        </div>
        {helperWrapper}
      </>
    );
  }, [
    labelPlacement,
    helperWrapper,
    shouldLabelBeOutside,
    labelContent,
    innerWrapper,
    errorMessage,
    description,
    getMainWrapperProps,
    getInputWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  ]);

  return (
    <Component {...getBaseProps()}>
      {isOutsideLeft ? labelContent : null}
      {mainWrapper}
    </Component>
  );
});

NumberInput.displayName = "HeroUI.NumberInput";

export default NumberInput;
