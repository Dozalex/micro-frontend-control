export const Trigger = {
  /** Controlled from outside */
  manual: 'manual',
  /** Opens and closes by clicking on reference element */
  click: 'click',
  /** Opens by clicking on reference element, but closes even if clicked outside */
  clickAutoclose: 'click-autoclose',
  /** Opens by clicking on reference element and positions around the click point */
  clickContextmenu: 'click-contextmenu',
  /** Opens by hovering over reference element */
  hover: 'hover',
  /** Opens by focusing on reference element */
  focus: 'focus',
  /** Opens by right click on reference element and positions around the click point */
  contextmenu: 'contextmenu',
  /** Opens by right click on reference element and positions around the reference element */
  contextmenuReference: 'contextmenu-reference',
} as const;
