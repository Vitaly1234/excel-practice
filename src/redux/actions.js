import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TEXT,
  CHANGE_TITLE,
  TABLE_RESIZE,
  UPDATE_DATE,
} from '@/redux/types';

export function tableResize(data) {
  return getAction(TABLE_RESIZE, data);
}

export function cahngeText(data) {
  return getAction(CHANGE_TEXT, data);
}

export function changeStyles(data) {
  return getAction(CHANGE_STYLES, data);
}

export function applyStyle(data) {
  return getAction(APPLY_STYLE, data);
}

export function changeTitle(data) {
  return getAction(CHANGE_TITLE, data);
}

export function updateDate() {
  return getAction(UPDATE_DATE);
}

function getAction(type, data) {
  return {
    type,
    data,
  };
}
