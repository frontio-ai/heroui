---
title: "Form"
description: "A form is a group of inputs that allows users to submit data to a server, with support for providing field validation errors."
---

import {formContent} from "@/content/components/form";

# Form

A form is a group of inputs that allows users to submit data to a server, with support for providing field validation errors.

<ComponentLinks component="form" />

---

<CarbonAd />

## Installation

<PackageManagers
  showGlobalInstallWarning
  commands={{
    cli: "npx heroui-cli@latest add form",
    npm: "npm install @heroui/form",
    yarn: "yarn add @heroui/form",
    pnpm: "pnpm add @heroui/form",
    bun: "bun add @heroui/form",
  }}
/>

## Import

<ImportTabs
  commands={{
    main: 'import {Form} from "@heroui/react";',
    individual: 'import {Form} from "@heroui/form";',
  }}
/>

## Usage

<CodeDemo title="Usage" files={formContent.usage} />

## Anatomy

A `Form` is a container for input elements and submit/reset buttons, with support for validation messages. When labeled with `aria-label` or `aria-labelledby`, it becomes a navigable [form landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/form.html) for assistive technology.

```tsx
import {Form, Button} from '@heroui/react';

<Form>
  {/* ... */}
  <Button type="submit" />
  <Button type="reset" />
</Form>
```

## Events

The `onSubmit` event will be triggered when a user submits the form with the `Enter` key or by pressing a submit button. The onReset event will be triggered when a user presses a reset button.

<CodeDemo title="Events" files={formContent.events} highlightedLines={[39, 41, 42, 44]} />

## Validation

`Form` supports native HTML constraint validation with customizable UI, custom validation functions, and server-side validation. Server-side validation errors can be provided via the `validationErrors` prop as an object mapping field names to error messages, which are cleared when the user modifies the field.

<CodeDemo title="Validation" files={formContent.serverValidation} />

See the [Forms](/docs/guide/forms) guide to learn more about form validation, including client-side validation, and integration with other frameworks and libraries.


### Validation Behavior

`Form` validation uses native validation behavior by default, but can be switched to ARIA validation by setting `validationBehavior="aria"`. ARIA validation shows realtime errors without blocking submission. This can be set at the form or field level.
To set the default behavior at the app level, you can change the form defaults for your entire app using [HeroUI Provider](/docs/api-references/heroui-provider).


```tsx
<Form validationBehavior="aria">
  <Input
    isRequired
    name="username"
    label="Username"
    labelPlacement="outside"
    placeholder="Enter your username"
    validate={(value) => {
      if (value.length < 3) {
        return "Username must be at least 3 characters long";
      }

      return value === "admin" ? "Nice try!" : null;
    }}
  />
  <Button type="submit">Submit</Button>
</Form>
```

<CodeDemo title="Validation Behavior" files={formContent.customValidationAria} />

## Accessibility

- Built with a native HTML `<form>` element, with support for ARIA labelling to create a [form landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/form.html).
- Full support for browser features like form autofill.
- Support for native HTML constraint validation with customizable UI, custom validation functions, realtime validation, and server-side validation errors.


<Spacer y={4} />

## API

### Form Props

<APITable
  data={[
    {
      attribute: "children",
      type: "ReactNode",
      description: "The wrapped component.",
      default: "-",
    },
    {
      attribute: "validationBehavior",
      type: "'native' | 'aria'",
      description:
        "Whether to use native HTML form validation to prevent form submission when a field value is missing or invalid, or mark fields as required or invalid via ARIA.",
      default: "native",
    },
    {
      attribute: "validationErrors",
      type: "Record<string, string | string[]>",
      description: "Validation errors for the form, typically returned by a server. This should be set to an object mapping from input names to errors.",
      default: "-",
    },
    {
      attribute: "action",
      type: "string | FormHTMLAttributes<HTMLFormElement>['action']",
      description: "Where to send the form-data when the form is submitted. See MDN.",
      default: "-",
    },
    {
      attribute: "encType",
      type: "'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'",
      description: "The enctype attribute specifies how the form-data should be encoded when submitting it to the server. See MDN.",
      default: "-",
    },
    {
      attribute: "method",
      type: "'get' | 'post' | 'dialog'",
      description: "The HTTP method to submit the form with. See MDN.",
      default: "-",
    },
    {
      attribute: "target",
      type: "'_blank' | '_self' | '_parent' | '_top'",
      description: "The target attribute specifies a name or a keyword that indicates where to display the response that is received after submitting the form. See MDN.",
      default: "-",
    },
    {
      attribute: "autoComplete",
      type: "'off' | 'on'",
      description: "Indicates whether input elements can by default have their values automatically completed by the browser. See MDN.",
      default: "-",
    },
    {
      attribute: "autoCapitalize",
      type: "'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'",
      description: "Controls whether inputted text is automatically capitalized and, if so, in what manner. See MDN.",
      default: "-",
    },
    {
      attribute: "className",
      type: "string",
      description: "The CSS className for the element.",
      default: "-",
    },
    {
      attribute: "style",
      type: "CSSProperties",
      description: "The inline style for the element.",
      default: "-",
    },
  ]}
/>
