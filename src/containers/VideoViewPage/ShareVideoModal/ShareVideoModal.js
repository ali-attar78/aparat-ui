import { DialogContent, DialogTitle } from '@mui/material';
import {
  CloseOutlined as CloseIcon,
  FileCopyOutlined as CopyIcon,
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { NOTIFICATION_TYPE_SUCCESS } from '../../../components/NotificationBox';

import { ShareModalWrapper } from '../styles';

import facebookSvg from '../icons/facebook.svg';
import linkedinSvg from '../icons/linkedin.svg';
import telegramSvg from '../icons/telegram.svg';
import twitterSvg from '../icons/twitter.svg';
import whatsappSvg from '../icons/whatsapp.svg';

const links = [
  {
    title: 'فیسبوک',
    icon: facebookSvg,
    link: 'http://www.facebook.com/share.php?u=$LINK$',
  },
  {
    title: 'تویتتر',
    icon: twitterSvg,
    link: 'https://www.twitter.com/intent/tweet?url=$LINK$',
  },
  {
    title: 'واتس‌اپ',
    icon: whatsappSvg,
    link: 'https://wa.me/?text=$LINK$',
  },
  {
    title: 'تلگرام',
    icon: telegramSvg,
    link: 'https://t.me/share/url?url=$LINK$',
  },
  {
    title: 'لینکداین',
    icon: linkedinSvg,
    link: 'https://www.linkedin.com/shareArticle?mini=true&url=$LINK$',
  },
];

function ShareVideoModal({ 
  url,
  //  dispatch,
    onClose }) {
  let linkElementRef = null;

  function handleCopyAddress() {
    const range = document.createRange();
    range.selectNode(linkElementRef);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();

    // dispatch(
    //   notificationShowAction(
    //     'لینک با موفقیت کپی شد',
    //     NOTIFICATION_TYPE_SUCCESS,
    //   ),
    // );

    onClose();
  }

  return (
    <ShareModalWrapper open>
      <DialogTitle>
        <span>اشتراک در شبکه های اجتماعی</span>
        <CloseIcon onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <div className="links">
          {links.map(item => (
            <a
              key={item.title}
              href={item.link.replace('$LINK$', url)}
              target="_blank"
              onClick={() => onClose()}
            >
              <img src={item.icon} alt={item.title} />
              <b>{item.title}</b>
            </a>
          ))}
        </div>

        <div className="copyUrlBox">
          <CopyIcon className="copyIcon" onClick={handleCopyAddress} />

          <span
            ref={el => {
              linkElementRef = el;
            }}
          >
            {url}
          </span>
        </div>
      </DialogContent>
    </ShareModalWrapper>
  );
}

ShareVideoModal.propTypes = {
  // url: PropTypes.string.isRequired,
  // onClose: PropTypes.func.isRequired,
  // dispatch: PropTypes.func.isRequired,
};



export default memo(ShareVideoModal);
