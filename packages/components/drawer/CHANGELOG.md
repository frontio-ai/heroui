# @heroui/drawer

## 2.2.8

### Patch Changes

- [#4594](https://github.com/heroui-inc/heroui/pull/4594) [`7ebe0e6`](https://github.com/heroui-inc/heroui/commit/7ebe0e664feb777fe0cad311312d0e02b899319e) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Org name changed

- Updated dependencies [[`7ebe0e6`](https://github.com/heroui-inc/heroui/commit/7ebe0e664feb777fe0cad311312d0e02b899319e)]:
  - @heroui/framer-utils@2.1.7
  - @heroui/shared-utils@2.1.3
  - @heroui/react-utils@2.1.4
  - @heroui/modal@2.2.8

## 2.2.7

### Patch Changes

- [#4438](https://github.com/heroui-inc/heroui/pull/4438) [`07780a7`](https://github.com/heroui-inc/heroui/commit/07780a75a2747405e16af99c1692aef496f54175) Thanks [@wingkwong](https://github.com/wingkwong)! - use top-level type-only import instead of inline type specifiers

- Updated dependencies [[`e7ff673`](https://github.com/heroui-inc/heroui/commit/e7ff6730d7e891f1e9e3ca232b1faaebc5aedef2)]:
  - @heroui/react-utils@2.1.3
  - @heroui/modal@2.2.7
  - @heroui/framer-utils@2.1.6

## 2.2.6

### Patch Changes

- [#4310](https://github.com/heroui-inc/heroui/pull/4310) [`f8f6bfe`](https://github.com/heroui-inc/heroui/commit/f8f6bfea5a7f783636c4d0ce9ba7291ce0ea0a97) Thanks [@omarshehab221](https://github.com/omarshehab221)! - Export useDisclosure and Drawer children props from `@heroui/drawer`

- Updated dependencies [[`77206bc`](https://github.com/heroui-inc/heroui/commit/77206bc62596894d038b9715e40b361fec286c10), [`5f388fc`](https://github.com/heroui-inc/heroui/commit/5f388fc68c7db7f852432e73386686d919d44d31)]:
  - @heroui/shared-utils@2.1.2
  - @heroui/modal@2.2.6
  - @heroui/framer-utils@2.1.5
  - @heroui/react-utils@2.1.2

## 2.2.5

### Patch Changes

- Updated dependencies []:
  - @heroui/modal@2.2.5

## 2.2.4

### Patch Changes

- Updated dependencies [[`1031e98`](https://github.com/heroui-inc/heroui/commit/1031e985b71e69b8a7189ea049b9616257f820b3)]:
  - @heroui/modal@2.2.4
  - @heroui/framer-utils@2.1.4

## 2.2.3

### Patch Changes

- [#4255](https://github.com/heroui-inc/heroui/pull/4255) [`6a94a12`](https://github.com/heroui-inc/heroui/commit/6a94a125d4836b0a18d9cd2cb521c85a6bfa9050) Thanks [@wingkwong](https://github.com/wingkwong)! - fixed incorrect peerDependencies for theme and system package (#4254)

- Updated dependencies [[`6a94a12`](https://github.com/heroui-inc/heroui/commit/6a94a125d4836b0a18d9cd2cb521c85a6bfa9050)]:
  - @heroui/modal@2.2.3
  - @heroui/framer-utils@2.1.3

## 2.2.2

### Patch Changes

- [#4247](https://github.com/heroui-inc/heroui/pull/4247) [`551ab18`](https://github.com/heroui-inc/heroui/commit/551ab184060b24b2c3a89598f84d4c18599649d0) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix peerDeps & core package client on export \*

- Updated dependencies [[`551ab18`](https://github.com/heroui-inc/heroui/commit/551ab184060b24b2c3a89598f84d4c18599649d0)]:
  - @heroui/modal@2.2.2
  - @heroui/framer-utils@2.1.2

## 2.2.1

### Patch Changes

- [`d6eee4a`](https://github.com/heroui-inc/heroui/commit/d6eee4a8767556152f47f06dcf04940951abc5af) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.6.2

- Updated dependencies [[`d6eee4a`](https://github.com/heroui-inc/heroui/commit/d6eee4a8767556152f47f06dcf04940951abc5af)]:
  - @heroui/modal@2.2.1
  - @heroui/framer-utils@2.1.1
  - @heroui/react-utils@2.1.1
  - @heroui/shared-utils@2.1.1

## 2.2.0

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

- Updated dependencies [[`44958bf`](https://github.com/heroui-inc/heroui/commit/44958bf91a1677becd5e9f3c420b7956cf0244d8), [`6c0213d`](https://github.com/heroui-inc/heroui/commit/6c0213dfc805aa3c793763c0b25f53b2b80c24dc), [`ffb1e55`](https://github.com/heroui-inc/heroui/commit/ffb1e554f7d6b5b1ede66d0838b3b1edeeccdf6b), [`5786897`](https://github.com/heroui-inc/heroui/commit/5786897b9950d95c12351dacd2fb41bb1e298201)]:
  - @heroui/modal@2.2.0
  - @heroui/framer-utils@2.1.0
  - @heroui/react-utils@2.1.0
  - @heroui/shared-utils@2.1.0

## 2.1.0-beta.14

### Patch Changes

- Updated dependencies []:
  - @heroui/modal@2.1.0-beta.14

## 2.1.0-beta.13

### Patch Changes

- Updated dependencies []:
  - @heroui/modal@2.1.0-beta.13
  - @heroui/framer-utils@2.0.26-beta.11

## 2.1.0-beta.12

### Patch Changes

- [`9869f2b91`](https://github.com/heroui-inc/heroui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27) Thanks [@wingkwong](https://github.com/wingkwong)! - bump version

- Updated dependencies [[`9869f2b91`](https://github.com/heroui-inc/heroui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27)]:
  - @heroui/modal@2.1.0-beta.12
  - @heroui/framer-utils@2.0.26-beta.10
  - @heroui/react-utils@2.0.18-beta.8
  - @heroui/shared-utils@2.0.9-beta.8

## 2.1.0-beta.11

### Patch Changes

- Updated dependencies [[`eafdb7d47`](https://github.com/heroui-inc/heroui/commit/eafdb7d475a7fcaa7671af77e86fcdf62f14ae00)]:
  - @heroui/modal@2.1.0-beta.11
  - @heroui/framer-utils@2.0.26-beta.9

## 2.1.0-beta.10

### Patch Changes

- Updated dependencies []:
  - @heroui/modal@2.1.0-beta.10
  - @heroui/framer-utils@2.0.26-beta.8

## 2.1.0-beta.9

### Patch Changes

- [#4092](https://github.com/heroui-inc/heroui/pull/4092) [`528668db8`](https://github.com/heroui-inc/heroui/commit/528668db85b98b46473cb1e214780b7468cdadba) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Test new runner

- Updated dependencies [[`528668db8`](https://github.com/heroui-inc/heroui/commit/528668db85b98b46473cb1e214780b7468cdadba)]:
  - @heroui/modal@2.1.0-beta.9
  - @heroui/framer-utils@2.0.26-beta.7
  - @heroui/react-utils@2.0.18-beta.7
  - @heroui/shared-utils@2.0.9-beta.7

## 2.1.0-beta.8

### Patch Changes

- [#4086](https://github.com/heroui-inc/heroui/pull/4086) [`f69fe47b5`](https://github.com/heroui-inc/heroui/commit/f69fe47b5b8f6f3a77a7a8c20d8715263fa32acb) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Pnpm clean

- Updated dependencies [[`f69fe47b5`](https://github.com/heroui-inc/heroui/commit/f69fe47b5b8f6f3a77a7a8c20d8715263fa32acb)]:
  - @heroui/modal@2.1.0-beta.8
  - @heroui/framer-utils@2.0.26-beta.6
  - @heroui/react-utils@2.0.18-beta.6
  - @heroui/shared-utils@2.0.9-beta.6

## 2.1.0-beta.7

### Patch Changes

- [#4083](https://github.com/heroui-inc/heroui/pull/4083) [`35058262c`](https://github.com/heroui-inc/heroui/commit/35058262c61628fb42907f529c4417886aa12bb2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix build

- Updated dependencies [[`35058262c`](https://github.com/heroui-inc/heroui/commit/35058262c61628fb42907f529c4417886aa12bb2)]:
  - @heroui/modal@2.1.0-beta.7
  - @heroui/framer-utils@2.0.26-beta.5
  - @heroui/react-utils@2.0.18-beta.5
  - @heroui/shared-utils@2.0.9-beta.5

## 2.1.0-beta.6

### Patch Changes

- [#4057](https://github.com/heroui-inc/heroui/pull/4057) [`d947b9283`](https://github.com/heroui-inc/heroui/commit/d947b92833c8e4abc16dae72466cdb922313e9c8) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Drawer styles and transition improved

- Updated dependencies [[`d947b9283`](https://github.com/heroui-inc/heroui/commit/d947b92833c8e4abc16dae72466cdb922313e9c8)]:
  - @heroui/modal@2.1.0-beta.6

## 2.1.0-beta.5

### Patch Changes

- Updated dependencies []:
  - @heroui/modal@2.1.0-beta.5

## 2.1.0-beta.4

### Patch Changes

- Updated dependencies [[`5339b2571`](https://github.com/heroui-inc/heroui/commit/5339b2571e6d73ca6efe2acd34d88669419db9f7)]:
  - @heroui/shared-utils@2.0.9-beta.4
  - @heroui/modal@2.1.0-beta.4
  - @heroui/framer-utils@2.0.26-beta.4
  - @heroui/react-utils@2.0.18-beta.4

## 2.1.0-beta.3

### Patch Changes

- [#4010](https://github.com/heroui-inc/heroui/pull/4010) [`ef432eb53`](https://github.com/heroui-inc/heroui/commit/ef432eb539714fded6cab86a2185956fb103e0df) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - framer-motion alpha version added

- Updated dependencies [[`ef432eb53`](https://github.com/heroui-inc/heroui/commit/ef432eb539714fded6cab86a2185956fb103e0df)]:
  - @heroui/modal@2.1.0-beta.3
  - @heroui/framer-utils@2.0.26-beta.3
  - @heroui/react-utils@2.0.18-beta.3
  - @heroui/shared-utils@2.0.9-beta.3

## 2.1.0-beta.2

### Patch Changes

- [#4008](https://github.com/heroui-inc/heroui/pull/4008) [`7c1c0dd8f`](https://github.com/heroui-inc/heroui/commit/7c1c0dd8fef3ea72996c1095b919574c4b7f9b89) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React 19 added to peerDeps

- Updated dependencies [[`7c1c0dd8f`](https://github.com/heroui-inc/heroui/commit/7c1c0dd8fef3ea72996c1095b919574c4b7f9b89)]:
  - @heroui/modal@2.1.0-beta.2
  - @heroui/framer-utils@2.0.26-beta.2
  - @heroui/react-utils@2.0.18-beta.2
  - @heroui/shared-utils@2.0.9-beta.2

## 2.1.0-beta.1

### Patch Changes

- [#3990](https://github.com/heroui-inc/heroui/pull/3990) [`cb5bc4c74`](https://github.com/heroui-inc/heroui/commit/cb5bc4c74f00caaee80dca89c1f02038db315b85) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Beta 1

- Updated dependencies [[`cb5bc4c74`](https://github.com/heroui-inc/heroui/commit/cb5bc4c74f00caaee80dca89c1f02038db315b85)]:
  - @heroui/modal@2.1.0-beta.1
  - @heroui/framer-utils@2.0.26-beta.1
  - @heroui/react-utils@2.0.18-beta.1
  - @heroui/shared-utils@2.0.9-beta.1

## 2.1.0-beta.0

### Minor Changes

- [#3732](https://github.com/heroui-inc/heroui/pull/3732) [`67ea2f65e`](https://github.com/heroui-inc/heroui/commit/67ea2f65e17f913bdffae4690586a6ae202c8f7d) Thanks [@ryo-manba](https://github.com/ryo-manba)! - update react-aria version

### Patch Changes

- Updated dependencies [[`0cf91395c`](https://github.com/heroui-inc/heroui/commit/0cf91395c7c66a69fb05c7fca4a30cbad9e1e0f8), [`781b85566`](https://github.com/heroui-inc/heroui/commit/781b85566ee5eac3f505625462c4f5f14e36ed3a), [`67ea2f65e`](https://github.com/heroui-inc/heroui/commit/67ea2f65e17f913bdffae4690586a6ae202c8f7d), [`38a54ab49`](https://github.com/heroui-inc/heroui/commit/38a54ab497781e17799b37f0061ba50f2dc44e09), [`af3c4f706`](https://github.com/heroui-inc/heroui/commit/af3c4f706bb88eae02eee594a6db68cdd33bbe88), [`ae73de1a6`](https://github.com/heroui-inc/heroui/commit/ae73de1a61c26e78235ce2d4c38159d486b55d56), [`ad6393ab3`](https://github.com/heroui-inc/heroui/commit/ad6393ab33362119203455ef5c8ffbfe1ffa96a1), [`3f0d81b56`](https://github.com/heroui-inc/heroui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb), [`cb1b3135b`](https://github.com/heroui-inc/heroui/commit/cb1b3135bc7e811c9c2e163d4778f9f6eb2ef8c8), [`a5cac4561`](https://github.com/heroui-inc/heroui/commit/a5cac45619e529cf9850f02f416b6bc7cba77f3f), [`d90ad05b1`](https://github.com/heroui-inc/heroui/commit/d90ad05b13b36617009cb0e5f57f299aa7bb7bd0), [`a0d7141db`](https://github.com/heroui-inc/heroui/commit/a0d7141db314c6bea27df6b8beb15dae3b1bcb93), [`2d6ae74c3`](https://github.com/heroui-inc/heroui/commit/2d6ae74c36a157472bd4b06b8580e7db163eddcc), [`3f0d81b56`](https://github.com/heroui-inc/heroui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb), [`3f0d81b56`](https://github.com/heroui-inc/heroui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb), [`8a33eabb2`](https://github.com/heroui-inc/heroui/commit/8a33eabb2583202fcc8fbc33e8f2ed23bb45f1a4), [`559436d46`](https://github.com/heroui-inc/heroui/commit/559436d462bdb8739d8c817d1aa98607969d8a07)]:
  - @heroui/theme@2.3.0-beta.0
  - @heroui/modal@2.1.0-beta.0
  - @heroui/system@2.3.0-beta.0
  - @heroui/shared-utils@2.0.9-beta.0
  - @heroui/framer-utils@2.0.26-beta.0
  - @heroui/react-utils@2.0.18-beta.0
