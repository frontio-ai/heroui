# @heroui/theme

## 2.4.6

### Patch Changes

- [#4594](https://github.com/heroui-inc/heroui/pull/4594) [`7ebe0e6`](https://github.com/heroui-inc/heroui/commit/7ebe0e664feb777fe0cad311312d0e02b899319e) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Org name changed

- [#4587](https://github.com/heroui-inc/heroui/pull/4587) [`f7e5d20`](https://github.com/heroui-inc/heroui/commit/f7e5d205b156060d2d06aa17af31007dbb9fc13c) Thanks [@wingkwong](https://github.com/wingkwong)! - add missing shadow none (#4586)

- Updated dependencies [[`7ebe0e6`](https://github.com/heroui-inc/heroui/commit/7ebe0e664feb777fe0cad311312d0e02b899319e)]:
  - @heroui/shared-utils@2.1.3

## 2.4.5

### Patch Changes

- [#4447](https://github.com/heroui-inc/heroui/pull/4447) [`a83388a`](https://github.com/heroui-inc/heroui/commit/a83388aaf4521f0ed8dfed99a54998156df1868b) Thanks [@wingkwong](https://github.com/wingkwong)! - fix the alignment when only alert children is provided

## 2.4.4

### Patch Changes

- [#4394](https://github.com/heroui-inc/heroui/pull/4394) [`afe0b52`](https://github.com/heroui-inc/heroui/commit/afe0b527ce2dcd1f511b601fcba700fd2d12fcd6) Thanks [@macci001](https://github.com/macci001)! - Fixing the input in card to not become invisible on hover and making time-input and date-input consistent to other inputs.

- [#4383](https://github.com/heroui-inc/heroui/pull/4383) [`e15ef62`](https://github.com/heroui-inc/heroui/commit/e15ef62b6ccabc5aef2790c6f97d7457f204be92) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #4382 `hideIconWrapper` property wasn't removing the borded on `Alert` component

- [#4373](https://github.com/heroui-inc/heroui/pull/4373) [`e546124`](https://github.com/heroui-inc/heroui/commit/e546124e1de49e8bd4d8f5e33cba87a0e83435ef) Thanks [@Peterl561](https://github.com/Peterl561)! - menu base use overflow-clip to fix listbox section sticky (#4335)

- Updated dependencies [[`77206bc`](https://github.com/heroui-inc/heroui/commit/77206bc62596894d038b9715e40b361fec286c10), [`5f388fc`](https://github.com/heroui-inc/heroui/commit/5f388fc68c7db7f852432e73386686d919d44d31)]:
  - @heroui/shared-utils@2.1.2

## 2.4.3

### Patch Changes

- [#4314](https://github.com/heroui-inc/heroui/pull/4314) [`5598806`](https://github.com/heroui-inc/heroui/commit/5598806216166dc9fff36cafd9112412486b747f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix build

## 2.4.2

### Patch Changes

- [#4311](https://github.com/heroui-inc/heroui/pull/4311) [`03abf1d`](https://github.com/heroui-inc/heroui/commit/03abf1daf4fe5ee74f4766cd4fd78068ac25ed78) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #4252 #4260 interactive elements were not working properly

## 2.4.1

### Patch Changes

- [`d6eee4a`](https://github.com/heroui-inc/heroui/commit/d6eee4a8767556152f47f06dcf04940951abc5af) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.6.2

- Updated dependencies [[`d6eee4a`](https://github.com/heroui-inc/heroui/commit/d6eee4a8767556152f47f06dcf04940951abc5af)]:
  - @heroui/shared-utils@2.1.1

## 2.4.0

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

- [#4206](https://github.com/heroui-inc/heroui/pull/4206) [`44958bf`](https://github.com/heroui-inc/heroui/commit/44958bf91a1677becd5e9f3c420b7956cf0244d8) Thanks [@vinroger](https://github.com/vinroger)! - Fix should not export list item internal variables type

- [#4206](https://github.com/heroui-inc/heroui/pull/4206) [`44958bf`](https://github.com/heroui-inc/heroui/commit/44958bf91a1677becd5e9f3c420b7956cf0244d8) Thanks [@vinroger](https://github.com/vinroger)! - Virtualization support added to Listbox and Menu

- Updated dependencies [[`5786897`](https://github.com/heroui-inc/heroui/commit/5786897b9950d95c12351dacd2fb41bb1e298201)]:
  - @heroui/shared-utils@2.1.0

## 2.3.0-beta.18

### Patch Changes

- [#4172](https://github.com/heroui-inc/heroui/pull/4172) [`004c4a4b3`](https://github.com/heroui-inc/heroui/commit/004c4a4b3e44477f148937b12bb542e4b27fd322) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - introduce `isClearable` to Textarea component (#2348, #2112)

- [#4141](https://github.com/heroui-inc/heroui/pull/4141) [`922c4a567`](https://github.com/heroui-inc/heroui/commit/922c4a5674a74be749db6abeffd153eaf7d3a5c7) Thanks [@wingkwong](https://github.com/wingkwong)! - revise label font size for lg (#3073)

## 2.3.0-beta.17

### Patch Changes

- [#4052](https://github.com/heroui-inc/heroui/pull/4052) [`1d5b2b6c1`](https://github.com/heroui-inc/heroui/commit/1d5b2b6c1f8672e7339a6f9dc66f0244d7bb2789) Thanks [@macci001](https://github.com/macci001)! - Adding new input-otp component.

## 2.3.0-beta.16

### Patch Changes

- [#4156](https://github.com/heroui-inc/heroui/pull/4156) [`d37007c69`](https://github.com/heroui-inc/heroui/commit/d37007c69c3e1ff4a66d414cbb1a4a38bb22264c) Thanks [@winchesHe](https://github.com/winchesHe)! - Fix menu item classNames not work (#4119)

## 2.3.0-beta.15

### Patch Changes

- [`9869f2b91`](https://github.com/heroui-inc/heroui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27) Thanks [@wingkwong](https://github.com/wingkwong)! - bump version

- Updated dependencies [[`9869f2b91`](https://github.com/heroui-inc/heroui/commit/9869f2b91d0829f9c7f0500ba05745707820bf27)]:
  - @heroui/shared-utils@2.0.9-beta.8

## 2.3.0-beta.14

### Patch Changes

- [#4105](https://github.com/heroui-inc/heroui/pull/4105) [`256d46277`](https://github.com/heroui-inc/heroui/commit/256d462771c19d6ca5b969d0ec44419fb560f0ac) Thanks [@winchesHe](https://github.com/winchesHe)! - Add truncate class to the list item to avoid overflow the wrapper

## 2.3.0-beta.13

### Patch Changes

- [#3321](https://github.com/heroui-inc/heroui/pull/3321) [`341b5de79`](https://github.com/heroui-inc/heroui/commit/341b5de7947655e6b18fa09045f7e10fba5b8c59) Thanks [@winchesHe](https://github.com/winchesHe)! - move circular-progress tv to progress

## 2.3.0-beta.12

### Patch Changes

- [#4094](https://github.com/heroui-inc/heroui/pull/4094) [`b9d5d4925`](https://github.com/heroui-inc/heroui/commit/b9d5d492519778a4bf071748ec9f2b4e25d8373f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Virtualization support added to Listbox & Autocomplete

## 2.3.0-beta.11

### Patch Changes

- [#4092](https://github.com/heroui-inc/heroui/pull/4092) [`528668db8`](https://github.com/heroui-inc/heroui/commit/528668db85b98b46473cb1e214780b7468cdadba) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Test new runner

- Updated dependencies [[`528668db8`](https://github.com/heroui-inc/heroui/commit/528668db85b98b46473cb1e214780b7468cdadba)]:
  - @heroui/shared-utils@2.0.9-beta.7

## 2.3.0-beta.10

### Patch Changes

- [#4086](https://github.com/heroui-inc/heroui/pull/4086) [`f69fe47b5`](https://github.com/heroui-inc/heroui/commit/f69fe47b5b8f6f3a77a7a8c20d8715263fa32acb) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Pnpm clean

- Updated dependencies [[`f69fe47b5`](https://github.com/heroui-inc/heroui/commit/f69fe47b5b8f6f3a77a7a8c20d8715263fa32acb)]:
  - @heroui/shared-utils@2.0.9-beta.6

## 2.3.0-beta.9

### Patch Changes

- [#4083](https://github.com/heroui-inc/heroui/pull/4083) [`35058262c`](https://github.com/heroui-inc/heroui/commit/35058262c61628fb42907f529c4417886aa12bb2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix build

- Updated dependencies [[`35058262c`](https://github.com/heroui-inc/heroui/commit/35058262c61628fb42907f529c4417886aa12bb2)]:
  - @heroui/shared-utils@2.0.9-beta.5

## 2.3.0-beta.8

### Patch Changes

- [#4073](https://github.com/heroui-inc/heroui/pull/4073) [`70dc75983`](https://github.com/heroui-inc/heroui/commit/70dc7598388022fca04255c3c1623468a38a3803) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Alert compoentn styles improved

## 2.3.0-beta.7

### Patch Changes

- [#4071](https://github.com/heroui-inc/heroui/pull/4071) [`31349c178`](https://github.com/heroui-inc/heroui/commit/31349c178b9b2bd0be9856bc09126a37be68901a) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Alert styles improved

## 2.3.0-beta.6

### Patch Changes

- [#4054](https://github.com/heroui-inc/heroui/pull/4054) [`0f55c491b`](https://github.com/heroui-inc/heroui/commit/0f55c491b73da8944f9b38f2ad7486d1b89f8b7a) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Alert design improved

## 2.3.0-beta.5

### Patch Changes

- Updated dependencies [[`5339b2571`](https://github.com/heroui-inc/heroui/commit/5339b2571e6d73ca6efe2acd34d88669419db9f7)]:
  - @heroui/shared-utils@2.0.9-beta.4

## 2.3.0-beta.4

### Patch Changes

- [#3881](https://github.com/heroui-inc/heroui/pull/3881) [`54be700e0`](https://github.com/heroui-inc/heroui/commit/54be700e04386e95cead7ce63d87015347dd166f) Thanks [@macci001](https://github.com/macci001)! - making input and select styling consistent(#3876)

## 2.3.0-beta.3

### Patch Changes

- [#4010](https://github.com/heroui-inc/heroui/pull/4010) [`ef432eb53`](https://github.com/heroui-inc/heroui/commit/ef432eb539714fded6cab86a2185956fb103e0df) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - framer-motion alpha version added

- Updated dependencies [[`ef432eb53`](https://github.com/heroui-inc/heroui/commit/ef432eb539714fded6cab86a2185956fb103e0df)]:
  - @heroui/shared-utils@2.0.9-beta.3

## 2.3.0-beta.2

### Patch Changes

- [#4008](https://github.com/heroui-inc/heroui/pull/4008) [`7c1c0dd8f`](https://github.com/heroui-inc/heroui/commit/7c1c0dd8fef3ea72996c1095b919574c4b7f9b89) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - React 19 added to peerDeps

- Updated dependencies [[`7c1c0dd8f`](https://github.com/heroui-inc/heroui/commit/7c1c0dd8fef3ea72996c1095b919574c4b7f9b89)]:
  - @heroui/shared-utils@2.0.9-beta.2

## 2.3.0-beta.1

### Patch Changes

- [#3990](https://github.com/heroui-inc/heroui/pull/3990) [`cb5bc4c74`](https://github.com/heroui-inc/heroui/commit/cb5bc4c74f00caaee80dca89c1f02038db315b85) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Beta 1

- Updated dependencies [[`cb5bc4c74`](https://github.com/heroui-inc/heroui/commit/cb5bc4c74f00caaee80dca89c1f02038db315b85)]:
  - @heroui/shared-utils@2.0.9-beta.1

## 2.3.0-beta.0

### Minor Changes

- [#3732](https://github.com/heroui-inc/heroui/pull/3732) [`67ea2f65e`](https://github.com/heroui-inc/heroui/commit/67ea2f65e17f913bdffae4690586a6ae202c8f7d) Thanks [@ryo-manba](https://github.com/ryo-manba)! - update react-aria version

### Patch Changes

- [#3869](https://github.com/heroui-inc/heroui/pull/3869) [`0cf91395c`](https://github.com/heroui-inc/heroui/commit/0cf91395c7c66a69fb05c7fca4a30cbad9e1e0f8) Thanks [@macci001](https://github.com/macci001)! - fix label placement in input and select

- [#3768](https://github.com/heroui-inc/heroui/pull/3768) [`781b85566`](https://github.com/heroui-inc/heroui/commit/781b85566ee5eac3f505625462c4f5f14e36ed3a) Thanks [@macci001](https://github.com/macci001)! - fix the fullWidth variant in input and select component. (#3745)

- [#3912](https://github.com/heroui-inc/heroui/pull/3912) [`38a54ab49`](https://github.com/heroui-inc/heroui/commit/38a54ab497781e17799b37f0061ba50f2dc44e09) Thanks [@sanuj21](https://github.com/sanuj21)! - remove the pseudo cancel btn from input (#3907)

- [#3868](https://github.com/heroui-inc/heroui/pull/3868) [`af3c4f706`](https://github.com/heroui-inc/heroui/commit/af3c4f706bb88eae02eee594a6db68cdd33bbe88) Thanks [@macci001](https://github.com/macci001)! - replace the use of RTL-specific styles with logical properties.

- [#3657](https://github.com/heroui-inc/heroui/pull/3657) [`ae73de1a6`](https://github.com/heroui-inc/heroui/commit/ae73de1a61c26e78235ce2d4c38159d486b55d56) Thanks [@wingkwong](https://github.com/wingkwong)! - bump `tailwind-merge` version (#3614)

- [#3909](https://github.com/heroui-inc/heroui/pull/3909) [`ad6393ab3`](https://github.com/heroui-inc/heroui/commit/ad6393ab33362119203455ef5c8ffbfe1ffa96a1) Thanks [@wingkwong](https://github.com/wingkwong)! - apply tw nested group (#3544, #2324, #2959)

- [#3523](https://github.com/heroui-inc/heroui/pull/3523) [`3f0d81b56`](https://github.com/heroui-inc/heroui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb) Thanks [@wingkwong](https://github.com/wingkwong)! - replaced lodash with native approaches

- [#3248](https://github.com/heroui-inc/heroui/pull/3248) [`cb1b3135b`](https://github.com/heroui-inc/heroui/commit/cb1b3135bc7e811c9c2e163d4778f9f6eb2ef8c8) Thanks [@ryo-manba](https://github.com/ryo-manba)! - Add support for selectorButtonPlacement property (#3015)

- [#3938](https://github.com/heroui-inc/heroui/pull/3938) [`a5cac4561`](https://github.com/heroui-inc/heroui/commit/a5cac45619e529cf9850f02f416b6bc7cba77f3f) Thanks [@ShrinidhiUpadhyaya](https://github.com/ShrinidhiUpadhyaya)! - added stripe color gradients for progress (#1933)

- [#3982](https://github.com/heroui-inc/heroui/pull/3982) [`d90ad05b1`](https://github.com/heroui-inc/heroui/commit/d90ad05b13b36617009cb0e5f57f299aa7bb7bd0) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - introduced Alert component (#2250)

- [#3927](https://github.com/heroui-inc/heroui/pull/3927) [`a0d7141db`](https://github.com/heroui-inc/heroui/commit/a0d7141db314c6bea27df6b8beb15dae3b1bcb93) Thanks [@ShrinidhiUpadhyaya](https://github.com/ShrinidhiUpadhyaya)! - separator icon RTL support in Breadcrumbs component (#2486)

- [#3523](https://github.com/heroui-inc/heroui/pull/3523) [`3f0d81b56`](https://github.com/heroui-inc/heroui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb) Thanks [@wingkwong](https://github.com/wingkwong)! - framer motion optimization (#3340)

- [#3861](https://github.com/heroui-inc/heroui/pull/3861) [`8a33eabb2`](https://github.com/heroui-inc/heroui/commit/8a33eabb2583202fcc8fbc33e8f2ed23bb45f1a4) Thanks [@ShrinidhiUpadhyaya](https://github.com/ShrinidhiUpadhyaya)! - show margin only with label in Switch component (#3791)

- [#3764](https://github.com/heroui-inc/heroui/pull/3764) [`559436d46`](https://github.com/heroui-inc/heroui/commit/559436d462bdb8739d8c817d1aa98607969d8a07) Thanks [@wingkwong](https://github.com/wingkwong)! - add missing `data-[hover=true]:` for ghost button with danger color

- Updated dependencies [[`3f0d81b56`](https://github.com/heroui-inc/heroui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb), [`3f0d81b56`](https://github.com/heroui-inc/heroui/commit/3f0d81b560e7ef3eb315bd98407249c0eb4ed5eb)]:
  - @heroui/shared-utils@2.0.9-beta.0

## 2.2.11

### Patch Changes

- [#3754](https://github.com/heroui-inc/heroui/pull/3754) [`5517a0578`](https://github.com/heroui-inc/heroui/commit/5517a0578b5514cf2a4ddec53528d25d7f616cd0) Thanks [@wingkwong](https://github.com/wingkwong)! - remove tw nested group (rollback PR3658)

## 2.2.10

### Patch Changes

- [#3658](https://github.com/heroui-inc/heroui/pull/3658) [`5b5a9746e`](https://github.com/heroui-inc/heroui/commit/5b5a9746e33ce50c1d282577997a23829fd842f8) Thanks [@wingkwong](https://github.com/wingkwong)! - applied tw nested group (#3544, #2324, #2959)

- [#2110](https://github.com/heroui-inc/heroui/pull/2110) [`bc0f72fc2`](https://github.com/heroui-inc/heroui/commit/bc0f72fc2704c33b3530add1731c82302fd26884) Thanks [@black197](https://github.com/black197)! - fix(theme): use data-hover instead of hover (#2095)

- [#3486](https://github.com/heroui-inc/heroui/pull/3486) [`324fd6d3c`](https://github.com/heroui-inc/heroui/commit/324fd6d3c1fb7e6f3ecb462a150182ffe1c7f132) Thanks [@awesome-pro](https://github.com/awesome-pro)! - fixed the shadow clipping of card inside listbox or menubox item (#3480)

- [#2038](https://github.com/heroui-inc/heroui/pull/2038) [`deb15078c`](https://github.com/heroui-inc/heroui/commit/deb15078cc61fea30b9e4f6c98eddad244420276) Thanks [@amirhhashemi](https://github.com/amirhhashemi)! - Improved RTL support for the input component

- [#3000](https://github.com/heroui-inc/heroui/pull/3000) [`81da063d6`](https://github.com/heroui-inc/heroui/commit/81da063d6ab80e1b352ebfda78ed26a47a239c49) Thanks [@chirokas](https://github.com/chirokas)! - Improve clear button pointer events, keyboard reopen issue on mobile

- [#3217](https://github.com/heroui-inc/heroui/pull/3217) [`9d6bcb580`](https://github.com/heroui-inc/heroui/commit/9d6bcb580a7bde6ff846fdfb679ec6e0a16410e6) Thanks [@chirokas](https://github.com/chirokas)! - Fix skeleton overflow issue (#3214 #3670)

- [#2684](https://github.com/heroui-inc/heroui/pull/2684) [`142f394cb`](https://github.com/heroui-inc/heroui/commit/142f394cb5d25c97c919782d03f74c3b310eab0c) Thanks [@HydenLiu](https://github.com/HydenLiu)! - set the min-height of base height to 100dvh where size equals `full` (#2681)

- [#2097](https://github.com/heroui-inc/heroui/pull/2097) [`06b97d05a`](https://github.com/heroui-inc/heroui/commit/06b97d05a8ce65b08bef4838f43c2bb990c72e10) Thanks [@amirhhashemi](https://github.com/amirhhashemi)! - Improved RTL support for the table component

- [#2041](https://github.com/heroui-inc/heroui/pull/2041) [`6f44cd6a9`](https://github.com/heroui-inc/heroui/commit/6f44cd6a98f7fa848496e2bd9ca933cd6796bf3f) Thanks [@amirhhashemi](https://github.com/amirhhashemi)! - Improved RTL support for the select component

- [#3691](https://github.com/heroui-inc/heroui/pull/3691) [`3e06ef64c`](https://github.com/heroui-inc/heroui/commit/3e06ef64cc5da30f7b2ab209d9d669e6ac8478ca) Thanks [@wingkwong](https://github.com/wingkwong)! - adjust modal position when keyboard appears (#2837)

- [#2946](https://github.com/heroui-inc/heroui/pull/2946) [`59ea6b745`](https://github.com/heroui-inc/heroui/commit/59ea6b7457345b8b1f241143301b5a9bf81054e4) Thanks [@rockey2020](https://github.com/rockey2020)! - export default-layout in theme

- [#3656](https://github.com/heroui-inc/heroui/pull/3656) [`55c92981e`](https://github.com/heroui-inc/heroui/commit/55c92981e009b1721e8288341402feb1ebec08f3) Thanks [@ameybh](https://github.com/ameybh)! - fixed arrow keys order when html has dir="rtl" (#3641, #3642)

- [#3552](https://github.com/heroui-inc/heroui/pull/3552) [`97f233b34`](https://github.com/heroui-inc/heroui/commit/97f233b346e07c766fb25a2ca16a78d4aa8ce2fe) Thanks [@awesome-pro](https://github.com/awesome-pro)! - fixed the double click need in chrome for checkbox, switch and radiobuttons (#3528)

- [#3663](https://github.com/heroui-inc/heroui/pull/3663) [`46cc01908`](https://github.com/heroui-inc/heroui/commit/46cc01908e99797cfc9c60762fef6d95dc6c0b6a) Thanks [@macci001](https://github.com/macci001)! - The color of the selected value in SELECT component was `text-foreground-500` instead of `text-default-foreground`. Also label slot in SELECT component's UNDERLINE had no effect of color variant. The change includes the fix for the mentioned issues (#3659).

- [#3738](https://github.com/heroui-inc/heroui/pull/3738) [`54bd9cdd6`](https://github.com/heroui-inc/heroui/commit/54bd9cdd6de72bb0032e5e8f9dc2007ca3aadb0d) Thanks [@rileybutterfield](https://github.com/rileybutterfield)! - Updates the text colors for the flat variant in the theme so that elements using this variant are accessible (#3738)

- [#2044](https://github.com/heroui-inc/heroui/pull/2044) [`fe30dc8cc`](https://github.com/heroui-inc/heroui/commit/fe30dc8cc0c109f7f537be79c8c13a3f5fa1c0f7) Thanks [@amirhhashemi](https://github.com/amirhhashemi)! - Improved RTL support for the pagination component

## 2.2.9

### Patch Changes

- [#3512](https://github.com/heroui-inc/heroui/pull/3512) [`2d2d300a1`](https://github.com/heroui-inc/heroui/commit/2d2d300a12dbe20ca7ebd125daf3dce74efcbf34) Thanks [@wingkwong](https://github.com/wingkwong)! - fix conflicting versions in npm

## 2.2.8

### Patch Changes

- [#3499](https://github.com/heroui-inc/heroui/pull/3499) [`59428b183`](https://github.com/heroui-inc/heroui/commit/59428b183deceacd0db246e129de5ed8b0200d37) Thanks [@wingkwong](https://github.com/wingkwong)! - Fixed button scaling when `disableAnimation` is `true` (#3489)

- [#3495](https://github.com/heroui-inc/heroui/pull/3495) [`8b193072e`](https://github.com/heroui-inc/heroui/commit/8b193072e5d77d722825bc89700055ce24ee0fb3) Thanks [@abhinandan-verma](https://github.com/abhinandan-verma)! - fixed the issue of double scrollbar in modal with inside `scrollBehavior` (#3942)

- [#3505](https://github.com/heroui-inc/heroui/pull/3505) [`1fdbf2ad2`](https://github.com/heroui-inc/heroui/commit/1fdbf2ad2020d91f257029e6a3f81406d5da109c) Thanks [@abhinandan-verma](https://github.com/abhinandan-verma)! - Fixed the calendarContent width as per visible month

- [#3491](https://github.com/heroui-inc/heroui/pull/3491) [`46edcca95`](https://github.com/heroui-inc/heroui/commit/46edcca954b3a3e16c83d117c27cf39a59474548) Thanks [@abhinandan-verma](https://github.com/abhinandan-verma)! - fixed the slow color change of sortable table header during theme change (#3488)

## 2.2.7

### Patch Changes

- [#3221](https://github.com/heroui-inc/heroui/pull/3221) [`b4c046fe8`](https://github.com/heroui-inc/heroui/commit/b4c046fe8ba7b26d60e6b1463101e35f3f9f1ce8) Thanks [@sjoerdvanBommel](https://github.com/sjoerdvanBommel)! - Differentiate selected bg color from striped bg color (#1602)

- [#3291](https://github.com/heroui-inc/heroui/pull/3291) [`e9a6a162e`](https://github.com/heroui-inc/heroui/commit/e9a6a162e8a26c6507938191c4e0b5bd94bdbf8d) Thanks [@wingkwong](https://github.com/wingkwong)! - Fixed variants for nested accordions (#3285)

- [#3268](https://github.com/heroui-inc/heroui/pull/3268) [`93f178781`](https://github.com/heroui-inc/heroui/commit/93f17878154a6351c38c8ef4806b5fb20e4fa217) Thanks [@wingkwong](https://github.com/wingkwong)! - revised styles and logic for input with file type (#2397, #2311, #2965)

- [#3430](https://github.com/heroui-inc/heroui/pull/3430) [`2333c3987`](https://github.com/heroui-inc/heroui/commit/2333c39870bcad597c6901b6d2575f157b064d7b) Thanks [@abhinandan-verma](https://github.com/abhinandan-verma)! - fixed the input background change by autofill in Chrome (#1346)

## 2.2.6

### Patch Changes

- [#2900](https://github.com/heroui-inc/heroui/pull/2900) [`75d122317`](https://github.com/heroui-inc/heroui/commit/75d1223178a8d6f5b68535b54a79efb2d75a31cc) Thanks [@chirokas](https://github.com/chirokas)! - Fix #2886 TableColumn align prop fixed, style improved.

- [#3174](https://github.com/heroui-inc/heroui/pull/3174) [`dbb4b8ee5`](https://github.com/heroui-inc/heroui/commit/dbb4b8ee564114bfb0ef93467ed9ef6a3ff7e2e7) Thanks [@wingkwong](https://github.com/wingkwong)! - Fix input display with hidden type (#3170)

## 2.2.5

### Patch Changes

- [#3126](https://github.com/heroui-inc/heroui/pull/3126) [`43bef0718`](https://github.com/heroui-inc/heroui/commit/43bef07180c5e0bc7d08319f922aa47a63715860) Thanks [@wingkwong](https://github.com/wingkwong)! - add missing pointer event after data loaded (#3125)

## 2.2.4

### Patch Changes

- [#2883](https://github.com/heroui-inc/heroui/pull/2883) [`76f4dd8e7`](https://github.com/heroui-inc/heroui/commit/76f4dd8e76d4c0047953fc8a5b8b65614d7375f0) Thanks [@wingkwong](https://github.com/wingkwong)! - Revise slider styles (#2880)

- [#2915](https://github.com/heroui-inc/heroui/pull/2915) [`e3afa4789`](https://github.com/heroui-inc/heroui/commit/e3afa4789a1ac0fa929b2acaca5bd9c520567ab8) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - The `cn` utility was moved the `theme` package and updated to support NextUI custom classes.

- [#3010](https://github.com/heroui-inc/heroui/pull/3010) [`77e85e665`](https://github.com/heroui-inc/heroui/commit/77e85e665c94a188db46ec08c61c872e5d8e7d8c) Thanks [@wingkwong](https://github.com/wingkwong)! - revise isInvalid input styles (#3007)

- [#3018](https://github.com/heroui-inc/heroui/pull/3018) [`1109baea6`](https://github.com/heroui-inc/heroui/commit/1109baea6ac6aa3feb2be90ef065f61b2c2a06a9) Thanks [@wingkwong](https://github.com/wingkwong)! - fix incorrect tailwind classnames

- [#2990](https://github.com/heroui-inc/heroui/pull/2990) [`ad08010fe`](https://github.com/heroui-inc/heroui/commit/ad08010fe58438c8d8f264ee1671b53d6638a724) Thanks [@wingkwong](https://github.com/wingkwong)! - remove unnecessary origin-bottom in button

- [#2973](https://github.com/heroui-inc/heroui/pull/2973) [`e34c5e307`](https://github.com/heroui-inc/heroui/commit/e34c5e307d1dfa2747e7fd77752983ad30a7e3eb) Thanks [@wingkwong](https://github.com/wingkwong)! - Add `destroyInactiveTabPanel` prop for Tabs component (#1562)

- [#2906](https://github.com/heroui-inc/heroui/pull/2906) [`c83ff382b`](https://github.com/heroui-inc/heroui/commit/c83ff382b9e5deaa08ed7e64eee484cc4904704d) Thanks [@ShrinidhiUpadhyaya](https://github.com/ShrinidhiUpadhyaya)! - Fixed hiding of unavailable dates in RangeCalendar (#2890)

- [#2929](https://github.com/heroui-inc/heroui/pull/2929) [`422770cc6`](https://github.com/heroui-inc/heroui/commit/422770cc6bcdd1d4c51257654ab718f3c19d6cb2) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Add support for disabling the animations globally.

- [#2972](https://github.com/heroui-inc/heroui/pull/2972) [`5f735a989`](https://github.com/heroui-inc/heroui/commit/5f735a989297dd5b5b82eba84b91ddbdb33cd3c4) Thanks [@wingkwong](https://github.com/wingkwong)! - add pointer-events-none to skeleton base (#1714)

- [#2949](https://github.com/heroui-inc/heroui/pull/2949) [`0108d06d3`](https://github.com/heroui-inc/heroui/commit/0108d06d3b4167b28d4be03813d883d9d4d7d9f6) Thanks [@novsource](https://github.com/novsource)! - Removed scrolling display during month change animation (#2945)

- [#2986](https://github.com/heroui-inc/heroui/pull/2986) [`8988981c5`](https://github.com/heroui-inc/heroui/commit/8988981c532b35577b0efa3a68496499973acb33) Thanks [@wingkwong](https://github.com/wingkwong)! - set overflow visible after skeleton loaded (#2125)

- [#2781](https://github.com/heroui-inc/heroui/pull/2781) [`648edad77`](https://github.com/heroui-inc/heroui/commit/648edad77ea6265baecbc8cd7d1caee5a983da7c) Thanks [@mrbadri](https://github.com/mrbadri)! - Fixed incorrect margin on labels for RTL required inputs. (#2780)

## 2.2.3

### Patch Changes

- [#2508](https://github.com/heroui-inc/heroui/pull/2508) [`31934017a`](https://github.com/heroui-inc/heroui/commit/31934017a54627cbc78583674e990dc66dbe303e) Thanks [@khatabakhsh](https://github.com/khatabakhsh)! - Improved styling for radio button labels, including adjustments for different screen sizes and support for right-to-left (RTL) languages. (#2507)

- [#2660](https://github.com/heroui-inc/heroui/pull/2660) [`25484f866`](https://github.com/heroui-inc/heroui/commit/25484f866338cf6df549ba0b1082ffd57384eee2) Thanks [@sossost](https://github.com/sossost)! - Fixed slider component vertical mark y position focus (#2658)

- [#2668](https://github.com/heroui-inc/heroui/pull/2668) [`6b96ea9c9`](https://github.com/heroui-inc/heroui/commit/6b96ea9c9c091d025a886361f50970599a260715) Thanks [@caebwallace](https://github.com/caebwallace)! - Fix custom slot styling with twMerge set to true (#2153)

## 2.2.2

### Patch Changes

- [#2784](https://github.com/heroui-inc/heroui/pull/2784) [`183a4a6cf`](https://github.com/heroui-inc/heroui/commit/183a4a6cfda193a076a4a30550ab93b72d51002d) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix `isDisabled` prop warning on NextUI components that don't support this property, it is also fixed for non-NextUI components.

## 2.2.1

### Patch Changes

- [#2744](https://github.com/heroui-inc/heroui/pull/2744) [`158c2aa00`](https://github.com/heroui-inc/heroui/commit/158c2aa004f0080449321f84b0efd37762e8adc0) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Refactor calendar cell tab index, add calendar default width

## 2.2.0

### Minor Changes

- [#2618](https://github.com/heroui-inc/heroui/pull/2618) [`dc0bcf13a`](https://github.com/heroui-inc/heroui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - v2.3.0

### Patch Changes

- [#2538](https://github.com/heroui-inc/heroui/pull/2538) [`0359bf308`](https://github.com/heroui-inc/heroui/commit/0359bf3084d9f0fc29bf70505b600dab5e1c5da1) Thanks [@wingkwong](https://github.com/wingkwong)! - Fixed missing disableAnimation behavior in skeleton

- [#2618](https://github.com/heroui-inc/heroui/pull/2618) [`dc0bcf13a`](https://github.com/heroui-inc/heroui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - Calendar component added

  - objectToDeps function applied all across components
  - `useMeasure` hook added
  - `useIntersectionObserver` hook added
  - `framer-transitions` renamed to `framer-utils`
  - `ResizablePanel` component added to `framer-utils`
  - `test-utils` updated

- [#2618](https://github.com/heroui-inc/heroui/pull/2618) [`dc0bcf13a`](https://github.com/heroui-inc/heroui/commit/dc0bcf13a5e9aa0450938bcca47cd4c696066f14) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Support slots in AvatarGroup

- [#2522](https://github.com/heroui-inc/heroui/pull/2522) [`c5049edfd`](https://github.com/heroui-inc/heroui/commit/c5049edfde7edaee2081d70e581739be9dcae2f9) Thanks [@wingkwong](https://github.com/wingkwong)! - Fixed unexpected props on a DOM element (#2474)

- [#2677](https://github.com/heroui-inc/heroui/pull/2677) [`4dd2605ac`](https://github.com/heroui-inc/heroui/commit/4dd2605ac2270b419ff5b652a116e5048ec95c87) Thanks [@u3u](https://github.com/u3u)! - Fix: remove conflicting transition utilities (close #1502)

  See: https://tailwindcss.com/docs/transition-property

- [#2702](https://github.com/heroui-inc/heroui/pull/2702) [`2829d4afa`](https://github.com/heroui-inc/heroui/commit/2829d4afaef37ad899fec36d6a9e0e9d2f95094f) Thanks [@wingkwong](https://github.com/wingkwong)! - Changed the HSL rounding to 2 decimal places (#2697)

## 2.1.18

### Patch Changes

- [#2387](https://github.com/heroui-inc/heroui/pull/2387) [`141887d38`](https://github.com/heroui-inc/heroui/commit/141887d38c3b15a332b7d521448d4eb8e0743ba4) Thanks [@kuri-sun](https://github.com/kuri-sun)! - Chip with dot variant is not properly styled

- [#2392](https://github.com/heroui-inc/heroui/pull/2392) [`37bed2368`](https://github.com/heroui-inc/heroui/commit/37bed2368e2414a6eb3cf8744896a18ca7299a91) Thanks [@wingkwong](https://github.com/wingkwong)! - fixed incorrect RTL behaviour in toggle (#2266)

- [#2379](https://github.com/heroui-inc/heroui/pull/2379) [`e83595e06`](https://github.com/heroui-inc/heroui/commit/e83595e06f8225ea590491906109721d46e5dc1f) Thanks [@sudongyuer](https://github.com/sudongyuer)! - fix(chip): fix isOneChar compound variants avoid chip malformed(#2350)

## 2.1.17

### Patch Changes

- [#1951](https://github.com/heroui-inc/heroui/pull/1951) [`0f5cce5d6`](https://github.com/heroui-inc/heroui/commit/0f5cce5d62713c59973b4330607cdcd3fd95d41a) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1933 TV Function refactored to support twMerge false opts.

## 2.1.16

### Patch Changes

- [#1923](https://github.com/heroui-inc/heroui/pull/1923) [`9189b3fbf`](https://github.com/heroui-inc/heroui/commit/9189b3fbf2d6d6cc6566009c71b37d5fcc566291) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Textarea style rounded full styles issues fixed, start and end content props added

## 2.1.15

### Patch Changes

- [#1914](https://github.com/heroui-inc/heroui/pull/1914) [`7f6218b97`](https://github.com/heroui-inc/heroui/commit/7f6218b97860d267f5208134948dfeadd04505d1) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1910 multiline select fixed, style improved.

## 2.1.14

### Patch Changes

- [#1901](https://github.com/heroui-inc/heroui/pull/1901) [`6a6d426b1`](https://github.com/heroui-inc/heroui/commit/6a6d426b10fa7f92dfb20611e261347027393193) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - Label position changed for Select and Input, this avoids to break the layout when having long descriptions and no placeholder

  - Input/Select styles improved, label opacity removed

- [#1902](https://github.com/heroui-inc/heroui/pull/1902) [`85a820eef`](https://github.com/heroui-inc/heroui/commit/85a820eeffe5df87e7622b0983788eb50adafe20) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1893, `endContent` prop fixed.

- [#1905](https://github.com/heroui-inc/heroui/pull/1905) [`11ef4365d`](https://github.com/heroui-inc/heroui/commit/11ef4365dacf539001a39d596d2f60440bc0648b) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Input/Select text size changed for sm size.

## 2.1.13

### Patch Changes

- [#1884](https://github.com/heroui-inc/heroui/pull/1884) [`acba2cf8f`](https://github.com/heroui-inc/heroui/commit/acba2cf8f5ba1526bd44c6851e0ed7fdc6c0b8ae) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Input, Textarea, Select, Autocomplete and Textarea helper wrapper styles fixed

- [#1891](https://github.com/heroui-inc/heroui/pull/1891) [`e728a8967`](https://github.com/heroui-inc/heroui/commit/e728a8967b1775be6a919f3b6bd6fc2267cc002d) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - Input/Autocomplete/Textarea/Select styles adapted to custom default color, label truncate added

- [#1876](https://github.com/heroui-inc/heroui/pull/1876) [`71807e883`](https://github.com/heroui-inc/heroui/commit/71807e88317c40aadfeb134125be1def9d679956) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Theme plugin optimization applied to make it faster

## 2.1.12

### Patch Changes

- [#1869](https://github.com/heroui-inc/heroui/pull/1869) [`e84158db6`](https://github.com/heroui-inc/heroui/commit/e84158db620954b0f1d71206acbf3d46f43b0b89) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - Select without label position fixed
  - Input helperWrapper slot is now relative to its parent

## 2.1.11

### Patch Changes

- [#1865](https://github.com/heroui-inc/heroui/pull/1865) [`1fd5049f5`](https://github.com/heroui-inc/heroui/commit/1fd5049f5a0b852862e8ca1816f1e83507fdd8b5) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix multiline select and inputs with description/errorMessage

## 2.1.10

### Patch Changes

- [`25e86fb41`](https://github.com/heroui-inc/heroui/commit/25e86fb41770d3cdae6dfdb79306b78fa02d8187) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New version v2.2.0

## 2.1.9

### Patch Changes

- [#1631](https://github.com/heroui-inc/heroui/pull/1631) [`425a034bc`](https://github.com/heroui-inc/heroui/commit/425a034bca4aa5a86cfe4bc47c084366a7ad7e87) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - validationState prop deprecated, "isInvalid" prop adjusted, invalid checkbox and radios state improved

## 2.1.8

### Patch Changes

- [#1600](https://github.com/heroui-inc/heroui/pull/1600) [`b1b30b797`](https://github.com/heroui-inc/heroui/commit/b1b30b7976f1d6652808fbf12ffde044f0861572) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix npm deploy

## 2.1.7

### Patch Changes

- [#1563](https://github.com/heroui-inc/heroui/pull/1563) [`a3be419cb`](https://github.com/heroui-inc/heroui/commit/a3be419cb3c693ae8cace15f9a863274d759ddb1) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1561 Select bottom space removed when having helper components

- [#1590](https://github.com/heroui-inc/heroui/pull/1590) [`5c30e0481`](https://github.com/heroui-inc/heroui/commit/5c30e04811ef9f973d6b59107c909db72d9876b5) Thanks [@jguddas](https://github.com/jguddas)! - fix: set nowrap in chip

## 2.1.6

### Patch Changes

- [#1558](https://github.com/heroui-inc/heroui/pull/1558) [`7c8341035`](https://github.com/heroui-inc/heroui/commit/7c8341035dbdd120cd78221b3cabab2e40e7478d) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Pagination changeset

## 2.1.5

### Patch Changes

- [#1555](https://github.com/heroui-inc/heroui/pull/1555) [`d61428d9e`](https://github.com/heroui-inc/heroui/commit/d61428d9e6c1c0590593fb1f0136e226051b7e23) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Tailwind variants upgraded to the latest version v0.1.14

- [`4db10a47e`](https://github.com/heroui-inc/heroui/commit/4db10a47e96ad8315b5b96c2ff15574ac0fdeecc) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Pagination changes reverted

## 2.1.4

### Patch Changes

- [#1543](https://github.com/heroui-inc/heroui/pull/1543) [`043b8420c`](https://github.com/heroui-inc/heroui/commit/043b8420cfb659cbb6bb36404807ec3cc8ac8592) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1492 \n

  - Select and Input spaces fixed on helper wrapper
  - New select wrapper added `mainWrapper` which contains the helperWrapper and the trigger slots
  - Outside input with start content fixed

## 2.1.3

### Patch Changes

- [#1501](https://github.com/heroui-inc/heroui/pull/1501) [`5702287e5`](https://github.com/heroui-inc/heroui/commit/5702287e5622a8f0a0326c7cc0c200808c7971a8) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix Popover/Tooltip arrow color

## 2.1.2

### Patch Changes

- [#1458](https://github.com/heroui-inc/heroui/pull/1458) [`4e94c115`](https://github.com/heroui-inc/heroui/commit/4e94c115281c2774424d687877e036a9af1bce01) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix dropdown trigger events and popover arrow styles

## 2.1.1

### Patch Changes

- [#1455](https://github.com/heroui-inc/heroui/pull/1455) [`cc839cdd`](https://github.com/heroui-inc/heroui/commit/cc839cdd1fd54931bfba137e2f9b5e8007a7e47d) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix select close when clicking the label

## 2.1.0

### Minor Changes

- [#1313](https://github.com/heroui-inc/heroui/pull/1313) [`baec5502`](https://github.com/heroui-inc/heroui/commit/baec55029de7f17ba84d3e6c8c98358fd1f2695e) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New components:

  - Select
  - Listbox
  - ScrollShadow

## 2.0.5

### Patch Changes

- [#1384](https://github.com/heroui-inc/heroui/pull/1384) [`d0341020`](https://github.com/heroui-inc/heroui/commit/d0341020e6d865ad3f0d3646fa70a24de75a722b) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Fix #1382 navbar with search input example, input main wrapper h-full class applied

## 2.0.4

### Patch Changes

- [#1301](https://github.com/heroui-inc/heroui/pull/1301) [`d794225c`](https://github.com/heroui-inc/heroui/commit/d794225cb75121db3a72f430739b4eaacd1cf8b7) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Plugin types adapted to work with latest version of postcss

## 2.0.3

### Patch Changes

- [`e3e13a09`](https://github.com/heroui-inc/heroui/commit/e3e13a095f2347ff279c85e6a5d3798f36c6533f) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - New package created to exports system RSC-compatible functions
  Component exports changed to named exports

## 2.0.2

### Patch Changes

- [`459ac5ed`](https://github.com/heroui-inc/heroui/commit/459ac5ed4537942517803ba14129226a791d6feb) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - - Modal

  Outside scroll fixed on mobile devices

  - Dropdown

  Next.js key destructuring warning fixed

## 2.0.1

### Patch Changes

- [`e940ec06`](https://github.com/heroui-inc/heroui/commit/e940ec06ac5e46340d5956fb7c455a6ab3de3140) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Introducing NextUI v2.0

- [`e940ec06`](https://github.com/heroui-inc/heroui/commit/e940ec06ac5e46340d5956fb7c455a6ab3de3140) Thanks [@jrgarciadev](https://github.com/jrgarciadev)! - Introducing v2 - Readmes updated
