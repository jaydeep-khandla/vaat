import React from 'react';
import Button from '@/components/ui/Button';
import { MicIcon, VideoIcon } from '@/components/icons';
import styles from './JoinPage.module.css';

function Navbar() {
  return (
    <nav className={styles.joinpage__navbar}>
      <h1 className={styles.logo__text}>{'VAAT'}</h1>
    </nav>
  );
}

export default function JoinPage() {
  const [localStream, setLocalStream] = React.useState<MediaStream | null>(
    null
  );
  const videoRef = React.useRef<HTMLVideoElement>(null);

  async function getMediaPermissions() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setLocalStream(stream);
      setVideoStream(stream);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      alert(
        'Failed to get media permissions. Please check your camera and microphone settings.'
      );
    }
  }

  React.useEffect(() => {
    // Check if permissions are already granted when component mounts
    const checkExistingPermissions = async () => {
      try {
        // Query device permissions status
        const permissions = await navigator.permissions.query({
          name: 'camera' as PermissionName,
        });

        if (permissions.state === 'granted') {
          // If already granted, get the media stream
          getMediaPermissions();
        }
      } catch (err) {
        // Some browsers may not support permissions API
        console.log(
          "Couldn't check permissions, will wait for user to request explicitly"
        );
      }
    };

    checkExistingPermissions();

    return () => {
      // Clean up the media stream when component unmounts
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  function setVideoStream(stream: MediaStream | null) {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }

  return (
    <div className={styles.joinPage__container}>
      <Navbar />
      <main className={styles.joinPage__main}>
        <div className={styles.joinPage__content}>
          <div className={styles.joinPage__leftSection}>
            <div className={styles.joinPage__controls}>
              <div className={styles.joinPage__buttonGroup}>
                <div className={styles.joinPage__buttonWrapper}>
                  <Button className={styles.joinPage__micButton}>
                    <MicIcon />
                  </Button>
                  <Button className={styles.joinPage__videoButton}>
                    <VideoIcon />
                  </Button>
                </div>
              </div>
              <video
                className={styles.joinPage__video}
                ref={videoRef}
                autoPlay
                muted
                playsInline
              ></video>
            </div>
            <Button
              size="lg"
              className={styles.joinPage__getMediaButton}
              onClick={getMediaPermissions}
            >
              {/* {'Get Media Permissions'} */}
              Get Media Permissions
            </Button>
          </div>

          <div className={styles.joinPage__rightSection}>
            <div className={styles.joinPage__info}>
              <h1 className={styles.joinPage__title}>{'Join the Meeting'}</h1>
              <p className={styles.joinPage__description}>
                {'Set up your audio and video before joining the conference'}
              </p>
              <Button size="lg" className={styles.joinPage__joinButton}>
                {'Ask to Join'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
