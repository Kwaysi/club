import React, { useState } from 'react';
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

export default function Share({ id }) {
  const [copied, setCopied] = useState(false);
  const msg = 'Join my club with this link';
  const link = `https://${window ? window.location.hostname : ''}/join/${id}`;

  const onCopy = () => {
    var copyText = document.getElementById('share');
    // @ts-ignore
    copyText.select();
    // @ts-ignore
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='share'>
      <h1>Invite your friends to join your club.</h1>
      <div className='flex' style={{ margin: '16px 0' }}>
        <input
          value={link}
          readOnly
          id='share'
          className='input'
          style={{ border: 'none' }}
        />
        <button className='button' style={{ margin: 0 }} onClick={onCopy}>
          Copy
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ padding: '2px 0' }}>Or share via: </span>
        <FacebookShareButton url={link} quote={msg}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>{' '}
        <TwitterShareButton url={link} title={msg}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>{' '}
        <WhatsappShareButton url={link} title={msg}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  );
}
