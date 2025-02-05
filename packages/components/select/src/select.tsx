import type {ForwardedRef, ReactElement} from "react";

import {Listbox} from "@heroui/listbox";
import {FreeSoloPopover} from "@heroui/popover";
import {ChevronDownIcon, CloseFilledIcon} from "@heroui/shared-icons";
import {Spinner} from "@heroui/spinner";
import {useMemo} from "react";
import {forwardRef} from "@heroui/system";
import {ScrollShadow} from "@heroui/scroll-shadow";
import {cloneElement} from "react";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {AnimatePresence} from "framer-motion";

import {HiddenSelect} from "./hidden-select";
import {UseSelectProps, useSelect} from "./use-select";

interface Props<T> extends UseSelectProps<T> {}

export type SelectProps<T extends object = object> = Props<T>;

const Select = forwardRef(function Select<T extends object>(
  props: SelectProps<T>,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const {
    Component,
    state,
    label,
    hasHelper,
    isLoading,
    triggerRef,
    selectorIcon = <ChevronDownIcon />,
    description,
    errorMessage,
    isInvalid,
    startContent,
    endContent,
    placeholder,
    renderValue,
    shouldLabelBeOutside,
    disableAnimation,
    getBaseProps,
    getLabelProps,
    getTriggerProps,
    getValueProps,
    getListboxProps,
    getPopoverProps,
    getSpinnerProps,
    getMainWrapperProps,
    getInnerWrapperProps,
    getHiddenSelectProps,
    getHelperWrapperProps,
    getListboxWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getSelectorIconProps,
    isClearable,
    getClearButtonProps,
  } = useSelect<T>({...props, ref});

  const labelContent = label ? <label {...getLabelProps()}>{label}</label> : null;

  const clonedIcon = cloneElement(selectorIcon as ReactElement, getSelectorIconProps());

  const clearButton = useMemo(() => {
    if (isClearable && state.selectedItems?.length) {
      return <button {...getClearButtonProps()}>{<CloseFilledIcon />}</button>;
    }

    return null;
  }, [isClearable, getClearButtonProps, state.selectedItems?.length]);

  const end = useMemo(() => {
    if (clearButton) {
      return (
        <div className="flex end-18">
          {clearButton}
          {endContent && <span className="ms-3">{endContent}</span>}
        </div>
      );
    }

    return endContent && <span className="mb-4">{endContent}</span>;
  }, [clearButton, endContent]);

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

  const renderSelectedItem = useMemo(() => {
    if (!state.selectedItems?.length) return placeholder;

    if (renderValue && typeof renderValue === "function") {
      const mappedItems = [...state.selectedItems].map((item) => ({
        key: item.key,
        data: item.value,
        type: item.type,
        props: item.props,
        textValue: item.textValue,
        rendered: item.rendered,
        "aria-label": item["aria-label"],
      }));

      return renderValue(mappedItems);
    }

    return state.selectedItems.map((item) => item.textValue).join(", ");
  }, [state.selectedItems, renderValue, placeholder]);

  const renderIndicator = useMemo(() => {
    if (isLoading) {
      return <Spinner {...getSpinnerProps()} />;
    }

    return clonedIcon;
  }, [isLoading, clonedIcon, getSpinnerProps]);

  const popoverContent = useMemo(
    () =>
      state.isOpen ? (
        <FreeSoloPopover {...getPopoverProps()}>
          <ScrollShadow {...getListboxWrapperProps()}>
            <Listbox {...getListboxProps()} />
          </ScrollShadow>
        </FreeSoloPopover>
      ) : null,
    [state.isOpen, getPopoverProps, state, triggerRef, getListboxWrapperProps, getListboxProps],
  );

  return (
    <div {...getBaseProps()}>
      <HiddenSelect {...getHiddenSelectProps()} />
      {shouldLabelBeOutside ? labelContent : null}
      <div {...getMainWrapperProps()}>
        <Component {...getTriggerProps()}>
          {!shouldLabelBeOutside ? labelContent : null}
          <div {...getInnerWrapperProps()}>
            {startContent}
            <span {...getValueProps()}>{renderSelectedItem}</span>
            {endContent && state.selectedItems && (
              <VisuallyHidden elementType="span">,</VisuallyHidden>
            )}
            {end}
          </div>
          {renderIndicator}
        </Component>
        {helperWrapper}
      </div>
      {disableAnimation ? popoverContent : <AnimatePresence>{popoverContent}</AnimatePresence>}
    </div>
  );
}) as <T extends object>(props: SelectProps<T>) => ReactElement;

export default Select;
