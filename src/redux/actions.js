import {CHANGE_TEXT, TABLE_RESIZE} from '@/redux/types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function cahngeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}
