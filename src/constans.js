export const BASE_URL = "http://127.0.0.1:8000/";

export const VIDEO_STATE_PENDING = 'pending';
export const VIDEO_STATE_PENDING_TITLE = 'در حال بررسی';
export const VIDEO_STATE_CONVERTED = 'converted';
export const VIDEO_STATE_CONVERTED_TITLE = 'در انتظار تایید';
export const VIDEO_STATE_ACCEPTED = 'accepted';
export const VIDEO_STATE_ACCEPTED_TITLE = 'تایید شده';
export const VIDEO_STATE_BLOCKED = 'blocked';
export const VIDEO_STATE_BLOCKED_TITLE = 'عدم انتشار';

export const VIDEO_STATES = [
  VIDEO_STATE_PENDING,
  VIDEO_STATE_CONVERTED,
  VIDEO_STATE_ACCEPTED,
  VIDEO_STATE_BLOCKED,
];

export const VIDEO_STATES_TITLES = {
  VIDEO_STATE_PENDING: VIDEO_STATE_PENDING_TITLE,
  VIDEO_STATE_CONVERTED: VIDEO_STATE_CONVERTED_TITLE,
  VIDEO_STATE_ACCEPTED: VIDEO_STATE_ACCEPTED_TITLE,
  VIDEO_STATE_BLOCKED: VIDEO_STATE_BLOCKED_TITLE,
};


export const COMMENT_STATE_PENDING = VIDEO_STATE_PENDING;
export const COMMENT_STATE_PENDING_TITLE = VIDEO_STATE_PENDING_TITLE;
export const COMMENT_STATE_ACCEPTED = VIDEO_STATE_ACCEPTED;
export const COMMENT_STATE_ACCEPTED_TITLE = VIDEO_STATE_ACCEPTED_TITLE;
export const COMMENT_STATE_READ = 'read';
export const COMMENT_STATE_READ_TITLE = 'خوانده شده';

export const COMMENT_STATES = [
  COMMENT_STATE_PENDING,
  COMMENT_STATE_ACCEPTED,
  COMMENT_STATE_READ,
];

export const COMMENT_STATES_TITLES = {
  [COMMENT_STATE_PENDING]: COMMENT_STATE_PENDING_TITLE,
  [COMMENT_STATE_ACCEPTED]: COMMENT_STATE_ACCEPTED_TITLE,
  [COMMENT_STATE_READ]: COMMENT_STATE_READ_TITLE,
};

export const FOLLOW_TYPE_FOLLOWINGS = 'following';
export const FOLLOW_TYPE_FOLLOWERS = 'followers';