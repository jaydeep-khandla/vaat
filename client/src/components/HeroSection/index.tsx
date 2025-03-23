import { useGlobalContext } from '@/contexts/contextHooks';
import Button from '../ui/Button';
import styles from './HeroSection.module.css';
import assets from '@/assets';

export default function HeroSection() {
  const { navigate } = useGlobalContext();

  function handleNavigation(path: string) {
    navigate(path);
  }

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.heading}>
              {'VAAT: Effortless Collaboration'}
            </h1>
            <p className={styles.subheading}>
              {
                'Experience meetings that feel personal, anywhere. Connect with crystal-clear video and audio quality.'
              }
            </p>
            <div className={styles.buttonGroup}>
              <Button
                size="lg"
                className={styles.primaryButton}
                onClick={() => handleNavigation('/join')}
              >
                {'Start Your First Meeting'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={styles.secondaryButton}
              >
                {'Learn More'}
              </Button>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src={assets.hero_image} alt="Ooops" />
          </div>
        </div>
      </div>
    </section>
  );
}
