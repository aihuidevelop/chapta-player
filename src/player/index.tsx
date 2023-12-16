import { useEffect, useRef } from 'react';

import Plyr from 'plyr';

import zhCN from './i18n/zhCN';

import 'plyr/dist/plyr.css';

/**
 * View
 * @description Playground
 * @returns {JSX.Element}
 */
const Playground = () => {
  /**
   * Ref
   */
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const player = useRef<Plyr>();

  /**
   * Effect
   * @description 初始化实例
   * @returns {void}
   */
  useEffect(() => {
    if (!videoRef.current) return;

    /**
     * @link https://github.com/sampotts/plyr/blob/master/src/js/config/defaults.js
     */
    player.current = new Plyr(videoRef.current, {
      i18n: zhCN,
      autopause: true,
      tooltips: { controls: true },
      controls: [
        'play-large',
        // 'restart',
        // 'rewind',
        'play',
        // 'fast-forward',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'captions',
        'settings',
        'pip',
        'airplay',
        // 'download',
        'fullscreen',
      ],
      keyboard: {
        focused: true,
        global: true,
      },
    });

    player.current.source = {
      type: 'video',
      title: '大鸡吧',
      sources: [{ src: 'https://static.chapta.com/picture/video/100038019/100038019.mp4', type: 'video/mp4' }],
      poster: 'https://static.chapta.com/picture/image/batch/4aa79a06-f6e2-4d84-8545-255fa273d7ad-u1/2.jpg',
    };
  }, []);

  /**
   * Effect
   * @description 卸载实例
   * @returns {void}
   */
  useEffect(() => {
    const _player = player.current;
    return () => {
      _player?.destroy();
    };
  }, []);

  return <video ref={videoRef} />;
};

export default Playground;
