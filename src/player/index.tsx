import type { ReactNode } from 'react';
import { useEffect, useRef, memo } from 'react';

import type { MediaType } from 'plyr';
import Plyr from 'plyr';

import { PlayerIconUrl } from './constants';
import zhCN from './i18n/zhCN';
import './styled.css';

import 'plyr/dist/plyr.css';

type PlayerProps = Plyr.Options & {
  source: Plyr.SourceInfo;
};

/**
 * Component
 * @description Chapta 播放器
 * @returns {JSX.Element}
 */
const Player = memo(({ source }: PlayerProps): ReactNode => {
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
     * @see https://github.com/sampotts/plyr/blob/master/src/js/config/defaults.js
     */
    player.current = new Plyr(videoRef.current, {
      i18n: zhCN,
      iconUrl: PlayerIconUrl,
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
  }, []);

  /**
   * Effect
   * @description 依赖传入的资源
   * @returns {void}
   */
  useEffect(() => {
    if (!player.current) return;
    if (!source) return;

    player.current.source = source;
  }, [source]);

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
});

export default Player;
export type { PlayerProps, MediaType };
