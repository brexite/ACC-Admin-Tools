import { animate, animateChild, keyframes, query, stagger, state, style, transition, trigger } from "@angular/animations";

export const smoothCollapse =  trigger('smoothCollapse', [
    state('initial', style({
      height: '0',
      overflow: 'hidden',
      visibility: 'hidden',
    })),
    state('final', style({
      overflow: 'hidden'
    })),
    transition('initial<=>final', animate('200ms'))
])

export const stickyHeader = trigger('stickyHeader', [
  state('initial', style({
    overflow: 'auto'
  })),
  state('final', style({
    height: '0',
    paddingTop: '0',
    paddingBottom: '0',
    overflow: 'hidden'
  })),
  transition('initial=>final', animate('225ms 100ms cubic-bezier(0,0,.2,1)')), //NB: First number is duration, second is delay
  transition('final=>initial', animate('195ms 100ms cubic-bezier(.4,0,1,1)'))
])


export const dropdown = trigger('dropdown', [
  state('initial', style({
    height: '0',
    overflow: 'hidden',
    opacity: 0,
    visibility: 'hidden',
    marginTop: '0px',
    marginBottom: '0px',
    paddingTop: '0px',
    paddingBottom: '0px'
  })),
  state('final', style({
    overflow: 'hidden'
  })),
  transition('initial<=>final', animate('200ms'))
])

export const chevronCollapse = trigger('chevronCollapse', [
  state('initial', style({
    transform: 'inherit',
  })),
  state('final', style({
    transform: 'rotateX(180deg)'
  })),
  transition('initial<=>final', animate('200ms'))
])

export const shake = trigger('shake', [
  state('hidden', style({
    transform: 'scale(1)',
    opacity: '0',
  })),
  state('visible', style({
    transform: 'scale(1)',
    opacity: '1',
  })),
  transition('hidden=>visible', animate('500ms ease-in',
  keyframes([
    style({transform: 'translate3d(-1px, 0, 0)', opacity: '0', offset: 0.1}),
    style({transform: 'translate3d(1px, 0, 0)', opacity: '1', offset: 0.2}),
    style({transform: 'translate3d(-1px, 0, 0)', offset: 0.3}),
    style({transform: 'translate3d(1px, 0, 0)', offset: 0.6}),
    style({transform: 'translate3d(-1px, 0, 0)', offset: 0.9}),
  ]))),
  transition('visible=>hidden', animate('200ms ease-in'))
])

export const fadeInOut = trigger('fadeInOut', [
  state('hidden', style({
    height: '0',
    overflow: 'hidden',
    opacity: '0',
    visibility: 'hidden',
  })),
  state('visible', style({
    opacity: '1',
    visibility: 'visible'
  })),
  transition('hidden=>visible', animate('500ms ease-in', keyframes([
    style({overflow: 'visible', height: 'auto', offset: 0}),
    style({opacity: '1', visibility: 'visible', offset: 1})
  ]))),
  transition('visible=>hidden', animate('500ms ease-out', keyframes([
    style({opacity: '1', visibility: 'visible', offset: 0}),
    style({height: 'auto', overflow: 'visible', opacity: '0', visibility: 'hidden', offset: 1})
  ])))
])

export const dismissableNotification = trigger('dismissableNotification', [
  state('hidden', style({
    bottom: '-100px',
    opacity: 0
  })),
  state('visible', style({
    opacity: 1
  })),
  transition('visible<=>hidden', animate('500ms ease-in-out'))
])


