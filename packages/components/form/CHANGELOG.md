# @heroui/form

## 2.1.9

### Patch Changes

- [#4594](https://github.com/heroui-inc/heroui/pull/4594) [`7ebe0e6`](https://github.com/heroui-inc/heroui/commit/7ebe0e664feb777fe0cad311312d0e02b899319e) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Org name changed

- Updated dependencies [[`7ebe0e6`](https://github.com/heroui-inc/heroui/commit/7ebe0e664feb777fe0cad311312d0e02b899319e), [`f7e5d20`](https://github.com/heroui-inc/heroui/commit/f7e5d205b156060d2d06aa17af31007dbb9fc13c)]:
  - @heroui/shared-utils@2.1.3
  - @heroui/react-utils@2.1.4
  - @heroui/system@2.4.7
  - @heroui/theme@2.4.6

## 2.1.8

### Patch Changes

- Updated dependencies [[`a83388a`](https://github.com/heroui-inc/heroui/commit/a83388aaf4521f0ed8dfed99a54998156df1868b), [`e7ff673`](https://github.com/heroui-inc/heroui/commit/e7ff6730d7e891f1e9e3ca232b1faaebc5aedef2)]:
  - @heroui/theme@2.4.5
  - @heroui/react-utils@2.1.3
  - @heroui/system@2.4.6

## 2.1.7

### Patch Changes

- Updated dependencies [[`77206bc`](https://github.com/heroui-inc/heroui/commit/77206bc62596894d038b9715e40b361fec286c10), [`5f388fc`](https://github.com/heroui-inc/heroui/commit/5f388fc68c7db7f852432e73386686d919d44d31), [`afe0b52`](https://github.com/heroui-inc/heroui/commit/afe0b527ce2dcd1f511b601fcba700fd2d12fcd6), [`e15ef62`](https://github.com/heroui-inc/heroui/commit/e15ef62b6ccabc5aef2790c6f97d7457f204be92), [`e546124`](https://github.com/heroui-inc/heroui/commit/e546124e1de49e8bd4d8f5e33cba87a0e83435ef)]:
  - @heroui/shared-utils@2.1.2
  - @heroui/theme@2.4.4
  - @heroui/react-utils@2.1.2
  - @heroui/system@2.4.5

## 2.1.6

### Patch Changes

- Updated dependencies [[`5598806`](https://github.com/heroui-inc/heroui/commit/5598806216166dc9fff36cafd9112412486b747f)]:
  - @heroui/theme@2.4.3

## 2.1.5

### Patch Changes

- Updated dependencies [[`03abf1d`](https://github.com/heroui-inc/heroui/commit/03abf1daf4fe5ee74f4766cd4fd78068ac25ed78)]:
  - @heroui/theme@2.4.2

## 2.1.4

### Patch Changes

- [#4279](https://github.com/heroui-inc/heroui/pull/4279) [`b16291b`](https://github.com/heroui-inc/heroui/commit/b16291b2200229f0d0a9ea910e38f3f100f7931f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Add ref support to Form component

- [#4258](https://github.com/heroui-inc/heroui/pull/4258) [`1031e98`](https://github.com/heroui-inc/heroui/commit/1031e985b71e69b8a7189ea049b9616257f820b3) Thanks [@wingkwong](https://github.com/wingkwong)! - sync with upstream RA versions

- Updated dependencies [[`1031e98`](https://github.com/heroui-inc/heroui/commit/1031e985b71e69b8a7189ea049b9616257f820b3), [`455556e`](https://github.com/heroui-inc/heroui/commit/455556e14278dd933b4acd1a136ea29879b49545)]:
  - @heroui/system@2.4.4

## 2.1.3

### Patch Changes

- [#4255](https://github.com/heroui-inc/heroui/pull/4255) [`6a94a12`](https://github.com/heroui-inc/heroui/commit/6a94a125d4836b0a18d9cd2cb521c85a6bfa9050) Thanks [@wingkwong](https://github.com/wingkwong)! - fixed incorrect peerDependencies for theme and system package (#4254)

- Updated dependencies []:
  - @heroui/system@2.4.3

## 2.1.2

### Patch Changes

- [#4247](https://github.com/heroui-inc/heroui/pull/4247) [`551ab18`](https://github.com/heroui-inc/heroui/commit/551ab184060b24b2c3a89598f84d4c18599649d0) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix peerDeps & core package client on export \*

- Updated dependencies []:
  - @heroui/system@2.4.2

## 2.1.1

### Patch Changes

- [`d6eee4a`](https://github.com/heroui-inc/heroui/commit/d6eee4a8767556152f47f06dcf04940951abc5af) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.6.2

- Updated dependencies [[`d6eee4a`](https://github.com/heroui-inc/heroui/commit/d6eee4a8767556152f47f06dcf04940951abc5af)]:
  - @heroui/system@2.4.1
  - @heroui/theme@2.4.1
  - @heroui/react-utils@2.1.1
  - @heroui/shared-utils@2.1.1

## 2.1.0

### Minor Changes

- [`5786897`](https://github.com/heroui-inc/heroui/commit/5786897b9950d95c12351dacd2fb41bb1e298201) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - This release includes several improvements and bug fixes:

  - Updated react-aria version across all components
  - Improved Drawer styles and transitions
  - Fixed missing peer dependencies for framer-motion
  - Fixed menu item classNames functionality
  - Added isClearable prop to Textarea component
  - Fixed label placement issues in Input and Select components
  - Improved table keyboard navigation with new isKeyboardNavigationDisabled prop
  - Fixed UI sliding issues with helper wrapper in Input and Select
  - Updated use-image hook to avoid Next.js hydration issues
  - Replaced RTL-specific styles with logical properties
  - Fixed textarea label squish issue
  - Bumped tailwind-merge version
  - Applied tw nested group fixes
  - Fixed fullWidth variant in input and select components
  - Moved circular-progress tv to progress
  - Changed ListboxItem key to optional
  - Fixed autocomplete clear button behavior
  - Updated Select label placement logic
  - Added missing framer-motion peer dependencies
  - Removed layoutNode prop from Table due to react-aria update
  - Virtualization added to Autocomplete

### Patch Changes

- [#4224](https://github.com/heroui-inc/heroui/pull/4224) [`26e478d`](https://github.com/heroui-inc/heroui/commit/26e478dd937dedcaf41110171d971a8a3cf2ff52) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Added form support to input-otp, change default validationBehavior to "native" to avoid breaking changes, and fix select with form

- [#4226](https://github.com/heroui-inc/heroui/pull/4226) [`6c0213d`](https://github.com/heroui-inc/heroui/commit/6c0213dfc805aa3c793763c0b25f53b2b80c24dc) Thanks [@wingkwong](https://github.com/wingkwong)! - bump `@react-aria/utils` version (#4212)

- Updated dependencies [[`26e478d`](https://github.com/heroui-inc/heroui/commit/26e478dd937dedcaf41110171d971a8a3cf2ff52), [`44958bf`](https://github.com/heroui-inc/heroui/commit/44958bf91a1677becd5e9f3c420b7956cf0244d8), [`6c0213d`](https://github.com/heroui-inc/heroui/commit/6c0213dfc805aa3c793763c0b25f53b2b80c24dc), [`5786897`](https://github.com/heroui-inc/heroui/commit/5786897b9950d95c12351dacd2fb41bb1e298201), [`44958bf`](https://github.com/heroui-inc/heroui/commit/44958bf91a1677becd5e9f3c420b7956cf0244d8)]:
  - @heroui/system@2.4.0
  - @heroui/theme@2.4.0
  - @heroui/react-utils@2.1.0
  - @heroui/shared-utils@2.1.0

## 2.0.1-beta.1

### Patch Changes

- [`9869f2b91`](https://github.com/heroui-inc/heroui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27) Thanks [@wingkwong](https://github.com/wingkwong)! - bump version

- Updated dependencies [[`9869f2b91`](https://github.com/heroui-inc/heroui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27)]:
  - @heroui/react-utils@2.0.18-beta.8
  - @heroui/shared-utils@2.0.9-beta.8

## 2.0.1-beta.0

### Patch Changes

- [#3036](https://github.com/heroui-inc/heroui/pull/3036) [`eafdb7d47`](https://github.com/heroui-inc/heroui/commit/eafdb7d475a7fcaa7671af77e86fcdf62f14ae00) Thanks [@ryo-manba](https://github.com/ryo-manba)! - add form component
